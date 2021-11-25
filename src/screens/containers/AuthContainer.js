import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { CommonActions } from '@react-navigation/native';
import { validate, logout } from '../../services/auth';
import ModalLoading from '../../assets/components/ModalLoading';

const AuthContainer = ({ navigation }) => {
  useEffect(() => {
    AsyncStorage.getItem('@jintou:token')
      .then(token => {
        if (!token) {
          return navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Welcome' }],
            }),
          );
        }
        return validate({ navigation, token });
      })
      .catch(() => logout({ navigation }));
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ModalLoading />
    </View>
  );
};

AuthContainer.propTypes = {
  navigation: PropTypes.shape({
    replace: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
};

export default AuthContainer;
