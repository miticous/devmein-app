/* eslint-disable no-underscore-dangle */
import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Image,
  Dimensions,
  Button,
  Modal
} from 'react-native';
import { not, isNil, isEmpty } from 'ramda';
import { getDistance } from 'geolib';
import reactotron from 'reactotron-react-native';
import { COLORS } from '../../assets/styles/colors';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../assets/styles';
import { getUserAge } from '../../helpers/AgeCalculator';

const getUsersDistance = ({ coordinates, userLocation }) => {
  if (
    not(isNil(coordinates)) &&
    not(isEmpty(coordinates)) &&
    not(isNil(userLocation)) &&
    not(isEmpty(userLocation))
  ) {
    const distance = getDistance(
      { latitude: userLocation[0], longitude: userLocation[1] },
      { latitude: coordinates[1], longitude: coordinates[0] }
    );
    const kilometersDistance = distance / 1000;

    return kilometersDistance;
  }
  return 0;
};

const renderProfiles = ({ profiles, onPressItem, userLocation }) => {
  if (not(isNil(profiles)) && not(isEmpty(profiles))) {
    return (
      <FlatList
        horizontal
        data={profiles}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <View style={{ width: Dimensions.get('screen').width, alignItems: 'center' }}>
            <Text style={{ fontSize: 40, textAlign: 'center' }}>
              {item.name}, {getUserAge(item.birthday)}
            </Text>
            <View style={{ width: 300, height: 300, alignItems: 'center', flex: 1 }}>
              <Image
                style={{ width: '100%', height: '100%' }}
                resizeMode="contain"
                source={{ uri: item.images[0].image }}
              />
            </View>
            <View>
              <Text style={{ textAlign: 'center' }}>
                Distância: {getUsersDistance({ coordinates: item.loc.coordinates, userLocation })}{' '}
                km
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Button title="Like" onPress={() => onPressItem(item._id)} />
            </View>
          </View>
        )}
      />
    );
  }
  return false;
};

const HomeComponent = ({
  isProfilesLoading,
  profiles,
  onPressProfile,
  matchModalVisible,
  newMatch,
  userLocation
}) => (
  <View
    style={{
      flex: 1,
      backgroundColor: matchModalVisible ? COLORS.textSecondaryColor : COLORS.backgroundColor
    }}
  >
    {isProfilesLoading ? (
      <ActivityIndicator />
    ) : (
      <>{renderProfiles({ profiles, onPressItem: onPressProfile, userLocation })}</>
    )}
    {matchModalVisible && newMatch && (
      <Modal visible={matchModalVisible} transparent>
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <View
            style={{
              backgroundColor: COLORS.white,
              width: SCREEN_WIDTH * 0.8,
              height: SCREEN_HEIGHT * 0.7,
              borderRadius: 30,
              alignItems: 'center'
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                marginTop: 20,
                fontSize: 22,
                color: COLORS.primaryColor,
                fontWeight: 'bold'
              }}
            >
              Novo match!
            </Text>
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
              <View style={{ width: 100, height: 100 }}>
                <Image
                  style={{ width: '100%', height: '100%' }}
                  resizeMode="cover"
                  source={{ uri: newMatch.images[0].image }}
                />
              </View>
              <Text>
                {newMatch.name}, {getUserAge(newMatch.birthday)}
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    )}
  </View>
);

export default HomeComponent;
