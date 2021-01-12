let questionWordsArray: string[] = [
    `are`,
    `do`,
    `how`,
    `what`,
    `when`,
    `where`,
    `which`,
    `who`,
    `whose`,
    `why`
];

let questionWords = new Set();

questionWordsArray.forEach((word) => {
    questionWords.add(word);
});

export default questionWords;