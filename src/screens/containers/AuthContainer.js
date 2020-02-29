import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import reactotron from 'reactotron-react-native';
import { validate } from '../../services/auth';

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
        return validate({ navigation, token });
      })
      .catch(() => navigation.navigate('Login'));
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default AuthContainer;
