import { Dimensions, StatusBar, Platform } from 'react-native';

const VALID_IPHONE_DIMENSIONS = [780, 812, 844, 896, 926];

export function isIPhoneX() {
  const dimensions = Dimensions.get('window');

  const isIPhone = Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS;

  const hasIPhoneXDimensions = VALID_IPHONE_DIMENSIONS.some((dimension) => {
    return dimension === dimensions.height || dimension === dimensions.width;
  });

  return isIPhone && hasIPhoneXDimensions;
}

const IPHONE_STATUS_BAR_HEIGHT = 78;

export function getStatusBarOffset() {
  const dimensions = Dimensions.get('window');

  const isLandscape = dimensions.width > dimensions.height;

  if (isLandscape) {
    return 0;
  }

  if (Platform.OS === 'ios') {
    return IPHONE_STATUS_BAR_HEIGHT;
  }

  return StatusBar.currentHeight as number;
}

export function getDeviceHeight() {
  const dimensions = Dimensions.get('window');

  const standardLength = Math.max(dimensions.width, dimensions.height);

  const isPhone = isIPhoneX() || Platform.OS === 'android';

  if (isPhone) {
    const a = getStatusBarOffset();
    console.log('A', a);
    return standardLength - a;
  }

  return standardLength;
}

export function responsiveFontSize(
  fontSize: number,
  standardScreenHeight = 680
) {
  const heightPercent = (fontSize * getDeviceHeight()) / standardScreenHeight;
  return Math.round(heightPercent);
}
