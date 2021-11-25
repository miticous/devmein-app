import React from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { TouchableOpacity } from 'react-native';
import { signUp } from '../../services/auth';
import SignUpComponent from '../components/SignUpComponent';
import Icon from '../../assets/components/Icon';

const formInitialSchema = {
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

const SignUpContainer = ({ navigation }) => {
  const formRef = React.useRef();

  yup.setLocale({
    mixed: {
      default: 'Verifique os valores informados',
    },
    string: {
      // eslint-disable-next-line no-template-curly-in-string
      min: 'Deve conter no mínimo ${min} caracteres',
      matches: 'Verifique os valores informados',
    },
  });

  const formSchema = yup.object().shape({
    email: yup.string().email().required('Digite um email válido'),
    password: yup.string().required('Digite uma senha válida').min(6),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password'), 'KASDKOKOSA', 'dkasodokas'])
      .required('É necessário confirmar sua senha'),
  });

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.pop()}
          style={{ paddingHorizontal: 20 }}>
          <Icon name="Back" width={40} height={40} />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <SignUpComponent
      formRef={formRef}
      formLoginSchema={formSchema}
      formLoginInitialSchema={{ ...formInitialSchema }}
      onPressSignUp={async values => signUp({ ...values, navigation })}
      onPressCreate={() => formRef?.current?.submitForm()}
    />
  );
};

SignUpContainer.propTypes = {
  navigation: PropTypes.shape({
    setOptions: PropTypes.func.isRequired,
    pop: PropTypes.func.isRequired,
  }).isRequired,
};

export default SignUpContainer;
