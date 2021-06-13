import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Dimensions, PixelRatio, ScaledSize } from 'react-native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

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
  const breakpointIndex = breakpoints
    .slice()
    .reverse()
    .findIndex((breakpoint) => width >= breakpoint.maxWidth);

  return breakpointIndex > 0
    ? breakpoints[breakpointIndex + 1]
    : breakpoints[0];
};

const pixelRatio = PixelRatio.get();

export let windowDimensions = Dimensions.get('window');
export let currentFontScaleFactor: number = windowDimensions.fontScale;

let currentBreakpoint: Breakpoint = getBreakpointByScreenWidth(
  windowDimensions.width
);

export function ScreenProvider({
  children,
  baseFontSize = 16,
}: ScreenProviderProps) {
  const padding = useSafeAreaInsets();

  const [breakpoint, setBreakpoint] = useState(currentBreakpoint);
  const [fontScaleFactor, setFontScaleFactor] = useState(
    windowDimensions.fontScale
  );

  const handleScreenResize = useCallback(
    ({ window }: { window: ScaledSize }) => {
      windowDimensions = window;

      const screenBreakpoint = getBreakpointByScreenWidth(
        Math.max(window.width, window.height)
      );

      if (screenBreakpoint !== currentBreakpoint) {
        setBreakpoint(screenBreakpoint);
      }

      if (window.fontScale !== fontScaleFactor) {
        setFontScaleFactor(window.fontScale);
      }
    },
    [fontScaleFactor]
  );

  useEffect(() => {
    currentBreakpoint = breakpoint;
  }, [breakpoint]);

  useEffect(() => {
    currentFontScaleFactor = fontScaleFactor;
  }, [fontScaleFactor]);

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
