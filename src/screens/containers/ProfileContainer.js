import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Icon from '../../assets/components/Icon';
import ProfileComponent from '../components/ProfileComponent';
import { GET_PROFILE } from '../../graphQL/query';

const ProfileContainer = ({ navigation }) => {
  const [state, setState] = useState({
    profile: undefined
  });

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{ paddingHorizontal: 20 }}>
          <Icon name="Config" width={40} height={40} />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.pop()} style={{ paddingHorizontal: 20 }}>
          <Icon name="Back" width={40} height={40} />
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  const { loading: loadingQuery } = useQuery(GET_PROFILE, {
    onCompleted: ({ profile }) =>
      setState({
        ...state,
        profile
      })
  });

  return (
    <ProfileComponent
      profile={state.profile}
      loading={loadingQuery}
      onPressEditButton={() =>
        navigation.navigate('ProfileEdition', {
          profile: state.profile
        })
      }
    />
  );
};

export default ProfileContainer;
