import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSequence,
  withSpring,
  withRepeat,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../src/constants/colors';
import { TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../src/constants/typography';
import { Enezi } from '../src/components/mascot/Enezi';
import { useUserStore } from '../src/store/userStore';
import { useOnboardingStore } from '../src/store/onboardingStore';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();
  const { isAuthenticated } = useUserStore();
  const { isCompleted } = useOnboardingStore();
  const [showCharacter, setShowCharacter] = useState(false);
  const [showButton, setShowButton] = useState(false);

  // Animation values
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.5);
  const boltRotation = useSharedValue(0);
  const titleTranslateY = useSharedValue(30);
  const titleOpacity = useSharedValue(0);
  const subtitleOpacity = useSharedValue(0);
  const sparkleOpacity = useSharedValue(0);
  const buttonOpacity = useSharedValue(0);
  const buttonTranslateY = useSharedValue(30);
  
  // Character slides from RIGHT to CENTER - SLOWER
  const characterTranslateX = useSharedValue(width + 150);
  const characterOpacity = useSharedValue(0);
  // Zoom in/out once centered
  const characterScale = useSharedValue(1);

  const handleGetStarted = () => {
    if (isAuthenticated && isCompleted) {
      router.replace('/(tabs)');
    } else {
      router.replace('/onboarding/welcome');
    }
  };

  useEffect(() => {
    // Start splash animation sequence
    logoOpacity.value = withDelay(200, withTiming(1, { duration: 600 }));
    logoScale.value = withDelay(
      200,
      withSequence(
        withSpring(1.1, { damping: 8, stiffness: 200 }),
        withSpring(1, { damping: 12, stiffness: 200 })
      )
    );
    
    boltRotation.value = withDelay(
      400,
      withSequence(
        withTiming(15, { duration: 200 }),
        withTiming(-15, { duration: 200 }),
        withTiming(10, { duration: 150 }),
        withTiming(0, { duration: 150 })
      )
    );

    titleTranslateY.value = withDelay(600, withSpring(0, { damping: 12, stiffness: 200 }));
    titleOpacity.value = withDelay(600, withTiming(1, { duration: 400 }));
    subtitleOpacity.value = withDelay(900, withTiming(1, { duration: 400 }));

    // Show character sliding from RIGHT - SLOWER
    setTimeout(() => setShowCharacter(true), 1000);
    characterOpacity.value = withDelay(1000, withTiming(1, { duration: 400 }));
    // Slower slide in - lower stiffness, higher mass
    characterTranslateX.value = withDelay(
      1000, 
      withSpring(0, { damping: 20, stiffness: 40, mass: 1.5 })
    );

    // Start zoom in/out breathing effect after character arrives (around 2.5s)
    setTimeout(() => {
      characterScale.value = withRepeat(
        withSequence(
          withTiming(1.05, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 1200, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      );
    }, 2500);

    // Sparkle effects
    sparkleOpacity.value = withDelay(
      1200,
      withSequence(
        withTiming(1, { duration: 300 }),
        withTiming(0.3, { duration: 300 }),
        withTiming(1, { duration: 300 })
      )
    );

    // Show Get Started button
    setTimeout(() => setShowButton(true), 2800);
    buttonOpacity.value = withDelay(2800, withTiming(1, { duration: 500 }));
    buttonTranslateY.value = withDelay(2800, withSpring(0, { damping: 12, stiffness: 150 }));

  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [
      { scale: logoScale.value },
      { rotate: `${boltRotation.value}deg` },
    ],
  }));

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }],
  }));

  const subtitleStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value,
  }));

  // Character slides from right to center, then zooms in/out
  const characterStyle = useAnimatedStyle(() => ({
    opacity: characterOpacity.value,
    transform: [
      { translateX: characterTranslateX.value },
      { scale: characterScale.value },
    ],
  }));

  const sparkleStyle = useAnimatedStyle(() => ({
    opacity: sparkleOpacity.value,
  }));

  const buttonStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [{ translateY: buttonTranslateY.value }],
  }));

  return (
    <LinearGradient
      colors={['#7B5CF6', '#9D85F6', '#B8A4F8']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {/* Decorative sparkles */}
      <Animated.View style={[styles.sparkleContainer, sparkleStyle]}>
        <View style={[styles.sparkle, { top: '15%', left: '10%' }]} />
        <View style={[styles.sparkle, { top: '20%', right: '15%' }]} />
        <View style={[styles.sparkle, { top: '30%', left: '20%' }]} />
        <View style={[styles.sparkle, { bottom: '30%', right: '10%' }]} />
        <View style={[styles.sparkle, { bottom: '25%', left: '15%' }]} />
      </Animated.View>

      <View style={styles.content}>
        {/* Logo bolt */}
        <Animated.View style={[styles.logoContainer, logoStyle]}>
          <Text style={styles.boltIcon}>⚡</Text>
        </Animated.View>

        {/* App name - HAYYAN */}
        <Animated.View style={titleStyle}>
          <Text style={styles.title}>Hayyan</Text>
        </Animated.View>

        {/* Tagline */}
        <Animated.View style={subtitleStyle}>
          <Text style={styles.subtitle}>Slash Your Energy Bills!</Text>
        </Animated.View>

        {/* Character sliding from right - 20% BIGGER */}
        {showCharacter && (
          <Animated.View style={[styles.characterContainer, characterStyle]}>
            <Enezi size={216} expression="excited" animated={false} />
          </Animated.View>
        )}

        {/* Get Started Button */}
        {showButton && (
          <Animated.View style={[styles.buttonContainer, buttonStyle]}>
            <TouchableOpacity 
              style={styles.getStartedButton} 
              onPress={handleGetStarted}
              activeOpacity={0.9}
            >
              <Text style={styles.buttonText}>Get Started</Text>
              <Text style={styles.buttonIcon}>→</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>

      {/* Footer */}
      <Animated.View style={[styles.footer, subtitleStyle]}>
        <Text style={styles.footerText}>For UK Business Owners</Text>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sparkleContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  sparkle: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  boltIcon: {
    fontSize: 60,
  },
  title: {
    ...TYPOGRAPHY.h1,
    fontSize: 48,
    color: COLORS.textLight,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    ...TYPOGRAPHY.bodyLarge,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginTop: SPACING.sm,
  },
  characterContainer: {
    marginTop: SPACING.xl,
  },
  buttonContainer: {
    marginTop: SPACING.xl,
    width: '100%',
    paddingHorizontal: SPACING.lg,
  },
  getStartedButton: {
    backgroundColor: 'white',
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xl,
    borderRadius: BORDER_RADIUS.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    ...TYPOGRAPHY.button,
    color: '#7B5CF6',
    fontSize: 18,
    fontWeight: '700',
  },
  buttonIcon: {
    fontSize: 20,
    color: '#7B5CF6',
    marginLeft: SPACING.sm,
    fontWeight: '700',
  },
  footer: {
    paddingBottom: SPACING.xxl,
    alignItems: 'center',
  },
  footerText: {
    ...TYPOGRAPHY.label,
    color: 'rgba(255, 255, 255, 0.7)',
  },
});
