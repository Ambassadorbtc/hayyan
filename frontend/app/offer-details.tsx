import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
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
import { COLORS, SHADOWS } from '../src/constants/colors';
import { TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../src/constants/typography';
import { Enezi } from '../src/components/mascot/Enezi';
import { AnimatedButton } from '../src/components/ui/AnimatedButton';
import { SuccessOverlay } from '../src/components/ui/SuccessOverlay';
import { Ionicons } from '@expo/vector-icons';

export default function OfferDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [showSuccess, setShowSuccess] = useState(false);

  const supplierName = params.supplierName as string || 'Energy Supplier';
  const supplierLogo = params.supplierLogo as string || '⚡';
  const supplierColor = params.supplierColor as string || COLORS.primaryGreen;
  const supplierRating = parseFloat(params.supplierRating as string) || 4.5;
  const savings = parseInt(params.savings as string) || 15;
  const monthlyBill = parseInt(params.monthlyBill as string) || 200;

  const annualSavings = Math.round((monthlyBill * 12 * savings) / 100);
  const newMonthlyBill = Math.round(monthlyBill * (1 - savings / 100));

  // Animation values
  const savingsScale = useSharedValue(1);

  useEffect(() => {
    savingsScale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1,
      true
    );
  }, []);

  const savingsStyle = useAnimatedStyle(() => ({
    transform: [{ scale: savingsScale.value }],
  }));

  const handleClose = () => {
    router.back();
  };

  const handleGetQuote = () => {
    setShowSuccess(true);
  };

  const handleSuccessDismiss = () => {
    setShowSuccess(false);
    // In a real app, this would navigate to the supplier's website
    // Linking.openURL(`https://example.com/switch/${params.supplierId}`);
  };

  const features = [
    { icon: 'leaf', title: '100% Renewable', subtitle: 'Green energy sources' },
    { icon: 'shield-checkmark', title: 'Price Lock', subtitle: 'Fixed rates for 12 months' },
    { icon: 'flash', title: 'Smart Meters', subtitle: 'Free installation included' },
    { icon: 'call', title: '24/7 Support', subtitle: 'UK-based customer service' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View entering={FadeIn.duration(400)} style={styles.header}>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
        </Animated.View>

        {/* Supplier Hero */}
        <Animated.View entering={FadeInDown.delay(200).duration(500)}>
          <LinearGradient
            colors={[supplierColor, `${supplierColor}CC`]}
            style={styles.heroCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.heroContent}>
              <View style={styles.supplierLogoLarge}>
                <Text style={styles.supplierLogoText}>{supplierLogo}</Text>
              </View>
              <Text style={styles.supplierName}>{supplierName}</Text>
              <View style={styles.ratingContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Ionicons
                    key={star}
                    name={star <= Math.floor(supplierRating) ? 'star' : 'star-outline'}
                    size={18}
                    color="#FFD700"
                  />
                ))}
                <Text style={styles.ratingText}>{supplierRating}</Text>
              </View>
            </View>
            <View style={styles.heroEnezi}>
              <Enezi size={80} expression="excited" animated />
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Savings Card */}
        <Animated.View entering={FadeInUp.delay(400).duration(500)}>
          <Animated.View style={[styles.savingsCard, savingsStyle]}>
            <View style={styles.savingsHeader}>
              <Text style={styles.savingsLabel}>Your Potential Savings</Text>
              <View style={styles.savingsBadge}>
                <Ionicons name="trending-up" size={14} color={COLORS.primaryGreen} />
                <Text style={styles.savingsPercent}>{savings}% off</Text>
              </View>
            </View>
            <View style={styles.savingsRow}>
              <View style={styles.savingsItem}>
                <Text style={styles.savingsItemLabel}>Annual Savings</Text>
                <Text style={styles.savingsItemValue}>£{annualSavings}</Text>
              </View>
              <View style={styles.savingsDivider} />
              <View style={styles.savingsItem}>
                <Text style={styles.savingsItemLabel}>New Monthly</Text>
                <Text style={styles.savingsItemValue}>£{newMonthlyBill}</Text>
              </View>
            </View>
          </Animated.View>
        </Animated.View>

        {/* Features */}
        <Animated.View entering={FadeInUp.delay(600).duration(500)} style={styles.section}>
          <Text style={styles.sectionTitle}>What's Included</Text>
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <View key={feature.title} style={styles.featureCard}>
                <View style={[styles.featureIcon, { backgroundColor: `${supplierColor}20` }]}>
                  <Ionicons name={feature.icon as any} size={24} color={supplierColor} />
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureSubtitle}>{feature.subtitle}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* How it Works */}
        <Animated.View entering={FadeInUp.delay(800).duration(500)} style={styles.section}>
          <Text style={styles.sectionTitle}>How Switching Works</Text>
          <View style={styles.stepsCard}>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Get Your Quote</Text>
                <Text style={styles.stepText}>We'll prepare a personalized quote based on your usage</Text>
              </View>
            </View>
            <View style={styles.stepLine} />
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Confirm Switch</Text>
                <Text style={styles.stepText}>Review and accept your new tariff</Text>
              </View>
            </View>
            <View style={styles.stepLine} />
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Start Saving</Text>
                <Text style={styles.stepText}>Switch completes in 2-3 weeks - no interruption!</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Trust Note */}
        <Animated.View entering={FadeInUp.delay(1000).duration(500)} style={styles.trustNote}>
          <Ionicons name="shield-checkmark" size={24} color={COLORS.primaryGreen} />
          <Text style={styles.trustText}>
            Your supply won't be interrupted during the switch. It's regulated by Ofgem.
          </Text>
        </Animated.View>
      </ScrollView>

      {/* Bottom CTA */}
      <Animated.View entering={FadeInUp.delay(1200).duration(400)} style={styles.bottomSection}>
        <AnimatedButton
          title="Get My Quote"
          onPress={handleGetQuote}
          variant="coral"
          size="large"
          fullWidth
          pulsing
          icon="arrow-forward"
          iconPosition="right"
        />
        <Text style={styles.ctaSubtext}>Free, no obligation quote</Text>
      </Animated.View>

      {/* Success Overlay */}
      <SuccessOverlay
        visible={showSuccess}
        onDismiss={handleSuccessDismiss}
        title="Quote Requested!"
        message={`${supplierName} will contact you within 24 hours`}
        eneziExpression="celebrating"
        autoHideDuration={3000}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
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
  heroCard: {
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...SHADOWS.large,
  },
  heroContent: {
    flex: 1,
  },
  supplierLogoLarge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  supplierLogoText: {
    fontSize: 32,
  },
  supplierName: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textLight,
    marginBottom: SPACING.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ratingText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textLight,
    marginLeft: SPACING.xs,
  },
  heroEnezi: {
    marginLeft: SPACING.md,
  },
  savingsCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginTop: SPACING.lg,
    ...SHADOWS.medium,
  },
  savingsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  savingsLabel: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
  },
  savingsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F8F3',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.full,
    gap: 4,
  },
  savingsPercent: {
    ...TYPOGRAPHY.label,
    color: COLORS.primaryGreen,
  },
  savingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  savingsItem: {
    flex: 1,
    alignItems: 'center',
  },
  savingsItemLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textMuted,
    marginBottom: 4,
  },
  savingsItemValue: {
    ...TYPOGRAPHY.h2,
    color: COLORS.primaryGreen,
  },
  savingsDivider: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.cardBorder,
  },
  section: {
    marginTop: SPACING.xl,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  featureCard: {
    width: '48%',
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    ...SHADOWS.small,
  },
  featureIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  featureTitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  featureSubtitle: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  stepsCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    ...SHADOWS.small,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primaryGreen,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  stepNumberText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textLight,
    fontWeight: '700',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  stepText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  stepLine: {
    width: 2,
    height: 20,
    backgroundColor: COLORS.cardBorder,
    marginLeft: 15,
    marginVertical: SPACING.xs,
  },
  trustNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F8F3',
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginTop: SPACING.xl,
    gap: SPACING.sm,
  },
  trustText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    flex: 1,
  },
  bottomSection: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
    alignItems: 'center',
  },
  ctaSubtext: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textMuted,
    marginTop: SPACING.xs,
  },
});
