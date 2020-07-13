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
