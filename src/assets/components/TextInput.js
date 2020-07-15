import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { useField } from 'formik';
import styled from 'styled-components/native';
import VMasker from 'vanilla-masker';
import { COLORS } from '../styles/colors';
import Icon from './Icon';

const maskedDate = text => VMasker.toPattern(text, '99/99/9999 99:99');

const Container = styled.View`
  margin: 5px 0px;
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
const RNTextInput = styled.TextInput``;
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
const SugestionArea = styled.View``;
const SugestionText = styled.Text`
  font-size: 18px;
  line-height: 30px;
`;
const Separator = styled.View`
  height: 1px;
  margin: 10px 0px;
  background-color: ${COLORS.textSecondaryColor};
`;

const getBorderColor = ({ error, isFocused }) => {
  if (error) {
    return COLORS.error;
  }
  if (isFocused && !error) {
    return '#828282';
  }
  return '#E0E0E0';
};

const onChangeText = ({ field, onChange, text, timer, setTimer }) => {
  if (field.name === 'birthday') {
    return field.onChange(field.name)(maskedDate(text));
  }

  field.onChange(field.name)(text);

  if (timer) {
    clearTimeout(timer);
  }

  return setTimer(
    setTimeout(() => {
      onChange({ text, inputRef: field.name });
    }, 1000)
  );
};

const renderSugestions = ({ sugestions, onPressSugestion, ref }) =>
  sugestions.map(sugestion => (
    <TouchableOpacity onPress={() => onPressSugestion({ sugestion, ref })} key={sugestion.id}>
      <SugestionText>{sugestion.label}</SugestionText>
    </TouchableOpacity>
  ));

const TextInput = props => {
  const {
    placeholder,
    name,
    onPressButton,
    label,
    optional,
    // sugestions,
    onChange
    // onPressSugestion
  } = props;
  const [isFocused, setIsFocused] = useState(false);
  const [field, meta] = useField(name);
  const [timer, setTimer] = useState(0);

  return (
    <Container>
      <LabelArea>
        <Label>{label}</Label>
        <OptionalInputArea>{optional && <OptionalInput>OPCIONAL</OptionalInput>}</OptionalInputArea>
      </LabelArea>
      <Content borderColor={getBorderColor({ isFocused, error: meta.error })}>
        <InputArea>
          <RNTextInput
            style={{ padding: 5 }}
            color={isFocused ? COLORS.black : COLORS.textSecondaryColor}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            value={field.value}
            onChangeText={text => onChangeText({ field, onChange, text, timer, setTimer })}
            placeholder={placeholder}
          />
          {/* {sugestions?.length > 0 && isFocused && (
            <SugestionArea>
              <Separator />
              {renderSugestions({ sugestions, onPressSugestion, ref: field.name })}
            </SugestionArea>
          )} */}
        </InputArea>
        {isFocused && (
          <ButtonArea onPress={() => onPressButton(field.name)}>
            <Icon name="Close" width={25} height={25} />
          </ButtonArea>
        )}
      </Content>
    </Container>
  );
};

TextInput.defaultProps = {
  onChange: () => false,
  // sugestions: null,
  // onPressSugestion: () => false,
  optional: true,
  placeholder: ''
};

TextInput.propTypes = {
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  onPressButton: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  optional: PropTypes.bool
  // sugestions: PropTypes.arrayOf(PropTypes.shape({})),
  // onPressSugestion: PropTypes.func
};

export default TextInput;
