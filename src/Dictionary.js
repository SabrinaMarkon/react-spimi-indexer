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
    let tokens = currElement.document.split(" ");
    let entry = {
      docID: index,
      tokens
    };
    return entry;
  });

  /* get the number of documents, N, for the idf calculation later on */
  const N = tokenarray.length;

  /* We now have an ARRAY of docIDs and their tokens. */

  /* 2) REMOVE STOP WORDS, BLANK TOKENS, HTML TAGS, AND PUNCTUATION FROM TOKENS: */
  const stopwords = ["a", "aboard", "about", "above", "across", "after", "against",
    "along", "an", "and", "another", "any", "around", "as", "at", "before", "behind",
    "below", "beneath", "beside", "between", "beyond", "but", "but", "by", "certain",
    "down", "during", "each", "every", "except", "following", "for", "for", "from",
    "her", "his", "in", "inside", "into", "its", "its", "like", "minus", "minus",
    "my", "near", "next", "no", "nor", "of", "off", "on", "onto", "onto", "opposite",
    "or", "our", "out", "outside", "over", "past", "plus", "round", "since", "since",
    "so", "some", "than", "that", "the", "their", "this", "through", "to", "toward",
    "under", "underneath", "unlike", "until", "up", "upon", "with", "without", "yet"];

  /* make array to hold unique terms, their [docID,term_frequency_for_this_document] */
  let termsDocIDsAndDocFrequencies = [];

  /* Do for each document. N = tokenarray.length. i = which doc is this? */
  for (let i = 0; i < N; i++) {
    const eachTokenSubArray = tokenarray[i].tokens;

    /* For each docID-tokens object, we need to see if any of the tokens
    in the tokens array property are present in the stopwords array, and
    remove them if they are, and also remove any blank tokens, html tags,
    and punctuation except ' and -. */
    const eachTokenFilteredArray =
      /* 3) REMOVE STOPWORDS AND BLANK TOKENS: */
      eachTokenSubArray
        .filter(item => stopwords.indexOf(item) < 0)
        /* 4) REMOVE HTML TAGS, PUNCTUATION, AND MULTIPLE SPACES */
        .map(item => {
          item = item
            .replace(/<{1}[^<>]{1,}>{1}/g, "") // remove html tags. Maybe use BeautifulSoup in the python version.
            .replace(/[.,?><@\/#!$%\^&\*;:{}=\_`~()"]/g, "") // remove punctuation.
            .replace(/\s{2,}/g, ""); // remove multiple spaces.
          if (item.length <= 2) {
            // remove items that are 2 or less characters.
            item = "";
          }
          return item;
        });

    /* thisDocsTokens is a list of all tokens for this document, including duplicates. */
    let thisDocsTokens = tokenarray[i].tokens;

    console.log(thisDocsTokens);
    // thisDocsTokens = eachTokenFilteredArray.filter(function (e) {
    //   return e === 0 || e;
    // });

    /*
    Stories:
    1) Get each term from this document in a for loop.
    2) Check if it is already in the main list.
     2a) If YES, check if it is the SAME docID.
      2aa) If YES, add 1 to the term frequency tf += 1 for the term and docID pair. 
            Do NOT not add 1 or change the df.  CALC normalized tf,tf-idf
      2bb) If we don't have this term/docID set, add it to the main list and set the tf = 1, df += 1, 
            CALC normalized tf,normalized df,idf,tf-idf
     2b) If the term is NOT yet in the main list AT ALL, add it and this docID, tf = 1, df = 1,
         CALC normalized tf,df,idf,tf-idf
    
    */

    let invertedIndex = []; // main list.
    for (let j = 0; j < thisDocsTokens.length; j++) {
      if (invertedIndex.indexOf(thisDocsTokens[j] === -1)) {
        // the term hasn't been added to the main list yet.

        let newelement = [thisDocsTokens[j]];
          invertedIndex.push(newelement);
      }
    }

    /* make an object with document ID, its tokens, and each token's raw term frequency, 
    tf (not normalized)
    First, make object of each unique term's (token's) value and raw frequency.
    */
    let thisDocsTermsAndFrequencyObj = {};
    let thisDocsTermsAndNormalizedFrequencyObj = {};
    for (let j = 0; j < thisDocsTokens.length; j++) {
      /* build this document's unique term list */
      if (thisDocsTermsAndFrequencyObj.hasOwnProperty(thisDocsTokens[j])) {
        /* This term already exists in this document's term list, so just add 1 to its raw
        term frequency */
        thisDocsTermsAndFrequencyObj[thisDocsTokens[j]] += 1;
      } else {
        /* Add this term with raw term frequency of 1 (so far) because it isn't in this
        document's term list yet */
        thisDocsTermsAndFrequencyObj[thisDocsTokens[j]] = 1;
      }
      /* Compute the normalized term frequency for this term in this document.
      Math.log in JavaScript is the natural log, e, so we need to use Math.log10
      to use base 10 logarithm. */
      thisDocsTermsAndNormalizedFrequencyObj[thisDocsTokens[j]] = Math.log10(
        1 + thisDocsTermsAndFrequencyObj[thisDocsTokens[j]]
      );

      /* add this document's unique terms and its ID to the terms/docIDs/raw document
      frequency (rawdf) array. If the term is already in the array, add 1 to its rawdf
      count. If not, add it to the array with a rawdf count of 1 */
      //if (termsDocIDsAndDocFrequencies.indexOf() > -1) {
      if (
        termsDocIDsAndDocFrequencies.find(x => x.term === thisDocsTokens[j])
      ) {
        /* unique term is already in the array. Add this docID and add 1 to raw df 
        IF this docID isn't already in the docIDs property! */
        termsDocIDsAndDocFrequencies.forEach(termobj => {
          if (termobj.term === thisDocsTokens[j]) {
            /* is this docID, i, already in the term object's docIDs property array? 
            If so, add 1 to the document frequency and this docID to docIDs array */
            if (termobj.docIDs.indexOf(i) === -1) {
              termobj.docIDs.push(i);
              termobj.docs += 1;
              /* N/termobj.docs calculates normalized document frequency N/df */
              termobj.normalizeddf = N / termobj.docs;
              /* calculate the inverse document frequency, idf */
              termobj.idf = Math.log10(N / termobj.docs);
            }
          }
        });
      } else {
        /* need to add this term to the array. Add this docID and set rawdf = 1 */
        let termobj = {
          term: thisDocsTokens[j],
          docIDs: [i],
          docs: 1
        };
        termsDocIDsAndDocFrequencies.push(termobj);
        termobj.normalizeddf = N / termobj.docs;
        /* calculate the inverse document frequency, idf */
        termobj.idf = Math.log10(N / termobj.docs);
      }
    }

    /* the value in the terms key holds unique terms and their raw term frequencies (rawtf) */
    const obj = {
      docID: i,
      tokens: thisDocsTokens,
      terms: thisDocsTermsAndFrequencyObj,
      normalizedtf: thisDocsTermsAndNormalizedFrequencyObj
    };

    docsTokensAndTermFrequencies.push(obj);

    //console.log(thisDocsTermsAndFrequencyObj);
  }

  // we have the raw term frequencies here:
  console.log(docsTokensAndTermFrequencies);

  // we have the raw doc frequencies here:
  console.log(termsDocIDsAndDocFrequencies);

  /* we want to be able to compute the tf-idf */
  /*

0: Object docsTokensAndTermFrequencies
docID: 0
tokens: Array[18]
terms: Object
normalizedtf: Object

0: Object termsDocIDsAndDocFrequencies
term: "Producer"
docIDs: Array[1]
docs: 1
normalizeddf: 10
idf: 1

1) Get each docID (there are 10 in this array)
2) For each, we have its normalizedtf for each of its terms.
3) For each of its terms, look it up in the other array and get its idf.
4) calculate the tf-idf weight and add docID, term, and tf-idf to new object.

SEARCH
find entry in #4's array for a term that has the highest tf-idf for the #1 result, then #2 etc.
If there is more than one word submitted in the search, do it for each.
Add the tf-idfs together to get the final weights to rank the results.

  */
}
