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

  return { padding, pixelRatio };
}
