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
import { GET_MAIN_DATA } from '../../graphQL/query';

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

const HomeContainer = ({ navigation }) => {
  const [geoLocationSent, setGeolocationSent] = useState(false);

  const { data, loading: loadingQuery } = useQuery(GET_MAIN_DATA, {
    variables: {
      searchType: 'LOVE'
    },
    skip: !geoLocationSent
  });

  const [sendGeoLocation] = useMutation(SEND_GEOLOCATION, {
    onCompleted: () => setGeolocationSent(true)
  });

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <Button title={`Matches[${data && data.matches ? data.matches.length : 0}]`} />
  //     )
  //   });
  // }, [data, loadingQuery]);

  useEffect(() => {
    Geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) =>
      sendGeoLocation({
        variables: {
          latitude: latitude.toString(),
          longitude: longitude.toString()
        }
      })
    );
  }, []);

  return (
    <HomeComponent
      isProfilesLoading={loadingQuery}
      profiles={data?.profiles}
      userProfile={data?.profile}
    />
  );
};

export default HomeContainer;
