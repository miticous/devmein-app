/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import reactotron from 'reactotron-react-native';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Geolocation from '@react-native-community/geolocation';
import { isNil, not } from 'ramda';
import HomeComponent from '../components/HomeComponent';

const GET_HOME = gql`
  query {
    home(maxDistance: "10000") {
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

const SEND_GEOLOCATION = gql`
  mutation($latitude: String!, $longitude: String!) {
    sendGeoLocation(latitude: $latitude, longitude: $longitude)
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
    profiles: [],
    latitude: null,
    longitude: null,
    geolocationSent: false
  });

  const { loading: loadingQuery } = useQuery(GET_HOME, {
    onCompleted: ({ home }) => setState({ ...state, profiles: home }),
    skip: !state.geolocationSent
  });

  const [likeSomeone] = useMutation(LIKE, {
    onCompleted: ({ likeSomeone }) => {
      if (likeSomeone._id) {
        matchDone(navigation);
      }
    }
  });

  const [sendGeoLocation] = useMutation(SEND_GEOLOCATION, {
    onCompleted: () => setState({ ...state, geolocationSent: true })
  });

  useEffect(() => {
    Geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) =>
      setState({ ...state, longitude, latitude })
    );
  }, []);

  useEffect(() => {
    if (not(isNil(state.latitude)) && not(isNil(state.longitude))) {
      sendGeoLocation({
        variables: { latitude: state.latitude.toString(), longitude: state.longitude.toString() }
      });
    }
  }, [state.latitude, state.longitude]);

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
