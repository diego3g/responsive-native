import { Platform, PlatformOSType } from 'react-native';
import { breakpoints, BreakpointSize } from '../ScreenProvider';

export type MediaQuery = {
  minBreakpoint?: BreakpointSize;
  maxBreakpoint?: BreakpointSize;
  currentBreakpoint?: BreakpointSize;
  platform?: PlatformOSType;
};

export function validateMediaQuery({
  minBreakpoint,
  maxBreakpoint,
  currentBreakpoint,
  platform,
}: MediaQuery): boolean {
  if (minBreakpoint || maxBreakpoint) {
    if (!currentBreakpoint) {
      throw new Error('Media Query should include current breakpoint.');
    }

    const currentBreakpointIndex = breakpoints.findIndex((breakpoint) => {
      return breakpoint.size === currentBreakpoint;
    });

    if (minBreakpoint) {
      const minBreakpointIndex = breakpoints.findIndex((breakpoint) => {
        return breakpoint.size === minBreakpoint;
      });

      if (minBreakpointIndex > currentBreakpointIndex) {
        return false;
      }
    }

    if (maxBreakpoint) {
      const maxBreakpointIndex = breakpoints.findIndex((breakpoint) => {
        return breakpoint.size === maxBreakpoint;
      });

      if (maxBreakpointIndex < currentBreakpointIndex) {
        return false;
      }
    }
  }

  if (platform && platform !== Platform.OS) {
    return false;
  }

  return true;
}
