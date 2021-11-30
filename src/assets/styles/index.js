import { getBottomSafeArea } from 'utils/StatusBarHeight';
import { Dimensions } from 'react-native';
import { colors } from './colors';

export const SCREEN_WIDTH = Dimensions.get('screen').width;
export const SCREEN_HEIGHT = Dimensions.get('screen').height;
export const BOTTOM_TAB_HEIGHT = SCREEN_HEIGHT * 0.07;
export const BOTTOM_TAB_HEIGHT_TOTAL =
  BOTTOM_TAB_HEIGHT + 10 + getBottomSafeArea;
export const HEADER_HEIGHT = 100;

export const headerStyle = {
  backgroundColor: colors.backgroundColor,
  height: HEADER_HEIGHT,
  shadowRadius: 40,
  shadowOffset: {
    height: 8,
  },
};
export const headerTitleStyle = {
  fontStyle: 'normal',
  fontWeight: 'bold',
  letterSpacing: 2,
  fontSize: 18,
  lineHeight: 18,
};
export const bottomTabBar = {
  style: {
    position: 'absolute',
    marginBottom: getBottomSafeArea + 10,
    right: 20,
    left: 20,
    height: BOTTOM_TAB_HEIGHT,
    borderRadius: 32,
    backgroundColor: colors.white,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 20,
    shadowColor: 'black',
    shadowOpacity: 0.2,
  },
  tabStyle: {
    margin: 8,
  },
  labelStyle: {
    color: '#D25890',
    fontWeight: 'bold',
  },
};
