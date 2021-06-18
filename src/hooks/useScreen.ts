import { useContextSelector } from 'use-context-selector';

import { ScreenContext } from '../ScreenProvider';

export function useScreen() {
  const padding = useContextSelector(
    ScreenContext,
    (context) => context.padding
  );

  const pixelRatio = useContextSelector(
    ScreenContext,
    (context) => context.pixelRatio
  );

  const breakpoint = useContextSelector(
    ScreenContext,
    (context) => context.breakpoint
  );

  const fontScaleFactor = useContextSelector(
    ScreenContext,
    (context) => context.fontScaleFactor
  );

  const baseFontSize = useContextSelector(
    ScreenContext,
    (context) => context.baseFontSize
  );

  return { padding, pixelRatio, breakpoint, fontScaleFactor, baseFontSize };
}
