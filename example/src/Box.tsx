import React from 'react';
import { Text, View } from 'react-native';
import { useScreen, useRem } from 'responsive-native';

export function Box() {
  const screen = useScreen();
  const rem = useRem();

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#333',
          paddingVertical: screen.padding.top + 10,
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ fontSize: rem(16), color: '#FFF' }}>
          {JSON.stringify(screen)}
        </Text>
      </View>
      <View style={{ flex: 1, backgroundColor: '#8257e6' }} />
    </View>
  );
}
