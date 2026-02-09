import React from 'react';
import { Stack } from 'expo-router';

export default function WebsiteLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="how-it-works" />
      <Stack.Screen name="about" />
      <Stack.Screen name="contact" />
      <Stack.Screen name="privacy" />
      <Stack.Screen name="cookies" />
      <Stack.Screen name="terms" />
      <Stack.Screen name="guides" />
    </Stack>
  );
}
