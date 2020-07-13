import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { COLORS } from '../styles/colors';

const Container = styled.TouchableOpacity`
  height: 56px;
  margin: 20px 0px;
  background: #ffffff;
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
  color: #75396f;
`;

const DefaultButton = ({ text, action, disabled }) => (
  <Container onPress={disabled ? false : action}>
    <Label>{text.toUpperCase()}</Label>
  </Container>
);

DefaultButton.defaultProps = {
  disabled: false,
  buttonLoading: false,
  action: () => false
};

DefaultButton.propTypes = {
  text: PropTypes.string.isRequired,
  action: PropTypes.func,
  disabled: PropTypes.bool,
  buttonLoading: PropTypes.bool
};

export default DefaultButton;
