import { Dimensions, StatusBar, Platform } from 'react-native';

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
