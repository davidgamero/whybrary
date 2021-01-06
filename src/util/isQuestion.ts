const questionWords: string[] = [
  'are',
  'do',
  'is',
  'how',
  'what',
  'when',
  'where',
  'which',
  'who',
  'whose',
];

/**
 * Determine if text is a question in a very jank way
 * @param text 
 */
const isQuestion: (text: string) => boolean = (text: string) => {
  if (!text) {
    return false;
  }

  let lowerText: string = text.toLowerCase();
  let tokens: string[] = text.split(' ');

  let firstToken: string = tokens[0];
  let lastToken: string = tokens[tokens.length - 1];

  let startsWithQuestionWord: boolean = questionWords.includes(firstToken);

  // Min length one to avoid `?` messages
  let endsInQuestionMark: boolean = tokens.length > 1 && lastToken === '?';

  return startsWithQuestionWord || endsInQuestionMark;
}

export default isQuestion;