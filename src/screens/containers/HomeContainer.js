/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks';
import RNLocation from 'react-native-location';
import { AppState } from 'react-native';
import { SEND_GEOLOCATION } from '../../graphQL/mutation';
import { GET_HOME, GET_PROFILE } from '../../graphQL/query';
import HomeComponent from '../components/HomeComponent';

const controlUserLocation = async ({
  sendGeoLocation,
  geoLocation,
  setGeoLocation,
}) => {
  const hasPermission = await RNLocation.checkPermission({
    ios: 'whenInUse',
    android: {
      detail: 'coarse',
    },
  });

  if (!hasPermission) {
    await RNLocation.requestPermission({
      ios: 'whenInUse',
      android: {
        detail: 'fine',
      },
    });
  }
  const { latitude, longitude } = await RNLocation.getLatestLocation({
    timeout: 10000,
  });

  const hasGeoLocationUpdated =
    geoLocation?.latitude !== latitude || geoLocation?.longitude !== longitude;

  if (!geoLocation?.sent || hasGeoLocationUpdated) {
    sendGeoLocation({
      variables: {
        latitude: latitude.toString(),
        longitude: longitude.toString(),
      },
    });

    return setGeoLocation({ latitude, longitude });
  }

  return false;
};

const HomeContainer = ({ navigation }) => {
  const [geoLocation, setGeoLocation] = useState({
    latitude: null,
    longitude: null,
    sent: false,
  });
  const client = useApolloClient();

  const { data: profileQuery, loading: loadingProfileQuery } = useQuery(
    GET_PROFILE,
    {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-first',
      skip: !geoLocation?.sent,
    },
  );

  const { data: homeQuery } = useQuery(GET_HOME, {
    notifyOnNetworkStatusChange: true,
    skip: !geoLocation?.sent,
    pollInterval: 15000,
  });

  const [sendGeoLocation] = useMutation(SEND_GEOLOCATION, {
    onCompleted: () => {
      client.cache.writeData({
        data: {
          geoLocationSent: true,
        },
      });
      return setGeoLocation({ ...geoLocation, sent: true });
    },
  });

  useEffect(() => {
    controlUserLocation({ sendGeoLocation, geoLocation, setGeoLocation });
  }, []);

  const appState = React.useRef(AppState.currentState);
  const [, setAppStateVisible] = React.useState(appState.current);

  const _handleAppStateChange = nextAppState => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      controlUserLocation({ sendGeoLocation, geoLocation, setGeoLocation });
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
  };

  React.useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  return (
    <HomeComponent
      isProfilesLoading={loadingProfileQuery}
      matches={homeQuery?.matches}
      onPressCarouselItem={item => navigation.navigate('Chat', { match: item })}
      userProfile={profileQuery?.profile}
      onPressHeaderLeft={() => navigation.navigate('Profile')}
      onMoveBottom={() => false}
    />
  );
};

HomeContainer.propTypes = {
  navigation: PropTypes.shape({
    setOptions: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      searchType: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default HomeContainer;
