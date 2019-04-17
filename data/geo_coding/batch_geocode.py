""" Geocode 1000 batches of addresses at a time. """

import os
import pandas as pd
import requests
import sqlalchemy as sqla
import sys
import tempfile
import subprocess

pd.options.display.max_columns = 999

import censusgeocode as cg


"""
Directions: 
Input_queue := pre-called address
output_queue = tuple(address, geocode)


worker:
    1. call address from the input_queue
    2. api call and get geocodes using the address in the input_queue
    3. input (address, geocode) into the output_queue
master:
    1. put addresses to the input_queue
    2. extract (address, geocode) from the output_queue and add it to the row of the pandas dataframe


Tasks needed to be programmed:
    1. Worker & functions
    2. Master & functions
    3. Master inputs the addresses to the input_queue
    4. Workers deployed in threads
    5. Master aggregates the information from various workers
     

parameters: n_thread, batchsize, timeout_specification

"""


class Worker:
    """ Instantiating a class of worker """

    def wrapper_api_call(self, df_input_addresses_queued):
        """
        API Wrapper (in this case censusgeocode pkg) call to return geo_codes.
        For censusgeocode pkg, input is a list of dict (input batch has to be less than 1000 addresses)
            and the output will be a list of [original address df, OrderedDict with geocodes].
        Dictionary has to have columns as street, city, state, and zip. (ID autogenerated in censusgeocode pkg).
        """
        geo_codes_ordered_dict = cg.addressbatch(df_input_addresses_queued.to_dict('records'))
        return geo_codes_ordered_dict


class Master(Worker):
    """ Instantiating a class of master """

    def __init__(self, master_input_df, n_threads, timeout_set):
        """
        Master_input_df is the master dataframe with all the addresses that need to be geo-coded.
        The

        """
        self.master_input_df = master_input_df
        self.df_input_addresses_queued = pd.DataFrame(columns=list(master_input_df))
        self.master_output_df = pd.DataFrame(columns=list())
        self.n_threads = n_threads
        self.timeout_set = timeout_set

    def geo_codes_into_df(self, geo_codes_ordered_dict):
        geo_codes_result_df = (pd.DataFrame.from_dict(geo_codes_ordered_dict, orient='column'))
        return geo_codes_result_df

    def main(self, master_output_df, queue_size=500):
        """
        Function to load up the queue and retrieve info.
        Suggested queue size = 500
        """
        col_df = self.geo_codes_into_df(Worker.wrapper_api_call(self.master_input_df[0]))
        self.master_output_df = pd.DataFrame(columns=list(col_df))
        for x in range(1, master_output_df.shape[0], queue_size):
            if x + queue_size <= master_output_df.shape[0]:
                geo_codes_ordered_dict = Worker.wrapper_api_call(master_output_df.iloc[x, x + queue_size])
                geo_codes_result_df = self.geo_codes_into_df(geo_codes_ordered_dict)
                self.master_output_df = self.master_output_df.append(geo_codes_result_df,
                                                                     sort=True,
                                                                     ignore_index=True)
        return master_output_df





"""
Below functions will be deprecated.
"""

def batch_geocode(table_name):
    """
    For simplicity, geocoding local csv inputs only.
    Batch geocode given pre-defined address columns.
    """
    full_table = pd.read_csv(table_name)
    desired_cols = ['recipient_primary_business_street_address_line1',
                    'recipient_city',
                    'recipient_state',
                    'recipient_zip_code']
    with tempfile.TemporaryDirectory() as tmp_dir:
        os.mkdir(tmp_dir.name + '/datasets')
        trg_dir = tmp_dir.name + '/datasets'
        partition_to_csv(trg_dir, full_table, desired_cols)
        subprocess.run('cat' + trg_dir + '/*.csv | censusgeocode --csv ->' + tmp_dir.name + '/export.csv')


def partition_to_csv(trg_dir, data_frame, desired_cols):
    """
    Break a data frame with > 1000 rows into csv partitions of 1000 rows.
    Indexing is true, header is false to meet batch requirement here: https://pypi.org/project/censusgeocode/.
    """
    for x in range(0, data_frame.shape[0], 1000):
        if x + 1000 <= data_frame.shape[0]:
            data_frame.iloc[x:x+1000, desired_cols].to_csv(path_or_buf=trg_dir + "/part_" + str(x) + ".csv",
                                                           index=True, header=False)
        else:
            data_frame.iloc[x:data_frame.shape[0], desired_cols].to_csv(path_or_buf=trg_dir + "/part_" + str(x) + ".csv",
                                                                        index=True, header=False)