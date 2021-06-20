import { useContextSelector } from 'use-context-selector';

import { ScreenContext } from '../ScreenProvider';

import { rem } from '../utils/rem';

export function useRem() {
  const fontScaleFactor = useContextSelector(
    ScreenContext,
    (context) => context.fontScaleFactor
  );

  const baseFontSize = useContextSelector(
    ScreenContext,
    (context) => context.baseFontSize
  );

  return (size: number, shouldScale?: boolean) => {
    return rem({
      size,
      baseFontSize,
      fontScaleFactor,
      shouldScale,
    });
  };
}
