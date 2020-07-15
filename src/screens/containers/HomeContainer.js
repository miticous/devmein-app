/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, Alert, Button } from 'react-native';
import reactotron from 'reactotron-react-native';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Geolocation from '@react-native-community/geolocation';
import { isNil, not } from 'ramda';
import AsyncStorage from '@react-native-community/async-storage';
import HomeComponent from '../components/HomeComponent';

const GET_HOME = gql`
  query {
    home {
      name
      _id
      images {
        image
      }
      loc {
        coordinates
      }
      birthday
    }
    matches {
      matches {
        _id
        name
        images {
          image
        }
        birthday
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
        images {
          image
        }
        birthday
      }
    }
  }
`;

const SEND_GEOLOCATION = gql`
  mutation($latitude: String!, $longitude: String!) {
    sendGeoLocation(latitude: $latitude, longitude: $longitude)
  }
`;

const matchDone = ({ state, setState, likeSomeone }) => {
  const { matches } = likeSomeone;
  const profileMatched = matches.find(match => match._id !== state.userId);

  return setState({ ...state, newMatch: profileMatched, matchModalVisible: true });
};

const HomeContainer = ({ navigation }) => {
  const [state, setState] = useState({
    latitude: null,
    longitude: null,
    geolocationSent: false,
    matchModalVisible: false,
    newMatch: undefined,
    userId: null
  });

  const { loading: loadingQuery, data } = useQuery(GET_HOME, {
    skip: !state.geolocationSent
  });

  const [likeSomeone] = useMutation(LIKE, {
    onCompleted: ({ likeSomeone }) => {
      if (likeSomeone._id) {
        matchDone({ state, setState, likeSomeone });
      }
    },
    refetchQueries: [{ query: GET_HOME }]
  });

  const [sendGeoLocation] = useMutation(SEND_GEOLOCATION, {
    onCompleted: () => setState({ ...state, geolocationSent: true })
  });

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <Button title={`Matches[${data && data.matches ? data.matches.length : 0}]`} />
  //     )
  //   });
  // }, [data, loadingQuery]);

  useEffect(() => {
    AsyncStorage.getItem('@jintou:userId').then(userId => {
      Geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) =>
        setState({ ...state, longitude, latitude, userId })
      );
    });
  }, []);

  useEffect(() => {
    if (not(isNil(state.latitude)) && not(isNil(state.longitude))) {
      sendGeoLocation({
        variables: { latitude: state.latitude.toString(), longitude: state.longitude.toString() }
      });
    }
  }, [state.latitude, state.longitude]);

  return (
    <HomeComponent
      userLocation={[state.latitude, state.longitude]}
      isProfilesLoading={loadingQuery}
      profiles={data && data.home}
      matchModalVisible={state.matchModalVisible}
      newMatch={state.newMatch}
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
