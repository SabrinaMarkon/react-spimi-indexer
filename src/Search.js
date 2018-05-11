import React from "react";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: null
    };
  }

  changeSearch = event => {
    this.setState({
      search: event.target.value
    });
  };

  handleSearchClick = event => {
    console.log(this.state.search);
    // we want to find the search results in the corpus.
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.search}
          onChange={this.changeSearch}
        />
        <button class="btn btn-primary btn-sm" onClick={this.handleSearchClick}>Search!</button>
      </div>
    );
  }
}

export default Search;
