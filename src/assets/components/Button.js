import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../styles/colors';

const Container = styled.TouchableOpacity`
  border-radius: 23px;
  overflow: hidden;
`;
const Content = styled.View`
  justify-content: center;
  align-items: center;
  padding: 10px;
`;
const Label = styled.Text`
  height: 22px;
  font-size: 16px;
  letter-spacing: -0.3px;
  line-height: 22px;
  text-align: center;
  color: ${colors.white};
  font-weight: bold;
  letter-spacing: 3px;
`;

const Button = ({ text, action, buttonLoading, disabled }) => (
  <Container onPress={disabled ? null : action}>
    <LinearGradient
      start={{ x: 0.0, y: 0.5 }}
      end={{ x: 0.8, y: 1.0 }}
      colors={[
        colors.primaryColor,
        colors.secondaryColor,
        colors.tertiaryColor,
      ]}>
      <Content>
        {buttonLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Label>{text.toUpperCase()}</Label>
        )}
      </Content>
    </LinearGradient>
  </Container>
);

Button.defaultProps = {
  disabled: false,
  buttonLoading: false,
  action: () => false,
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  action: PropTypes.func,
  disabled: PropTypes.bool,
  buttonLoading: PropTypes.bool,
};

export default Button;
