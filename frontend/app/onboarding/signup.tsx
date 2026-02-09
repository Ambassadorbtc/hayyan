import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeIn,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SHADOWS } from '../../src/constants/colors';
import { TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../src/constants/typography';
import { Enezi } from '../../src/components/mascot/Enezi';
import { AnimatedButton } from '../../src/components/ui/AnimatedButton';
import { SuccessOverlay } from '../../src/components/ui/SuccessOverlay';
import { useOnboardingStore } from '../../src/store/onboardingStore';
import { useUserStore } from '../../src/store/userStore';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const EXPO_PUBLIC_BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

export default function SignupScreen() {
  const router = useRouter();
  const {
    firstName,
    lastName,
    email,
    businessName,
    businessType,
    postcode,
    mobileNumber,
    completeOnboarding,
  } = useOnboardingStore();
  const { setUser } = useUserStore();

  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleGoogleSignup = async () => {
    await handleSignup('google');
  };

  const handleEmailSignup = async () => {
    await handleSignup('email');
  };

  const handleSignup = async (method: 'google' | 'email') => {
    setIsLoading(true);

    try {
      // Create user in backend
      const response = await fetch(`${EXPO_PUBLIC_BACKEND_URL}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          first_name: firstName,
          last_name: lastName,
          business_name: businessName,
          business_type: businessType,
          postcode,
          mobile_number: mobileNumber,
          auth_method: method,
        }),
      });

      if (response.ok) {
        const userData = await response.json();
        setUser({
          id: userData.id,
          email: userData.email,
          firstName: userData.first_name,
          lastName: userData.last_name,
          businessName: userData.business_name,
          businessType: userData.business_type,
          postcode: userData.postcode,
          mobileNumber: userData.mobile_number,
        });
        completeOnboarding(userData.id);
        setShowSuccess(true);
      } else {
        // For demo purposes, create local user if backend fails
        const userId = `user_${Date.now()}`;
        setUser({
          id: userId,
          email,
          firstName,
          lastName,
          businessName,
          businessType,
          postcode,
          mobileNumber,
        });
        completeOnboarding(userId);
        setShowSuccess(true);
      }
    } catch (error) {
      console.error('Signup error:', error);
      // For demo purposes, create local user if backend fails
      const userId = `user_${Date.now()}`;
      setUser({
        id: userId,
        email,
        firstName,
        lastName,
        businessName,
        businessType,
        postcode,
        mobileNumber,
      });
      completeOnboarding(userId);
      setShowSuccess(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessDismiss = () => {
    setShowSuccess(false);
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[COLORS.backgroundLight, '#F0FAF7', COLORS.background]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <View style={styles.content}>
        {/* Header with back button */}
        <Animated.View entering={FadeIn.duration(400)} style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
        </Animated.View>

        {/* Title */}
        <Animated.View entering={FadeInDown.delay(100).duration(500)}>
          <Text style={styles.headline}>Create your free Enerzo account</Text>
          <Text style={styles.subheadline}>Get instant access to energy savings</Text>
        </Animated.View>

        {/* Enezi Section */}
        <Animated.View entering={FadeIn.delay(300).duration(500)} style={styles.eneziSection}>
          <Enezi size={180} expression="celebrating" animated />
        </Animated.View>

        {/* Auth Buttons */}
        <Animated.View entering={FadeInUp.delay(500).duration(400)} style={styles.authContainer}>
          {/* Google Sign Up */}
          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleGoogleSignup}
            disabled={isLoading}
          >
            <View style={styles.googleIconContainer}>
              <Text style={styles.googleIcon}>G</Text>
            </View>
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Email Sign Up */}
          <AnimatedButton
            title="Sign up with Email"
            onPress={handleEmailSignup}
            variant="outline"
            size="large"
            fullWidth
            icon="mail"
            iconPosition="left"
            disabled={isLoading}
          />
        </Animated.View>

        {/* Terms */}
        <Animated.View entering={FadeInUp.delay(600).duration(400)} style={styles.termsContainer}>
          <Text style={styles.termsText}>
            By signing up, you agree to our{' '}
            <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
            <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>
        </Animated.View>
      </View>

      {/* Progress indicator */}
      <View style={styles.progressContainer}>
        <View style={styles.progressDot} />
        <View style={styles.progressDot} />
        <View style={styles.progressDot} />
        <View style={styles.progressDot} />
        <View style={styles.progressDot} />
        <View style={styles.progressDot} />
        <View style={[styles.progressDot, styles.progressDotActive]} />
      </View>

      {/* Success Overlay */}
      <SuccessOverlay
        visible={showSuccess}
        onDismiss={handleSuccessDismiss}
        title="Welcome aboard!"
        message="Let's start zapping those bills! ⚡"
        eneziExpression="celebrating"
        autoHideDuration={3000}
      />
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
    marginVertical: SPACING.xl,
  },
  authContainer: {
    gap: SPACING.md,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderWidth: 2,
    borderColor: COLORS.cardBorder,
    ...SHADOWS.small,
  },
  googleIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.textLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  googleIcon: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4285F4',
  },
  googleButtonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.textPrimary,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.sm,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.cardBorder,
  },
  dividerText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textMuted,
    marginHorizontal: SPACING.md,
  },
  termsContainer: {
    marginTop: SPACING.xl,
    paddingHorizontal: SPACING.md,
  },
  termsText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 20,
  },
  termsLink: {
    color: COLORS.primaryGreen,
    fontWeight: '600',
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
