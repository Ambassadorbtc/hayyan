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

export default function PeakOffPeakGuide() {
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
          <Text style={styles.heroLabel}>ENERGY SAVING</Text>
          <Text style={styles.heroTitle}>Peak vs Off-Peak Energy: A Complete Guide</Text>
          <View style={styles.metaInfo}>
            <Text style={styles.metaText}>4 min read</Text>
            <Text style={styles.metaDot}>•</Text>
            <Text style={styles.metaText}>Updated January 2025</Text>
          </View>
        </Animated.View>
      </LinearGradient>

      <View style={styles.contentSection}>
        <View style={styles.contentContainer}>
          <Animated.Text entering={FadeInUp.delay(200).duration(600)} style={styles.intro}>
            Time-of-use tariffs charge different rates depending on when you use electricity. By shifting energy-intensive activities to off-peak hours, businesses can achieve significant savings. Here's everything you need to know about peak and off-peak energy.
          </Animated.Text>

          <Animated.View entering={FadeInUp.delay(300).duration(500)} style={styles.section}>
            <Text style={styles.sectionTitle}>What Are Peak Hours?</Text>
            <Text style={styles.sectionContent}>
              Peak hours are when electricity demand is highest across the UK, typically between 4pm and 7pm on weekdays. During these times, the National Grid is under the most strain, and energy costs more to produce and distribute. Peak rates can be 50-100% higher than off-peak rates.
            </Text>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(350).duration(500)} style={styles.section}>
            <Text style={styles.sectionTitle}>Off-Peak Hours</Text>
            <Text style={styles.sectionContent}>
              Off-peak hours are when demand is lowest, typically overnight (midnight to 7am) and sometimes weekends. Some tariffs also include "shoulder" rates for periods between peak and off-peak. Off-peak electricity can cost as little as 10-15p per kWh compared to 30-40p at peak times.
            </Text>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(400).duration(500)} style={styles.timeTable}>
            <Text style={styles.tableTitle}>Typical Time-of-Use Schedule</Text>
            <View style={styles.tableRow}>
              <View style={[styles.tableCell, styles.tableCellPeak]}>
                <Text style={styles.tableCellLabel}>Peak</Text>
                <Text style={styles.tableCellTime}>4pm - 7pm</Text>
                <Text style={styles.tableCellRate}>30-40p/kWh</Text>
              </View>
              <View style={[styles.tableCell, styles.tableCellShoulder]}>
                <Text style={styles.tableCellLabel}>Shoulder</Text>
                <Text style={styles.tableCellTime}>7am-4pm, 7pm-12am</Text>
                <Text style={styles.tableCellRate}>20-25p/kWh</Text>
              </View>
              <View style={[styles.tableCell, styles.tableCellOffPeak]}>
                <Text style={styles.tableCellLabel}>Off-Peak</Text>
                <Text style={styles.tableCellTime}>12am - 7am</Text>
                <Text style={styles.tableCellRate}>10-15p/kWh</Text>
              </View>
            </View>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(450).duration(500)} style={styles.section}>
            <Text style={styles.sectionTitle}>Tips for Shifting Usage</Text>
            <View style={styles.tipsList}>
              <View style={styles.tipItem}>
                <Ionicons name="checkmark-circle" size={20} color={COLORS.primary} />
                <Text style={styles.tipText}>Run dishwashers and washing machines overnight using timer functions</Text>
              </View>
              <View style={styles.tipItem}>
                <Ionicons name="checkmark-circle" size={20} color={COLORS.primary} />
                <Text style={styles.tipText}>Schedule EV charging for off-peak hours (midnight to 7am)</Text>
              </View>
              <View style={styles.tipItem}>
                <Ionicons name="checkmark-circle" size={20} color={COLORS.primary} />
                <Text style={styles.tipText}>Pre-heat or pre-cool your premises before peak hours</Text>
              </View>
              <View style={styles.tipItem}>
                <Ionicons name="checkmark-circle" size={20} color={COLORS.primary} />
                <Text style={styles.tipText}>Run batch processes and heavy machinery early morning or late evening</Text>
              </View>
              <View style={styles.tipItem}>
                <Ionicons name="checkmark-circle" size={20} color={COLORS.primary} />
                <Text style={styles.tipText}>Use battery storage to save off-peak energy for peak hours</Text>
              </View>
            </View>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(500).duration(500)} style={styles.section}>
            <Text style={styles.sectionTitle}>Is a Time-of-Use Tariff Right for Your Business?</Text>
            <Text style={styles.sectionContent}>
              Time-of-use tariffs work best for businesses that can be flexible about when they use energy. If your operations are fixed to daytime hours with no flexibility, a standard flat-rate tariff may be simpler. However, even businesses with fixed hours can often shift some usage (cleaning, heating, equipment charging) to off-peak times.
            </Text>
          </Animated.View>
        </View>
      </View>

      <View style={styles.ctaSection}>
        <LinearGradient colors={[COLORS.primary, '#9D85F6']} style={styles.ctaGradient}>
          <Text style={styles.ctaTitle}>Find Time-of-Use Tariffs</Text>
          <Text style={styles.ctaSubtitle}>Compare all tariff types with Hayyan</Text>
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
  timeTable: { backgroundColor: '#F9FAFB', borderRadius: 16, padding: 24, marginBottom: 32 },
  tableTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A2E', marginBottom: 16, textAlign: 'center' },
  tableRow: { flexDirection: isDesktop ? 'row' : 'column', gap: 12 },
  tableCell: { flex: 1, borderRadius: 12, padding: 16, alignItems: 'center' },
  tableCellPeak: { backgroundColor: '#FEE2E2' },
  tableCellShoulder: { backgroundColor: '#FEF3C7' },
  tableCellOffPeak: { backgroundColor: '#D1FAE5' },
  tableCellLabel: { fontSize: 14, fontWeight: '700', marginBottom: 4 },
  tableCellTime: { fontSize: 12, color: '#6B7280', marginBottom: 4 },
  tableCellRate: { fontSize: 16, fontWeight: '700' },
  tipsList: { gap: 12 },
  tipItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  tipText: { flex: 1, fontSize: 16, color: '#374151', lineHeight: 24 },
  ctaSection: { paddingHorizontal: 24, paddingVertical: 40 },
  ctaGradient: { borderRadius: 24, padding: 60, alignItems: 'center', maxWidth: 800, marginHorizontal: 'auto' },
  ctaTitle: { fontSize: isDesktop ? 36 : 28, fontWeight: '800', color: '#FFFFFF', textAlign: 'center', marginBottom: 16 },
  ctaSubtitle: { fontSize: 18, color: 'rgba(255,255,255,0.9)', textAlign: 'center', marginBottom: 32 },
});
