import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import styled from 'styled-components/native';
import VMasker from 'vanilla-masker';
import { COLORS } from '../styles/colors';
import Icon from './Icon';

const maskedDate = (text) => VMasker.toPattern(text, '99/99/9999');
const maskedTime = (text) => VMasker.toPattern(text, '99:99');

const Container = styled.View`
  margin: 5px 1px;
`;
const Content = styled.View`
  background-color: ${COLORS.white};
  padding: 10px;
  min-height: 50px;
  border-width: 1px;
  border-radius: 8px;
`;
const InputArea = styled.View``;
const ButtonArea = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
  top: 10px;
`;
const RNTextInput = styled.TextInput`
  color: ${({ isFocused }) => (isFocused ? COLORS.black : COLORS.textSecondaryColor)};
`;
const LabelArea = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Label = styled.Text`
  line-height: 35px;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
`;
const OptionalInputArea = styled.View`
  flex: 1;
  align-items: flex-end;
`;
const OptionalInput = styled.Text`
  font-weight: bold;
  font-size: 10px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #c4c4c4;
`;

const getBorderColor = ({ error, isFocused, touched }) => {
  if (error && (touched || isFocused)) {
    return COLORS.error;
  }
  if (isFocused && !error) {
    return '#828282';
  }
  return '#E0E0E0';
};

const onChangeText = ({ field, onChange, text, timer, setTimer }) => {
  if (field.name === 'birthdate') {
    return field.onChange(field.name)(maskedDate(text));
  }

  if (field.name === 'birthtime') {
    return field.onChange(field.name)(maskedTime(text));
  }

  if (field.name === 'email' || field.name === 'password' || field.name === 'confirmPassword') {
    return field.onChange(field.name)(text.replace(/\s/g, ''));
  }

  field.onChange(field.name)(text);

  if (timer) {
    clearTimeout(timer);
  }

  return setTimer(
    setTimeout(() => {
      onChange({ text, inputRef: field.name });
    }, 1000),
  );
};

const TextInput = (props) => {
  const {
    placeholder,
    name,
    onPressButton,
    label,
    optional,
    onChange,
    containerStyle,
    textType,
    keyboardType,
    buttonType,
    secure,
  } = props;
  const [isFocused, setIsFocused] = useState(false);
  const [field, meta, helpers] = useField(name);
  const [timer, setTimer] = useState(0);

  return (
    <Container style={containerStyle}>
      <LabelArea>
        <Label>{label}</Label>
        <OptionalInputArea>{optional && <OptionalInput>OPCIONAL</OptionalInput>}</OptionalInputArea>
      </LabelArea>
      <Content
        borderColor={getBorderColor({ isFocused, error: meta.error, touched: meta?.touched })}
      >
        <InputArea>
          <RNTextInput
            style={{ padding: 5 }}
            isFocused={isFocused}
            onFocus={() => setIsFocused(true)}
            onBlur={() => [setIsFocused(false), helpers?.setTouched(field?.name)]}
            value={field.value}
            secureTextEntry={secure}
            textContentType={textType}
            keyboardType={keyboardType}
            onChangeText={(text) => onChangeText({ field, onChange, text, timer, setTimer })}
            placeholder={placeholder}
          />
        </InputArea>
        {isFocused && onPressButton && (
          <ButtonArea onPress={() => onPressButton(field.name)}>
            <Icon name={buttonType} width={25} height={25} />
          </ButtonArea>
        )}
      </Content>
    </Container>
  );
};

TextInput.defaultProps = {
  onChange: () => false,
  optional: true,
  placeholder: '',
  buttonType: 'Close',
  containerStyle: null,
  textType: null,
  keyboardType: null,
  secure: false,
};

TextInput.propTypes = {
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  onPressButton: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  optional: PropTypes.bool,
  buttonType: PropTypes.string,
  containerStyle: PropTypes.shape({}),
  textType: PropTypes.string,
  keyboardType: PropTypes.string,
  secure: PropTypes.bool,
};

export default TextInput;
