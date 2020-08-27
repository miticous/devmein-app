import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { validate } from '../../services/auth';

const AuthContainer = ({ navigation }) => {
  useEffect(() => {
    AsyncStorage.getItem('@jintou:token')
      .then(token => {
        if (!token) {
          return navigation.replace('Login');
        }
        return validate({ navigation, token });
      })
      .catch(() => navigation.replace('Login'));
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
};

AuthContainer.propTypes = {
  navigation: PropTypes.shape({
    replace: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired
  }).isRequired
};

export default AuthContainer;
