import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useField } from 'formik';
import reactotron from 'reactotron-react-native';
import moment from 'moment';
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
  align-items: center;
  flex-direction: row;
  border-radius: 8px;
`;
const InputArea = styled.View`
  flex: 5;
`;
const ButtonArea = styled.TouchableOpacity`
  align-items: flex-end;
  flex: 1;
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
const SugestionArea = styled.ScrollView``;
const SugestionText = styled.Text`
  font-size: 18px;
  line-height: 30px;
`;
const Separator = styled.View`
  height: 1px;
  margin: 10px 0px;
  background-color: ${COLORS.textSecondaryColor};
`;

const onChangeText = ({ field, onChange, text }) => {
  if (field.name === 'birthday') {
    return field.onChange(field.name)(maskedDate(text));
  }
  field.onChange(field.name)(text);
  return onChange(text);
};

const renderSugestions = ({ sugestions, onPressSugestion }) =>
  sugestions.map(sugestion => (
    <TouchableOpacity onPress={() => onPressSugestion(sugestion)}>
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
    sugestions,
    onChange,
    onPressSugestion
  } = props;
  const [isFocused, setIsFocused] = useState(false);
  const [field] = useField(name);

  return (
    <Container>
      <LabelArea>
        <Label>{label}</Label>
        <OptionalInputArea>{optional && <OptionalInput>OPCIONAL</OptionalInput>}</OptionalInputArea>
      </LabelArea>
      <Content borderColor={isFocused ? '#828282' : '#E0E0E0'}>
        <InputArea>
          <RNTextInput
            color={isFocused ? COLORS.black : COLORS.textSecondaryColor}
            onFocus={() => setIsFocused(true)}
            onBlur={() => (sugestions ? false : setIsFocused(false))}
            value={field.value}
            onChangeText={text => onChangeText({ field, onChange, text })}
            placeholder={placeholder}
          />
          {sugestions && isFocused && (
            <SugestionArea>
              <Separator />
              {renderSugestions({ sugestions, onPressSugestion })}
            </SugestionArea>
          )}
        </InputArea>
        {isFocused && !sugestions && (
          <ButtonArea onPress={() => onPressButton(field.name)}>
            <Icon name="Close" width={25} height={25} />
          </ButtonArea>
        )}
      </Content>
    </Container>
  );
};

export default TextInput;
