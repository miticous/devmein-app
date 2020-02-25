import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-community/async-storage';
import MatchesComponent from '../components/MatchesComponent';

const GET_MATCHES = gql`
  query {
    matches {
      _id
      lastMessage {
        text
      }
      matches {
        _id
        name
        images {
          image
        }
      }
    }
  }
`;

const MatchesContainer = ({ navigation }) => {
  const [state, setState] = useState({
    matches: [],
    userId: null
  });

  const { loading: isMatchesLoading } = useQuery(GET_MATCHES, {
    onCompleted: ({ matches }) => setState({ ...state, matches })
  });

  useEffect(() => {
    AsyncStorage.getItem('@jintou:userId').then(res => {
      setState({ ...state, userId: res });
    });
  }, []);

  return (
    <MatchesComponent
      isMatchesLoading={isMatchesLoading}
      userId={state.userId}
      matches={state.matches}
      onPressMatch={matchId =>
        navigation.navigate('Chat', {
          matchId
        })
      }
    />
  );
};

export default MatchesContainer;
