import React from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';
import { not, isEmpty } from 'ramda';
import reactotron from 'reactotron-react-native';
import { useField } from 'formik';
import { COLORS } from '../styles/colors';

const Container = styled.TouchableOpacity`
  border-radius: 23px;
  border-color: ${COLORS.primaryColor};
  background-color: ${({ active }) => (active ? COLORS.primaryColor : COLORS.white)};
  border-width: 2px;
  overflow: hidden;
  margin: 8px 0px;
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
  color: ${({ active }) => (active ? COLORS.white : COLORS.primaryColor)};
  font-weight: bold;
  letter-spacing: 3px;
`;

const renderOptions = ({ options, activeId, onSelect }) => {
  if (not(isEmpty(options))) {
    return options.map(option => {
      const { label, id } = option;
      const isActive = activeId === id;

      return (
        <Container active={isActive} onPress={() => onSelect(id)} key={id}>
          <Content>
            <Label active={isActive}>{label}</Label>
          </Content>
        </Container>
      );
    });
  }
  return false;
};

const ButtonPicker = ({ options, name, ...props }) => {
  const [field, , helpers] = useField(name);
  reactotron.log(props);
  return (
    <View>
      {renderOptions({
        options,
        activeId: field.value,
        onSelect: value => helpers.setValue(value)
      })}
    </View>
  );
};

export default ButtonPicker;
