import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp, FadeIn } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SHADOWS } from '../../src/constants/colors';
import { TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../src/constants/typography';
import { Enezi } from '../../src/components/mascot/Enezi';
import { AnimatedButton } from '../../src/components/ui/AnimatedButton';
import { useUserStore } from '../../src/store/userStore';
import { useOnboardingStore } from '../../src/store/onboardingStore';
import { Ionicons } from '@expo/vector-icons';

const BUSINESS_TYPE_LABELS: Record<string, string> = {
  cafe: 'Cafe / Restaurant',
  salon: 'Salon / Barbers',
  shop: 'Convenience Store',
  mechanic: 'Mechanic / Garage',
  groomer: 'Dog Groomer',
  timber: 'Timber Merchant',
  retail: 'Retail Shop',
  office: 'Office',
  other: 'Other',
};

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useUserStore();
  const { resetOnboarding } = useOnboardingStore();

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: () => {
            logout();
            resetOnboarding();
            router.replace('/');
          },
        },
      ]
    );
  };

  const menuItems = [
    { icon: 'person', label: 'Edit Profile', route: '/settings/edit-profile' },
    { icon: 'business', label: 'Business Details', route: '/settings/business-details' },
    { icon: 'notifications', label: 'Notifications', route: '/settings/notifications' },
    { icon: 'help-circle', label: 'Help & FAQs', route: '/settings/help' },
    { icon: 'document-text', label: 'Terms of Service', route: '/settings/terms' },
    { icon: 'shield-checkmark', label: 'Privacy Policy', route: '/settings/privacy' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View entering={FadeIn.duration(400)} style={styles.header}>
          <Text style={styles.title}>Profile</Text>
        </Animated.View>

        {/* Profile Card */}
        <Animated.View entering={FadeInDown.delay(200).duration(500)}>
          <View style={styles.profileCard}>
            <LinearGradient
              colors={['#7B5CF6', '#9D85F6']}
              style={styles.profileGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.profileContent}>
                <View style={styles.avatarContainer}>
                  <Text style={styles.avatarText}>
                    {user?.firstName?.[0]?.toUpperCase() || 'E'}
                    {user?.lastName?.[0]?.toUpperCase() || 'N'}
                  </Text>
                </View>
                <View style={styles.profileInfo}>
                  <Text style={styles.profileName}>
                    {user?.firstName || 'Hayyan'} {user?.lastName || 'User'}
                  </Text>
                  <Text style={styles.profileEmail}>{user?.email || 'user@hayyan.com'}</Text>
                  <View style={styles.businessBadge}>
                    <Ionicons name="business" size={14} color={COLORS.textLight} />
                    <Text style={styles.businessText}>
                      {BUSINESS_TYPE_LABELS[user?.businessType || ''] || 'Business Owner'}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.profileEnezi}>
                <Enezi size={80} expression="happy" animated />
              </View>
            </LinearGradient>
          </View>
        </Animated.View>

        {/* Business Info Card */}
        <Animated.View entering={FadeInUp.delay(300).duration(500)} style={styles.section}>
          <Text style={styles.sectionTitle}>Business Information</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Ionicons name="storefront" size={20} color={COLORS.primaryGreen} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Business Name</Text>
                <Text style={styles.infoValue}>{user?.businessName || 'Not set'}</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Ionicons name="location" size={20} color={COLORS.primaryGreen} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Postcode</Text>
                <Text style={styles.infoValue}>{user?.postcode || 'Not set'}</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Ionicons name="call" size={20} color={COLORS.primaryGreen} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Mobile</Text>
                <Text style={styles.infoValue}>{user?.mobileNumber || 'Not set'}</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Menu Items */}
        <Animated.View entering={FadeInUp.delay(400).duration(500)} style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.menuCard}>
            {menuItems.map((item, index) => (
              <React.Fragment key={item.label}>
                <TouchableOpacity 
                  style={styles.menuItem} 
                  onPress={() => router.push(item.route as any)}
                >
                  <View style={styles.menuIconContainer}>
                    <Ionicons name={item.icon as any} size={22} color={COLORS.primaryGreen} />
                  </View>
                  <Text style={styles.menuLabel}>{item.label}</Text>
                  <Ionicons name="chevron-forward" size={20} color={COLORS.textMuted} />
                </TouchableOpacity>
                {index < menuItems.length - 1 && <View style={styles.menuDivider} />}
              </React.Fragment>
            ))}
          </View>
        </Animated.View>

        {/* Logout Button */}
        <Animated.View entering={FadeInUp.delay(500).duration(500)} style={styles.logoutContainer}>
          <AnimatedButton
            title="Sign Out"
            onPress={handleLogout}
            variant="outline"
            size="large"
            fullWidth
            icon="log-out"
            iconPosition="left"
          />
        </Animated.View>

        {/* App Version */}
        <Animated.View entering={FadeInUp.delay(600).duration(500)} style={styles.versionContainer}>
          <Text style={styles.versionText}>Hayyan v1.0.0</Text>
          <Text style={styles.copyrightText}>Made with ⚡ for UK businesses</Text>
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
  profileCard: {
    borderRadius: BORDER_RADIUS.xl,
    overflow: 'hidden',
    ...SHADOWS.large,
  },
  profileGradient: {
    padding: SPACING.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  avatarText: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textLight,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textLight,
  },
  profileEmail: {
    ...TYPOGRAPHY.bodySmall,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  businessBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.full,
    marginTop: SPACING.sm,
    alignSelf: 'flex-start',
    gap: 4,
  },
  businessText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textLight,
  },
  profileEnezi: {
    marginLeft: SPACING.sm,
  },
  section: {
    marginTop: SPACING.xl,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  infoCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    ...SHADOWS.small,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F8F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textMuted,
  },
  infoValue: {
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.cardBorder,
    marginLeft: 56,
  },
  menuCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOWS.small,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E8F8F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  menuLabel: {
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
    flex: 1,
  },
  menuDivider: {
    height: 1,
    backgroundColor: COLORS.cardBorder,
    marginLeft: 68,
  },
  logoutContainer: {
    marginTop: SPACING.xl,
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: SPACING.xl,
    paddingVertical: SPACING.lg,
  },
  versionText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textMuted,
  },
  copyrightText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textMuted,
    marginTop: 4,
  },
});
