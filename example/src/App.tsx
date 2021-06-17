import * as React from 'react';

import { ScreenProvider } from 'responsive-native';
import { Box } from './Box';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <ScreenProvider baseFontSize={2}>
        <Box />
      </ScreenProvider>
    </SafeAreaProvider>
  );
}
