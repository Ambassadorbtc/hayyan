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

export default function SalonSpaGuide() {
  const router = useRouter();

  const sections = [
    {
      title: 'Hair Dryers & Styling Tools',
      content: 'Professional hair dryers use 1,800-2,400 watts. Choose energy-efficient models with ionic technology—they dry hair faster, reducing usage time. Turn off styling tools between clients; leaving straighteners on standby wastes £50+ per year. Use tool holders with auto-shutoff features.',
    },
    {
      title: 'Washing & Water Heating',
      content: 'Hot water is a major cost for salons. Install low-flow showerheads for backwash stations—they use 50% less water while maintaining good pressure. Set your water heater to 55-60°C (not higher). Consider a point-of-use heater near backwash stations for faster, more efficient heating.',
    },
    {
      title: 'Lighting for Client Areas',
      content: 'Good lighting is essential for colour work, but it doesn\'t have to be expensive. LED bulbs with high CRI (90+) provide excellent colour rendering while using 75% less energy than halogen. Use task lighting at stations rather than flooding the whole salon with bright light.',
    },
    {
      title: 'Spa & Treatment Rooms',
      content: 'Heated treatment beds and towel warmers can be energy hogs. Only heat beds 15 minutes before appointments, not all day. Use insulated towel warmers and keep lids closed. Consider heated blankets instead of whole-room heating for massage rooms.',
    },
    {
      title: 'HVAC & Ventilation',
      content: 'Salons need good ventilation for chemical fumes, but extract fans running all day waste energy. Install demand-controlled ventilation that increases extraction when chemicals are being used. Keep doors closed to retain heating/cooling. Use air curtains at entrances.',
    },
    {
      title: 'Laundry Efficiency',
      content: 'Washing towels is a significant cost. Wash full loads only. Use the 40°C setting—modern detergents work perfectly at lower temperatures. Spin at high speed to reduce drying time. If you have a dryer, clean the lint filter after every load for 25% better efficiency.',
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <WebHeader />

      <LinearGradient colors={['#F5F3FF', '#EDE9FE', '#FFFFFF']} style={styles.heroSection}>
        <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.heroContent}>
          <TouchableOpacity onPress={() => router.push('/website/guides')} style={styles.backLink}>
            <Ionicons name="arrow-back" size={20} color={COLORS.primary} />
            <Text style={styles.backLinkText}>Back to Guides</Text>
          </TouchableOpacity>
          <Text style={styles.heroLabel}>BUSINESS TYPES</Text>
          <Text style={styles.heroTitle}>Salon & Spa Energy Efficiency Guide</Text>
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
            Hair salons, beauty parlours, and spas have unique energy challenges: high hot water usage, power-hungry styling tools, and the need for excellent lighting. The average salon spends £4,000-£8,000 on energy annually. Here's how to reduce that without compromising client experience.
          </Animated.Text>

          {sections.map((section, index) => (
            <Animated.View
              key={section.title}
              entering={FadeInUp.delay(300 + index * 50).duration(500)}
              style={styles.sectionCard}
            >
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.sectionContent}>{section.content}</Text>
            </Animated.View>
          ))}

          <Animated.View entering={FadeInUp.delay(650).duration(600)} style={styles.savingsBox}>
            <Text style={styles.savingsTitle}>Potential Annual Savings</Text>
            <View style={styles.savingsGrid}>
              <View style={styles.savingsItem}>
                <Text style={styles.savingsValue}>£200-400</Text>
                <Text style={styles.savingsLabel}>LED lighting upgrade</Text>
              </View>
              <View style={styles.savingsItem}>
                <Text style={styles.savingsValue}>£150-300</Text>
                <Text style={styles.savingsLabel}>Water efficiency</Text>
              </View>
              <View style={styles.savingsItem}>
                <Text style={styles.savingsValue}>£100-200</Text>
                <Text style={styles.savingsLabel}>Equipment management</Text>
              </View>
              <View style={styles.savingsItem}>
                <Text style={styles.savingsValue}>£300-600</Text>
                <Text style={styles.savingsLabel}>Switching suppliers</Text>
              </View>
            </View>
          </Animated.View>
        </View>
      </View>

      <View style={styles.ctaSection}>
        <LinearGradient colors={[COLORS.primary, '#9D85F6']} style={styles.ctaGradient}>
          <Text style={styles.ctaTitle}>Find the Best Salon Energy Deal</Text>
          <Text style={styles.ctaSubtitle}>Compare suppliers tailored to your usage</Text>
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
  sectionCard: { marginBottom: 24, backgroundColor: '#FFFFFF', borderRadius: 16, padding: 24, borderWidth: 1, borderColor: '#E5E7EB' },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#1A1A2E', marginBottom: 12 },
  sectionContent: { fontSize: 16, color: '#6B7280', lineHeight: 26 },
  savingsBox: { backgroundColor: '#ECFDF5', borderRadius: 16, padding: 24, marginTop: 16 },
  savingsTitle: { fontSize: 20, fontWeight: '700', color: '#065F46', marginBottom: 20, textAlign: 'center' },
  savingsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 16 },
  savingsItem: { alignItems: 'center', minWidth: 140, padding: 12, backgroundColor: '#FFFFFF', borderRadius: 12 },
  savingsValue: { fontSize: 20, fontWeight: '800', color: '#10B981' },
  savingsLabel: { fontSize: 12, color: '#065F46', textAlign: 'center', marginTop: 4 },
  ctaSection: { paddingHorizontal: 24, paddingVertical: 40 },
  ctaGradient: { borderRadius: 24, padding: 60, alignItems: 'center', maxWidth: 800, marginHorizontal: 'auto' },
  ctaTitle: { fontSize: isDesktop ? 36 : 28, fontWeight: '800', color: '#FFFFFF', textAlign: 'center', marginBottom: 16 },
  ctaSubtitle: { fontSize: 18, color: 'rgba(255,255,255,0.9)', textAlign: 'center', marginBottom: 32 },
});
