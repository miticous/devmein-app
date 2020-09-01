import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

const Container = styled.TouchableOpacity`
  height: 56px;
  margin: 20px 0px;
  background-color: ${({ inverted }) => (inverted ? '#75396f' : '#ffffff')};
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
`;
const Label = styled.Text`
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${({ inverted }) => (inverted ? '#ffffff' : '#75396f')};
`;

const DefaultButton = ({ text, action, disabled, inverted }) => (
  <Container onPress={disabled ? false : action} inverted={inverted}>
    <Label inverted={inverted}>{text?.toUpperCase()}</Label>
  </Container>
);

DefaultButton.defaultProps = {
  disabled: false,
  action: () => false,
  inverted: false
};

DefaultButton.propTypes = {
  text: PropTypes.string.isRequired,
  action: PropTypes.func,
  disabled: PropTypes.bool,
  inverted: PropTypes.bool
};

export default DefaultButton;
