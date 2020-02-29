import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';
import { COLORS } from '../styles/colors';

const Container = styled.TouchableOpacity`
  border-radius: 23px;
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
`;
const cancelButtonStyle = {
  backgroundColor: COLORS.white,
  borderWidth: 1,
  borderColor: COLORS.secondaryColor
};

const Button = ({
  text,
  action,
  buttonStyle,
  textStyle,
  color,
  cancelStyle,
  buttonLoading,
  disabled
}) => (
  <Container
    onPress={disabled ? null : action}
    style={[
      { ...buttonStyle },
      cancelStyle && cancelButtonStyle,
      !cancelStyle && { backgroundColor: color }
    ]}
  >
    <Content>
      {buttonLoading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Label
          style={[
            { ...textStyle, color: !disabled ? COLORS.white : COLORS.textSecondaryColor },
            cancelStyle ? { color: COLORS.secondaryColor } : null
          ]}
        >
          {text}
        </Label>
      )}
    </Content>
  </Container>
);

Button.defaultProps = {
  buttonStyle: {},
  textStyle: {},
  color: '#8A8A8A',
  cancelStyle: false,
  disabled: false,
  buttonLoading: false,
  action: () => false
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  action: PropTypes.func,
  buttonStyle: PropTypes.shape({}),
  textStyle: PropTypes.shape({}),
  color: PropTypes.string,
  cancelStyle: PropTypes.bool,
  disabled: PropTypes.bool,
  buttonLoading: PropTypes.bool
};

export default Button;
