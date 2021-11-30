import React from 'react';
import Auth0 from 'react-native-auth0';
import Config from 'react-native-config';
import jwtDecode from 'jwt-decode';
import { common } from 'utils/common';
import { JwtToken } from 'types/common';
import WelcomeComponent from '../../components/Welcome';

const doLogin = async () => {
  const auth0 = new Auth0({
    domain: Config.AUTH0_HOST,
    clientId: Config.AUTH0_CLIENT_ID,
  });

  const data = await auth0.webAuth.authorize({
    scope: 'openid profile email',
    connection: 'github',
  });

  const _data = jwtDecode<JwtToken>(data.idToken);
  const normalizedData = common.prettifyObjectKeys<JwtToken>(_data);

  console.tron.log(normalizedData);

  // auth0.webAuth
  //   .clearSession({})
  //   .then(success => {
  //     Alert.alert('Logged out!');
  //   })
  //   .catch(error => {
  //     console.log('Log out cancelled');
  //   });
};

const WelcomeContainer = ({ navigation }) => {
  return <WelcomeComponent onPressSignUp={() => doLogin()} />;
};

export default WelcomeContainer;
