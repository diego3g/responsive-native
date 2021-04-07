import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { ScreenProvider } from 'responsive-native';
import { Box } from './Box';

export default function App() {
  return (
    <ScreenProvider>
      <View style={styles.container}>
        <Box />
      </View>
    </ScreenProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
