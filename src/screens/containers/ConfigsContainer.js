import React, { useState, useLayoutEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import reactotron from 'reactotron-react-native';
import { Button } from 'react-native';
import ConfigsComponent from '../components/ConfigsComponents';

const GET_USER = gql`
  query {
    user {
      email
      configs {
        maxDistance
        searchGenre
      }
    }
  }
`;

const ConfigsContainer = ({ navigation }) => {
  const [state, setState] = useState(undefined);

  const { data, loading } = useQuery(GET_USER, {
    onCompleted: ({ user }) => setState({ user })
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={() => navigation.navigate('Configs')} title="Salvar" />
    });
  }, []);

  reactotron.log(state);
  return (
    <ConfigsComponent
      user={state && state.user}
      loading={loading}
      onPressChangeSearchGenre={() => navigation.navigate('')}
      onSlideMaxDistance={maxDistance =>
        setState({ user: { ...state.user, configs: { ...state.user.configs, maxDistance } } })
      }
    />
  );
};

export default ConfigsContainer;
