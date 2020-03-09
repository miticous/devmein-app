import React from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { signUp } from '../../services/auth';
import SignUpComponent from '../components/SignUpComponent';

const formInitialSchema = {
  name: '',
  email: '',
  password: '',
  passwordConfirm: ''
};

const SignUpContainer = ({ navigation }) => {
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

  const formSchema = yup.object().shape({
    email: yup
      .string()
      .email()
      .required('Digite um email válido'),
    password: yup
      .string()
      .required('Digite uma senha válida')
      .min(6),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password'), 'KASDKOKOSA', 'dkasodokas'])
      .required('É necessário confirmar sua senha')
  });

  return (
    <SignUpComponent
      formLoginSchema={formSchema}
      formLoginInitialSchema={{ ...formInitialSchema }}
      onPressSignUp={async values => signUp({ ...values, navigation })}
    />
  );
};

SignUpContainer.propTypes = {
  navigation: PropTypes.shape({}).isRequired
};

export default SignUpContainer;
