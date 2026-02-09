import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSpring,
  withSequence,
  withRepeat,
  Easing,
  FadeInDown,
  FadeInUp,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SHADOWS } from '../../src/constants/colors';
import { TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../src/constants/typography';
import { Enezi } from '../../src/components/mascot/Enezi';
import { SpeechBubble } from '../../src/components/ui/SpeechBubble';
import { AnimatedButton } from '../../src/components/ui/AnimatedButton';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();
  const [showBubble, setShowBubble] = useState(false);

  // Animation values
  const backgroundShift = useSharedValue(0);
  const contentOpacity = useSharedValue(0);
  const thunderOpacity = useSharedValue(0);
  
  // Character slides from RIGHT to CENTER - SLOWER, NO BOUNCE
  const characterTranslateX = useSharedValue(width + 150);
  const characterOpacity = useSharedValue(0);
  // Zoom in/out breathing effect once centered
  const characterScale = useSharedValue(1);

  useEffect(() => {
    // Background gradient shift
    backgroundShift.value = withTiming(1, {
      duration: 2000,
      easing: Easing.inOut(Easing.ease),
    });

    // Content fade in
    contentOpacity.value = withDelay(300, withTiming(1, { duration: 500 }));

    // Character slides from RIGHT to CENTER - SLOWER, SMOOTH
    characterOpacity.value = withDelay(600, withTiming(1, { duration: 400 }));
    characterTranslateX.value = withDelay(
      600,
      withTiming(0, { duration: 1200, easing: Easing.out(Easing.cubic) })
    );

    // Start zoom in/out breathing effect after character arrives
    setTimeout(() => {
      characterScale.value = withRepeat(
        withSequence(
          withTiming(1.05, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 1200, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      );
    }, 1800);

    // Thunder effect
    thunderOpacity.value = withDelay(
      800,
      withSequence(
        withTiming(0.8, { duration: 100 }),
        withTiming(0, { duration: 100 }),
        withTiming(0.5, { duration: 100 }),
        withTiming(0, { duration: 100 })
      )
    );

    // Show speech bubble after character arrives
    setTimeout(() => setShowBubble(true), 1800);
  }, []);

  const handleYesPress = () => {
    router.push('/onboarding/worries');
  };

  const handleSkip = () => {
    router.push('/onboarding/worries');
  };

  const backgroundStyle = useAnimatedStyle(() => ({
    opacity: backgroundShift.value,
  }));

  const contentStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
  }));

  // Character slides from right to center, then zooms in/out
  const characterStyle = useAnimatedStyle(() => ({
    opacity: characterOpacity.value,
    transform: [
      { translateX: characterTranslateX.value },
      { scale: characterScale.value },
    ],
  }));

  const thunderStyle = useAnimatedStyle(() => ({
    opacity: thunderOpacity.value,
  }));

  return (
    <SafeAreaView style={styles.container}>
      {/* Background */}
      <Animated.View style={[StyleSheet.absoluteFill, backgroundStyle]}>
        <LinearGradient
          colors={[COLORS.backgroundLight, '#E8E0FF', COLORS.background]}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </Animated.View>

      {/* Thunder flash effect */}
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: COLORS.highlightYellow },
          thunderStyle,
        ]}
      />

      <Animated.View style={[styles.content, contentStyle]}>
        {/* Header */}
        <Animated.View entering={FadeInDown.delay(200).duration(600)}>
          <Text style={styles.headline}>Are you worried about the rising cost of living?</Text>
          <Text style={styles.subheadline}>Most business owners are right now.</Text>
        </Animated.View>

        {/* Character Section */}
        <View style={styles.characterSection}>
          {/* Speech Bubble */}
          {showBubble && (
            <View style={styles.bubbleContainer}>
              <SpeechBubble
                message="Hey there! I'm Hayyan. Ready to slash your energy bills? ⚡"
                position="bottom"
                delay={0}
              />
            </View>
          )}

          {/* Character - slides from right, then breathes */}
          <Animated.View style={[styles.characterContainer, characterStyle]}>
            <Enezi size={200} expression="waving" animated={false} />
          </Animated.View>
        </View>

        {/* CTA Section */}
        <Animated.View
          entering={FadeInUp.delay(1400).duration(600)}
          style={styles.ctaSection}
        >
          <AnimatedButton
            title="Yes, help me save"
            onPress={handleYesPress}
            variant="primary"
            size="large"
            fullWidth
            pulsing
            icon="flash"
            iconPosition="right"
          />

          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text style={styles.skipText}>Skip for now</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>

      {/* Progress indicator */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressDot, styles.progressDotActive]} />
        <View style={styles.progressDot} />
        <View style={styles.progressDot} />
        <View style={styles.progressDot} />
        <View style={styles.progressDot} />
        <View style={styles.progressDot} />
        <View style={styles.progressDot} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
  },
  headline: {
    ...TYPOGRAPHY.h2,
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  subheadline: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  characterSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bubbleContainer: {
    marginBottom: SPACING.md,
  },
  characterContainer: {
    alignItems: 'center',
  },
  ctaSection: {
    paddingBottom: SPACING.lg,
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: SPACING.md,
    marginTop: SPACING.sm,
  },
  skipText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: SPACING.lg,
    gap: SPACING.sm,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.cardBorder,
  },
  progressDotActive: {
    backgroundColor: COLORS.primary,
    width: 24,
  },
});
