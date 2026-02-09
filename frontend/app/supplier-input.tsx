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
import { COLORS, SHADOWS } from '../src/constants/colors';
import { TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../src/constants/typography';
import { Enezi } from '../src/components/mascot/Enezi';
import { SpeechBubble } from '../src/components/ui/SpeechBubble';
import { AnimatedButton } from '../src/components/ui/AnimatedButton';
import { AnimatedInput } from '../src/components/ui/AnimatedInput';
import { SuccessOverlay } from '../src/components/ui/SuccessOverlay';
import { useOnboardingStore } from '../src/store/onboardingStore';
import { Ionicons } from '@expo/vector-icons';

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
          {/* Header */}
          <Animated.View entering={FadeIn.duration(400)} style={styles.header}>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={COLORS.textPrimary} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Your Energy Details</Text>
            <View style={styles.placeholder} />
          </Animated.View>

          {/* Enezi Section */}
          <Animated.View entering={FadeIn.delay(200).duration(500)} style={styles.eneziSection}>
            <SpeechBubble
              message="Add your current suppliers and bills for accurate savings estimates! 💰"
              position="bottom"
              delay={300}
            />
            <View style={styles.eneziContainer}>
              <Enezi size={100} expression="pointing" animated />
            </View>
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
              onPress={() => setShowElectricDropdown(!showElectricDropdown)}
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
                      <Ionicons name="checkmark" size={18} color={COLORS.primaryGreen} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Monthly Bill */}
            <AnimatedInput
              label="Monthly Bill (£)"
              icon="card"
              value={electricBill}
              onChangeText={setElectricBill}
              keyboardType="numeric"
              helperText="Your average monthly electricity cost"
            />
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
              onPress={() => setShowGasDropdown(!showGasDropdown)}
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
                      <Ionicons name="checkmark" size={18} color={COLORS.primaryGreen} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Monthly Bill */}
            <AnimatedInput
              label="Monthly Bill (£)"
              icon="card"
              value={gasBill}
              onChangeText={setGasBill}
              keyboardType="numeric"
              helperText="Your average monthly gas cost"
            />
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
  eneziSection: {
    alignItems: 'center',
    marginVertical: SPACING.md,
  },
  eneziContainer: {
    marginTop: SPACING.sm,
  },
  section: {
    marginTop: SPACING.lg,
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
    borderWidth: 2,
    borderColor: COLORS.cardBorder,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOWS.small,
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
    marginBottom: SPACING.md,
    maxHeight: 200,
    ...SHADOWS.medium,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
  },
  dropdownItemSelected: {
    backgroundColor: '#E8F8F3',
  },
  dropdownItemText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
  },
  dropdownItemTextSelected: {
    color: COLORS.primaryGreen,
    fontWeight: '600',
  },
  bottomSection: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
  },
});
