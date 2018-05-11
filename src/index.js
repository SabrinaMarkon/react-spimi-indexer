import React from "react";
import { render } from "react-dom";
import Corpus from "./Corpus";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const App = () => (
  <div style={styles}>
    <h2>React/JavaScript SPIMI Indexer</h2>
    <h3>Show corpus below for now:</h3>
    <Corpus />
  </div>
);

render(<App />, document.getElementById("root"));
