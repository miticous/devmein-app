/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import reactotron from 'reactotron-react-native';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import HomeComponent from '../components/HomeComponent';

const GET_HOME = gql`
  query {
    home {
      name
      _id
      images {
        image
      }
    }
  }
`;

const LIKE = gql`
  mutation($userLikedId: String!) {
    likeSomeone(userLikedId: $userLikedId) {
      _id
      startedAt
      matches {
        _id
        name
      }
    }
  }
`;

const matchDone = navigation => {
  Alert.alert('Voce deu match!', '', [
    {
      text: 'Ver matches',
      onPress: () => navigation.navigate('Matches')
    }
  ]);
};

const HomeContainer = ({ navigation }) => {
  const [state, setState] = useState({
    profiles: []
  });

  const { loading: loadingQuery } = useQuery(GET_HOME, {
    onCompleted: ({ home }) => setState({ ...state, profiles: home })
  });

  const [likeSomeone] = useMutation(LIKE, {
    onCompleted: ({ likeSomeone }) => {
      if (likeSomeone._id) {
        matchDone(navigation);
      }
    }
  });

  const { profiles } = state;

  return (
    <HomeComponent
      isProfilesLoading={loadingQuery}
      profiles={profiles}
      onPressProfile={profileId =>
        likeSomeone({
          variables: {
            userLikedId: profileId
          }
        })
      }
    />
  );
};

export default HomeContainer;
