import React from 'react';
import { View, Text, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { COLORS } from '../../assets/styles/colors';
import DefaultUserImage from '../../assets/images/default_user_image.jpg';
import Button from '../../assets/components/Button';

const CreateProfileComponent = ({
  onPressSubmit,
  onPressUpload,
  user,
  profile,
  image,
  isLoading,
  time,
  date,
  onChangeDate,
  onSelectBirthPlace
}) => (
  <View style={{ flex: 1 }}>
    {isLoading ? (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <ActivityIndicator size="large" />
      </View>
    ) : (
      <>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={onPressUpload}
              style={{
                borderRadius: 100,
                width: 100,
                height: 100,
                overflow: 'hidden'
              }}
            >
              <Image
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
                source={
                  image
                    ? {
                        uri: image
                      }
                    : DefaultUserImage
                }
              />
            </TouchableOpacity>

            <Text
              style={{
                lineHeight: 40,
                fontSize: 22,
                color: COLORS.textPrimaryColor,
                letterSpacing: 0.12
              }}
            >
              {user.name &&
                user.name
                  .split(' ')
                  .slice(0, -2)
                  .join(' ')}
            </Text>
          </View>
        </View>
        <Text style={{ textAlign: 'center', color: COLORS.textSecondaryColor, fontSize: 16 }}>
          Data de nascimento
        </Text>
        <View style={{ flex: 1.2, flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <DateTimePicker
              testID="dateTimePicker"
              maximumDate={moment()
                .subtract(18, 'years')
                .toDate()}
              timeZoneOffsetInMinutes={0}
              value={date}
              is24Hour={false}
              display="default"
              locale="pt-BR"
              onChange={onChangeDate}
            />
          </View>
          <View style={{ flex: 0.5 }}>
            <DateTimePicker
              testID="dateTimePicker"
              mode="time"
              timeZoneOffsetInMinutes={0}
              value={date}
              is24Hour={false}
              display="default"
              locale="pt-BR"
              onChange={onChangeDate}
            />
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View style={{ flex: 0.5, justifyContent: 'center' }}>
            <Text style={{ textAlign: 'center', color: COLORS.textSecondaryColor, fontSize: 16 }}>
              Local de nascimento
            </Text>
          </View>
          <View style={{ flex: 3, justifyContent: 'center' }}>
            <GooglePlacesAutocomplete
              placeholder="Pesquisar"
              minLength={3}
              autoFocus={false}
              returnKeyType="search"
              keyboardAppearance="light"
              listViewDisplayed="auto"
              fetchDetails
              renderDescription={row => row.description}
              onPress={(data, details) => {
                onSelectBirthPlace(data, details);
              }}
              getDefaultValue={() => ''}
              query={{
                key: 'AIzaSyAsceWUlXxulQJohZddfRPstfcNl7FcE2s',
                language: 'pt-BR',
                types: '(cities)',
                sessionToken: '12381247512'
              }}
              nearbyPlacesAPI="GooglePlacesSearch"
              GooglePlacesSearchQuery={{
                rankby: 'distance',
                type: 'cafe'
              }}
              GooglePlacesDetailsQuery={{
                fields: 'geometry'
              }}
              filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
              debounce={1000}
            />
          </View>
        </View>
        <View style={{ flex: 0.3 }}>
          <Button text="Criar perfil" action={onPressSubmit} />
        </View>
      </>
    )}
  </View>
);
CreateProfileComponent.defaultProps = {
  profile: {
    images: [
      {
        image: ''
      }
    ]
  },
  user: {
    name: ''
  }
};
CreateProfileComponent.propTypes = {
  profile: PropTypes.shape({
    images: PropTypes.arrayOf(
      PropTypes.shape({
        image: PropTypes.string
      })
    )
  }),
  user: PropTypes.shape({
    name: PropTypes.string
  })
};

export default CreateProfileComponent;
