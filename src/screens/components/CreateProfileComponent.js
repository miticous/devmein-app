import React from 'react';
import { View, Text, FlatList, Button, Image, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

const CreateProfileComponent = ({
  onPressSubmit,
  onPressUpload,
  user,
  profile,
  image,
  isLoading
}) => (
  <View style={{ flex: 1 }}>
    {isLoading ? (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <ActivityIndicator size="large" />
      </View>
    ) : (
      <>
        <Text>{user.name}</Text>
        <View style={{ flex: 1 }}>
          <Image
            source={{ uri: (profile.images && profile.images[0].image) || image }}
            resizeMode="contain"
            style={{ width: '100%', height: '100%' }}
          />
        </View>
        <Button onPress={onPressUpload} title="Upload" />
        <Button onPress={onPressSubmit} title="Submit" />
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
