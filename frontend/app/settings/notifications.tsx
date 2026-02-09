import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp, FadeIn } from 'react-native-reanimated';
import { COLORS, SHADOWS } from '../../src/constants/colors';
import { TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../src/constants/typography';
import { Enezi } from '../../src/components/mascot/Enezi';
import { AnimatedButton } from '../../src/components/ui/AnimatedButton';
import { SuccessOverlay } from '../../src/components/ui/SuccessOverlay';
import { Ionicons } from '@expo/vector-icons';

export default function NotificationsScreen() {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [notifications, setNotifications] = useState({
    priceAlerts: true,
    savingsOpportunities: true,
    billReminders: true,
    weeklyReports: false,
    marketUpdates: false,
    promotionalOffers: false,
    newSupplierDeals: true,
    accountUpdates: true,
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    setShowSuccess(true);
  };

  const handleSuccessDismiss = () => {
    setShowSuccess(false);
    router.back();
  };

  const notificationSettings = [
    {
      category: 'Energy Alerts',
      items: [
        { key: 'priceAlerts', title: 'Price Alerts', description: 'Get notified when energy prices change', icon: 'trending-up' },
        { key: 'savingsOpportunities', title: 'Savings Opportunities', description: 'New deals that could save you money', icon: 'cash' },
        { key: 'newSupplierDeals', title: 'New Supplier Deals', description: 'When new suppliers offer better rates', icon: 'flash' },
      ],
    },
    {
      category: 'Reminders',
      items: [
        { key: 'billReminders', title: 'Bill Reminders', description: 'Reminders before your bills are due', icon: 'calendar' },
        { key: 'weeklyReports', title: 'Weekly Reports', description: 'Summary of your energy usage', icon: 'analytics' },
      ],
    },
    {
      category: 'Other',
      items: [
        { key: 'marketUpdates', title: 'Market Updates', description: 'UK energy market news and updates', icon: 'newspaper' },
        { key: 'promotionalOffers', title: 'Promotional Offers', description: 'Special deals and promotions', icon: 'gift' },
        { key: 'accountUpdates', title: 'Account Updates', description: 'Important account notifications', icon: 'person' },
      ],
    },
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
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notifications</Text>
          <View style={styles.placeholder} />
        </Animated.View>

        {/* Enezi */}
        <Animated.View entering={FadeIn.delay(200).duration(500)} style={styles.eneziSection}>
          <Enezi size={90} expression="happy" animated />
          <Text style={styles.eneziMessage}>Stay in the loop with alerts that matter!</Text>
        </Animated.View>

        {/* Notification Settings */}
        {notificationSettings.map((section, sectionIndex) => (
          <Animated.View
            key={section.category}
            entering={FadeInUp.delay(300 + sectionIndex * 100).duration(500)}
            style={styles.section}
          >
            <Text style={styles.sectionTitle}>{section.category}</Text>
            <View style={styles.card}>
              {section.items.map((item, itemIndex) => (
                <React.Fragment key={item.key}>
                  <View style={styles.settingRow}>
                    <View style={styles.settingIcon}>
                      <Ionicons name={item.icon as any} size={22} color={COLORS.primaryGreen} />
                    </View>
                    <View style={styles.settingContent}>
                      <Text style={styles.settingTitle}>{item.title}</Text>
                      <Text style={styles.settingDescription}>{item.description}</Text>
                    </View>
                    <Switch
                      value={notifications[item.key as keyof typeof notifications]}
                      onValueChange={() => toggleNotification(item.key as keyof typeof notifications)}
                      trackColor={{ false: COLORS.cardBorder, true: '#B8E8D8' }}
                      thumbColor={notifications[item.key as keyof typeof notifications] ? COLORS.primaryGreen : '#f4f3f4'}
                    />
                  </View>
                  {itemIndex < section.items.length - 1 && <View style={styles.divider} />}
                </React.Fragment>
              ))}
            </View>
          </Animated.View>
        ))}

        {/* Info Note */}
        <Animated.View entering={FadeInUp.delay(600).duration(500)} style={styles.infoNote}>
          <Ionicons name="information-circle" size={20} color={COLORS.electricBlue} />
          <Text style={styles.infoText}>
            You can change these settings at any time. We'll never spam you!
          </Text>
        </Animated.View>
      </ScrollView>

      {/* Save Button */}
      <Animated.View entering={FadeInUp.delay(700).duration(400)} style={styles.bottomSection}>
        <AnimatedButton
          title="Save Preferences"
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
        title="Preferences Saved!"
        message="Your notification settings have been updated"
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
    textAlign: 'center',
  },
  section: {
    marginTop: SPACING.lg,
  },
  sectionTitle: {
    ...TYPOGRAPHY.label,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOWS.small,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F8F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  settingContent: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  settingTitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  settingDescription: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.cardBorder,
    marginLeft: 72,
  },
  infoNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginTop: SPACING.xl,
    gap: SPACING.sm,
  },
  infoText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    flex: 1,
  },
  bottomSection: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
  },
});
