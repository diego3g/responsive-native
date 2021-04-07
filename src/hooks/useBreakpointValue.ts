import type { BreakpointSize } from '../ScreenProvider';
import { getNearestBreakpointValue } from '../utils/getNearestBreakpointValue';
import { useScreen } from './useScreen';

type BreakpointValues = Partial<Record<BreakpointSize, any>> & { base: any };

export function useBreakpointValue<T extends BreakpointValues>(
  values: T
): T[keyof T] {
  const { breakpoint } = useScreen();

  return getNearestBreakpointValue({
    breakpoint: breakpoint.size,
    values,
  });
}
