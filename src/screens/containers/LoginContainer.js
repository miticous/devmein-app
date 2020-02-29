import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { not } from 'ramda';
import AsyncStorage from '@react-native-community/async-storage';
import reactotron from 'reactotron-react-native';
import LoginComponent from '../components/LoginComponent';
import { login } from '../../services/auth';

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
    .required('Digite uma senha válida')
    .min(6)
});

const LoginContainer = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  reactotron.log(navigation);
  const formLoginInitialSchema = {
    email: 'murilo@gmail.com',
    password: '123123'
  };

  useEffect(() => {
    AsyncStorage.clear().then(() => false);
  }, []);

  return (
    <LoginComponent
      isLoading={isLoading}
      onPressLogin={async ({ email, password, setFieldError }) =>
        login({ email, password, setFieldError, navigation, setIsLoading })
      }
      formLoginSchema={formLoginSchema}
      formLoginInitialSchema={formLoginInitialSchema}
      showPassword={showPassword}
      onPressSingUp={() => navigation.navigate('SignUp')}
      // onPressRecoverButton={() => navigation.navigate('ForgotPassword')}
      onPressEyeIcon={() => setShowPassword(not(showPassword))}
    />
  );
};

LoginContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

export default LoginContainer;
