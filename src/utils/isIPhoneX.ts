import { Dimensions, Platform } from 'react-native';

const VALID_IPHONE_DIMENSIONS = [780, 812, 844, 896, 926];

export function isIPhoneX() {
  const dimensions = Dimensions.get('window');

  const isIPhone = Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS;

  const hasIPhoneXDimensions = VALID_IPHONE_DIMENSIONS.some((dimension) => {
    return dimension === dimensions.height || dimension === dimensions.width;
  });

  return isIPhone && hasIPhoneXDimensions;
}
