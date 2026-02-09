import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, RefreshControl } from 'react-native';
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
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SHADOWS } from '../../src/constants/colors';
import { TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../src/constants/typography';
import { Enezi } from '../../src/components/mascot/Enezi';
import { AnimatedButton } from '../../src/components/ui/AnimatedButton';
import { useUserStore } from '../../src/store/userStore';
import { useOnboardingStore } from '../../src/store/onboardingStore';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function DashboardScreen() {
  const router = useRouter();
  const { user } = useUserStore();
  const { currentElectricSupplier, currentGasSupplier, monthlyElectricBill, monthlyGasBill } = useOnboardingStore();
  const [refreshing, setRefreshing] = useState(false);
  const [potentialSavings, setPotentialSavings] = useState(0);

  // Animation values
  const savingsCount = useSharedValue(0);
  const pulseScale = useSharedValue(1);

  useEffect(() => {
    // Calculate potential savings (mock calculation)
    const totalBill = monthlyElectricBill + monthlyGasBill;
    const savings = Math.round(totalBill * 0.25 * 12); // 25% annual savings estimate
    setPotentialSavings(savings || 450); // Default savings if no bills entered

    // Animate savings counter
    savingsCount.value = withTiming(savings || 450, { duration: 2000, easing: Easing.out(Easing.exp) });

    // Pulse animation for savings card
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.02, { duration: 1500 }),
        withTiming(1, { duration: 1500 })
      ),
      -1,
      true
    );
  }, [monthlyElectricBill, monthlyGasBill]);

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setRefreshing(false);
  };

  const handleAddSupplier = () => {
    router.push('/supplier-input');
  };

  const handleCompare = () => {
    router.push('/supplier-comparison');
  };

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  const hasSupplierInfo = currentElectricSupplier || currentGasSupplier;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.primaryGreen}
            colors={[COLORS.primaryGreen]}
          />
        }
      >
        {/* Header */}
        <Animated.View entering={FadeIn.duration(400)} style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hey {user?.firstName || 'there'}! 👋</Text>
            <Text style={styles.subtitle}>Let's save you some money</Text>
          </View>
          <View style={styles.headerRight}>
            <Enezi size={60} expression="happy" animated />
          </View>
        </Animated.View>

        {/* Savings Potential Card */}
        <Animated.View entering={FadeInDown.delay(200).duration(500)}>
          <Animated.View style={[styles.savingsCard, pulseStyle]}>
            <LinearGradient
              colors={['#00A676', '#00C08B']}
              style={styles.savingsGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.savingsContent}>
                <Text style={styles.savingsLabel}>Potential Annual Savings</Text>
                <View style={styles.savingsAmountContainer}>
                  <Text style={styles.currencySymbol}>£</Text>
                  <Text style={styles.savingsAmount}>{potentialSavings}</Text>
                </View>
                <Text style={styles.savingsSubtext}>Based on average UK business savings</Text>
              </View>
              <View style={styles.savingsIcon}>
                <Ionicons name="trending-up" size={48} color="rgba(255,255,255,0.3)" />
              </View>
            </LinearGradient>
          </Animated.View>
        </Animated.View>

        {/* Current Supplier Section */}
        <Animated.View entering={FadeInUp.delay(400).duration(500)} style={styles.section}>
          <Text style={styles.sectionTitle}>Your Current Suppliers</Text>

          {hasSupplierInfo ? (
            <View style={styles.supplierCards}>
              {currentElectricSupplier && (
                <View style={styles.supplierCard}>
                  <View style={[styles.supplierIcon, { backgroundColor: '#FFF3E0' }]}>
                    <Ionicons name="flash" size={24} color="#FF9800" />
                  </View>
                  <View style={styles.supplierInfo}>
                    <Text style={styles.supplierType}>Electricity</Text>
                    <Text style={styles.supplierName}>{currentElectricSupplier}</Text>
                    {monthlyElectricBill > 0 && (
                      <Text style={styles.supplierBill}>£{monthlyElectricBill}/month</Text>
                    )}
                  </View>
                </View>
              )}

              {currentGasSupplier && (
                <View style={styles.supplierCard}>
                  <View style={[styles.supplierIcon, { backgroundColor: '#E3F2FD' }]}>
                    <Ionicons name="flame" size={24} color="#2196F3" />
                  </View>
                  <View style={styles.supplierInfo}>
                    <Text style={styles.supplierType}>Gas</Text>
                    <Text style={styles.supplierName}>{currentGasSupplier}</Text>
                    {monthlyGasBill > 0 && (
                      <Text style={styles.supplierBill}>£{monthlyGasBill}/month</Text>
                    )}
                  </View>
                </View>
              )}

              <TouchableOpacity style={styles.editButton} onPress={handleAddSupplier}>
                <Ionicons name="pencil" size={16} color={COLORS.primaryGreen} />
                <Text style={styles.editButtonText}>Edit Details</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.addSupplierCard} onPress={handleAddSupplier}>
              <View style={styles.addSupplierContent}>
                <View style={styles.addSupplierIcon}>
                  <Ionicons name="add" size={32} color={COLORS.primaryGreen} />
                </View>
                <Text style={styles.addSupplierTitle}>Add Your Current Suppliers</Text>
                <Text style={styles.addSupplierSubtext}>Enter your gas and electricity details to get accurate quotes</Text>
              </View>
            </TouchableOpacity>
          )}
        </Animated.View>

        {/* Quick Actions */}
        <Animated.View entering={FadeInUp.delay(600).duration(500)} style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>

          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionCard} onPress={handleCompare}>
              <LinearGradient
                colors={['#00A3FF', '#00D4FF']}
                style={styles.actionGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="swap-horizontal" size={28} color={COLORS.textLight} />
              </LinearGradient>
              <Text style={styles.actionTitle}>Compare Deals</Text>
              <Text style={styles.actionSubtext}>Find better rates</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard} onPress={handleAddSupplier}>
              <LinearGradient
                colors={['#FF4D4D', '#FF6B6B']}
                style={styles.actionGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="receipt" size={28} color={COLORS.textLight} />
              </LinearGradient>
              <Text style={styles.actionTitle}>Add Bills</Text>
              <Text style={styles.actionSubtext}>Enter your usage</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Enezi Tip */}
        <Animated.View entering={FadeInUp.delay(800).duration(500)} style={styles.tipCard}>
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>💡 Enezi's Tip</Text>
            <Text style={styles.tipText}>
              Did you know? UK businesses overpay on energy by an average of £600 per year. Let me help you find better deals!
            </Text>
          </View>
          <View style={styles.tipEnezi}>
            <Enezi size={70} expression="pointing" animated />
          </View>
        </Animated.View>

        {/* CTA Button */}
        <Animated.View entering={FadeInUp.delay(1000).duration(500)} style={styles.ctaContainer}>
          <AnimatedButton
            title="Compare Energy Deals Now"
            onPress={handleCompare}
            variant="primary"
            size="large"
            fullWidth
            pulsing
            icon="flash"
            iconPosition="right"
          />
        </Animated.View>
      </ScrollView>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.lg,
  },
  greeting: {
    ...TYPOGRAPHY.h2,
    color: COLORS.textPrimary,
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  headerRight: {
    alignItems: 'center',
  },
  savingsCard: {
    borderRadius: BORDER_RADIUS.xl,
    overflow: 'hidden',
    ...SHADOWS.large,
  },
  savingsGradient: {
    padding: SPACING.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  savingsContent: {
    flex: 1,
  },
  savingsLabel: {
    ...TYPOGRAPHY.label,
    color: 'rgba(255,255,255,0.8)',
  },
  savingsAmountContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: SPACING.sm,
  },
  currencySymbol: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textLight,
    marginTop: 8,
    marginRight: 4,
  },
  savingsAmount: {
    fontSize: 48,
    fontWeight: '700',
    color: COLORS.textLight,
  },
  savingsSubtext: {
    ...TYPOGRAPHY.caption,
    color: 'rgba(255,255,255,0.7)',
  },
  savingsIcon: {
    marginLeft: SPACING.md,
  },
  section: {
    marginTop: SPACING.xl,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  supplierCards: {
    gap: SPACING.sm,
  },
  supplierCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    ...SHADOWS.small,
  },
  supplierIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  supplierInfo: {
    flex: 1,
  },
  supplierType: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textMuted,
  },
  supplierName: {
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  supplierBill: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.primaryGreen,
    marginTop: 2,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
    gap: SPACING.xs,
  },
  editButtonText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.primaryGreen,
    fontWeight: '600',
  },
  addSupplierCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: COLORS.primaryGreen,
    padding: SPACING.lg,
    ...SHADOWS.small,
  },
  addSupplierContent: {
    alignItems: 'center',
  },
  addSupplierIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E8F8F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  addSupplierTitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
    fontWeight: '600',
    marginBottom: 4,
  },
  addSupplierSubtext: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  actionCard: {
    flex: 1,
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    alignItems: 'center',
    ...SHADOWS.small,
  },
  actionGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  actionTitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  actionSubtext: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF9E6',
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginTop: SPACING.xl,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.highlightYellow,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    ...TYPOGRAPHY.label,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  tipText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  tipEnezi: {
    marginLeft: SPACING.sm,
  },
  ctaContainer: {
    marginTop: SPACING.xl,
  },
});
