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


def batch_geocode(table_name):
    """ for simplicity, local csv input for now.
        Batch geocode given pre-defined address columns.
    """
    full_table = pd.read_csv(table_name)
    desired_cols = ['recipient_primary_business_street_address_line1',
                    'recipient_city',
                    'recipient_state',
                    'recipient_zip_code']
    with tempfile.TemporaryDirectory() as tmp_dir:
        partition_to_csv(tmp_dir.name, full_table, desired_cols)
        # subprocess.run('censusgeocode --csv ' + tmp_dir.name + )


def partition_to_csv(trg_dir, data_frame, desired_cols):
    """ break a data frame with > 1000 rows into csv partitions of 1000 rows.
        Indexing is true, header is false to meet batch requirement here: https://pypi.org/project/censusgeocode/.
    """
    for x in range(0, data_frame.shape[0], 1000):
        if x + 1000 <= data_frame.shape[0]:
            data_frame.iloc[x:x+1000, desired_cols].to_csv(path_or_buf = trg_dir + "_" + str(x) + ".csv",
                                                           index=True, header=False)
        else:
            data_frame.iloc[x:data_frame.shape[0], desired_cols].to_csv(trg_dir, index=True, header=False)
