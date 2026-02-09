import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeIn,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SHADOWS } from '../../src/constants/colors';
import { TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../src/constants/typography';
import { Enezi } from '../../src/components/mascot/Enezi';
import { AnimatedButton } from '../../src/components/ui/AnimatedButton';
import { useOnboardingStore } from '../../src/store/onboardingStore';
import { Ionicons } from '@expo/vector-icons';

// UK Energy Suppliers
const UK_SUPPLIERS = [
  { id: 'octopus', name: 'Octopus Energy', logo: '🐙', color: '#FF00FF', rating: 4.8, savings: 15 },
  { id: 'bulb', name: 'Bulb', logo: '💡', color: '#00D68F', rating: 4.5, savings: 12 },
  { id: 'ovo', name: 'OVO Energy', logo: '🌿', color: '#00A676', rating: 4.6, savings: 18 },
  { id: 'edf', name: 'EDF Energy', logo: '⚡', color: '#FF6600', rating: 4.2, savings: 10 },
  { id: 'british_gas', name: 'British Gas', logo: '🔥', color: '#003087', rating: 4.0, savings: 8 },
  { id: 'shell', name: 'Shell Energy', logo: '🐚', color: '#FFD700', rating: 4.3, savings: 14 },
  { id: 'eon', name: 'E.ON Next', logo: '🌟', color: '#E30613', rating: 4.4, savings: 11 },
  { id: 'scottish_power', name: 'Scottish Power', logo: '🏴‍☠️', color: '#00529B', rating: 4.1, savings: 9 },
];

interface SupplierCardProps {
  supplier: typeof UK_SUPPLIERS[0];
  monthlyBill: number;
  index: number;
  onPress: () => void;
}

const SupplierCard: React.FC<SupplierCardProps> = ({ supplier, monthlyBill, index, onPress }) => {
  const scale = useSharedValue(1);
  const annualSavings = Math.round((monthlyBill * 12 * supplier.savings) / 100);

  const handlePressIn = () => {
    scale.value = withSpring(0.98, { damping: 15, stiffness: 400 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 400 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View entering={FadeInUp.delay(200 + index * 100).duration(400)}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        <Animated.View style={[styles.supplierCard, animatedStyle]}>
          <View style={styles.supplierLeft}>
            <View style={[styles.supplierLogo, { backgroundColor: `${supplier.color}20` }]}>
              <Text style={styles.supplierLogoText}>{supplier.logo}</Text>
            </View>
            <View style={styles.supplierInfo}>
              <Text style={styles.supplierName}>{supplier.name}</Text>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={14} color="#FFD700" />
                <Text style={styles.ratingText}>{supplier.rating}</Text>
              </View>
            </View>
          </View>

          <View style={styles.supplierRight}>
            <View style={styles.savingsBadge}>
              <Text style={styles.savingsPercentText}>Save {supplier.savings}%</Text>
            </View>
            <Text style={styles.savingsAmount}>£{annualSavings}/yr</Text>
          </View>

          <Ionicons name="chevron-forward" size={20} color={COLORS.textMuted} />
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function CompareScreen() {
  const router = useRouter();
  const { monthlyElectricBill, monthlyGasBill, currentElectricSupplier, currentGasSupplier } = useOnboardingStore();
  const [sortBy, setSortBy] = useState<'savings' | 'rating'>('savings');

  const totalMonthlyBill = monthlyElectricBill + monthlyGasBill || 200; // Default if not set

  const sortedSuppliers = [...UK_SUPPLIERS].sort((a, b) => {
    if (sortBy === 'savings') return b.savings - a.savings;
    return b.rating - a.rating;
  });

  const handleSupplierPress = (supplier: typeof UK_SUPPLIERS[0]) => {
    router.push({
      pathname: '/offer-details',
      params: {
        supplierId: supplier.id,
        supplierName: supplier.name,
        supplierLogo: supplier.logo,
        supplierColor: supplier.color,
        supplierRating: supplier.rating.toString(),
        savings: supplier.savings.toString(),
        monthlyBill: totalMonthlyBill.toString(),
      },
    });
  };

  const handleAddBills = () => {
    router.push('/supplier-input');
  };

  const hasSupplierInfo = currentElectricSupplier || currentGasSupplier;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View entering={FadeIn.duration(400)} style={styles.header}>
          <Text style={styles.title}>Compare Deals</Text>
          <Text style={styles.subtitle}>Find the best energy rates for your business</Text>
        </Animated.View>

        {/* Bill Summary Card */}
        <Animated.View entering={FadeInDown.delay(200).duration(500)}>
          <View style={styles.billCard}>
            <View style={styles.billContent}>
              <Enezi size={70} expression="pointing" animated />
              <View style={styles.billInfo}>
                <Text style={styles.billLabel}>Your Current Monthly Bill</Text>
                <Text style={styles.billAmount}>£{totalMonthlyBill}</Text>
                <Text style={styles.billSubtext}>
                  {hasSupplierInfo ? 'Based on your details' : 'Estimated average'}
                </Text>
              </View>
            </View>
            {!hasSupplierInfo && (
              <TouchableOpacity style={styles.addBillButton} onPress={handleAddBills}>
                <Ionicons name="add-circle" size={18} color={COLORS.primaryGreen} />
                <Text style={styles.addBillText}>Add your bills for accurate quotes</Text>
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>

        {/* Sort Options */}
        <Animated.View entering={FadeInUp.delay(300).duration(400)} style={styles.sortContainer}>
          <Text style={styles.sortLabel}>Sort by:</Text>
          <View style={styles.sortButtons}>
            <TouchableOpacity
              style={[styles.sortButton, sortBy === 'savings' && styles.sortButtonActive]}
              onPress={() => setSortBy('savings')}
            >
              <Ionicons
                name="trending-up"
                size={16}
                color={sortBy === 'savings' ? COLORS.textLight : COLORS.textSecondary}
              />
              <Text style={[styles.sortButtonText, sortBy === 'savings' && styles.sortButtonTextActive]}>
                Best Savings
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sortButton, sortBy === 'rating' && styles.sortButtonActive]}
              onPress={() => setSortBy('rating')}
            >
              <Ionicons
                name="star"
                size={16}
                color={sortBy === 'rating' ? COLORS.textLight : COLORS.textSecondary}
              />
              <Text style={[styles.sortButtonText, sortBy === 'rating' && styles.sortButtonTextActive]}>
                Top Rated
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Suppliers List */}
        <View style={styles.suppliersList}>
          {sortedSuppliers.map((supplier, index) => (
            <SupplierCard
              key={supplier.id}
              supplier={supplier}
              monthlyBill={totalMonthlyBill}
              index={index}
              onPress={() => handleSupplierPress(supplier)}
            />
          ))}
        </View>

        {/* Enezi Tip */}
        <Animated.View entering={FadeInUp.delay(900).duration(500)} style={styles.tipCard}>
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>💡 Pro Tip</Text>
            <Text style={styles.tipText}>
              Switching usually takes 2-3 weeks and your supply won't be interrupted!
            </Text>
          </View>
          <Enezi size={60} expression="winking" animated />
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
    paddingVertical: SPACING.lg,
  },
  title: {
    ...TYPOGRAPHY.h2,
    color: COLORS.textPrimary,
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  billCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    ...SHADOWS.medium,
  },
  billContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  billInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  billLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textMuted,
  },
  billAmount: {
    ...TYPOGRAPHY.h2,
    color: COLORS.textPrimary,
  },
  billSubtext: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  addBillButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: SPACING.md,
    marginTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.cardBorder,
    gap: SPACING.xs,
  },
  addBillText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.primaryGreen,
    fontWeight: '600',
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.lg,
    marginBottom: SPACING.md,
  },
  sortLabel: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    marginRight: SPACING.sm,
  },
  sortButtons: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    gap: SPACING.xs,
  },
  sortButtonActive: {
    backgroundColor: COLORS.primaryGreen,
    borderColor: COLORS.primaryGreen,
  },
  sortButtonText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  },
  sortButtonTextActive: {
    color: COLORS.textLight,
  },
  suppliersList: {
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
  supplierLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  supplierLogo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  supplierLogoText: {
    fontSize: 24,
  },
  supplierInfo: {
    flex: 1,
  },
  supplierName: {
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    gap: 4,
  },
  ratingText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  supplierRight: {
    alignItems: 'flex-end',
    marginRight: SPACING.sm,
  },
  savingsBadge: {
    backgroundColor: '#E8F8F3',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
  },
  savingsPercentText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.primaryGreen,
    fontWeight: '600',
  },
  savingsAmount: {
    ...TYPOGRAPHY.body,
    color: COLORS.primaryGreen,
    fontWeight: '700',
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
    alignItems: 'center',
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
});
