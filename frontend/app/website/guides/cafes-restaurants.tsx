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

export default function CafesRestaurantsGuide() {
  const router = useRouter();

  const tips = [
    {
      icon: 'snow',
      title: 'Refrigeration Efficiency',
      content: 'Refrigeration accounts for 40-50% of a typical restaurant\'s energy use. Keep condenser coils clean (dirty coils increase energy use by 25%), check door seals regularly, and set temperatures correctly: fridges at 3-5°C, freezers at -18°C. Don\'t pack fridges too full—air needs to circulate.',
    },
    {
      icon: 'flame',
      title: 'Kitchen Equipment',
      content: 'Only turn on grills, fryers, and ovens when needed—preheating takes 15-20 minutes, not hours. Use lids on pots to reduce cooking time by 25%. Consider induction hobs which are 90% efficient vs 55% for gas. Clean equipment regularly for optimal performance.',
    },
    {
      icon: 'water',
      title: 'Hot Water Management',
      content: 'Install spray taps that use 80% less water than traditional taps. Set water heater to 60°C (not higher). Fix dripping taps immediately—one drip per second wastes 10,000 litres per year. Consider a point-of-use water heater near the sink.',
    },
    {
      icon: 'bulb',
      title: 'Smart Lighting',
      content: 'Switch to LED lighting and save up to 80% on lighting costs. Install dimmers in dining areas to adjust ambiance and save energy. Use motion sensors in storage areas and toilets. Make use of natural daylight where possible.',
    },
    {
      icon: 'thermometer',
      title: 'HVAC Optimization',
      content: 'Kitchens generate huge amounts of heat. Use kitchen extract fans efficiently—they don\'t need to run at full speed all day. Install air curtains at entrances to reduce heat loss. Consider heat recovery systems to use kitchen heat for hot water.',
    },
    {
      icon: 'time',
      title: 'Off-Peak Cooking',
      content: 'If you\'re on a time-of-use tariff, do prep work and batch cooking during off-peak hours (typically early morning). This can save 20-30% on electricity costs for energy-intensive cooking.',
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
          <Text style={styles.heroTitle}>Energy Tips for Cafes & Restaurants</Text>
          <View style={styles.metaInfo}>
            <Text style={styles.metaText}>7 min read</Text>
            <Text style={styles.metaDot}>•</Text>
            <Text style={styles.metaText}>Updated January 2025</Text>
          </View>
        </Animated.View>
      </LinearGradient>

      <View style={styles.contentSection}>
        <View style={styles.contentContainer}>
          <Animated.Text entering={FadeInUp.delay(200).duration(600)} style={styles.intro}>
            Food service businesses are among the most energy-intensive commercial operations. A typical restaurant spends £8,000-£15,000 per year on energy, with kitchens consuming up to 80% of total usage. Here's how to cut your bills without compromising on food quality or customer experience.
          </Animated.Text>

          <Animated.View entering={FadeInUp.delay(300).duration(600)} style={styles.statsBox}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>40-50%</Text>
              <Text style={styles.statLabel}>Refrigeration</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>20-30%</Text>
              <Text style={styles.statLabel}>Cooking</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>15-20%</Text>
              <Text style={styles.statLabel}>HVAC</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>5-10%</Text>
              <Text style={styles.statLabel}>Lighting</Text>
            </View>
          </Animated.View>

          {tips.map((tip, index) => (
            <Animated.View
              key={tip.title}
              entering={FadeInUp.delay(350 + index * 50).duration(500)}
              style={styles.tipCard}
            >
              <View style={styles.tipIcon}>
                <Ionicons name={tip.icon as any} size={28} color={COLORS.primary} />
              </View>
              <View style={styles.tipContent}>
                <Text style={styles.tipTitle}>{tip.title}</Text>
                <Text style={styles.tipText}>{tip.content}</Text>
              </View>
            </Animated.View>
          ))}

          <Animated.View entering={FadeInUp.delay(700).duration(600)} style={styles.checklist}>
            <Text style={styles.checklistTitle}>Quick Daily Checklist</Text>
            <View style={styles.checklistItems}>
              <View style={styles.checklistItem}>
                <Ionicons name="checkbox" size={20} color={COLORS.primary} />
                <Text style={styles.checklistText}>Check fridge door seals are closing properly</Text>
              </View>
              <View style={styles.checklistItem}>
                <Ionicons name="checkbox" size={20} color={COLORS.primary} />
                <Text style={styles.checklistText}>Turn off equipment not in use</Text>
              </View>
              <View style={styles.checklistItem}>
                <Ionicons name="checkbox" size={20} color={COLORS.primary} />
                <Text style={styles.checklistText}>Ensure lights are off in empty areas</Text>
              </View>
              <View style={styles.checklistItem}>
                <Ionicons name="checkbox" size={20} color={COLORS.primary} />
                <Text style={styles.checklistText}>Check thermostat settings are correct</Text>
              </View>
            </View>
          </Animated.View>
        </View>
      </View>

      <View style={styles.ctaSection}>
        <LinearGradient colors={[COLORS.primary, '#9D85F6']} style={styles.ctaGradient}>
          <Text style={styles.ctaTitle}>Compare Restaurant Energy Deals</Text>
          <Text style={styles.ctaSubtitle}>Find suppliers with great rates for high-usage businesses</Text>
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
  intro: { fontSize: 18, color: '#374151', lineHeight: 30, marginBottom: 32 },
  statsBox: { flexDirection: 'row', backgroundColor: '#F9FAFB', borderRadius: 16, padding: 20, marginBottom: 40, justifyContent: 'space-around', flexWrap: 'wrap', gap: 16 },
  statItem: { alignItems: 'center', minWidth: 80 },
  statValue: { fontSize: 24, fontWeight: '800', color: COLORS.primary },
  statLabel: { fontSize: 12, color: '#6B7280', marginTop: 4 },
  tipCard: { flexDirection: isDesktop ? 'row' : 'column', marginBottom: 24, backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#E5E7EB' },
  tipIcon: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#F0EBFF', justifyContent: 'center', alignItems: 'center', marginRight: isDesktop ? 20 : 0, marginBottom: isDesktop ? 0 : 16 },
  tipContent: { flex: 1 },
  tipTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A2E', marginBottom: 8 },
  tipText: { fontSize: 15, color: '#6B7280', lineHeight: 24 },
  checklist: { backgroundColor: '#F0EBFF', borderRadius: 16, padding: 24, marginTop: 16 },
  checklistTitle: { fontSize: 20, fontWeight: '700', color: '#1A1A2E', marginBottom: 16 },
  checklistItems: { gap: 12 },
  checklistItem: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  checklistText: { fontSize: 15, color: '#374151' },
  ctaSection: { paddingHorizontal: 24, paddingVertical: 40 },
  ctaGradient: { borderRadius: 24, padding: 60, alignItems: 'center', maxWidth: 800, marginHorizontal: 'auto' },
  ctaTitle: { fontSize: isDesktop ? 36 : 28, fontWeight: '800', color: '#FFFFFF', textAlign: 'center', marginBottom: 16 },
  ctaSubtitle: { fontSize: 18, color: 'rgba(255,255,255,0.9)', textAlign: 'center', marginBottom: 32 },
});
