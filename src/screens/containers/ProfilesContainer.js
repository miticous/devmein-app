/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Geolocation from '@react-native-community/geolocation';
import ProfilesComponent from '../components/ProfilesComponent';
import { GET_MAIN_DATA } from '../../graphQL/query';
import Icon from '../../assets/components/Icon';
import ProfileHeader from '../../assets/components/ProfileHeader';
import { LIKE, SEND_GEOLOCATION } from '../../graphQL/mutation';

const ProfilesContainer = ({ navigation, route }) => {
  const [geoLocationSent, setGeolocationSent] = useState(false);

  const { data, loading: loadingQuery } = useQuery(GET_MAIN_DATA, {
    variables: {
      searchType: route?.params?.searchType
    },
    skip: !geoLocationSent
  });

  const [sendGeoLocation] = useMutation(SEND_GEOLOCATION, {
    onCompleted: () => setGeolocationSent(true)
  });

  const [like] = useMutation(LIKE, {
    onCompleted: () => false
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <ProfileHeader
          onPress={() => navigation.navigate('Profile')}
          imageSource={data?.profile?.images?.[0].image}
          name={data?.profile?.name}
          icon={data?.profile?.astral?.zodiac}
        />
      ),
      headerRight: () => (
        <TouchableOpacity style={{ paddingHorizontal: 20 }}>
          <Icon name="Config" width={40} height={40} />
        </TouchableOpacity>
      )
    });
  }, [data, loadingQuery]);

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
    <ProfilesComponent
      isProfilesLoading={loadingQuery}
      profiles={data?.profiles}
      userProfile={data?.profile}
      onPressHeaderLeft={() => navigation.navigate('Profile')}
      onMoveTop={id =>
        like({
          variables: {
            userLikedId: id
          }
        })
      }
      onMoveBottom={() => false}
    />
  );
};

ProfilesContainer.propTypes = {
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

export default ProfilesContainer;
