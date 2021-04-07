import { getNearestBreakpoint } from './getNearestBreakpoint';
import type { BreakpointSize } from '../ScreenProvider';

export type BreakpointValues = Partial<Record<BreakpointSize, any>> & {
  base: any;
};

type GetNearestBreakpointValueParams<T = any> = {
  values: T;
  breakpoint: BreakpointSize;
};

export function getNearestBreakpointValue<T extends BreakpointValues>({
  values,
  breakpoint,
}: GetNearestBreakpointValueParams<T>): T[keyof T] {
  const value = values[breakpoint];

  if (!value) {
    const nearestBreakpoint = getNearestBreakpoint({
      breakpoint,
      availableBreakpoints: Object.keys(values) as BreakpointSize[],
    });

    return values[nearestBreakpoint ?? 'base'];
  }

  return value;
}
