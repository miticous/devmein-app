import React, { useState } from 'react';
import { View } from 'react-native';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import reactotron from 'reactotron-react-native';
import ProfileComponent from '../components/ProfileComponent';

const GET_PROFILE = gql`
  query {
    profile {
      name
      birthday
      images {
        image
      }
      birthplace {
        placeId
        description
        lat
        lng
      }
    }
  }
`;

const ProfileContainer = () => {
  const [state, setState] = useState({
    profile: undefined
  });

  const { loading: loadingQuery } = useQuery(GET_PROFILE, {
    onCompleted: ({ profile }) =>
      setState({
        ...state,
        profile
      })
  });

  return <ProfileComponent profile={state.profile} loading={loadingQuery} />;
};

export default ProfileContainer;
