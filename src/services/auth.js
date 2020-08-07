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
      url: 'https://nifty-memory-284816.rj.r.appspot.com/users/login',
      data: {
        email,
        password
      }
    });

    await AsyncStorage.multiSet([['@jintou:token', token], ['@jintou:userId', _id]]);
    if (profileStatus === 'COMPLETED') {
      return navigation.replace('Tabs');
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
      url: 'https://nifty-memory-284816.rj.r.appspot.com/users',
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
    return DropDownHolder.show('error', '', 'Usuario ja existe');
  }
};

export const validate = async ({ navigation, token }) => {
  try {
    const { data } = await axios({
      method: 'get',
      url: 'https://nifty-memory-284816.rj.r.appspot.com/users/auth',
      headers: { Authorization: `Bearer ${token}` }
    });

    if (data === 'COMPLETED') {
      return navigation.replace('Tabs');
    }
    return navigation.replace('CreateProfile');
  } catch (error) {
    return navigation.replace('Login');
  }
};
