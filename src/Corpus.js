import React from "react";
import faker from "faker";

const fakeSentence = () => {
  return faker.random.words() + " " + faker.random.words();
};

/* Create random 'documents' (short 'sentences' of random English words) */
const corpus = new Array(1000).fill(true).map(fakeSentence);

/* see what this thing looks like for now */
const corpusprint = JSON.stringify(corpus);

export default () => <div>{corpusprint}</div>;
