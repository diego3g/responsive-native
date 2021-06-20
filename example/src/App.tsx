import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ScreenProvider } from 'responsive-native';

import { Box } from './Box';

export default function App() {
  return (
    <SafeAreaProvider>
      <ScreenProvider baseFontSize={16}>
        <Box />
      </ScreenProvider>
    </SafeAreaProvider>
  );
}
