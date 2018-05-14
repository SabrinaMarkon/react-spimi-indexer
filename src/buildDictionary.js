import { corpus } from "./Corpus";

/* Use named export:
export const buildDictionary = () => {
  console.log("cats");
};

or */

/* if we only are going to have one function in here: */
export default function(corpus) {
  
  /* convert back to object */
  corpus = JSON.parse(corpus);

  /* 1) TOKENIZE:
  Go through document collection (corpus string) and tokenize each document.
  We want to have a list of objects that each contain a document's ID and an
  array of its tokens. If there are duplicate tokens in a document, we also
  now have their raw term frequencies from each of those counts. */
  const tokenarray = corpus.map((currElement, index) => {
    let entry = {
      docID: index,
      tokens: currElement.document.split(' '),
    }
    return entry;
  });
  
  /* We now have an ARRAY of docIDs and their tokens. */

  /* 2) REMOVE STOP WORDS FROM TOKENS: */
  const stopwords = ["a", "aboard", "about", "above", "across", "after", 
  "against", "along", "an", "and", "another", "any", "around", "as", "at", 
  "before", "behind", "below", "beneath", "beside", "between", "beyond", 
  "but", "but", "by", "certain", "down", "during", "each", "every", 
  "except", "following", "for", "for", "from", "her", "his", "in", "inside", 
  "into", "its", "its", "like", "minus", "minus", "my", "near", "next", "no", 
  "nor", "of", "off", "on", "onto", "onto", "opposite", "or", "our", "out", 
  "outside", "over", "past", "plus", "round", "since", "since", "so", "some", 
  "than", "that", "the", "their", "this", "through", "to", "toward", "under", 
  "underneath", "unlike", "until", "up", "upon", "with", "without", "yet"];

  for (let i = 0; i < tokenarray.length; i++) {
    const eachTokenSubArray = tokenarray[i].tokens;
    /* For each docID-tokens object, we need to see if any of the tokens
    in the tokens array property are present in the stopwords array, and
    remove them if they are, and also remove any blank tokens. */
    const eachTokenFilteredArray = 
    eachTokenSubArray.filter(item => (stopwords.indexOf(item) < 0 && item !== ''));
    tokenarray[i].tokens = eachTokenFilteredArray;
  }
  console.log(tokenarray);

  // combine stopword blocka   with html tag removal block ?

  // test
  // tokenarray.push('<div style="color: red;">CAT    \'\"S</div>');
  // tokenarray.push('(<p>SQU$^&E?E  B\'Z</p>');
  // tokenarray.push('');

  /* 3) REMOVE HTML TAGS (first replace), 
        PUNCTUATION EXCEPT - and ' (second replace,
        AND MULTIPLE SPACES (3rd replace) FROM TOKENS: */
  for (let i = 0; i < tokenarray.length; i++) {
    tokenarray[i] = tokenarray[i]
                    .replace(/<{1}[^<>]{1,}>{1}/g, '')
                    .replace(/[.,?\/#!$%\^&\*;:{}=\_`~()"]/g, '')
                    .replace(/\s{2,}/g, '');
  }

  /* 4) CREATE ARRAY OF UNIQUE TERMS BY REMOVING EMPTY TOKENS (EMPTY INDEXES) */
  const termsarray = tokenarray.filter((token) => {
    return token !== '';
  });
  
console.log(tokenarray);
console.log('--------------------------------------------------------');
console.log(termsarray);
}
