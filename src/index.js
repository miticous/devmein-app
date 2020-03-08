import React from 'react';
import { split } from 'apollo-link';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import DropdownAlert from 'react-native-dropdownalert';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { SafeAreaView } from 'react-native';
import Routes from './routes';
import DropDownHolder from './helpers/DropDownHolder';

require('./config/reactotronConfig');

const cache = new InMemoryCache();
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql'
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true
  }
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink
);

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
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network'
    }
  }
});

const App = () => (
  <ApolloProvider client={client}>
    <SafeAreaView style={{ flex: 1 }}>
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
    </SafeAreaView>
  </ApolloProvider>
);

export default App;
