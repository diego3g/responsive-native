import { responsiveFontSize } from './responsiveFontSize';

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
