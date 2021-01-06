const getKeywords: (text: string) => string[] = (text) => {
  let keywords: string[] = text.split(' ');

  return keywords;
}

export default getKeywords;