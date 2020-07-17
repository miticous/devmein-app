/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks';
import ProfilesComponent from '../components/ProfilesComponent';
import { GET_PROFILES, GET_PROFILE } from '../../graphQL/query';
import { LIKE } from '../../graphQL/mutation';

const ProfilesContainer = ({ navigation, route }) => {
  const client = useApolloClient();

  const {
    data: { profile }
  } = useQuery(GET_PROFILE, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-first'
  });

  const { data: cachedData } = client.cache;

  const { data, loading: loadingQuery } = useQuery(GET_PROFILES, {
    variables: {
      searchType: route?.params?.searchType
    },
    skip: !cachedData?.data?.ROOT_QUERY?.geoLocationSent
  });

  const [like] = useMutation(LIKE, {
    onCompleted: () => false
  });

  return (
    <ProfilesComponent
      isProfilesLoading={loadingQuery}
      profiles={data?.profiles}
      userProfile={profile}
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
