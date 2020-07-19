import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import IconMatch from './IconMatch';
import Icon from './Icon';

const Container = styled.TouchableOpacity`
  height: 65px;
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
`;
const Content = styled.View`
  height: 100%;
  flex-direction: row;
  padding: 0px 20px;
`;
const Left = styled.View`
  justify-content: center;
  flex: 0.7;
`;
const Middle = styled.View`
  flex: 3;
  justify-content: space-around;
`;
const Right = styled.View`
  flex: 0.6;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;
const Title = styled.Text`
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
`;
const SubTitle = styled.Text`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: #828282;
`;
const IconRight = styled.View``;
const NotificationBadge = styled.View`
  justify-content: center;
  background-color: red;
  width: 20px;
  height: 20px;
  margin: 0px 5px;
  border-radius: 100px;
`;
const NotificationBadgeText = styled.Text`
  text-align: center;
  color: white;
`;

const ChatCard = ({ image, title, subtitle, warns, onPress }) => (
  <Container onPress={onPress}>
    <Content>
      <Left>
        <IconMatch size={40} iconOne="LOVE" iconTwo small image={image} />
      </Left>
      <Middle>
        <Title>{title}</Title>
        <SubTitle>{subtitle}</SubTitle>
      </Middle>
      <Right>
        {warns && (
          <NotificationBadge>
            <NotificationBadgeText>{warns}</NotificationBadgeText>
          </NotificationBadge>
        )}
        <IconRight>
          <Icon name="ArrowFowardNoCircle" width={7} height={12} />
        </IconRight>
      </Right>
    </Content>
  </Container>
);

export default ChatCard;
