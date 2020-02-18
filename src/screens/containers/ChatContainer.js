import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import AsyncStorage from '@react-native-community/async-storage';
import reactotron from 'reactotron-react-native';
import ChatComponent from '../components/ChatComponent';
import DropDownHolder from '../../helpers/DropDownHolder';

const GET_CHAT = gql`
  query GET_CHAT($targetUserId: String) {
    chat(targetUserId: $targetUserId) {
      participants {
        _id
        name
      }
      messages {
        _id
        text
        sender_id
        receiver_id
        sentAt
      }
    }
  }
`;
const SEND_MESSAGE = gql`
  mutation($targetUserId: String, $message: String) {
    sendMessage(targetUserId: $targetUserId, message: $message) {
      participants {
        _id
        name
      }
      messages {
        _id
        text
        sender_id
        receiver_id
        sentAt
      }
    }
  }
`;

const ChatContainer = ({ navigation }) => {
  const [state, setState] = useState({});

  const { loading, error, data } = useQuery(GET_CHAT, {
    onCompleted: () => setState({ ...state, ...data }),
    variables: {
      targetUserId: '5e4b9a07b7ed304118ae2372'
    },
    pollInterval: 10000
  });
  const [sendMessage, { loading: mutationLoading }] = useMutation(SEND_MESSAGE, {
    onError: () => DropDownHolder.show('error', '', 'Falha ao enviar/receber mensagens'),
    refetchQueries: [{ query: GET_CHAT, variables: { targetUserId: '5e4b9a07b7ed304118ae2372' } }]
  });

  useEffect(() => {
    AsyncStorage.getItem('@jintou:userId').then(res => {
      setState({ ...state, userId: res });
    });
  }, []);

  const { chat, userId } = state;
  const { name } = chat ? chat.participants.find(participant => participant._id !== userId) : '';

  return (
    <ChatComponent
      loading={mutationLoading}
      participant={name}
      messages={chat && chat.messages}
      userId={userId}
      inputValue={state.inputValue}
      onChangeInput={text => setState({ ...state, inputValue: text })}
      onSubmit={() => {
        sendMessage({
          variables: {
            targetUserId: '5e4b9a07b7ed304118ae2372',
            message: state.inputValue
          }
        });
        setState({ ...state, inputValue: '' });
      }}
    />
  );
};

export default ChatContainer;
