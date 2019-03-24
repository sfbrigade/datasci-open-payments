import React from 'react';

import SearchBar from "./SearchBar"
import Plots from "./Plots"

class Search extends React.Component {
  render() {
    return (
      <div className="box">
        <SearchBar/>
        <hr/>
        <Plots/>
      </div>
    )
  }
}

export default Search;
