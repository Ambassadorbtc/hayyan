import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
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
import { AnimatedInput } from '../../src/components/ui/AnimatedInput';
import { SelectableCard } from '../../src/components/ui/SelectableCard';
import { SuccessOverlay } from '../../src/components/ui/SuccessOverlay';
import { useOnboardingStore } from '../../src/store/onboardingStore';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function BusinessDetailsScreen() {
  const router = useRouter();
  const {
    businessStructure,
    businessName,
    postcode,
    mobileNumber,
    setBusinessDetails,
    setCurrentStep,
  } = useOnboardingStore();

  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showCharacter, setShowCharacter] = useState(false);

  // Character animation
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

  const handleContinue = () => {
    const newErrors: Record<string, string> = {};

    if (!businessStructure) newErrors.businessStructure = 'Please select a business structure';
    if (!businessName.trim()) newErrors.businessName = 'Please enter your business name';
    if (!postcode.trim()) newErrors.postcode = 'Please enter your postcode';
    if (!mobileNumber.trim()) newErrors.mobileNumber = 'Please enter your mobile number';
    else if (!/^\+?[0-9]{10,14}$/.test(mobileNumber.replace(/\s/g, ''))) {
      newErrors.mobileNumber = 'Please enter a valid mobile number';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setShowSuccess(true);
    }
  };

  const handleSuccessDismiss = () => {
    setShowSuccess(false);
    setCurrentStep(5);
    router.push('/onboarding/personal-details');
  };

  const handleBack = () => {
    router.back();
  };

  const isFormValid = businessStructure && businessName.trim() && postcode.trim() && mobileNumber.trim();

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[COLORS.backgroundLight, '#E8E0FF', COLORS.background]}
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
            <Text style={styles.headline}>Tell us a bit about your business</Text>
          </Animated.View>

          {/* Character Section */}
          <Animated.View entering={FadeIn.delay(300).duration(500)} style={styles.characterSection}>
            <SpeechBubble
              message="Quick details to get accurate quotes! 📝"
              position="bottom"
              delay={400}
            />
            {showCharacter && (
              <Animated.View style={[styles.characterContainer, characterStyle]}>
                <Enezi size={100} expression="happy" animated={false} />
              </Animated.View>
            )}
          </Animated.View>

          {/* Business Structure */}
          <Animated.View entering={FadeInUp.delay(400).duration(400)}>
            <Text style={styles.sectionLabel}>Business Structure</Text>
            <View style={styles.structureContainer}>
              <SelectableCard
                title="Sole Trader"
                icon="person"
                selected={businessStructure === 'sole_trader'}
                onPress={() => setBusinessDetails({ businessStructure: 'sole_trader' })}
                variant="radio"
              />
              <SelectableCard
                title="Limited Company"
                icon="business"
                selected={businessStructure === 'limited'}
                onPress={() => setBusinessDetails({ businessStructure: 'limited' })}
                variant="radio"
              />
            </View>
            {errors.businessStructure && (
              <Text style={styles.errorText}>{errors.businessStructure}</Text>
            )}
          </Animated.View>

          {/* Input Fields */}
          <Animated.View entering={FadeInUp.delay(500).duration(400)} style={styles.inputsContainer}>
            <AnimatedInput
              label="Business Name"
              icon="storefront"
              value={businessName}
              onChangeText={(text) => setBusinessDetails({ businessName: text })}
              error={errors.businessName}
              autoCapitalize="words"
            />

            <AnimatedInput
              label="Postcode"
              icon="location"
              value={postcode}
              onChangeText={(text) => setBusinessDetails({ postcode: text.toUpperCase() })}
              error={errors.postcode}
              autoCapitalize="characters"
              helperText="For finding suppliers in your area"
            />

            <AnimatedInput
              label="Mobile Number"
              icon="call"
              value={mobileNumber}
              onChangeText={(text) => setBusinessDetails({ mobileNumber: text })}
              error={errors.mobileNumber}
              keyboardType="phone-pad"
              helperText="We'll never spam you"
            />
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Bottom CTA */}
      <Animated.View entering={FadeInUp.delay(600).duration(400)} style={styles.bottomSection}>
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
        <View style={[styles.progressDot, styles.progressDotActive]} />
        <View style={styles.progressDot} />
        <View style={styles.progressDot} />
      </View>

      {/* Success Overlay */}
      <SuccessOverlay
        visible={showSuccess}
        onDismiss={handleSuccessDismiss}
        title="Brilliant!"
        message="Your business details look great!"
        eneziExpression="cheering"
        autoHideDuration={2000}
      />
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
    marginBottom: SPACING.sm,
  },
  characterSection: {
    alignItems: 'center',
    marginVertical: SPACING.md,
  },
  characterContainer: {
    marginTop: SPACING.sm,
  },
  sectionLabel: {
    ...TYPOGRAPHY.label,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
    marginTop: SPACING.md,
  },
  structureContainer: {
    gap: SPACING.sm,
  },
  inputsContainer: {
    marginTop: SPACING.md,
  },
  errorText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.error,
    marginTop: SPACING.xs,
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
