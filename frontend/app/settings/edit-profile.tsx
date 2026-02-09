import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp, FadeIn } from 'react-native-reanimated';
import { COLORS, SHADOWS } from '../../src/constants/colors';
import { TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../src/constants/typography';
import { Enezi } from '../../src/components/mascot/Enezi';
import { AnimatedButton } from '../../src/components/ui/AnimatedButton';
import { AnimatedInput } from '../../src/components/ui/AnimatedInput';
import { SuccessOverlay } from '../../src/components/ui/SuccessOverlay';
import { useUserStore } from '../../src/store/userStore';
import { Ionicons } from '@expo/vector-icons';

export default function EditProfileScreen() {
  const router = useRouter();
  const { user, setUser } = useUserStore();
  
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [mobileNumber, setMobileNumber] = useState(user?.mobileNumber || '');
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSave = () => {
    const newErrors: Record<string, string> = {};
    
    if (!firstName.trim()) newErrors.firstName = 'First name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setUser({
        ...user!,
        firstName,
        lastName,
        email,
        mobileNumber,
      });
      setShowSuccess(true);
    }
  };

  const handleSuccessDismiss = () => {
    setShowSuccess(false);
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
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
          {/* Header */}
          <Animated.View entering={FadeIn.duration(400)} style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="chevron-back" size={24} color={COLORS.textPrimary} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Edit Profile</Text>
            <View style={styles.placeholder} />
          </Animated.View>

          {/* Enezi */}
          <Animated.View entering={FadeIn.delay(200).duration(500)} style={styles.eneziSection}>
            <Enezi size={100} expression="happy" animated />
            <Text style={styles.eneziMessage}>Update your personal details</Text>
          </Animated.View>

          {/* Form */}
          <Animated.View entering={FadeInUp.delay(300).duration(500)} style={styles.form}>
            <AnimatedInput
              label="First Name"
              icon="person"
              value={firstName}
              onChangeText={setFirstName}
              error={errors.firstName}
              autoCapitalize="words"
            />
            
            <AnimatedInput
              label="Last Name"
              icon="person-outline"
              value={lastName}
              onChangeText={setLastName}
              error={errors.lastName}
              autoCapitalize="words"
            />
            
            <AnimatedInput
              label="Email Address"
              icon="mail"
              value={email}
              onChangeText={setEmail}
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            
            <AnimatedInput
              label="Mobile Number"
              icon="call"
              value={mobileNumber}
              onChangeText={setMobileNumber}
              keyboardType="phone-pad"
            />
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Save Button */}
      <Animated.View entering={FadeInUp.delay(400).duration(400)} style={styles.bottomSection}>
        <AnimatedButton
          title="Save Changes"
          onPress={handleSave}
          variant="primary"
          size="large"
          fullWidth
          icon="checkmark"
          iconPosition="right"
        />
      </Animated.View>

      <SuccessOverlay
        visible={showSuccess}
        onDismiss={handleSuccessDismiss}
        title="Profile Updated!"
        message="Your changes have been saved"
        eneziExpression="celebrating"
        autoHideDuration={2000}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
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
    justifyContent: 'space-between',
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
  headerTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
  },
  placeholder: {
    width: 40,
  },
  eneziSection: {
    alignItems: 'center',
    marginVertical: SPACING.lg,
  },
  eneziMessage: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    marginTop: SPACING.sm,
  },
  form: {
    marginTop: SPACING.md,
  },
  bottomSection: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
  },
});
