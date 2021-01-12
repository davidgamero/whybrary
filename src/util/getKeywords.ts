import stopwords from './stopWords'

const getKeywords: (text: string) => string[] = (text) => {
  // TODO use a tokenizer instead of `split(' ')`

  // Regular expresseion for removing question mark, then split on spaces to tokenize
  let tokens: string[] = text.replace('?', '').split(' ');

  // Filter for words that do not appear in the stopWords Set
  let keywords: string[] = tokens.filter((token) =>
    !stopwords.has(token)
  )

  return keywords;
}

export default getKeywords;