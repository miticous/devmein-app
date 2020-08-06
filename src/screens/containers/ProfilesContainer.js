/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks';
import ProfilesComponent from '../components/ProfilesComponent';
import { GET_PROFILES, GET_PROFILE, GET_HOME } from '../../graphQL/query';
import { LIKE, UNLIKE } from '../../graphQL/mutation';

const onMoveTop = async ({ setTutorialDone, tutorialDone, like, id }) => {
  if (!tutorialDone) {
    await AsyncStorage.setItem('@jintou:tutorial_done', 'true');
    setTutorialDone(true);
  }

  await like({
    variables: {
      userLikedId: id
    }
  });
};

const onMoveBottom = async ({ setTutorialDone, tutorialDone, unlike, id }) => {
  if (!tutorialDone) {
    await AsyncStorage.setItem('@jintou:tutorial_done', 'true');
    setTutorialDone(true);
  }

  await unlike({
    variables: {
      userUnlikedId: id
    }
  });
};

const verifyTutorialStatus = async ({ setTutorialDone }) => {
  const teste = await AsyncStorage.getItem('@jintou:tutorial_done');

  if (!teste) {
    return setTutorialDone(false);
  }
  return setTutorialDone(true);
};

const ProfilesContainer = ({ navigation, route }) => {
  const [tutorialDone, setTutorialDone] = React.useState(false);
  const [showHelperInitial, setShowHelperInitial] = React.useState(true);
  const [showHelperFinal, setShowHelperFinal] = React.useState(false);

  const client = useApolloClient();

  const { data: profileQuery } = useQuery(GET_PROFILE, {
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
    variables: {
      type: route?.params?.searchType
    },
    onCompleted: ({ likeSomeone }) => {
      if (likeSomeone?.name) {
        Alert.alert('Novo match!', `Você deu match com ${likeSomeone?.name}`, [
          { text: 'OK', onPress: () => navigation.navigate('Home') }
        ]);
      }
    },
    refetchQueries: ({ data: _data }) => {
      if (_data?.likeSomeone) {
        return [{ query: GET_HOME }];
      }
      return false;
    },
    notifyOnNetworkStatusChange: true
  });

  const [unlike] = useMutation(UNLIKE, {
    variables: {
      type: route?.params?.searchType
    }
  });

  React.useEffect(() => {
    verifyTutorialStatus({ setTutorialDone });
  }, []);

  return (
    <ProfilesComponent
      showHelperInitial={showHelperInitial}
      showHelperFinal={showHelperFinal}
      tutorialDone={tutorialDone}
      isProfilesLoading={loadingQuery}
      profiles={data?.profiles}
      setShowHelperInitial={setShowHelperInitial}
      setShowHelperFinal={setShowHelperFinal}
      userProfile={profileQuery?.profile}
      onPressHeaderLeft={() => navigation.navigate('Profile')}
      onMoveTop={id => onMoveTop({ tutorialDone, like, id, setTutorialDone })}
      onMoveBottom={id => onMoveBottom({ tutorialDone, unlike, id, setTutorialDone })}
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
