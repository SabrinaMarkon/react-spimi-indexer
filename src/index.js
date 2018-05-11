import React from "react";
import { render } from "react-dom";
import Corpus from "./Corpus";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const App = () => (
  <div style={styles}>
    <Corpus />
    <h2>React/JavaScript SPIMI Indexer</h2>
  </div>
);

render(<App />, document.getElementById("root"));
