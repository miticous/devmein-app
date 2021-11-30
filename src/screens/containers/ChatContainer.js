import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useMutation, useQuery, useSubscription } from '@apollo/react-hooks';
import ChatComponent from '../components/ChatComponent';
import DropDownHolder from '../../utils/DropDownHolder';
import { GET_PROFILE, GET_CHAT } from '../../graphQL/query';
import { SEND_MESSAGE } from '../../graphQL/mutation';

import Icon from '../../assets/components/Icon';
import { CHAT_SUB } from '../../graphQL/subscription';

const ChatContainer = ({ navigation, route: { params } }) => {
  const { match } = params;

  const messagesBodyRef = React.useRef();
  const [inputValue, setInputValue] = React.useState('');

  const { data: profileData, profileLoading } = useQuery(GET_PROFILE, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-first',
  });

  const { data, loading: chatLoading } = useQuery(GET_CHAT, {
    variables: {
      matchId: match?._id,
    },
  });
  const [sendMessage, { loading: mutationLoading }] = useMutation(
    SEND_MESSAGE,
    {
      onError: () =>
        DropDownHolder.show('error', '', 'Falha ao enviar/receber mensagens'),
    },
  );

  const { data: subscriptionData } = useSubscription(CHAT_SUB, {
    variables: {
      matchId: match?._id,
    },
  });

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.pop()}
          style={{ paddingHorizontal: 20 }}>
          <Icon name="Back" width={40} height={40} />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <ChatComponent
      loading={mutationLoading || profileLoading || chatLoading}
      userProfile={profileData?.profile}
      matchType={match?.type}
      messages={subscriptionData?.newMessage?.messages || data?.chat?.messages}
      inputValue={inputValue}
      participant={
        subscriptionData?.newMessage?.participant ||
        data?.chat?.participant ||
        match
      }
      onChangeInput={text => setInputValue(text)}
      messagesBodyRef={messagesBodyRef}
      onLayout={() => messagesBodyRef?.current.scrollToEnd({ animated: true })}
      onSubmit={() => {
        sendMessage({
          variables: {
            matchId: match._id,
            message: inputValue,
          },
        });
        setInputValue('');
      }}
    />
  );
};

export default ChatContainer;
