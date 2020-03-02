import React from 'react';
import { View, Image, ActivityIndicator, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';
import { COLORS } from '../../assets/styles/colors';
import { getUserAge } from '../../helpers/AgeCalculator';

const ProfileComponent = ({ loading, profile, data }) => {
  console.log();

  return (
    <ScrollView style={{ flex: 1, marginHorizontal: 20 }}>
      {loading && <ActivityIndicator size="large" />}
      {profile && (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 100,
              overflow: 'hidden',
              marginVertical: 20
            }}
          >
            <Image
              style={{ width: '100%', height: '100%' }}
              source={{ uri: profile.images[0].image }}
              resizeMode="cover"
            />
          </View>
          <View>
            <Text style={{ fontSize: 20, color: COLORS.textSecondaryColor }}>
              {profile.name}, {getUserAge(profile.birthday)}
            </Text>
          </View>
          <View style={{ marginVertical: 20, alignSelf: 'flex-start' }}>
            <Text style={{ fontSize: 14, color: COLORS.textPrimaryColor }}>
              Nasceu em:
              <Text style={{ color: COLORS.textSecondaryColor }}>
                {' '}
                {profile.birthplace.description}
              </Text>
            </Text>
            <Text style={{ color: COLORS.textSecondaryColor }}>
              ({profile.birthplace.lat} {profile.birthplace.lng})
            </Text>
            <Text style={{ fontSize: 14, color: COLORS.textPrimaryColor }}>
              Dia:
              <Text style={{ color: COLORS.textSecondaryColor }}>
                {' '}
                {moment(Number(profile.birthday))
                  .format('DD MMM, YYYY')
                  .toString()}
              </Text>
            </Text>
          </View>
          <View />
        </View>
      )}
    </ScrollView>
  );
};

export default ProfileComponent;
