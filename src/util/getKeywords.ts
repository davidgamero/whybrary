let excludeWords = {
  are: '',
  do: '',
  how: '',
  what: '',
  when: '',
  where: '',
  which: '',
  who: '',
  whose: '',
  why: ''
}
// regular expression + replace for question mark removal. Noticed that I did not include 'is', as it will remove words like 'list' or any meaningful words.
var re = new RegExp(Object.keys(excludeWords).join("|"),"gi");
const getKeywords: (text: string) => string[] = (text) => {
  let keywords: string[] = text.replace('?','').replace(re, '').split(' ');
  for (let i = keywords.length - 1; i >= 0; i--) {
    if (!keywords[i]) { 
        // remove the leading empty element after split
        keywords.splice(i, 1);
    }
}

  return keywords;
}

export default getKeywords;