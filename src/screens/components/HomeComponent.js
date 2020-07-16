/* eslint-disable no-underscore-dangle */
import React from 'react';
import { View } from 'react-native';
import { not, isNil, isEmpty } from 'ramda';
import { getDistance } from 'geolib';
import reactotron from 'reactotron-react-native';
import { COLORS } from '../../assets/styles/colors';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../assets/styles';
import { getUserAge } from '../../helpers/AgeCalculator';
import ModalLoading from '../../assets/components/ModalLoading';

const getUsersDistance = ({ coordinates, userLocation }) => {
  if (
    not(isNil(coordinates)) &&
    not(isEmpty(coordinates)) &&
    not(isNil(userLocation)) &&
    not(isEmpty(userLocation))
  ) {
    const distance = getDistance(
      { latitude: userLocation[1], longitude: userLocation[0] },
      { latitude: coordinates[1], longitude: coordinates[0] }
    );
    const kilometersDistance = distance / 1000;

    return kilometersDistance.toFixed(0);
  }
  return 0;
};

const HomeComponent = ({ isProfilesLoading, profiles, userProfile }) => (
  <View
    style={{
      flex: 1
    }}
  >
    {isProfilesLoading ? <ModalLoading visible={isProfilesLoading} /> : false}
  </View>
);

export default HomeComponent;
