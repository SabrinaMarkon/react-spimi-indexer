import { corpus } from "./Corpus";

/* Use named export:
export const buildDictionary = () => {
  console.log("cats");
};

or */

/* if we only are going to have one function in here: */
export default function(corpus) {
  /* 1) TOKENIZE:
  Go through document collection (corpus string) and tokenize each document */
  const tokenarray = corpus.split(" ");
  /* Remove the last array index which is just a space leftover from the 
  fakeSentence functions */
  tokenarray.pop();
  // console.log(tokenarray);


}
