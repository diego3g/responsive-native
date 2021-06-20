import { useContextSelector } from 'use-context-selector';

import { ScreenContext } from '../ScreenProvider';
import type { BreakpointSize } from '../ScreenProvider';
import { getNearestBreakpointValue } from '../utils/getNearestBreakpointValue';

type BreakpointValues = Partial<Record<BreakpointSize, any>> & { base: any };

export function useBreakpointValue<T extends BreakpointValues>(
  values: T
): T[keyof T] {
  const breakpoint = useContextSelector(
    ScreenContext,
    (context) => context.breakpoint
  );

  return getNearestBreakpointValue({
    breakpoint: breakpoint.size,
    values,
  });
}
