import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Dimensions, TextInput } from 'react-native';
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
import { COLORS, SHADOWS } from '../src/constants/colors';
import { TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../src/constants/typography';
import { Enezi } from '../src/components/mascot/Enezi';
import { SpeechBubble } from '../src/components/ui/SpeechBubble';
import { AnimatedButton } from '../src/components/ui/AnimatedButton';
import { SuccessOverlay } from '../src/components/ui/SuccessOverlay';
import { useOnboardingStore } from '../src/store/onboardingStore';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// UK Energy Suppliers
const UK_SUPPLIERS = [
  'British Gas',
  'EDF Energy',
  'E.ON',
  'Scottish Power',
  'SSE Energy',
  'Octopus Energy',
  'Bulb',
  'OVO Energy',
  'Shell Energy',
  'Utility Warehouse',
  'Other',
];

export default function SupplierInputScreen() {
  const router = useRouter();
  const {
    currentElectricSupplier,
    currentGasSupplier,
    monthlyElectricBill,
    monthlyGasBill,
    setSupplierInfo,
  } = useOnboardingStore();

  const [showSuccess, setShowSuccess] = useState(false);
  const [showElectricDropdown, setShowElectricDropdown] = useState(false);
  const [showGasDropdown, setShowGasDropdown] = useState(false);
  const [electricBill, setElectricBill] = useState(monthlyElectricBill ? monthlyElectricBill.toString() : '');
  const [gasBill, setGasBill] = useState(monthlyGasBill ? monthlyGasBill.toString() : '');
  const [showCharacter, setShowCharacter] = useState(false);

  // Character animation - breathing only in-app, not during signup
  const characterTranslateX = useSharedValue(width + 100);
  const characterScale = useSharedValue(1);

  useEffect(() => {
    setTimeout(() => setShowCharacter(true), 300);
    
    characterTranslateX.value = withTiming(0, { 
      duration: 1200, 
      easing: Easing.out(Easing.cubic) 
    });

    // Breathing animation after character arrives
    setTimeout(() => {
      characterScale.value = withRepeat(
        withSequence(
          withTiming(1.05, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 1200, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      );
    }, 1500);
  }, []);

  const characterStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: characterTranslateX.value },
      { scale: characterScale.value },
    ],
  }));

  const handleClose = () => {
    router.back();
  };

  const handleSave = () => {
    setSupplierInfo({
      currentElectricSupplier,
      currentGasSupplier,
      monthlyElectricBill: parseFloat(electricBill) || 0,
      monthlyGasBill: parseFloat(gasBill) || 0,
    });
    setShowSuccess(true);
  };

  const handleSuccessDismiss = () => {
    setShowSuccess(false);
    router.back();
  };

  const selectElectricSupplier = (supplier: string) => {
    setSupplierInfo({ currentElectricSupplier: supplier });
    setShowElectricDropdown(false);
  };

  const selectGasSupplier = (supplier: string) => {
    setSupplierInfo({ currentGasSupplier: supplier });
    setShowGasDropdown(false);
  };

  const isFormValid = (currentElectricSupplier || currentGasSupplier) && (electricBill || gasBill);

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
          {/* Header */}
          <Animated.View entering={FadeIn.duration(400)} style={styles.header}>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={COLORS.textPrimary} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Your Energy Details</Text>
            <View style={styles.placeholder} />
          </Animated.View>

          {/* Character Section */}
          <Animated.View entering={FadeIn.delay(200).duration(500)} style={styles.characterSection}>
            <SpeechBubble
              message="Add your current suppliers and bills for accurate savings estimates! 💰"
              position="bottom"
              delay={300}
            />
            {showCharacter && (
              <Animated.View style={[styles.characterContainer, characterStyle]}>
                <Enezi size={100} expression="pointing" animated={false} />
              </Animated.View>
            )}
          </Animated.View>

          {/* Electricity Section */}
          <Animated.View entering={FadeInUp.delay(400).duration(500)} style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={[styles.sectionIcon, { backgroundColor: '#FFF3E0' }]}>
                <Ionicons name="flash" size={24} color="#FF9800" />
              </View>
              <Text style={styles.sectionTitle}>Electricity</Text>
            </View>

            {/* Supplier Dropdown */}
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => {
                setShowElectricDropdown(!showElectricDropdown);
                setShowGasDropdown(false);
              }}
            >
              <Text style={currentElectricSupplier ? styles.dropdownText : styles.dropdownPlaceholder}>
                {currentElectricSupplier || 'Select your supplier'}
              </Text>
              <Ionicons
                name={showElectricDropdown ? 'chevron-up' : 'chevron-down'}
                size={20}
                color={COLORS.textSecondary}
              />
            </TouchableOpacity>

            {showElectricDropdown && (
              <View style={styles.dropdownList}>
                <ScrollView style={styles.dropdownScroll} nestedScrollEnabled>
                  {UK_SUPPLIERS.map((supplier) => (
                    <TouchableOpacity
                      key={supplier}
                      style={[
                        styles.dropdownItem,
                        currentElectricSupplier === supplier && styles.dropdownItemSelected,
                      ]}
                      onPress={() => selectElectricSupplier(supplier)}
                    >
                      <Text
                        style={[
                          styles.dropdownItemText,
                          currentElectricSupplier === supplier && styles.dropdownItemTextSelected,
                        ]}
                      >
                        {supplier}
                      </Text>
                      {currentElectricSupplier === supplier && (
                        <Ionicons name="checkmark" size={18} color={COLORS.primary} />
                      )}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}

            {/* Monthly Bill Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Monthly Bill (£)</Text>
              <View style={styles.billInput}>
                <Ionicons name="card" size={20} color={COLORS.textSecondary} style={styles.inputIcon} />
                <Text style={styles.currencySymbol}>£</Text>
                <TextInput
                  style={styles.textInput}
                  value={electricBill}
                  onChangeText={setElectricBill}
                  placeholder="0"
                  placeholderTextColor={COLORS.textMuted}
                  keyboardType="numeric"
                />
              </View>
              <Text style={styles.inputHelper}>Your average monthly electricity cost</Text>
            </View>
          </Animated.View>

          {/* Gas Section */}
          <Animated.View entering={FadeInUp.delay(500).duration(500)} style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={[styles.sectionIcon, { backgroundColor: '#E3F2FD' }]}>
                <Ionicons name="flame" size={24} color="#2196F3" />
              </View>
              <Text style={styles.sectionTitle}>Gas</Text>
            </View>

            {/* Supplier Dropdown */}
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => {
                setShowGasDropdown(!showGasDropdown);
                setShowElectricDropdown(false);
              }}
            >
              <Text style={currentGasSupplier ? styles.dropdownText : styles.dropdownPlaceholder}>
                {currentGasSupplier || 'Select your supplier'}
              </Text>
              <Ionicons
                name={showGasDropdown ? 'chevron-up' : 'chevron-down'}
                size={20}
                color={COLORS.textSecondary}
              />
            </TouchableOpacity>

            {showGasDropdown && (
              <View style={styles.dropdownList}>
                <ScrollView style={styles.dropdownScroll} nestedScrollEnabled>
                  {UK_SUPPLIERS.map((supplier) => (
                    <TouchableOpacity
                      key={supplier}
                      style={[
                        styles.dropdownItem,
                        currentGasSupplier === supplier && styles.dropdownItemSelected,
                      ]}
                      onPress={() => selectGasSupplier(supplier)}
                    >
                      <Text
                        style={[
                          styles.dropdownItemText,
                          currentGasSupplier === supplier && styles.dropdownItemTextSelected,
                        ]}
                      >
                        {supplier}
                      </Text>
                      {currentGasSupplier === supplier && (
                        <Ionicons name="checkmark" size={18} color={COLORS.primary} />
                      )}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}

            {/* Monthly Bill Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Monthly Bill (£)</Text>
              <View style={styles.billInput}>
                <Ionicons name="card" size={20} color={COLORS.textSecondary} style={styles.inputIcon} />
                <Text style={styles.currencySymbol}>£</Text>
                <TextInput
                  style={styles.textInput}
                  value={gasBill}
                  onChangeText={setGasBill}
                  placeholder="0"
                  placeholderTextColor={COLORS.textMuted}
                  keyboardType="numeric"
                />
              </View>
              <Text style={styles.inputHelper}>Your average monthly gas cost</Text>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Bottom CTA */}
      <Animated.View entering={FadeInUp.delay(600).duration(400)} style={styles.bottomSection}>
        <AnimatedButton
          title="Save & Compare Deals"
          onPress={handleSave}
          variant="primary"
          size="large"
          fullWidth
          disabled={!isFormValid}
          icon="flash"
          iconPosition="right"
        />
      </Animated.View>

      {/* Success Overlay */}
      <SuccessOverlay
        visible={showSuccess}
        onDismiss={handleSuccessDismiss}
        title="Details Saved!"
        message="Now let's find you better deals!"
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
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
  },
  closeButton: {
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
  characterSection: {
    alignItems: 'center',
    marginVertical: SPACING.md,
  },
  characterContainer: {
    marginTop: SPACING.sm,
  },
  section: {
    marginTop: SPACING.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sectionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1.5,
    borderColor: COLORS.cardBorder,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    minHeight: 56,
  },
  dropdownText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
  },
  dropdownPlaceholder: {
    ...TYPOGRAPHY.body,
    color: COLORS.textMuted,
  },
  dropdownList: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    marginTop: SPACING.xs,
    marginBottom: SPACING.md,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  dropdownScroll: {
    maxHeight: 220,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
    minHeight: 50,
  },
  dropdownItemSelected: {
    backgroundColor: '#F0EBFF',
  },
  dropdownItemText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
  },
  dropdownItemTextSelected: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  inputContainer: {
    marginTop: SPACING.md,
  },
  inputLabel: {
    ...TYPOGRAPHY.label,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  billInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1.5,
    borderColor: COLORS.cardBorder,
    paddingHorizontal: SPACING.md,
    minHeight: 56,
  },
  inputIcon: {
    marginRight: SPACING.sm,
  },
  currencySymbol: {
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
    marginRight: 4,
  },
  textInput: {
    flex: 1,
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
    height: 44,
    paddingVertical: 0,
  },
  inputHelper: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  bottomSection: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
  },
});
