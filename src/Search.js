import React from "react";
import { corpus } from "./Corpus";
//import { buildDictionary } from "./buildDictionary";
// or the below default if there is only ONE function in buildDictionary.
// also it can be called anything - function in buildDictionary.js has no name so we
// can just pick one if we want to like import buildDict from "./buildDictionary" would work too.
import buildDictionary from "./buildDictionary";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      dictionary_exists: false
    };
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.search > prevState.search) {
  //     this.setState({
  //       search: null
  //     });
  //   }
  // }

  changeSearch = event => {
    this.setState({
      search: event.target.value
    });
  };

  handleSearchClick = event => {
    // we want to find the search results in the corpus as the end goal.
    /* We want it to be a basic SPIMI indexer, which means there is a 
    dictionary already made of terms + a list of their document ids which
    we will search here. */
    this.setState({
      search: event.target.value
    });
    console.log(this.state.search);
    /* If the dictionary doesn't exist yet, build it */
    if (this.state.dictionary_exists === false) {
      buildDictionary(corpus);
      this.setState({
        dictionary_exists: true
      });
    }
    /* execute search */
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.search}
          onChange={this.changeSearch}
          placeholder="Enter search term"
        />
        <button
          className="btn btn-primary btn-sm"
          onClick={this.handleSearchClick}
        >
          Search!
        </button>
      </div>
    );
  }
}

export default Search;
