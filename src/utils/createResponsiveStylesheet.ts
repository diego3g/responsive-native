import type { StyleSheet } from 'react-native';

export type RemFunction = (size: number, shouldScale?: boolean) => number;
export type StylesFunction<T> = (rem: RemFunction) => T;

export function createResponsiveStyleSheet<T extends StyleSheet.NamedStyles<T>>(
  stylesFunction: StylesFunction<T | StyleSheet.NamedStyles<T>>
) {
  return stylesFunction;
}
