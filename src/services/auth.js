import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import DropDownHolder from '../helpers/DropDownHolder';

export const login = async ({ email, password, navigation, setFieldError, setIsLoading }) => {
  try {
    setIsLoading(true);

    const {
      data: { token, profileStatus, _id }
    } = await axios({
      method: 'post',
      url: 'http://localhost:4000/users/login',
      data: {
        email,
        password
      }
    });

    await AsyncStorage.multiSet([['@jintou:token', token], ['@jintou:userId', _id]]);
    if (profileStatus === 'COMPLETED') {
      return navigation.replace('Love');
    }
    return navigation.replace('CreateProfile');
  } catch ({
    response: {
      data: { error }
    }
  }) {
    setIsLoading(false);
    setFieldError('password', 'Usuário e/ou senha inválidos');
    setFieldError('email', ' ');

    return DropDownHolder.show('error', '', error);
  }
};

export const signUp = async ({ email, password, navigation }) => {
  try {
    await axios({
      method: 'post',
      url: 'http://localhost:4000/users',
      data: {
        email,
        password
      }
    });
    DropDownHolder.show('success', '', 'Usuário criado com sucesso');
    return navigation.navigate('Login');
  } catch ({
    response: {
      data: { error }
    }
  }) {
    return DropDownHolder.show('error', '', error);
  }
};

export const validate = async ({ navigation, token }) => {
  try {
    const { data } = await axios({
      method: 'get',
      url: 'http://localhost:4000/users/auth',
      headers: { Authorization: `Bearer ${token}` }
    });

    if (data === 'COMPLETED') {
      return navigation.replace('Love');
    }
    return navigation.replace('CreateProfile');
  } catch (error) {
    return navigation.navigate('Login');
  }
};
