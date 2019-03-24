import React from 'react';
import { Boxplot } from 'react-boxplot'

class BoxPlot extends React.Component {
  render() {
      return (
        <Boxplot
            width={400}
            height={40}
            orientation="horizontal"
            min={this.props.quartiles[0]}
            max={this.props.quartiles[4]}
            stats={{
                whiskerLow: this.props.quartiles[0],
                quartile1: this.props.quartiles[1],
                quartile2: this.props.quartiles[2],
                quartile3: this.props.quartiles[3],
                whiskerHigh: this.props.quartiles[4],
                outliers: [this.props.highlight],
              }}
        />
      )
  }
}

export default BoxPlot
