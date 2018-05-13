import React from "react";
import faker from "faker";

const fakeSentence = () => {
  return faker.random.words() + " " + faker.random.words() + " ";
};

/* Create random 'documents' (short 'sentences' of random English words) */

// Get rid of Array way to make corpus so we don't have to concat all the smaller arrays
// that result from the map(fakeSentence) -> would be (O^2)
// const corpus = new Array(1000).fill(true).map(fakeSentence);

let corpus = "";

for (let i = 0; i < 100; i++) {
  corpus += fakeSentence();
}

/* needed the below when corpus was an Array */
//const corpusprint = JSON.stringify(corpus);

export default () => <div>{corpus}</div>;
export { corpus };
