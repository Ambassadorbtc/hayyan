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
  const eneziTranslateX = useSharedValue(-width);
  const thunderOpacity = useSharedValue(0);

  useEffect(() => {
    // Background gradient shift
    backgroundShift.value = withTiming(1, {
      duration: 2000,
      easing: Easing.inOut(Easing.ease),
    });

    // Content fade in
    contentOpacity.value = withDelay(300, withTiming(1, { duration: 500 }));

    // Enezi entrance
    eneziTranslateX.value = withDelay(
      600,
      withSequence(
        withSpring(20, { damping: 8, stiffness: 100 }),
        withSpring(0, { damping: 12, stiffness: 150 })
      )
    );

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

    // Show speech bubble
    setTimeout(() => setShowBubble(true), 1200);
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

  const eneziStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: eneziTranslateX.value }],
  }));

  const thunderStyle = useAnimatedStyle(() => ({
    opacity: thunderOpacity.value,
  }));

  return (
    <SafeAreaView style={styles.container}>
      {/* Background */}
      <Animated.View style={[StyleSheet.absoluteFill, backgroundStyle]}>
        <LinearGradient
          colors={[COLORS.backgroundLight, '#F0FAF7', COLORS.background]}
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

        {/* Enezi Section */}
        <View style={styles.eneziSection}>
          {/* Speech Bubble */}
          {showBubble && (
            <View style={styles.bubbleContainer}>
              <SpeechBubble
                message="Oi boss! Your energy bills been shocking you lately? ⚡"
                position="bottom"
                delay={0}
              />
            </View>
          )}

          {/* Enezi */}
          <Animated.View style={[styles.eneziContainer, eneziStyle]}>
            <Enezi size={200} expression="waving" animated />
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
  eneziSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bubbleContainer: {
    marginBottom: SPACING.md,
  },
  eneziContainer: {
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
    backgroundColor: COLORS.primaryGreen,
    width: 24,
  },
});
