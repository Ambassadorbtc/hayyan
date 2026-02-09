import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { COLORS, SHADOWS } from '../../src/constants/colors';
import { TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../src/constants/typography';
import { Ionicons } from '@expo/vector-icons';

export default function PrivacyScreen() {
  const router = useRouter();

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
          <Text style={styles.headerTitle}>Privacy Policy</Text>
          <View style={styles.placeholder} />
        </Animated.View>

        {/* Last Updated */}
        <Animated.View entering={FadeInDown.delay(200).duration(500)} style={styles.lastUpdated}>
          <Ionicons name="time-outline" size={16} color={COLORS.textMuted} />
          <Text style={styles.lastUpdatedText}>Last updated: January 2025</Text>
        </Animated.View>

        {/* Summary Card */}
        <Animated.View entering={FadeInDown.delay(300).duration(500)} style={styles.summaryCard}>
          <View style={styles.summaryIcon}>
            <Ionicons name="shield-checkmark" size={32} color={COLORS.primaryGreen} />
          </View>
          <Text style={styles.summaryTitle}>Your Privacy Matters</Text>
          <Text style={styles.summaryText}>
            We're committed to protecting your data. Here's the short version: We only collect what we need, we never sell your data, and you're always in control.
          </Text>
        </Animated.View>

        {/* Content */}
        <Animated.View entering={FadeInDown.delay(400).duration(500)} style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>1. Information We Collect</Text>
            <Text style={styles.sectionText}>
              We collect information to provide and improve our energy comparison service:{"\n\n"}
              <Text style={styles.bold}>Personal Information:</Text>{"\n"}
              • Name and email address{"\n"}
              • Phone number{"\n"}
              • Business name and postcode{"\n"}
              • Current energy supplier details{"\n\n"}
              <Text style={styles.bold}>Usage Information:</Text>{"\n"}
              • Energy consumption data you provide{"\n"}
              • Monthly bill amounts{"\n"}
              • App usage and preferences{"\n\n"}
              <Text style={styles.bold}>Technical Information:</Text>{"\n"}
              • Device type and operating system{"\n"}
              • IP address and location (postcode level){"\n"}
              • App performance data
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
            <Text style={styles.sectionText}>
              We use your information to:{"\n\n"}
              • Provide accurate energy price comparisons{"\n"}
              • Calculate potential savings{"\n"}
              • Facilitate switching to new suppliers{"\n"}
              • Send important account notifications{"\n"}
              • Improve our services{"\n"}
              • Comply with legal obligations{"\n\n"}
              We will never sell your personal information to third parties.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3. Sharing Your Information</Text>
            <Text style={styles.sectionText}>
              We only share your information when necessary:{"\n\n"}
              <Text style={styles.bold}>Energy Suppliers:</Text> When you request a quote or switch, we share relevant details with your chosen supplier.{"\n\n"}
              <Text style={styles.bold}>Service Providers:</Text> We use trusted partners for hosting, analytics, and customer support. They are bound by strict data protection agreements.{"\n\n"}
              <Text style={styles.bold}>Legal Requirements:</Text> We may disclose information if required by law or to protect our rights.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>4. Data Security</Text>
            <Text style={styles.sectionText}>
              We take security seriously:{"\n\n"}
              • All data is encrypted in transit (TLS 1.3){"\n"}
              • Data at rest is encrypted using AES-256{"\n"}
              • We conduct regular security audits{"\n"}
              • Access is restricted to authorized personnel{"\n"}
              • We use secure cloud infrastructure (AWS){"\n\n"}
              Despite our best efforts, no system is 100% secure. We will notify you promptly of any data breaches.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>5. Your Rights</Text>
            <Text style={styles.sectionText}>
              Under UK GDPR, you have the right to:{"\n\n"}
              • <Text style={styles.bold}>Access</Text> - Request a copy of your data{"\n"}
              • <Text style={styles.bold}>Rectification</Text> - Correct inaccurate data{"\n"}
              • <Text style={styles.bold}>Erasure</Text> - Request deletion of your data{"\n"}
              • <Text style={styles.bold}>Portability</Text> - Receive data in a usable format{"\n"}
              • <Text style={styles.bold}>Objection</Text> - Object to certain processing{"\n"}
              • <Text style={styles.bold}>Restriction</Text> - Limit how we use your data{"\n\n"}
              To exercise these rights, email privacy@enerzo.com.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>6. Data Retention</Text>
            <Text style={styles.sectionText}>
              We retain your data for:{"\n\n"}
              • Account data: While your account is active + 3 years{"\n"}
              • Switch records: 7 years (legal requirement){"\n"}
              • Usage analytics: 2 years (anonymized){"\n"}
              • Marketing preferences: Until you unsubscribe{"\n\n"}
              You can request deletion at any time, subject to legal retention requirements.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>7. Cookies & Tracking</Text>
            <Text style={styles.sectionText}>
              Our app uses:{"\n\n"}
              • Essential storage for app functionality{"\n"}
              • Analytics to improve user experience{"\n"}
              • No third-party advertising cookies{"\n\n"}
              You can manage preferences in your device settings.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>8. Children's Privacy</Text>
            <Text style={styles.sectionText}>
              Enerzo is designed for business use and is not intended for children under 18. We do not knowingly collect data from minors.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>9. Contact Us</Text>
            <Text style={styles.sectionText}>
              For privacy questions or to exercise your rights:{"\n\n"}
              Email: privacy@enerzo.com{"\n"}
              Post: Data Protection Officer{"\n"}
              Enerzo Ltd{"\n"}
              123 Energy Street{"\n"}
              London, EC1A 1BB{"\n\n"}
              You also have the right to lodge a complaint with the Information Commissioner's Office (ICO).
            </Text>
          </View>
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
  lastUpdated: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    marginTop: SPACING.md,
  },
  lastUpdatedText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textMuted,
  },
  summaryCard: {
    backgroundColor: '#E8F8F3',
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginTop: SPACING.lg,
    alignItems: 'center',
  },
  summaryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  summaryTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  summaryText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  content: {
    marginTop: SPACING.lg,
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    ...SHADOWS.small,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  sectionText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
  bold: {
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
});
