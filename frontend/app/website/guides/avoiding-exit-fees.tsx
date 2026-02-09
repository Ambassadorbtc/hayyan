import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Platform, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../../src/constants/colors';
import { WebHeader } from '../../../src/components/web/WebHeader';
import { WebFooter } from '../../../src/components/web/WebFooter';
import { AppStoreButtons } from '../../../src/components/web/AppStoreButtons';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const isDesktop = Platform.OS === 'web' && width > 768;

export default function AvoidingExitFeesGuide() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <WebHeader />

      <LinearGradient colors={['#F5F3FF', '#EDE9FE', '#FFFFFF']} style={styles.heroSection}>
        <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.heroContent}>
          <TouchableOpacity onPress={() => router.push('/website/guides')} style={styles.backLink}>
            <Ionicons name="arrow-back" size={20} color={COLORS.primary} />
            <Text style={styles.backLinkText}>Back to Guides</Text>
          </TouchableOpacity>
          <Text style={styles.heroLabel}>SWITCHING GUIDES</Text>
          <Text style={styles.heroTitle}>Avoiding Exit Fees When Switching Energy</Text>
          <View style={styles.metaInfo}>
            <Text style={styles.metaText}>5 min read</Text>
            <Text style={styles.metaDot}>•</Text>
            <Text style={styles.metaText}>Updated January 2025</Text>
          </View>
        </Animated.View>
      </LinearGradient>

      <View style={styles.contentSection}>
        <View style={styles.contentContainer}>
          <Animated.Text entering={FadeInUp.delay(200).duration(600)} style={styles.intro}>
            Exit fees (also called early termination fees) are charges you may face for leaving a fixed-term energy contract early. While they can seem like a barrier to switching, there are several ways to minimize or avoid them entirely. Here's what you need to know.
          </Animated.Text>

          <Animated.View entering={FadeInUp.delay(300).duration(500)} style={styles.section}>
            <Text style={styles.sectionTitle}>Understanding Exit Fees</Text>
            <Text style={styles.sectionContent}>
              Exit fees typically range from £30 to £150 per fuel (electricity and gas are charged separately). The fee is designed to compensate suppliers for the expected profit they lose when you leave early. Fees are usually highest at the start of your contract and may reduce as you get closer to the end date.
            </Text>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(350).duration(500)} style={styles.section}>
            <Text style={styles.sectionTitle}>When You Won't Pay Exit Fees</Text>
            <View style={styles.bulletList}>
              <View style={styles.bulletItem}>
                <View style={styles.bulletDot} />
                <Text style={styles.bulletText}><Text style={styles.bold}>Rolling contracts:</Text> No exit fees apply—just give 28 days' notice</Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bulletDot} />
                <Text style={styles.bulletText}><Text style={styles.bold}>Contract end:</Text> Switch in the last 49 days of your contract fee-free</Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bulletDot} />
                <Text style={styles.bulletText}><Text style={styles.bold}>Price increases:</Text> If your supplier raises prices mid-contract, you can leave without penalty</Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bulletDot} />
                <Text style={styles.bulletText}><Text style={styles.bold}>Terms changes:</Text> Any unfavorable changes to contract terms give you a fee-free exit right</Text>
              </View>
            </View>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(400).duration(500)} style={styles.calcBox}>
            <Text style={styles.calcTitle}>Is It Worth Paying Exit Fees?</Text>
            <Text style={styles.calcText}>
              Sometimes paying exit fees makes financial sense. Compare the total exit fees against your potential annual savings:
            </Text>
            <View style={styles.calcExample}>
              <Text style={styles.calcExampleTitle}>Example Calculation:</Text>
              <Text style={styles.calcLine}>Exit fees: £100 (electricity) + £100 (gas) = £200</Text>
              <Text style={styles.calcLine}>New tariff saves: £50/month = £600/year</Text>
              <Text style={styles.calcResult}>Net first-year savings: £400 ✓</Text>
            </View>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(450).duration(500)} style={styles.section}>
            <Text style={styles.sectionTitle}>How to Find Your Exit Fees</Text>
            <View style={styles.numberedList}>
              <View style={styles.numberedItem}>
                <Text style={styles.numberedNumber}>1</Text>
                <Text style={styles.numberedText}>Check your original contract or welcome letter</Text>
              </View>
              <View style={styles.numberedItem}>
                <Text style={styles.numberedNumber}>2</Text>
                <Text style={styles.numberedText}>Log into your online account and view contract details</Text>
              </View>
              <View style={styles.numberedItem}>
                <Text style={styles.numberedNumber}>3</Text>
                <Text style={styles.numberedText}>Call your supplier and ask for exit fee information</Text>
              </View>
              <View style={styles.numberedItem}>
                <Text style={styles.numberedNumber}>4</Text>
                <Text style={styles.numberedText}>Request a written breakdown including contract end date</Text>
              </View>
            </View>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(500).duration(500)} style={styles.tipBox}>
            <Ionicons name="bulb" size={24} color="#92400E" />
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Pro Tip: Set a Reminder</Text>
              <Text style={styles.tipText}>
                Set a calendar reminder for 8 weeks before your contract ends. This gives you time to compare deals and switch without any exit fees, while avoiding being rolled onto expensive out-of-contract rates.
              </Text>
            </View>
          </Animated.View>
        </View>
      </View>

      <View style={styles.ctaSection}>
        <LinearGradient colors={[COLORS.primary, '#9D85F6']} style={styles.ctaGradient}>
          <Text style={styles.ctaTitle}>Check Your Savings</Text>
          <Text style={styles.ctaSubtitle}>Hayyan shows you net savings after any exit fees</Text>
          <AppStoreButtons delay={200} />
        </LinearGradient>
      </View>

      <WebFooter />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  heroSection: { paddingTop: 140, paddingBottom: 60, paddingHorizontal: 24 },
  heroContent: { maxWidth: 800, marginHorizontal: 'auto' },
  backLink: { flexDirection: 'row', alignItems: 'center', marginBottom: 24, gap: 8 },
  backLinkText: { fontSize: 16, color: COLORS.primary, fontWeight: '500' },
  heroLabel: { fontSize: 12, fontWeight: '700', color: COLORS.primary, letterSpacing: 2, marginBottom: 16 },
  heroTitle: { fontSize: isDesktop ? 48 : 32, fontWeight: '800', color: '#1A1A2E', marginBottom: 20, lineHeight: isDesktop ? 56 : 40 },
  metaInfo: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  metaText: { fontSize: 14, color: '#6B7280' },
  metaDot: { fontSize: 14, color: '#6B7280' },
  contentSection: { paddingVertical: 60, paddingHorizontal: 24 },
  contentContainer: { maxWidth: 800, marginHorizontal: 'auto' },
  intro: { fontSize: 18, color: '#374151', lineHeight: 30, marginBottom: 40 },
  section: { marginBottom: 32 },
  sectionTitle: { fontSize: 24, fontWeight: '700', color: '#1A1A2E', marginBottom: 16 },
  sectionContent: { fontSize: 16, color: '#6B7280', lineHeight: 26 },
  bulletList: { gap: 12 },
  bulletItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  bulletDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.primary, marginTop: 8 },
  bulletText: { flex: 1, fontSize: 16, color: '#6B7280', lineHeight: 24 },
  bold: { fontWeight: '700', color: '#374151' },
  calcBox: { backgroundColor: '#F9FAFB', borderRadius: 16, padding: 24, marginBottom: 32, borderWidth: 1, borderColor: '#E5E7EB' },
  calcTitle: { fontSize: 20, fontWeight: '700', color: '#1A1A2E', marginBottom: 12 },
  calcText: { fontSize: 16, color: '#6B7280', marginBottom: 16, lineHeight: 24 },
  calcExample: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#E5E7EB' },
  calcExampleTitle: { fontSize: 14, fontWeight: '700', color: '#374151', marginBottom: 8 },
  calcLine: { fontSize: 14, color: '#6B7280', marginBottom: 4 },
  calcResult: { fontSize: 16, fontWeight: '700', color: '#10B981', marginTop: 8 },
  numberedList: { gap: 12 },
  numberedItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  numberedNumber: { width: 24, height: 24, borderRadius: 12, backgroundColor: COLORS.primary, color: '#FFFFFF', textAlign: 'center', lineHeight: 24, fontSize: 14, fontWeight: '700', overflow: 'hidden' },
  numberedText: { flex: 1, fontSize: 16, color: '#6B7280', lineHeight: 24 },
  tipBox: { flexDirection: 'row', backgroundColor: '#FEF3C7', borderRadius: 16, padding: 20, gap: 16, alignItems: 'flex-start' },
  tipContent: { flex: 1 },
  tipTitle: { fontSize: 16, fontWeight: '700', color: '#92400E', marginBottom: 4 },
  tipText: { fontSize: 14, color: '#92400E', lineHeight: 22 },
  ctaSection: { paddingHorizontal: 24, paddingVertical: 40 },
  ctaGradient: { borderRadius: 24, padding: 60, alignItems: 'center', maxWidth: 800, marginHorizontal: 'auto' },
  ctaTitle: { fontSize: isDesktop ? 36 : 28, fontWeight: '800', color: '#FFFFFF', textAlign: 'center', marginBottom: 16 },
  ctaSubtitle: { fontSize: 18, color: 'rgba(255,255,255,0.9)', textAlign: 'center', marginBottom: 32 },
});
