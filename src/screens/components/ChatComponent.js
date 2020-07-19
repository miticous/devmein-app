import React from 'react';
import styled from 'styled-components/native';
import { SCREEN_HEIGHT } from '../../assets/styles';
import { COLORS } from '../../assets/styles/colors';
import IconMatch from '../../assets/components/IconMatch';
import Icon from '../../assets/components/Icon';
import { getUserAge } from '../../helpers/AgeCalculator';

const Container = styled.View`
  flex: 1;
`;
const ContentDetached = styled.View`
  height: 150px;
  background-color: #75396f;
`;
const Content = styled.View`
  background-color: white;
  height: 100%;
`;
const ChatBox = styled.View`
  height: ${SCREEN_HEIGHT * 0.8}px;
  margin: -135px 20px;
  background-color: ${COLORS.white};
  border-radius: 24px;
  box-shadow: 0px 8px 24px rgba(117, 57, 111, 0.24);
`;
const ChatBoxHeader = styled.View`
  height: 100px;
  flex-direction: row;
  padding: 20px;
`;
const ImageArea = styled.View`
  flex: 1.5;
`;
const DetailsArea = styled.View`
  flex: 3;
  justify-content: space-evenly;
`;
const DetailsTitle = styled.Text`
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 18px;
  color: #333333;
`;
const RedirectArea = styled.View`
  flex-direction: row;
  align-items: center;
`;
const RedirectTitle = styled.Text`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 18px;
  color: #828282;
`;
const Separator = styled.View`
  height: 1px;
  margin-top: 30px;
  background-color: #e0e0e0;
`;
const Body = styled.ScrollView``;
const BodyMessage = styled.View`
  background-color: ${({ mySelf }) => (mySelf ? '#EDE0E6' : '#F8F1F8')};
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  border-bottom-right-radius: ${({ mySelf }) => (mySelf ? '0px' : '32px')};
  border-bottom-left-radius: ${({ mySelf }) => (mySelf ? '32px' : '0px')};
  margin: 5px 20px;
  padding: 20px;
`;
const Message = styled.Text`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  text-align: justify;
  color: #000000;
`;
const ViewedArea = styled.View`
  position: absolute;
  right: 0;
  bottom: 0;
`;
const Footer = styled.View`
  height: 60px;
  border-color: #e0e0e0;
  border-width: 1px;
  margin: 15px 20px;
  border-radius: 27px;
  justify-content: center;
  overflow: hidden;
  flex-direction: row;
`;
const TextInput = styled.TextInput`
  padding: 20px;
  width: 100%;
  font-size: 12px;
  line-height: 18px;
  flex: 2;
`;
const Button = styled.TouchableOpacity`
  flex: 0.5;
  justify-content: center;
  align-items: flex-end;
  padding: 10px;
`;

const renderMessages = ({ messages, userProfile, receiverTimedMessage }) =>
  messages?.map(message => {
    const mySelf = message?.senderId === userProfile?._id;

    return (
      <BodyMessage mySelf={mySelf} key={message?._id}>
        <Message>
          {message?.text}
          {receiverTimedMessage === message?._id && 'dasdkaopsk'}
        </Message>
        {message?.viewed && mySelf && (
          <ViewedArea>
            <Message>A</Message>
          </ViewedArea>
        )}
      </BodyMessage>
    );
  });

const ChatComponent = ({
  loading,
  messages,
  userProfile,
  inputValue,
  onChangeInput,
  onSubmit,
  participant,
  matchType,
  messagesBodyRef,
  onLayout,
  receiverTimedMessage
}) => (
  <Container>
    <ContentDetached />
    <Content>
      <ChatBox>
        <ChatBoxHeader>
          <ImageArea>
            <IconMatch
              image={participant?.images?.[0].image || participant?.image}
              iconOne={matchType}
            />
          </ImageArea>
          <DetailsArea>
            <DetailsTitle>
              {participant?.name}, {getUserAge(participant?.birthday)}
            </DetailsTitle>
            <RedirectArea>
              <RedirectTitle>Ver o perfil</RedirectTitle>
              <Icon name="ArrowFoward" with={9} height={13} />
            </RedirectArea>
          </DetailsArea>
        </ChatBoxHeader>
        <Separator />
        <Body
          ref={messagesBodyRef}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={onLayout}
        >
          {renderMessages({ messages, userProfile, receiverTimedMessage })}
        </Body>
        <Footer>
          <TextInput value={inputValue} onChangeText={onChangeInput} />
          <Button onPress={onSubmit} onBlur={onLayout}>
            <Icon name="CircledArrowFoward" width={40} height={40} />
          </Button>
        </Footer>
      </ChatBox>
    </Content>
  </Container>
);

export default ChatComponent;
