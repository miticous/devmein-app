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
import ProfileContainer from './screens/containers/ProfileContainer';
import ConfigsContainer from './screens/containers/ConfigsContainer';
import GenreSelectionContainer from './screens/containers/GenreSelectionContainer';
import { headerTitleStyle, headerStyle } from './assets/styles';
import ProfileEditionContainer from './screens/containers/ProfileEditionContainer';

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
      options={{
        title: 'CADASTRO',
        headerStyle,
        headerTitleStyle
      }}
    />
    <Stack.Screen
      name="Profile"
      component={ProfileContainer}
      options={{
        title: 'SEU PERFIL',
        headerStyle,
        headerTitleStyle
      }}
    />
    <Stack.Screen
      name="ProfileEdition"
      component={ProfileEditionContainer}
      options={{
        title: 'EDITAR PERFIL',
        headerStyle,
        headerTitleStyle
      }}
    />
    <Stack.Screen
      name="Home"
      component={HomeContainer}
      options={({ navigation }) => ({
        title: 'Home',
        headerRight: () => <Button onPress={() => navigation.pop()} title="Matches" />,
        headerLeft: () => <Button onPress={() => navigation.navigate('Profile')} title="Perfil" />
      })}
    />
    <Stack.Screen name="Chat" component={ChatContainer} options={{ title: 'Chat' }} />
    <Stack.Screen name="Matches" component={MatchesContainer} options={{ title: 'Matches' }} />
  </Stack.Navigator>
);

export default Routes;
