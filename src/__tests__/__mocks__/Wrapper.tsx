import React from 'react';

import { ScreenProvider } from '../../ScreenProvider';

interface Props {
  children: React.ReactNode;
  baseFontSize?: number;
}

export function WrapperProvider({ children, baseFontSize }: Props) {
  return (
    <ScreenProvider baseFontSize={baseFontSize}>{children}</ScreenProvider>
  );
}
