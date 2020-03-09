import React from 'react';
import { Text, View, TextInput as RNTextInput } from 'react-native';
import { useField } from 'formik';
import reactotron from 'reactotron-react-native';
import moment from 'moment';
import VMasker from 'vanilla-masker';
import { COLORS } from '../styles/colors';

const maskedDate = text => VMasker.toPattern(text, '99/99/9999 99:99');

const TextInput = props => {
  const { centralized, placeholder, textInfo, name } = props;

  const [field, meta, helpers] = useField(name);

  return (
    <>
      <View style={{ paddingHorizontal: 8 }}>
        <RNTextInput
          value={field.value}
          onChangeText={text =>
            field.name === 'birthdate'
              ? field.onChange(field.name)(maskedDate(text))
              : field.onChange(field.name)(text)
          }
          placeholder={placeholder}
          style={{
            textAlign: centralized ? 'center' : 'left',
            borderBottomColor: meta.touched && meta.error ? COLORS.error : COLORS.lightning,
            borderBottomWidth: 3,
            paddingVertical: 10,
            paddingHorizontal: 5,
            fontSize: 20,
            letterSpacing: 0.3,
            color: COLORS.textPrimaryColor,
            fontWeight: 'bold'
          }}
        />
        <Text style={{ color: COLORS.error, fontSize: 12, textAlign: 'center' }}>
          {meta.touched && meta.error}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 14,
          paddingVertical: 10,
          color: COLORS.textSecondaryColor,
          fontWeight: '600'
        }}
      >
        {textInfo}
      </Text>
    </>
  );
};

export default TextInput;
