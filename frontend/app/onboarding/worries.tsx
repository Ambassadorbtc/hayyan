import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeIn,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SHADOWS } from '../../src/constants/colors';
import { TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../src/constants/typography';
import { Enezi } from '../../src/components/mascot/Enezi';
import { SpeechBubble } from '../../src/components/ui/SpeechBubble';
import { AnimatedButton } from '../../src/components/ui/AnimatedButton';
import { SelectableCard } from '../../src/components/ui/SelectableCard';
import { SuccessOverlay } from '../../src/components/ui/SuccessOverlay';
import { useOnboardingStore } from '../../src/store/onboardingStore';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const WORRY_OPTIONS = [
  { id: 'energy', title: 'Energy bills (highest)', icon: 'flash' as const },
  { id: 'cashflow', title: 'Cashflow', icon: 'wallet' as const },
  { id: 'supplier', title: 'Supplier costs', icon: 'business' as const },
  { id: 'other', title: 'Other', icon: 'ellipsis-horizontal' as const },
];

export default function WorriesScreen() {
  const router = useRouter();
  const { worries, setWorries, setCurrentStep } = useOnboardingStore();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCharacter, setShowCharacter] = useState(false);

  // Character animation - slide from right, then breathe
  const characterTranslateX = useSharedValue(width + 100);
  const characterScale = useSharedValue(1);

  useEffect(() => {
    // Show character after delay
    setTimeout(() => setShowCharacter(true), 400);
    
    // Slide from right - slower
    characterTranslateX.value = withTiming(0, { 
      duration: 1200, 
      easing: Easing.out(Easing.cubic) 
    });

    // Start breathing after arriving
    setTimeout(() => {
      characterScale.value = withRepeat(
        withSequence(
          withTiming(1.05, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 1200, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      );
    }, 1600);
  }, []);

  const characterStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: characterTranslateX.value },
      { scale: characterScale.value },
    ],
  }));

  const toggleWorry = (id: string) => {
    if (worries.includes(id)) {
      setWorries(worries.filter((w) => w !== id));
    } else {
      setWorries([...worries, id]);
    }
  };

  const handleContinue = () => {
    if (worries.length > 0) {
      setShowSuccess(true);
    }
  };

  const handleSuccessDismiss = () => {
    setShowSuccess(false);
    setCurrentStep(2);
    router.push('/onboarding/supplier-history');
  };

  const handleBack = () => {
    router.back();
  };

  const getEneziExpression = () => {
    if (worries.length === 0) return 'thinking';
    if (worries.length === WORRY_OPTIONS.length) return 'excited';
    return 'happy';
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[COLORS.backgroundLight, '#E8E0FF', COLORS.background]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with back button */}
        <Animated.View entering={FadeIn.duration(400)} style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
        </Animated.View>

        {/* Title */}
        <Animated.View entering={FadeInDown.delay(100).duration(500)}>
          <Text style={styles.headline}>What worries you the most right now?</Text>
          <Text style={styles.subheadline}>Select all that apply</Text>
        </Animated.View>

        {/* Character Section */}
        <Animated.View entering={FadeIn.delay(300).duration(500)} style={styles.characterSection}>
          <SpeechBubble
            message="Tell me what's hurting most – I'm here to help 💜"
            position="bottom"
            delay={400}
          />
          {showCharacter && (
            <Animated.View style={[styles.characterContainer, characterStyle]}>
              <Enezi size={120} expression={getEneziExpression()} animated={false} />
            </Animated.View>
          )}
        </Animated.View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {WORRY_OPTIONS.map((option, index) => (
            <Animated.View
              key={option.id}
              entering={FadeInUp.delay(400 + index * 100).duration(400)}
            >
              <SelectableCard
                title={option.title}
                icon={option.icon}
                selected={worries.includes(option.id)}
                onPress={() => toggleWorry(option.id)}
                variant="checkbox"
              />
            </Animated.View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <Animated.View entering={FadeInUp.delay(800).duration(400)} style={styles.bottomSection}>
        <AnimatedButton
          title="Continue"
          onPress={handleContinue}
          variant="primary"
          size="large"
          fullWidth
          disabled={worries.length === 0}
          icon="arrow-forward"
          iconPosition="right"
        />
      </Animated.View>

      {/* Progress indicator */}
      <View style={styles.progressContainer}>
        <View style={styles.progressDot} />
        <View style={[styles.progressDot, styles.progressDotActive]} />
        <View style={styles.progressDot} />
        <View style={styles.progressDot} />
        <View style={styles.progressDot} />
        <View style={styles.progressDot} />
        <View style={styles.progressDot} />
      </View>

      {/* Success Overlay */}
      <SuccessOverlay
        visible={showSuccess}
        onDismiss={handleSuccessDismiss}
        title="Got it!"
        message="We'll help you tackle these challenges"
        eneziExpression="cheering"
        autoHideDuration={2500}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  headline: {
    ...TYPOGRAPHY.h3,
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
    alignItems: 'center',
    marginVertical: SPACING.lg,
  },
  characterContainer: {
    marginTop: SPACING.md,
  },
  optionsContainer: {
    marginTop: SPACING.md,
  },
  bottomSection: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
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
