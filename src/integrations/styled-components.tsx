import React, { ReactNode, useMemo } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { useScreen } from '../hooks/useScreen';

import {
  getNearestBreakpointValue,
  BreakpointValues,
} from '../utils/getNearestBreakpointValue';
import { MediaQuery, validateMediaQuery } from '../utils/validateMediaQuery';
import { rem } from '../utils/rem';
type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { breakpoint, fontScaleFactor } = useScreen();

  const theme = useMemo(() => {
    return {
      screen: {
        breakpoint,
        rem: (size: number, shouldScale?: boolean) => {
          return rem({
            size,
            shouldScale,
            baseFontSize: breakpoint.baseFontSize,
            fontScaleFactor,
          });
        },
        breakpointValue: (values: BreakpointValues) => {
          return getNearestBreakpointValue({
            breakpoint: breakpoint.size,
            values,
          });
        },
        mediaQuery: ({
          minBreakpoint,
          maxBreakpoint,
          platform,
        }: Omit<MediaQuery, 'currentBreakpoint'>) => {
          return validateMediaQuery({
            minBreakpoint,
            maxBreakpoint,
            platform,
            currentBreakpoint: breakpoint.size,
          });
        },
      },
    };
  }, [breakpoint, fontScaleFactor]);

  return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
}
