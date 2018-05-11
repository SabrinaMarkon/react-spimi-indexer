import React from "react";
import { render } from "react-dom";
import faker from "faker";

const corpus = new Array(100).fill(true).map(index => ({
  docid: index,
  document: faker.random.words()
}));

render() => <h1>test</h1>

