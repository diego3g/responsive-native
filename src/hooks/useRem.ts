import { rem } from '../utils/rem';
import { useScreen } from './useScreen';

export function useRem() {
  const { fontScaleFactor, baseFontSize } = useScreen();

  return (size: number, shouldScale?: boolean) => {
    return rem({
      size,
      baseFontSize,
      fontScaleFactor,
      shouldScale,
    });
  };
}
