import React from 'react';
import { connect } from "react-redux"
import { bindActionCreators } from 'redux'

import {search} from "../actions/search"

class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.setText = this.setText.bind(this)
    this.keyPress = this.keyPress.bind(this)
    this.state = {query: ""}
  }

  setText() {
    this.setState({query: ""})
  }

  keyPress(e){
    if(e.keyCode === 13){
      this.props.search(e.target.value)
    }
 }
 
  render() {
    return (
      <div>
        <input 
          className="input" 
          type="text" 
          placeholder="First and Last"
          onChange = {(e) => this.setText(e.target.value)}
          onKeyDown = {this.keyPress}
          />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    search: search
  },
    dispatch)
}

export default connect(null, mapDispatchToProps)(SearchBar);
