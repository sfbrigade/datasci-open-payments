import React from 'react';
import { connect } from "react-redux"
import BoxPlot from "./BoxPlot"

class Plots extends React.Component {
  render() {
    if (this.props.physician_data) {
      if (this.props.physician_data === "not found") {
        return (
          <p>Provider Not Found</p>
        )
      }
      let brandNamesPercentile = this.props.physician_data.percentile_percentage_brand_claims
      let brandNamesRaw = this.props.physician_data.percentage_brand_claims
      let drugCostPercentile = this.props.physician_data.percentile_avg_drug_cost
      let drugCostRaw = this.props.physician_data.avg_drug_cost

      let paymentPercentile = this.props.physician_data.percentile_total_payments

      return (
        <div>
          <h1>Where this provider lies on average</h1>
          <div className="box">
            <h4>Percentage of Prescriptions that are Brand Name Drugs</h4>
            <BoxPlot 
              highlight={brandNamesRaw}
              quartiles={[0, 0.169, 0.217, 0.284, 1]}
              />
            <p>percentile: {brandNamesPercentile}</p>
            <br/>
            <h4>Average Total Drug Cost of Prescriptions</h4>
            <BoxPlot 
              highlight={drugCostRaw}
              quartiles={[9.6, 52.56, 85.87, 119.65, 528.38]}
            />
            <p>percentile: {drugCostPercentile}</p>
            <br/>
            <h4>percentile of payments</h4>
            <BoxPlot
              highlight={paymentPercentile}
              quartiles={[0, 25, 50, 75, 100]}
            />
          </div>
        </div>
      )
    }
    return null
  }
}

function mapStateToProps(state) {
  return {
    physician_data: state.appState.physician_data,
    physician_name: state.appState.physician_name
  }
}

export default connect(mapStateToProps, null)(Plots);
