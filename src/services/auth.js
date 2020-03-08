import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import reactotron from 'reactotron-react-native';
import DropDownHolder from '../helpers/DropDownHolder';

export const login = async ({ email, password, navigation, setFieldError, setIsLoading }) => {
  try {
    setIsLoading(true);

    const {
      data: { token, hasProfile, _id }
    } = await axios({
      method: 'post',
      url: 'http://localhost:4000/users/login',
      data: {
        email,
        password
      }
    });

    await AsyncStorage.multiSet([['@jintou:token', token], ['@jintou:userId', _id]]);
    if (hasProfile) {
      return navigation.replace('Home');
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

export const signUp = async ({ name, email, password, navigation }) => {
  try {
    await axios({
      method: 'post',
      url: 'http://localhost:4000/users',
      data: {
        name,
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

    if (data) {
      return navigation.replace('Home');
    }
    return navigation.replace('CreateProfile');
  } catch (error) {
    return navigation.navigate('Login');
  }
};
