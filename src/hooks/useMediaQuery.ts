import { MediaQuery, validateMediaQuery } from '../utils/validateMediaQuery';
import { useScreen } from './useScreen';

export function useMediaQuery({
  minBreakpoint,
  maxBreakpoint,
  platform,
}: Omit<MediaQuery, 'currentBreakpoint'>): boolean {
  const { breakpoint } = useScreen();

  return validateMediaQuery({
    minBreakpoint,
    maxBreakpoint,
    currentBreakpoint: breakpoint.size,
    platform,
  });
}
