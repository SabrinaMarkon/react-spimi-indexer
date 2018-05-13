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
  
  /* We now have an ARRAY of tokens */

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

  for (let i = 0; i < stopwords.length; i++) {
    const removeindexvalue = tokenarray.indexOf(stopwords[i]);
    if (removeindexvalue !== -1) {
      //console.log(removeindexvalue + '\n');
      // a stopword was found at this index in the tokenarray. Set to ''.
      tokenarray[removeindexvalue] = '';
    }
  };

  // test
  tokenarray.push('<div style="color: red;">CAT    \'\"S</div>');
  tokenarray.push('(<p>SQU$^&E?E  B\'Z</p>')

  /* 3) REMOVE HTML TAGS (first replace), 
        PUNCTUATION EXCEPT - and ' (second replace,
        AND MULTIPLE SPACES (3rd replace) FROM TOKENS: */
  for (let i = 0; i < tokenarray.length; i++) {
    tokenarray[i] = tokenarray[i]
                    .replace(/<{1}[^<>]{1,}>{1}/g, '')
                    .replace(/[.,?\/#!$%\^&\*;:{}=\_`~()"]/g, '')
                    .replace(/\s{2,}/g, '');
  }

  
console.log(tokenarray);
}
