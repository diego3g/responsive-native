import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useScreen, useRem, useBreakpointValue } from 'responsive-native';

export function Box() {
  const screen = useScreen();
  const rem = useRem();

  const text = useBreakpointValue({
    base: "I'm a device with undefined width :(",
    sm: "I'm a small device",
    md: "I'm a medium device",
    lg: "I'm a large device",
    xlg: "I'm a very large device",
  });

  return (
    <View
      style={[styles.container, { paddingVertical: screen.padding.top + 10 }]}
    >
      <Text style={[styles.text, { fontSize: rem(1.5) }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#323238',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    color: '#04D361',
    fontWeight: 'bold',
  },
});
