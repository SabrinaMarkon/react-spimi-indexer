import React from "react";
import faker from "faker";

/* Create random 'documents' (short 'sentences' of random English words) */

let corpus = new Array(10).fill(true).map((currElement, index) => {
  let document = {
    document: faker.random.words() + " " + faker.random.words(),
    docID: index,
  }
  return document;
});

/* stringify because React won't accept an object as a child:
(ie. 'new Array...' above') */
corpus = JSON.stringify(corpus);
console.log(corpus);

export default () => <div>{corpus}</div>;
export { corpus };
