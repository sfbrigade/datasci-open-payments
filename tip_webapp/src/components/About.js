import React from 'react';
import { connect } from "react-redux"

class About extends React.Component {
  constructor(props) {
    super(props)
  }
 
  render() {
      return (
        <div className="container">
            <p>
                In Project Finance and Rx, we use San Francisco as a case study to explore the link between financial contributions and prescribing behavior for mental health providers. Our goal is to create an educational tool that informs the public, empowers policy makers and researchers to understand the current state of the system, and allows providers to see where they lie in terms of brand-name prescriptions relative to other psychiatrists in the same geographic location. The tool serves as a natural extension of ProPublica’s Dollars for Docs project that already shows how much providers across the country received in payments from the pharmaceutical industry.
        Ultimately, our end goal is to empower both patients and providers to result in better cost-effective care to improve healthcare outcomes. This is not to say that we think that BigPharma has “corrupted” the entire industry. We also believe that strong relationships between physicians and industry are necessary; often, pharmaceutical companies fund large research projects that produces advances in medical care. Our goal is to provide transparency in an area that has been not as frequently discussed and ensure that financial incentives are as aligned as possible to ensure the best healthcare outcomes.
            </p>
        </div>
      )
  }
}

export default About;
