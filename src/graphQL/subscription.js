import gql from 'graphql-tag';

export const CHAT_SUB = gql`
  subscription newMessage($matchId: String!) {
    newMessage(matchId: $matchId) {
      _id
      participant {
        _id
        name
        birthday
        images {
          image
        }
      }
      messages {
        _id
        text
        senderId
        receiverId
        sentAt
        viewed
      }
    }
  }
`;
