const getKeywords: (text: string) => string[] = (text) => {
  let keywords: string[] = text.replace('?','').split(' ');
  console.log('muyang:', keywords)

  return keywords;
}

export default getKeywords;