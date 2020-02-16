import React from 'react';
import { View, Text } from 'react-native';
import reactotron from 'reactotron-react-native';

const HomeContainer = ({ navigation }) => {
  reactotron.log(navigation);

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <Text>Oii</Text>
    </View>
  );
};

export default HomeContainer;
