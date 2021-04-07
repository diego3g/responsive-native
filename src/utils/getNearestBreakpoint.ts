import { BreakpointSize, breakpoints } from '../ScreenProvider';

type GetNearestBreakpointParams = {
  breakpoint: BreakpointSize;
  availableBreakpoints: BreakpointSize[];
};

export function getNearestBreakpoint({
  breakpoint,
  availableBreakpoints,
}: GetNearestBreakpointParams) {
  const breakpointIndex = breakpoints.findIndex((findBreakpoint) => {
    return findBreakpoint.size === breakpoint;
  });

  const previousBreakpoints = breakpoints.filter(
    (_, index) => index < breakpointIndex
  );

  const nearestBreakpoint = previousBreakpoints
    .reverse()
    .find((findBreakpoint) => {
      return availableBreakpoints.some(
        (availableBreakpoint) => findBreakpoint.size === availableBreakpoint
      );
    });

  return nearestBreakpoint?.size;
}
