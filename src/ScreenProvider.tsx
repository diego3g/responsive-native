import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Dimensions, PixelRatio, ScaledSize } from 'react-native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import { createContext } from 'use-context-selector';

export type Breakpoint = {
  size: 'sm' | 'md' | 'lg' | 'xlg';
  maxWidth: number;
};

export type BreakpointSize = Breakpoint['size'];

export type ScreenContextData = {
  breakpoint: Breakpoint;
  fontScaleFactor: number;
  pixelRatio: number;
  padding: EdgeInsets;
  baseFontSize: number;
};

type ScreenProviderProps = {
  children: ReactNode;
  baseFontSize?: number;
};

export const ScreenContext = createContext({} as ScreenContextData);

export const breakpoints: Breakpoint[] = [
  { size: 'sm', maxWidth: 576 },
  { size: 'md', maxWidth: 768 },
  { size: 'lg', maxWidth: 992 },
  { size: 'xlg', maxWidth: 1200 },
];

const getBreakpointByScreenWidth = (width: number): Breakpoint => {
  const breakpointByScreenWidth = breakpoints.find(
    (breakpoint) => width <= breakpoint.maxWidth
  );

  return breakpointByScreenWidth || breakpoints[breakpoints.length - 1];
};

export function ScreenProvider({
  children,
  baseFontSize = 16,
}: ScreenProviderProps) {
  let currentBreakpoint = useRef<Breakpoint | null>(null);
  const padding = useSafeAreaInsets();

  const [breakpoint, setBreakpoint] = useState(() => {
    const { width } = Dimensions.get('window');

    return getBreakpointByScreenWidth(width);
  });

  const [fontScaleFactor, setFontScaleFactor] = useState(() => {
    return Dimensions.get('window').fontScale;
  });

  const pixelRatio = useMemo(() => PixelRatio.get(), []);

  const handleScreenResize = useCallback(
    ({ window }: { window: ScaledSize }) => {
      const screenBreakpoint = getBreakpointByScreenWidth(
        Math.max(window.width, window.height)
      );

      if (screenBreakpoint !== currentBreakpoint.current) {
        setBreakpoint(screenBreakpoint);
      }

      if (window.fontScale !== fontScaleFactor) {
        setFontScaleFactor(window.fontScale);
      }
    },
    [fontScaleFactor]
  );

  useEffect(() => {
    currentBreakpoint.current = breakpoint;
  }, [breakpoint]);

  useEffect(() => {
    Dimensions.addEventListener('change', handleScreenResize);

    return () => {
      Dimensions.removeEventListener('change', handleScreenResize);
    };
  }, [handleScreenResize]);

  return (
    <ScreenContext.Provider
      value={{
        breakpoint,
        pixelRatio,
        padding,
        fontScaleFactor,
        baseFontSize,
      }}
    >
      {children}
    </ScreenContext.Provider>
  );
}
