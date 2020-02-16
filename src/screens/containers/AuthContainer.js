import React, { useEffect } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import reactotron from 'reactotron-react-native';

const AuthContainer = ({ navigation }) => {
  useEffect(() => {
    // AsyncStorage.removeItem('@jintou:token')
    //   .then(() => false)
    //   .catch(() => false);
    AsyncStorage.getItem('@jintou:token')
      .then(token => {
        if (!token) {
          return navigation.replace('Login');
        }
        return navigation.replace('CreateProfile');
      })
      .catch(() => navigation.navigate('Login'));
  }, []);

  return <View />;
};

export default AuthContainer;
