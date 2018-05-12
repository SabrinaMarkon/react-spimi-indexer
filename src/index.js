import React from "react";
import { render } from "react-dom";
import Corpus from "./Corpus";
import Search from "./Search";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

/**
So if our dictionary state is false, it doesn't exist so we have to build one.
Try to achieve linear complexity O(T)

STORIES 
1) it should check if the dictionary is true or false in the state. If it is false,
we need to build it so searches can go through that not every single token of the
corpus. CHECK
2) It should go through the documents in the corpus and tokenize them. Each document is an array item.
3) It should filter out stop words (not many in the weird random sentences though)
4) It should filter out html tags if there are any (not in sample corpus right now)
5) It should remove certain punctuation from tokens
6) It should store unique terms in a data structure along with the document id as a 
term dictionary:
{term: {docid, docid2...}, term2: {docid2, docid8...}}
7) It should store the count of each unique term in the document so we know the term frequency
tf for that document. ie. term1: count, term2: count, etc. maybe.
8) We need to count the number of docs for each term in the term dictionary ie.
term: {docid, docid2} would have two docs, so has a document frequency df = 2
Let's try to store this in the structure in #7 by turning the count value into an object tf
and df instead?
ie. 
{
  term1: {
    tf: tfcount,
    df: dfcount,
    idf: idfcalc,
    tf-idf-weight: tfidf
  },
  term2: {
    tf: tfcount2,
    df: dfcount2,
    idf: idfcalc,
    tf-idf-weight: tfidf // search results will rank in descending order of weight.
  },
}
9) Calculate the idf and tf-idf weight during #9 when we know the df and are already 
adding to the correct term in the object so have access to the tf too.
10) Oh there's going to be more. Cosine similarity, add new document...
*/

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
