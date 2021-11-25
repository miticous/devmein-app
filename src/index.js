import React from 'react';
import Config from 'react-native-config';
import { split } from 'apollo-link';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import DropdownAlert from 'react-native-dropdownalert';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import SplashScreen from 'react-native-splash-screen';
import codePush from 'react-native-code-push';
import Routes from './routes';
import DropDownHolder from './helpers/DropDownHolder';

require('./config/reactotronConfig');

console.disableYellowBox = true;

const cache = new InMemoryCache({ addTypename: false });
const httpLink = new HttpLink({
  uri: `${Config.API_BASE_URL}/graphql`,
});

const wsLink = new WebSocketLink({
  uri: `${Config.WS_BASE_URL}/graphql`,
  options: {
    reconnect: true,
    lazy: true,
    connectionParams: async () => ({
      token: await AsyncStorage.getItem('@jintou:token'),
    }),
  },
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const linkError = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(
      ({ message, locations, path }) =>
        __DEV__ &&
        DropDownHolder.show(
          'error',
          '',
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
    );
  if (networkError)
    DropDownHolder.show('error', '', 'O Jintou encontrou um problema ao conectar-se ao servidor');
});

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('@jintou:token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  cache,
  link: linkError.concat(authLink.concat(link)),
  name: 'react-web-client',
  version: '1.3',
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
  assumeImmutableResults: false,
});

const codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };

const App = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Routes />
        <DropdownAlert
          ref={(ref) => DropDownHolder.setDropDown(ref)}
          closeInterval={3000}
          translucent={false}
          activeStatusBarStyle="light-content"
          messageNumOfLines={3}
        />
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default codePush(codePushOptions)(App);
