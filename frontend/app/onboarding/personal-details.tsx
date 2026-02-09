import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeIn,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SHADOWS } from '../../src/constants/colors';
import { TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../src/constants/typography';
import { Enezi } from '../../src/components/mascot/Enezi';
import { SpeechBubble } from '../../src/components/ui/SpeechBubble';
import { AnimatedButton } from '../../src/components/ui/AnimatedButton';
import { AnimatedInput } from '../../src/components/ui/AnimatedInput';
import { useOnboardingStore } from '../../src/store/onboardingStore';
import { Ionicons } from '@expo/vector-icons';

export default function PersonalDetailsScreen() {
  const router = useRouter();
  const {
    firstName,
    lastName,
    email,
    setPersonalDetails,
    setCurrentStep,
  } = useOnboardingStore();

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleContinue = () => {
    const newErrors: Record<string, string> = {};

    if (!firstName.trim()) newErrors.firstName = 'Please enter your first name';
    if (!lastName.trim()) newErrors.lastName = 'Please enter your last name';
    if (!email.trim()) newErrors.email = 'Please enter your email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setCurrentStep(6);
      router.push('/onboarding/signup');
    }
  };

  const handleBack = () => {
    router.back();
  };

  const isFormValid = firstName.trim() && lastName.trim() && email.trim();

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[COLORS.backgroundLight, '#F0FAF7', COLORS.background]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header with back button */}
          <Animated.View entering={FadeIn.duration(400)} style={styles.header}>
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Ionicons name="chevron-back" size={24} color={COLORS.textPrimary} />
            </TouchableOpacity>
          </Animated.View>

          {/* Title */}
          <Animated.View entering={FadeInDown.delay(100).duration(500)}>
            <Text style={styles.headline}>Just one more thing...</Text>
            <Text style={styles.subheadline}>Personal details for your profile</Text>
          </Animated.View>

          {/* Enezi Section */}
          <Animated.View entering={FadeIn.delay(300).duration(500)} style={styles.eneziSection}>
            <SpeechBubble
              message="Almost there! Personal touch for your profile! 🌟"
              position="bottom"
              delay={400}
            />
            <View style={styles.eneziContainer}>
              <Enezi size={120} expression="excited" animated />
            </View>
          </Animated.View>

          {/* Input Fields */}
          <Animated.View entering={FadeInUp.delay(500).duration(400)} style={styles.inputsContainer}>
            <AnimatedInput
              label="First Name"
              icon="person"
              value={firstName}
              onChangeText={(text) => setPersonalDetails({ firstName: text })}
              error={errors.firstName}
              autoCapitalize="words"
              autoComplete="given-name"
            />

            <AnimatedInput
              label="Last Name"
              icon="person-outline"
              value={lastName}
              onChangeText={(text) => setPersonalDetails({ lastName: text })}
              error={errors.lastName}
              autoCapitalize="words"
              autoComplete="family-name"
            />

            <AnimatedInput
              label="Email Address"
              icon="mail"
              value={email}
              onChangeText={(text) => setPersonalDetails({ email: text })}
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              helperText="We'll send your quotes here"
            />
          </Animated.View>

          {/* Privacy note */}
          <Animated.View entering={FadeInUp.delay(600).duration(400)} style={styles.privacyNote}>
            <Ionicons name="shield-checkmark" size={20} color={COLORS.primaryGreen} />
            <Text style={styles.privacyText}>
              Your data is safe with us. We never share your details with third parties.
            </Text>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Bottom CTA */}
      <Animated.View entering={FadeInUp.delay(700).duration(400)} style={styles.bottomSection}>
        <AnimatedButton
          title="Continue"
          onPress={handleContinue}
          variant="primary"
          size="large"
          fullWidth
          disabled={!isFormValid}
          icon="arrow-forward"
          iconPosition="right"
        />
      </Animated.View>

      {/* Progress indicator */}
      <View style={styles.progressContainer}>
        <View style={styles.progressDot} />
        <View style={styles.progressDot} />
        <View style={styles.progressDot} />
        <View style={styles.progressDot} />
        <View style={styles.progressDot} />
        <View style={[styles.progressDot, styles.progressDotActive]} />
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
  keyboardView: {
    flex: 1,
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
    marginBottom: SPACING.xs,
  },
  subheadline: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  eneziSection: {
    alignItems: 'center',
    marginVertical: SPACING.lg,
  },
  eneziContainer: {
    marginTop: SPACING.md,
  },
  inputsContainer: {
    marginTop: SPACING.md,
  },
  privacyNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F8F3',
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginTop: SPACING.lg,
    gap: SPACING.sm,
  },
  privacyText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    flex: 1,
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
    backgroundColor: COLORS.primaryGreen,
    width: 24,
  },
});
