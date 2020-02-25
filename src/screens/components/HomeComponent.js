/* eslint-disable no-underscore-dangle */
import React from 'react';
import { View, Text, ActivityIndicator, FlatList, Image, Dimensions, Button } from 'react-native';
import { not, isNil, isEmpty } from 'ramda';

const renderProfiles = ({ profiles, onPressItem }) => {
  if (not(isNil(profiles)) && not(isEmpty(profiles))) {
    return (
      <FlatList
        horizontal
        data={profiles}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <View style={{ width: Dimensions.get('screen').width }}>
            <Text style={{ fontSize: 40, textAlign: 'center' }}>{item.name}</Text>
            <View style={{ width: 300, height: 300, alignItems: 'center', flex: 1 }}>
              <Image
                style={{ width: '100%', height: '100%' }}
                resizeMode="contain"
                source={{ uri: item.images[0].image }}
              />
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

const HomeComponent = ({ isProfilesLoading, profiles, onPressProfile }) => (
  <View style={{ flex: 1 }}>
    {isProfilesLoading ? (
      <ActivityIndicator />
    ) : (
      <>{renderProfiles({ profiles, onPressItem: onPressProfile })}</>
    )}
  </View>
);

export default HomeComponent;
