import { useContextSelector } from 'use-context-selector';

import { MediaQuery, validateMediaQuery } from '../utils/validateMediaQuery';
import { ScreenContext } from '../ScreenProvider';

export function useMediaQuery({
  minBreakpoint,
  maxBreakpoint,
  platform,
}: Omit<MediaQuery, 'currentBreakpoint'>): boolean {
  const breakpoint = useContextSelector(
    ScreenContext,
    (context) => context.breakpoint
  );

  return validateMediaQuery({
    minBreakpoint,
    maxBreakpoint,
    currentBreakpoint: breakpoint.size,
    platform,
  });
}
