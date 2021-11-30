import { Dimensions, Platform } from 'react-native';

const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const IPHONE12_WIDTH = 390;
const IPHONE12_HEIGHT = 844;

const { height, width } = Dimensions.get('window');

const isIPhoneX = () => {
  return Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS
    ? (width === X_WIDTH && height === X_HEIGHT) ||
        (width === XSMAX_WIDTH && height === XSMAX_HEIGHT) ||
        (width === IPHONE12_WIDTH && height === IPHONE12_HEIGHT)
    : false;
};

export const StatusBarHeight = Platform.select({
  ios: isIPhoneX() ? 44 : 20,
  android: 0,
  default: 0,
});

export const getBottomSafeArea = Platform.select({
  ios: isIPhoneX() ? 20 : 0,
  android: 0,
  default: 0,
});
