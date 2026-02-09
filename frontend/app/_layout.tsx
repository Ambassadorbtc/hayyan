import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { useUserStore } from '../src/store/userStore';
import { useOnboardingStore } from '../src/store/onboardingStore';

export default function RootLayout() {
  const loadUser = useUserStore((state) => state.loadUser);
  const loadOnboarding = useOnboardingStore((state) => state.loadFromStorage);

  useEffect(() => {
    loadUser();
    loadOnboarding();
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade',
          contentStyle: { backgroundColor: '#FFFFFF' },
        }}
      >
        <Stack.Screen name="index" options={{ animation: 'none' }} />
        <Stack.Screen name="onboarding/welcome" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="onboarding/worries" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="onboarding/supplier-history" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="onboarding/business-type" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="onboarding/business-details" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="onboarding/personal-details" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="onboarding/signup" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="(tabs)" options={{ animation: 'fade' }} />
        <Stack.Screen name="supplier-input" options={{ animation: 'slide_from_right', presentation: 'modal' }} />
        <Stack.Screen name="supplier-comparison" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="offer-details" options={{ animation: 'slide_from_right', presentation: 'modal' }} />
        <Stack.Screen name="settings" options={{ animation: 'slide_from_right' }} />
      </Stack>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
