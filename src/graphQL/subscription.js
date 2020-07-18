import gql from 'graphql-tag';

export const CHAT_SUB = gql`
  subscription updateChat {
    updateChat {
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
      }
    }
  }
`;
