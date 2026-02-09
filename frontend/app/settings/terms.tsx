import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { COLORS, SHADOWS } from '../../src/constants/colors';
import { TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../src/constants/typography';
import { Ionicons } from '@expo/vector-icons';

export default function TermsScreen() {
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
          <Text style={styles.headerTitle}>Terms of Service</Text>
          <View style={styles.placeholder} />
        </Animated.View>

        {/* Last Updated */}
        <Animated.View entering={FadeInDown.delay(200).duration(500)} style={styles.lastUpdated}>
          <Ionicons name="time-outline" size={16} color={COLORS.textMuted} />
          <Text style={styles.lastUpdatedText}>Last updated: January 2025</Text>
        </Animated.View>

        {/* Content */}
        <Animated.View entering={FadeInDown.delay(300).duration(500)} style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
            <Text style={styles.sectionText}>
              By accessing and using Enerzo ("the Service"), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use the Service.{"\n\n"}
              Enerzo is operated by Enerzo Ltd, a company registered in England and Wales. Our registered office is at 123 Energy Street, London, EC1A 1BB.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>2. Description of Service</Text>
            <Text style={styles.sectionText}>
              Enerzo provides an energy comparison service for UK businesses. We help you:{"\n\n"}
              • Compare energy deals from multiple UK suppliers{"\n"}
              • Calculate potential savings based on your current usage{"\n"}
              • Facilitate the switching process to new suppliers{"\n"}
              • Track your energy usage and spending{"\n\n"}
              Our service is free to use. We receive commission from energy suppliers when you switch through our platform, but this does not affect the prices you see.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3. User Accounts</Text>
            <Text style={styles.sectionText}>
              To use certain features of the Service, you must create an account. You agree to:{"\n\n"}
              • Provide accurate, current, and complete information{"\n"}
              • Maintain the security of your password{"\n"}
              • Accept responsibility for all activities under your account{"\n"}
              • Notify us immediately of any unauthorized use{"\n\n"}
              We reserve the right to terminate accounts that violate these terms.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>4. Energy Switching</Text>
            <Text style={styles.sectionText}>
              When you choose to switch energy suppliers through Enerzo:{"\n\n"}
              • We act as an intermediary, not as an energy supplier{"\n"}
              • Your contract will be directly with the chosen supplier{"\n"}
              • Switching typically takes 2-3 weeks{"\n"}
              • Your energy supply will not be interrupted{"\n"}
              • You may be subject to exit fees from your current supplier{"\n\n"}
              All switching is regulated by Ofgem. You have the right to cancel a switch within 14 days.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>5. Accuracy of Information</Text>
            <Text style={styles.sectionText}>
              We make every effort to ensure the accuracy of pricing and supplier information. However:{"\n\n"}
              • Prices are estimates based on the information you provide{"\n"}
              • Actual savings may vary depending on usage{"\n"}
              • Supplier prices may change without notice{"\n"}
              • We recommend verifying final prices with suppliers{"\n\n"}
              We are not liable for any discrepancies between estimated and actual prices.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>6. Intellectual Property</Text>
            <Text style={styles.sectionText}>
              All content on Enerzo, including but not limited to text, graphics, logos, and software, is the property of Enerzo Ltd and is protected by UK and international copyright laws.{"\n\n"}
              You may not reproduce, distribute, or create derivative works without our written permission.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>7. Limitation of Liability</Text>
            <Text style={styles.sectionText}>
              To the maximum extent permitted by law:{"\n\n"}
              • Enerzo is provided "as is" without warranties{"\n"}
              • We are not liable for indirect or consequential damages{"\n"}
              • Our liability is limited to the amount you paid (if any){"\n"}
              • We are not responsible for third-party supplier actions{"\n\n"}
              Nothing in these terms excludes liability for death, personal injury, or fraud.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>8. Changes to Terms</Text>
            <Text style={styles.sectionText}>
              We may update these terms from time to time. We will notify you of significant changes via email or through the app. Continued use of the Service after changes constitutes acceptance of the new terms.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>9. Governing Law</Text>
            <Text style={styles.sectionText}>
              These terms are governed by English law. Any disputes will be subject to the exclusive jurisdiction of the English courts.{"\n\n"}
              For any questions about these terms, contact us at legal@enerzo.com.
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
});
