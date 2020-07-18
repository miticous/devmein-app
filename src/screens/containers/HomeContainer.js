/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks';
import Geolocation from '@react-native-community/geolocation';
import reactotron from 'reactotron-react-native';
import { SEND_GEOLOCATION } from '../../graphQL/mutation';
import { GET_HOME } from '../../graphQL/query';
import HomeComponent from '../components/HomeComponent';

const HomeContainer = ({ navigation }) => {
  const [geoLocationSent, setGeoLocationSent] = useState(false);

  const { data, loading: loadingQuery } = useQuery(GET_HOME, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-first',
    skip: !geoLocationSent
  });

  const client = useApolloClient();

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
      isProfilesLoading={loadingQuery}
      matches={data?.matches}
      onPressCarouselItem={item => navigation.navigate('Chat', { match: item })}
      userProfile={data?.profile}
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
