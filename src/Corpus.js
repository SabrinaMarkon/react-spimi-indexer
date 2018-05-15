import React from "react";
import faker from "faker";

/* Create random 'documents' (short 'sentences' of random English words) */
  
let corpus = new Array(10).fill(true).map((currElement, index) => {

  // remove temporary stop/problem/htmltag words after testing.
  let thisDocument = faker.random.words() + " like " +
    faker.random.words() + ' the' + '   adfds     fdsfds    ' +
    ' <div style="color: red;">CAT    \'\"S</div>' + '   ' +
    'asdf?#@dd*-df\'asfs ' + '< p > SQU$ ^&E ? E  B\'Z</p>';

  let document = {
    document: thisDocument,
  }
  return document;
});

/* stringify because React won't accept an object as a child:
(ie. 'new Array...' above') */
corpus = JSON.stringify(corpus);
console.log(corpus);

export default () => <div>{corpus}</div>;
export { corpus };
