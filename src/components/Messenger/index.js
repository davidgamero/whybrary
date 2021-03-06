import styled from 'styled-components';
import MessageBubbleRow from '../MessageBubbleRow';
import MessageInput from '../MessageInput';
import { useState, useEffect, useRef } from 'react';
import { firebase } from '@firebase/app';
import isQuestion from '../../util/isQuestion';
import getKeywords from '../../util/getKeywords';
import { useListVals } from 'react-firebase-hooks/database';

const MessengerFrame = styled.div`
background-color: #302c30;
max-width: 700px;
width: 100%;
justify-content: center;
justify-items: center;
height: 100vh;
display: flex;
flex-direction: column;
`;

// Show messages in top portion of Messenger with most recent at bottom, and scrolling up
const MessageRowsFrame = styled.div`
overflow-y: scroll;
display: flex;
flex-direction: column-reverse;
height: 70vh;
`

// Extra wrapper to preserve order of messages instead of flipping them
const MessageRowsContainer = styled.div`
`

const InputContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
padding-bottom: 10vh;
`

function Messenger({ me }) {
  const channel = 'general';

  const messagePath = `messages/${channel}`;
  const suggestionPath = `suggestions/${channel}`;

  const [suggestedQA, setSuggestedQA] = useState();
  const [dbmessages, dbmessagesLoading,] = useListVals(firebase.database().ref(messagePath));
  const [suggestions, ,] = useListVals(firebase.database().ref(suggestionPath));

  // Mutation runner since FirebaseDatabaseMutation was breaking state rerendering props
  // sourced from https://github.com/rakannimer/react-firebase/blob/master/modules/database/src/components/FirebaseDatabaseMutation.tsx
  // issue documented at https://github.com/rakannimer/react-firebase/issues/14
  const pushMessage = (newMessage) => {
    const messageRef = firebase
      .app()
      .database()
      .ref(messagePath);

    const suggestionRef = firebase
      .app()
      .database()
      .ref(suggestionPath);

    let lastMessage = dbmessages[dbmessages.length - 1];
    console.log(lastMessage);

    console.log(`last message was question: ${lastMessage && isQuestion(lastMessage.text)}`);
    console.log(`new message is question: ${newMessage && isQuestion(newMessage.text)}`);

    // Generate suggestion if a non-question is sent after a question
    if (lastMessage && isQuestion(lastMessage.text) && !isQuestion(newMessage.text)) {
      let question = lastMessage;
      let answer = newMessage;

      let newSuggestion = {
        keywords: getKeywords(lastMessage.text),
        question: question.text,
        response: answer.text,
        responseAuthor: answer.author,
        responseTimestamp: answer.created_on
      };

      console.log('pushed new suggestion');
      console.log(newSuggestion);
      suggestionRef.push(newSuggestion);
    }

    setSuggestedQA(); // Blank the suggested QA
    return messageRef.push(newMessage);
  }

  const textChange = (newVal) => {
    let text = newVal.target.value;

    // Clean the question text
    text = text.replace(/\?/, '');
    text = text.toLowerCase();

    let words = text.split(' ');

    let suggestionRanks = suggestions.map((s) => {
      let score = 0;

      if (!s.keywords) {
        console.log('No keywords on suggestion:');
        return 0;
      }

      words.forEach((w) => {
        if (s.keywords.includes(w)) score += 1;
      })

      return score;
    })


    let iMaxScore = suggestionRanks.indexOf(Math.max(...suggestionRanks));

    if (suggestionRanks[iMaxScore] > 0) {
      // Non zero best match
      console.log(suggestionRanks);
      setSuggestedQA(suggestions[iMaxScore]);
    } else {
      setSuggestedQA(undefined);
    }
  }

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [dbmessages]);

  return (
    <MessengerFrame>
      <MessageRowsFrame>
        <MessageRowsContainer>
          {
            dbmessagesLoading ?
              <p>Loading Messages...</p>
              :
              dbmessages.map(
                (message, i) => {
                  // Return a MessageBubbleRow for each object in the dbmessages array
                  return <MessageBubbleRow
                    key={i}
                    message={message}
                    outgoing={message.author ? message.author === me : false} />
                }
              )
          }
          <div ref={messagesEndRef} />
        </MessageRowsContainer>
      </MessageRowsFrame>

      <InputContainer InputContainer >
        <MessageInput
          onChange={textChange}
          suggestedQA={suggestedQA}
          pushMessage={pushMessage}
          me={me}
        />
      </InputContainer>
    </MessengerFrame >
  );
}

export default Messenger;