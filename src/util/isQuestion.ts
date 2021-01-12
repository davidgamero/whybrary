import questionWords from './questionWords'

/**
 * Determine if text is a question in a very jank way
 * @param text 
 */
const isQuestion: (text: string) => boolean = (text: string) => {
  if (!text) {
    return false;
  }

  let tokens: string[] = text.toLowerCase().split(' ');

  let firstToken: string = tokens[0];
  let lastChar: string = text[text.length - 1];

  let startsWithQuestionWord: boolean = questionWords.has(firstToken);

  // Min length one to avoid `?` messages
  let endsInQuestionMark: boolean = tokens.length > 1 && lastChar === '?';

  return startsWithQuestionWord || endsInQuestionMark;
}

export default isQuestion;