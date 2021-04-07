import { rem } from '../utils/rem';
import { useScreen } from './useScreen';

export function useRem() {
  const { fontScaleFactor, breakpoint } = useScreen();

  return (size: number, shouldScale?: boolean) => {
    return rem({
      size,
      baseFontSize: breakpoint.baseFontSize,
      fontScaleFactor,
      shouldScale,
    });
  };
}
