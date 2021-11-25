import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import WelcomeImage from '../../assets/images/welcome.png';
import JintouImage from '../../assets/images/jintou.png';
import DefaultButton from '../../assets/components/DefaultButton';

const Container = styled.View`
  flex: 1;
  background-color: white;
`;
const Content = styled.View`
  flex: 1;
  margin-top: 20px;
`;
const Header = styled.View`
  flex: 2;
`;
const Image = styled.Image`
  width: 100%;
  height: 300px;
`;
const AppReference = styled.View`
  align-items: center;
`;
const AppReferenceImage = styled.Image`
  width: 150px;
  height: 80px;
`;
const AppReferenceText = styled.Text`
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  color: #828282;
  padding: 0px 90px;
  text-align: center;
`;
const Body = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0px 20px;
`;

const WelcomeComponent = ({ onPressSignUp, onPressLogin }) => (
  <Container>
    <Content>
      <Body>
        <DefaultButton text="FAZER MEU CADASTRO" inverted action={onPressSignUp} />
        <DefaultButton text="JÁ TENHO UMA CONTA" action={onPressLogin} />
      </Body>
    </Content>
  </Container>
);

WelcomeComponent.propTypes = {
  onPressSignUp: PropTypes.func.isRequired,
  onPressLogin: PropTypes.func.isRequired,
};

export default WelcomeComponent;
