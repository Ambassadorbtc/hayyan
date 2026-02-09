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
      <Stack.Screen name="sitemap" />
      {/* Individual Guide Pages */}
      <Stack.Screen name="guides/reduce-business-bills" />
      <Stack.Screen name="guides/understanding-energy-bill" />
      <Stack.Screen name="guides/peak-off-peak" />
      <Stack.Screen name="guides/how-to-switch" />
      <Stack.Screen name="guides/what-happens-switch" />
      <Stack.Screen name="guides/avoiding-exit-fees" />
      <Stack.Screen name="guides/cafes-restaurants" />
      <Stack.Screen name="guides/salon-spa" />
      <Stack.Screen name="guides/retail-shop" />
      <Stack.Screen name="guides/renewable-energy" />
      <Stack.Screen name="guides/carbon-offsetting" />
      <Stack.Screen name="guides/solar-panels" />
    </Stack>
  );
}
