import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { CommonActions } from '@react-navigation/native';
import Config from 'react-native-config';

import DropDownHolder from '../helpers/DropDownHolder';

export const logout = async ({ navigation }) => {
  try {
    await AsyncStorage.removeItem('@jintou:token');

    return navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Welcome' }],
      }),
    );
  } catch (error) {
    return DropDownHolder.show('error', '', 'Erro desconhecido');
  }
};

export const login = async ({
  email,
  password,
  navigation,
  setFieldError,
  setIsLoading,
}) => {
  try {
    setIsLoading(true);

    const {
      data: { token, profileStatus, _id },
    } = await axios({
      method: 'post',
      url: `${Config.API_BASE_URL}/users/login`,
      data: {
        email,
        password,
      },
    });

    await AsyncStorage.multiSet([
      ['@jintou:token', token],
      ['@jintou:userId', _id],
    ]);
    if (profileStatus === 'COMPLETED') {
      return navigation.replace('Tabs');
    }
    return navigation.replace('CreateProfile');
  } catch ({
    response: {
      data: { error },
    },
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
      url: `${Config.API_BASE_URL}/users`,
      data: {
        email,
        password,
      },
    });
    DropDownHolder.show('success', '', 'Usuário criado com sucesso');
    return navigation.replace('Login');
  } catch ({
    response: {
      data: { error },
    },
  }) {
    return DropDownHolder.show('error', '', 'Usuario ja existe');
  }
};

export const validate = async ({ navigation, token }) => {
  try {
    const { data } = await axios({
      method: 'get',
      url: `${Config.API_BASE_URL}/users/auth`,
      headers: { Authorization: `Bearer ${token}` },
    });

    if (data === 'COMPLETED') {
      return navigation.replace('Tabs');
    }
    return navigation.replace('CreateProfile');
  } catch (error) {
    return logout({ navigation });
  }
};
