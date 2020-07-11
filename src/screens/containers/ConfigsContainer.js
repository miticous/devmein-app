import React, { useState, useLayoutEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import reactotron from 'reactotron-react-native';
import { Button } from 'react-native';
import ConfigsComponent from '../components/ConfigsComponents';
import { COLORS } from '../../assets/styles/colors';

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

const SAVE_CONFIGS = gql`
  mutation($maxDistance: String, $searchGenre: String) {
    saveConfigs(maxDistance: $maxDistance, searchGenre: $searchGenre)
  }
`;

const ConfigsContainer = ({ navigation }) => {
  const [state, setState] = useState(undefined);

  const { loading, data } = useQuery(GET_USER, {
    onCompleted: ({ user }) => setState({ user })
  });

  const [saveConfigs] = useMutation(SAVE_CONFIGS);

  useLayoutEffect(() => {
    if (state && state.user.configs !== data.user.configs)
      navigation.setOptions({
        headerRight: () => (
          <Button
            onPress={() => {
              saveConfigs({ variables: { ...state.user.configs } });
              navigation.pop();
            }}
            title="Salvar"
          />
        )
      });
  }, [state && state.user.configs]);

  return (
    <ConfigsComponent
      user={state && state.user}
      loading={loading}
      onPressChangeSearchGenre={() =>
        navigation.navigate('GenreSelection', {
          state,
          setState
        })
      }
      onSlideMaxDistance={maxDistance =>
        setState({ user: { ...state.user, configs: { ...state.user.configs, maxDistance } } })
      }
    />
  );
};

export default ConfigsContainer;
