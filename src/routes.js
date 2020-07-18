/* eslint-disable react/prop-types */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfilesContainer from './screens/containers/ProfilesContainer';
import AuthContainer from './screens/containers/AuthContainer';
import LoginContainer from './screens/containers/LoginContainer';
import SignUpContainer from './screens/containers/SignUpContainer';
import CreateProfileContainer from './screens/containers/CreateProfileContainer';
import { COLORS } from './assets/styles/colors';
import ProfileContainer from './screens/containers/ProfileContainer';
import { headerTitleStyle, headerStyle, bottomTabBar } from './assets/styles';
import ProfileEditionContainer from './screens/containers/ProfileEditionContainer';
import TabIcon from './assets/components/TabIcon';
import HomeContainer from './screens/containers/HomeContainer';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Tabs = () => (
  <Tab.Navigator
    initialRouteName="Home"
    tabBarOptions={{
      style: bottomTabBar.style,
      tabStyle: bottomTabBar.tabStyle,
      labelStyle: bottomTabBar.labelStyle
    }}
  >
    <Tab.Screen
      name="Love"
      component={ProfilesContainer}
      initialParams={{ searchType: 'LOVE' }}
      options={{
        tabBarIcon: ({ focused }) => (
          <TabIcon
            focused={focused}
            icon="Love"
            label="Amor"
            backgroundColor="#ffe3f0"
            color="#D25890"
          />
        ),
        tabBarLabel: () => false
      }}
    />
    <Tab.Screen
      name="Home"
      component={HomeContainer}
      options={{
        tabBarIcon: ({ focused }) => (
          <TabIcon
            focused={focused}
            icon="Home"
            label="Home"
            backgroundColor="#e6d8e5"
            color="#75396F"
          />
        ),
        tabBarLabel: () => false
      }}
    />
    <Tab.Screen
      name="Friendship"
      component={ProfilesContainer}
      initialParams={{ searchType: 'FRIENDSHIP' }}
      options={{
        tabBarIcon: ({ focused }) => (
          <TabIcon
            focused={focused}
            icon="Friendship"
            label="Amizade"
            backgroundColor="#e0ffdb"
            color="#1CCB00"
          />
        ),
        tabBarLabel: () => false
      }}
    />
  </Tab.Navigator>
);

const Routes = () => (
  <Stack.Navigator initialRouteName="Auth">
    <Stack.Screen name="Auth" component={AuthContainer} options={{ headerShown: false }} />
    <Stack.Screen
      name="Login"
      component={LoginContainer}
      options={{ headerLeft: false, headerShown: false }}
    />
    <Stack.Screen
      name="Tabs"
      component={Tabs}
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
        headerTitleStyle,
        gestureEnabled: false
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
  </Stack.Navigator>
);

export default Routes;
