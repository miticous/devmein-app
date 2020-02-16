import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import DropdownAlert from 'react-native-dropdownalert';
import Routes from './routes';
import DropDownHolder from './helpers/DropDownHolder';

require('./config/reactotronConfig');

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:4000/graphql'
});

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('@jintou:token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  cache,
  link: authLink.concat(link),
  name: 'react-web-client',
  version: '1.3',
  queryDeduplication: false,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network'
    }
  }
});

const App = () => (
  <ApolloProvider client={client}>
    <NavigationContainer>
      <Routes />
      <DropdownAlert
        ref={ref => DropDownHolder.setDropDown(ref)}
        closeInterval={3000}
        translucent={false}
        activeStatusBarStyle="light-content"
        messageNumOfLines={3}
      />
    </NavigationContainer>
  </ApolloProvider>
);

export default App;
