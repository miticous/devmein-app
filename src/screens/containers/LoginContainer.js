import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import AsyncStorage from '@react-native-community/async-storage';
import { TouchableOpacity } from 'react-native';
import LoginComponent from '../components/LoginComponent';
import { login } from '../../services/auth';
import Icon from '../../assets/components/Icon';

yup.setLocale({
  mixed: {
    default: 'Verifique os valores informados'
  },
  string: {
    // eslint-disable-next-line no-template-curly-in-string
    min: 'Deve conter no mínimo ${min} caracteres',
    matches: 'Verifique os valores informados'
  }
});

const formLoginSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required('Digite um email válido'),
  password: yup
    .string()
    .min(6)
    .required('Digite uma senha válida')
});

const LoginContainer = ({ navigation }) => {
  const formRef = React.useRef();

  const [rememberPassword, setRememberPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const formLoginInitialSchema = {
    email: '',
    password: ''
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => false} style={{ paddingHorizontal: 20 }}>
          <Icon name="Back" width={40} height={40} />
        </TouchableOpacity>
      )
    });
  }, []);

  useEffect(() => {
    AsyncStorage.clear().then(() => false);
  }, []);

  return (
    <LoginComponent
      formRef={formRef}
      isLoading={isLoading}
      onSubmitForm={async ({ email, password, setFieldError }) =>
        login({ email, password, setFieldError, navigation, setIsLoading })
      }
      onPressLogin={() => formRef?.current?.submitForm()}
      formLoginSchema={formLoginSchema}
      formLoginInitialSchema={formLoginInitialSchema}
      onPressRememberButton={() => setRememberPassword(!rememberPassword)}
      rememberPassword={rememberPassword}
    />
  );
};

LoginContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired
  }).isRequired
};

export default LoginContainer;
