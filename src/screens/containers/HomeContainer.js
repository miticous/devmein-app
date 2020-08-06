/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks';
import Geolocation from '@react-native-community/geolocation';
import { SEND_GEOLOCATION } from '../../graphQL/mutation';
import { GET_HOME, GET_PROFILE } from '../../graphQL/query';
import HomeComponent from '../components/HomeComponent';

const HomeContainer = ({ navigation }) => {
  const [geoLocationSent, setGeoLocationSent] = useState(false);
  const client = useApolloClient();

  const { data: profileQuery, loading: loadingProfileQuery } = useQuery(GET_PROFILE, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-first',
    skip: !geoLocationSent
  });

  const { data: homeQuery } = useQuery(GET_HOME, {
    notifyOnNetworkStatusChange: true,
    skip: !geoLocationSent,
    pollInterval: 15000
  });

  const [sendGeoLocation] = useMutation(SEND_GEOLOCATION, {
    onCompleted: () => {
      client.cache.writeData({
        data: {
          geoLocationSent: true
        }
      });
      return setGeoLocationSent(true);
    }
  });

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
    navigate: PropTypes.func.isRequired
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      searchType: PropTypes.string.isRequired
    })
  }).isRequired
};

export default HomeContainer;
