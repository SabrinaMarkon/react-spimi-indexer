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
    thisDocsTokens = eachTokenFilteredArray.filter(function (e) {
      return e === 0 || e;
    });


    ///////////// NEED TO PUT IN CORRECT dfs ///////////////
    let invertedIndex = []; // main list.
    for (let j = 0; j < thisDocsTokens.length; j++) {
      if (invertedIndex.indexOf(thisDocsTokens[j] === -1)) {
        // the term hasn't been added to the main list yet.
        const docID = i;
        const rawtf = 1;
        const tf = Math.log(1 + rawtf);
        const df = 1;
        const idf = Math.log(N/df);
        const tfidf = tf * idf;
        const newelement = [thisDocsTokens[j], docID, rawtf, tf, df, idf, tfidf];
        invertedIndex.push(newelement);
      } else {
        /* the term is already in the invertedIndex array at least once, so we need to find
        out if it is in there with this docID yet */
        const docID = i;
        let found = 0;
        for (let k = 0; k < invertedIndex.length; k++) {
          if (invertedIndex[k][0] === thisDocsTokens[j] && invertedIndex[k][1] === docID) {
            /* update the rawtf and computations for the record */
            const rawtf = invertedIndex[k][2] + 1;
            const tf = Math.log(1 + rawtf);
            const df = 0;
            const idf = Math.log(N/df);
            const tfidf = tf * idf;
            invertedIndex[k][2] = rawtf;
            invertedIndex[k][3] = tf;
            invertedIndex[k][4] = df;
            invertedIndex[k][5] = idf;
            invertedIndex[k][6] = tfidf;
          }
        }
        /* if the term-docID pair wasn't found, add new element. */
        if (found !== 1) {
          // the term hasn't been added to the main list yet.
          const docID = i;
          const rawtf = 1;
          const tf = Math.log(1 + rawtf);
          const df = 0;
          const idf = Math.log(N / df);
          const tfidf = tf * idf;
          const newelement = [thisDocsTokens[j], docID, rawtf, tf, df, idf, tfidf];
          invertedIndex.push(newelement);
        }
      }
    }
  }
}
