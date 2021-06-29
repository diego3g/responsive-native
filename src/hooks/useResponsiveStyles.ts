import type { StyleSheet } from 'react-native';

import type { StylesFunction } from '../utils/createResponsiveStylesheet';
import { useRem } from './useRem';

export function useResponsiveStyle<T extends StyleSheet.NamedStyles<T>>(
  stylesFunction: StylesFunction<T>
) {
  const rem = useRem();

  return stylesFunction(rem);
}
