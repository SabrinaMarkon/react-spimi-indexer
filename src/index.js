import React from "react";
import { render } from "react-dom";
import Corpus from "./Corpus";
import Search from "./Search";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const App = () => (
  <div style={styles}>
    <br />
    <h2>React/JavaScript SPIMI Indexer</h2>
    <br />
    <Search />
    <br />
    <h4>Show Corpus (temporary so I can see):</h4>
    <Corpus />
  </div>
);

render(<App />, document.getElementById("root"));
