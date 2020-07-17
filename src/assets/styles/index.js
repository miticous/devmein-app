import { Dimensions } from 'react-native';
import { COLORS } from './colors';

export const SCREEN_WIDTH = Dimensions.get('screen').width;
export const SCREEN_HEIGHT = Dimensions.get('screen').height;
export const headerStyle = {
  backgroundColor: COLORS.backgroundColor,
  height: 70,
  shadowRadius: 0,
  shadowOffset: {
    height: 0
  }
};
export const headerTitleStyle = {
  fontStyle: 'normal',
  fontWeight: 'bold',
  letterSpacing: 2,
  fontSize: 18,
  lineHeight: 18
};
export const bottomTabBar = {
  style: {
    height: 60,
    borderRadius: 32,
    backgroundColor: COLORS.white,
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 20,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 20,
    shadowColor: 'black',
    shadowOpacity: 0.2
  },
  tabStyle: {
    margin: 8
  },
  labelStyle: {
    color: '#D25890',
    fontWeight: 'bold'
  }
};
