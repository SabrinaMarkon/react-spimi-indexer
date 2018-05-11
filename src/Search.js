import React from "react";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: null,
      dictionary_exists: false
    };
  }

  changeSearch = event => {
    this.setState({
      search: event.target.value
    });
  };

  handleSearchClick = event => {
    console.log(this.state.search);
    // we want to find the search results in the corpus as the end goal.
    /* We want it to be a basic SPIMI indexer, which means there is a 
    dictionary already made of terms + a list of their document ids which
    we will search here. */
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.search}
          onChange={this.changeSearch}
        />
        <button class="btn btn-primary btn-sm" onClick={this.handleSearchClick}>
          Search!
        </button>
      </div>
    );
  }
}

export default Search;
