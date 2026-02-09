import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp, FadeIn } from 'react-native-reanimated';
import { COLORS, SHADOWS } from '../../src/constants/colors';
import { TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../src/constants/typography';
import { Enezi } from '../../src/components/mascot/Enezi';
import { AnimatedButton } from '../../src/components/ui/AnimatedButton';
import { AnimatedInput } from '../../src/components/ui/AnimatedInput';
import { SelectableCard } from '../../src/components/ui/SelectableCard';
import { SuccessOverlay } from '../../src/components/ui/SuccessOverlay';
import { useUserStore } from '../../src/store/userStore';
import { useOnboardingStore } from '../../src/store/onboardingStore';
import { Ionicons } from '@expo/vector-icons';

const BUSINESS_TYPES = [
  { id: 'cafe', title: 'Cafe / Restaurant', icon: 'cafe' as const },
  { id: 'salon', title: 'Salon / Barbers', icon: 'cut' as const },
  { id: 'shop', title: 'Convenience Store', icon: 'storefront' as const },
  { id: 'mechanic', title: 'Mechanic / Garage', icon: 'build' as const },
  { id: 'groomer', title: 'Dog Groomer', icon: 'paw' as const },
  { id: 'timber', title: 'Timber Merchant', icon: 'construct' as const },
  { id: 'retail', title: 'Retail Shop', icon: 'bag-handle' as const },
  { id: 'office', title: 'Office', icon: 'desktop' as const },
  { id: 'other', title: 'Other', icon: 'ellipsis-horizontal' as const },
];

export default function BusinessDetailsScreen() {
  const router = useRouter();
  const { user, setUser } = useUserStore();
  const { businessStructure, setBusinessDetails } = useOnboardingStore();
  
  const [businessName, setBusinessName] = useState(user?.businessName || '');
  const [postcode, setPostcode] = useState(user?.postcode || '');
  const [selectedType, setSelectedType] = useState(user?.businessType || '');
  const [structure, setStructure] = useState(businessStructure || 'sole_trader');
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSave = () => {
    const newErrors: Record<string, string> = {};
    
    if (!businessName.trim()) newErrors.businessName = 'Business name is required';
    if (!postcode.trim()) newErrors.postcode = 'Postcode is required';
    if (!selectedType) newErrors.businessType = 'Please select a business type';
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setUser({
        ...user!,
        businessName,
        postcode,
        businessType: selectedType,
      });
      setBusinessDetails({ businessStructure: structure });
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
            <Text style={styles.headerTitle}>Business Details</Text>
            <View style={styles.placeholder} />
          </Animated.View>

          {/* Enezi */}
          <Animated.View entering={FadeIn.delay(200).duration(500)} style={styles.eneziSection}>
            <Enezi size={90} expression="pointing" animated />
            <Text style={styles.eneziMessage}>Keep your business info up to date!</Text>
          </Animated.View>

          {/* Business Structure */}
          <Animated.View entering={FadeInUp.delay(300).duration(500)}>
            <Text style={styles.sectionTitle}>Business Structure</Text>
            <View style={styles.structureContainer}>
              <SelectableCard
                title="Sole Trader"
                icon="person"
                selected={structure === 'sole_trader'}
                onPress={() => setStructure('sole_trader')}
                variant="radio"
              />
              <SelectableCard
                title="Limited Company"
                icon="business"
                selected={structure === 'limited'}
                onPress={() => setStructure('limited')}
                variant="radio"
              />
            </View>
          </Animated.View>

          {/* Form */}
          <Animated.View entering={FadeInUp.delay(400).duration(500)} style={styles.form}>
            <AnimatedInput
              label="Business Name"
              icon="storefront"
              value={businessName}
              onChangeText={setBusinessName}
              error={errors.businessName}
              autoCapitalize="words"
            />
            
            <AnimatedInput
              label="Postcode"
              icon="location"
              value={postcode}
              onChangeText={(text) => setPostcode(text.toUpperCase())}
              error={errors.postcode}
              autoCapitalize="characters"
            />
          </Animated.View>

          {/* Business Type */}
          <Animated.View entering={FadeInUp.delay(500).duration(500)}>
            <Text style={styles.sectionTitle}>Business Type</Text>
            {errors.businessType && <Text style={styles.errorText}>{errors.businessType}</Text>}
            <View style={styles.typeContainer}>
              {BUSINESS_TYPES.map((type) => (
                <SelectableCard
                  key={type.id}
                  title={type.title}
                  icon={type.icon}
                  selected={selectedType === type.id}
                  onPress={() => setSelectedType(type.id)}
                  variant="radio"
                />
              ))}
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Save Button */}
      <Animated.View entering={FadeInUp.delay(600).duration(400)} style={styles.bottomSection}>
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
        title="Details Updated!"
        message="Your business info has been saved"
        eneziExpression="cheering"
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
    marginVertical: SPACING.md,
  },
  eneziMessage: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    marginTop: SPACING.sm,
  },
  sectionTitle: {
    ...TYPOGRAPHY.label,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
    marginTop: SPACING.lg,
  },
  structureContainer: {
    gap: SPACING.sm,
  },
  form: {
    marginTop: SPACING.md,
  },
  typeContainer: {
    gap: SPACING.sm,
  },
  errorText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.error,
    marginBottom: SPACING.sm,
  },
  bottomSection: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
  },
});
