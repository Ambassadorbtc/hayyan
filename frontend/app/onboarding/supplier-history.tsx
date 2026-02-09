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
import { useOnboardingStore } from '../../src/store/onboardingStore';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const HISTORY_OPTIONS = [
  { id: 'less_1_year', title: 'Less than 1 year ago', icon: 'time' as const },
  { id: '1_2_years', title: '1-2 years ago', icon: 'calendar' as const },
  { id: 'more_2_years', title: 'More than 2 years ago', icon: 'hourglass' as const },
  { id: 'never', title: 'Never', icon: 'close-circle' as const },
];

export default function SupplierHistoryScreen() {
  const router = useRouter();
  const { lastSupplierChange, setLastSupplierChange, setCurrentStep } = useOnboardingStore();
  const [showCharacter, setShowCharacter] = useState(false);

  // Character animation - slide from right, then breathe
  const characterTranslateX = useSharedValue(width + 100);
  const characterScale = useSharedValue(1);

  useEffect(() => {
    setTimeout(() => setShowCharacter(true), 400);
    
    characterTranslateX.value = withTiming(0, { 
      duration: 1200, 
      easing: Easing.out(Easing.cubic) 
    });

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

  const handleSelect = (id: string) => {
    setLastSupplierChange(id);
  };

  const handleContinue = () => {
    if (lastSupplierChange) {
      setCurrentStep(3);
      router.push('/onboarding/business-type');
    }
  };

  const handleBack = () => {
    router.back();
  };

  const getEneziMessage = () => {
    if (!lastSupplierChange) return "No judgement – most people haven't for ages! 😊";
    if (lastSupplierChange === 'never') return "No worries! Now's the perfect time to start! ⚡";
    if (lastSupplierChange === 'more_2_years') return "Time flies! Let's see what savings are out there! 💰";
    if (lastSupplierChange === '1_2_years') return "Good timing to check for better deals! 🔍";
    return "Smart! Always good to keep checking! ✨";
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
          <Text style={styles.headline}>When was the last time you changed your energy supplier?</Text>
        </Animated.View>

        {/* Character Section */}
        <Animated.View entering={FadeIn.delay(300).duration(500)} style={styles.characterSection}>
          <SpeechBubble
            message={getEneziMessage()}
            position="bottom"
            delay={400}
          />
          {showCharacter && (
            <Animated.View style={[styles.characterContainer, characterStyle]}>
              <Enezi 
                size={120} 
                expression={lastSupplierChange === 'never' ? 'surprised' : 'happy'} 
                animated={false}
              />
            </Animated.View>
          )}
        </Animated.View>

        {/* Timeline visual */}
        <View style={styles.timelineContainer}>
          <View style={styles.timelineLine} />
          {HISTORY_OPTIONS.map((option, index) => (
            <Animated.View
              key={option.id}
              entering={FadeInUp.delay(400 + index * 100).duration(400)}
            >
              <SelectableCard
                title={option.title}
                icon={option.icon}
                selected={lastSupplierChange === option.id}
                onPress={() => handleSelect(option.id)}
                variant="radio"
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
          disabled={!lastSupplierChange}
          icon="arrow-forward"
          iconPosition="right"
        />
      </Animated.View>

      {/* Progress indicator */}
      <View style={styles.progressContainer}>
        <View style={styles.progressDot} />
        <View style={styles.progressDot} />
        <View style={[styles.progressDot, styles.progressDotActive]} />
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
  characterSection: {
    alignItems: 'center',
    marginVertical: SPACING.lg,
  },
  characterContainer: {
    marginTop: SPACING.md,
  },
  timelineContainer: {
    marginTop: SPACING.md,
    position: 'relative',
  },
  timelineLine: {
    position: 'absolute',
    left: 24,
    top: 24,
    bottom: 24,
    width: 2,
    backgroundColor: COLORS.cardBorder,
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
