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

/* stringify because React won't accept an object
(ie. 'new Array...') as a child.. */
corpus = JSON.stringify(corpus);
console.log(corpus);

export default () => <div>{corpus}</div>;
export { corpus };
