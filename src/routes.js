import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeContainer from './screens/containers/HomeContainer';
import AuthContainer from './screens/containers/AuthContainer';
import LoginContainer from './screens/containers/LoginContainer';
import SignUpContainer from './screens/containers/SignUpContainer';
import CreateProfileContainer from './screens/containers/CreateProfileContainer';
import ChatContainer from './screens/containers/ChatContainer';

const Stack = createStackNavigator();

const Routes = () => (
  <Stack.Navigator initialRouteName="Auth">
    <Stack.Screen name="Auth" component={AuthContainer} options={{ headerShown: false }} />
    <Stack.Screen name="Login" component={LoginContainer} options={{ headerLeft: false }} />
    <Stack.Screen name="SignUp" component={SignUpContainer} options={{ title: 'SignUp' }} />
    <Stack.Screen
      name="CreateProfile"
      component={CreateProfileContainer}
      options={{ title: 'Profile' }}
    />
    <Stack.Screen name="Home" component={HomeContainer} options={{ title: 'Home' }} />
    <Stack.Screen name="Chat" component={ChatContainer} options={{ title: 'Chat' }} />
  </Stack.Navigator>
);

export default Routes;
