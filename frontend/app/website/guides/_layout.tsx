import React from 'react';
import { Stack } from 'expo-router';

export default function GuidesLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="reduce-business-bills" />
      <Stack.Screen name="understanding-energy-bill" />
      <Stack.Screen name="peak-off-peak" />
      <Stack.Screen name="how-to-switch" />
      <Stack.Screen name="what-happens-switch" />
      <Stack.Screen name="avoiding-exit-fees" />
      <Stack.Screen name="cafes-restaurants" />
      <Stack.Screen name="salon-spa" />
      <Stack.Screen name="retail-shop" />
      <Stack.Screen name="renewable-energy" />
      <Stack.Screen name="carbon-offsetting" />
      <Stack.Screen name="solar-panels" />
    </Stack>
  );
}
