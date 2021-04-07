import { Dimensions, StatusBar, Platform } from 'react-native';

const dimensions = Dimensions.get('window');

function isIPhoneX() {
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimensions.height === 780 ||
      dimensions.width === 780 ||
      dimensions.height === 812 ||
      dimensions.width === 812 ||
      dimensions.height === 844 ||
      dimensions.width === 844 ||
      dimensions.height === 896 ||
      dimensions.width === 896 ||
      dimensions.height === 926 ||
      dimensions.width === 926)
  );
}

const standardLength = Math.max(dimensions.width, dimensions.height);
const offset =
  dimensions.width > dimensions.height
    ? 0
    : Platform.OS === 'ios'
    ? 78
    : (StatusBar.currentHeight as number);

const deviceHeight =
  isIPhoneX() || Platform.OS === 'android'
    ? standardLength - offset
    : standardLength;

function responsiveFontSize(fontSize: number, standardScreenHeight = 680) {
  const heightPercent = (fontSize * deviceHeight) / standardScreenHeight;
  return Math.round(heightPercent);
}

type RemParams = {
  size: number;
  baseFontSize?: number;
  shouldScale?: boolean;
  fontScaleFactor?: number;
};

export function rem({
  size,
  baseFontSize = 16,
  shouldScale = false,
  fontScaleFactor = 1,
}: RemParams) {
  return (
    responsiveFontSize(size * baseFontSize) *
    (shouldScale ? fontScaleFactor : 1)
  );
}
