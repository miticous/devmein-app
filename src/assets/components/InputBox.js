import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { TextInputMask } from 'react-native-masked-text';
import Icon from './Icon';
import { COLORS } from '../styles/colors';

const getInputColor = ({ error, valid }) => {
  if (error) {
    return '2px solid #D50000';
  }
  if (valid) {
    return '2px solid #18BB66';
  }
  return '1px solid rgba(143,143,143,0.4)';
};

const Container = styled.View`
  margin: 15px 0px;
  position: relative;
`;
const InputContainer = styled.View`
  border: ${({ error, valid }) => getInputColor({ error, valid })};
  border-radius: 4px;
  padding: ${({ large }) => (large ? '16px 12px' : '9px 12px')};
  background-color: #ffffff;
  min-height: ${({ height }) => height || 0};
`;
const Content = styled.View``;
const InputContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Label = styled.Text`
  font-size: 12px;
  line-height: 16px;
  color: ${({ error }) => (error ? '#D50000' : '#8F8F8F')};
`;
const Value = styled.TextInput`
  font-size: 16px;
  letter-spacing: -0.3px;
  line-height: 22px;
  color: #444444;
`;
const ErrorMessage = styled.Text`
  position: absolute;
  bottom: -18px;
  font-size: 12px;
  color: #d50000;
  letter-spacing: -0.2px;
  line-height: 16px;
  margin-left: 15px;
`;
const LabelValueArea = styled.View`
  flex: 4;
  height: 40;
  justify-content: center;
`;
const IconArea = styled.TouchableOpacity`
  flex: 0.5;
  align-items: flex-end;
`;
const styledInput = {
  fontSize: 20,
  letterSpacing: -0.3,
  lineHeight: 22,
  color: COLORS.textPrimaryColor
};

const InputBox = ({
  label,
  value,
  onType,
  onFocusOut,
  hasError,
  errorMessage,
  mask,
  height,
  isValid,
  secure,
  placeholder,
  showLabel,
  returnKeyType,
  onSubmitEditing,
  large,
  onPressIcon,
  icon,
  editable,
  keyboardType,
  autoCompleteType,
  textContentType
}) => (
  <Container>
    <InputContainer error={hasError} valid={isValid} height={height}>
      <Content>
        <InputContent large={large}>
          <LabelValueArea showLabel={showLabel} height={height}>
            {showLabel ? <Label error={hasError}>{label}</Label> : false}
            {mask ? (
              <TextInputMask
                style={styledInput}
                type="custom"
                value={value}
                keyboardType={keyboardType}
                onChangeText={onType}
                onBlur={onFocusOut}
                returnKeyType={returnKeyType}
                editable={editable}
                options={{
                  mask
                }}
                placeholder={placeholder}
                onSubmitEditing={onSubmitEditing}
              />
            ) : (
              <Value
                autoCompleteType={autoCompleteType}
                textContentType={textContentType}
                value={value}
                style={styledInput}
                keyboardType={keyboardType}
                onChangeText={onType}
                onBlur={onFocusOut}
                returnKeyType={returnKeyType}
                secureTextEntry={secure}
                placeholder={placeholder}
                editable={editable}
                onSubmitEditing={onSubmitEditing}
              />
            )}
          </LabelValueArea>
          <IconArea onPress={onPressIcon} id="InputBox-Icon">
            {icon ? <Icon name={icon} width={16} height={16} /> : <></>}
          </IconArea>
        </InputContent>
      </Content>
    </InputContainer>
    {hasError && errorMessage && errorMessage.length > 2 && (
      <ErrorMessage testID="error-message">{errorMessage}</ErrorMessage>
    )}
  </Container>
);

InputBox.defaultProps = {
  mask: null,
  hasError: false,
  errorMessage: '',
  isValid: false,
  height: null,
  secure: false,
  placeholder: '',
  returnKeyType: '',
  showLabel: true,
  large: false,
  onPressIcon: () => false,
  onSubmitEditing: () => false,
  icon: null,
  editable: true,
  keyboardType: 'default',
  autoCompleteType: undefined,
  textContentType: undefined
};

InputBox.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onType: PropTypes.func.isRequired,
  onFocusOut: PropTypes.func.isRequired,
  hasError: PropTypes.bool,
  height: PropTypes.number,
  returnKeyType: PropTypes.string,
  errorMessage: PropTypes.string,
  mask: PropTypes.string,
  isValid: PropTypes.bool,
  secure: PropTypes.bool,
  placeholder: PropTypes.string,
  showLabel: PropTypes.bool,
  large: PropTypes.bool,
  onPressIcon: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  icon: PropTypes.string,
  editable: PropTypes.bool,
  keyboardType: PropTypes.string,
  autoCompleteType: PropTypes.string,
  textContentType: PropTypes.string
};

export default InputBox;
