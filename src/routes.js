import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native';
import HomeContainer from './screens/containers/HomeContainer';
import AuthContainer from './screens/containers/AuthContainer';
import LoginContainer from './screens/containers/LoginContainer';
import SignUpContainer from './screens/containers/SignUpContainer';
import CreateProfileContainer from './screens/containers/CreateProfileContainer';
import ChatContainer from './screens/containers/ChatContainer';
import MatchesContainer from './screens/containers/MatchesContainer';
import { COLORS } from './assets/styles/colors';

const Stack = createStackNavigator();

const Routes = () => (
  <Stack.Navigator initialRouteName="Auth">
    <Stack.Screen name="Auth" component={AuthContainer} options={{ headerShown: false }} />
    <Stack.Screen
      name="Login"
      component={LoginContainer}
      options={{ headerLeft: false, headerShown: false }}
    />
    <Stack.Screen
      name="SignUp"
      component={SignUpContainer}
      options={{
        title: 'Criar conta',
        headerBackTitleVisible: false,
        headerTintColor: COLORS.primaryColor
      }}
    />
    <Stack.Screen
      name="CreateProfile"
      component={CreateProfileContainer}
      options={{ title: 'Profile' }}
    />
    <Stack.Screen
      name="Home"
      component={HomeContainer}
      options={({ navigation }) => ({
        title: 'Home',
        headerRight: () => <Button onPress={() => navigation.navigate('Matches')} title="Matches" />
      })}
    />
    <Stack.Screen name="Chat" component={ChatContainer} options={{ title: 'Chat' }} />
    <Stack.Screen name="Matches" component={MatchesContainer} options={{ title: 'Matches' }} />
  </Stack.Navigator>
);

export default Routes;
