import React from 'react';
import { Text, View } from 'react-native';
import { useScreen } from 'responsive-native';

export function Box() {
  const screen = useScreen();

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: '#333' }}>
        <Text style={{ fontSize: 32, color: '#FFF' }}>
          {JSON.stringify(screen)}
        </Text>
      </View>
      <View style={{ flex: 1, backgroundColor: '#8257e6' }} />
    </View>
  );
}
