import { getDeviceHeight } from './getDeviceHeight';

export function responsiveFontSize(
  fontSize: number,
  standardScreenHeight = 680
) {
  const heightPercent = (fontSize * getDeviceHeight()) / standardScreenHeight;
  return Math.round(heightPercent);
}
