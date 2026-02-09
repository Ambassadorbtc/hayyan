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

export default function RetailShopGuide() {
  const router = useRouter();

  const tips = [
    {
      icon: 'bulb',
      title: 'Display & Accent Lighting',
      content: 'Retail lighting serves two purposes: helping customers see products and creating atmosphere. LED spotlights use 75% less energy than halogens while providing better colour rendering. Use track lighting to direct light at products rather than flooding the whole space. Install occupancy sensors in fitting rooms and stockrooms.',
    },
    {
      icon: 'storefront',
      title: 'Window Display Lighting',
      content: 'Window displays are often lit 24/7, even when the store is closed. Install timers to reduce lighting hours overnight. Use LED strips instead of spotlights for general illumination. Consider motion-activated displays that brighten when someone walks past.',
    },
    {
      icon: 'thermometer',
      title: 'Heating & Cooling',
      content: 'Retail spaces often struggle with temperature control, especially with automatic doors. Install air curtains above entrances to reduce heat loss. Set heating to 19-20°C (customers wearing coats don\'t need tropical temperatures). Use programmable thermostats to reduce heating outside trading hours.',
    },
    {
      icon: 'snow',
      title: 'Refrigerated Displays',
      content: 'For food retailers, refrigerated displays can account for 50%+ of energy use. Keep condenser coils clean, check door seals weekly, and consider night blinds for open-fronted displays. Modern displays with doors use 40% less energy than open ones.',
    },
    {
      icon: 'card',
      title: 'POS & IT Equipment',
      content: 'Till systems, card machines, and back-office computers left on 24/7 waste significant energy. Enable power management settings on computers. Turn off POS systems overnight (most modern systems boot in under a minute). Unplug card machines when the shop is closed.',
    },
    {
      icon: 'exit',
      title: 'Doors & Draught-Proofing',
      content: 'If you have automatic doors, check they\'re not opening unnecessarily. Adjust sensitivity settings and repair slow-closing mechanisms. For manual doors, consider draught-proofing strips and door closers. A properly sealed entrance can reduce heating bills by 10-15%.',
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
          <Text style={styles.heroTitle}>Retail Shop Energy Savings Guide</Text>
          <View style={styles.metaInfo}>
            <Text style={styles.metaText}>6 min read</Text>
            <Text style={styles.metaDot}>•</Text>
            <Text style={styles.metaText}>Updated January 2025</Text>
          </View>
        </Animated.View>
      </LinearGradient>

      <View style={styles.contentSection}>
        <View style={styles.contentContainer}>
          <Animated.Text entering={FadeInUp.delay(200).duration(600)} style={styles.intro}>
            Retail shops face unique energy challenges: the need for attractive lighting, frequent door openings, and often poor insulation in older premises. The average UK retail shop spends £3,000-£10,000 on energy annually. Here's how to reduce costs while maintaining an inviting shopping environment.
          </Animated.Text>

          {tips.map((tip, index) => (
            <Animated.View
              key={tip.title}
              entering={FadeInUp.delay(300 + index * 50).duration(500)}
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

          <Animated.View entering={FadeInUp.delay(650).duration(600)} style={styles.actionBox}>
            <Text style={styles.actionTitle}>Quick Wins for Retail</Text>
            <View style={styles.actionList}>
              <View style={styles.actionItem}>
                <Text style={styles.actionNumber}>1</Text>
                <Text style={styles.actionText}>Switch to LED lighting (£300-800 annual savings)</Text>
              </View>
              <View style={styles.actionItem}>
                <Text style={styles.actionNumber}>2</Text>
                <Text style={styles.actionText}>Install timer on window display lights (£100-200)</Text>
              </View>
              <View style={styles.actionItem}>
                <Text style={styles.actionNumber}>3</Text>
                <Text style={styles.actionText}>Reduce thermostat by 1°C (£50-100)</Text>
              </View>
              <View style={styles.actionItem}>
                <Text style={styles.actionNumber}>4</Text>
                <Text style={styles.actionText}>Switch energy supplier (£200-500)</Text>
              </View>
            </View>
          </Animated.View>
        </View>
      </View>

      <View style={styles.ctaSection}>
        <LinearGradient colors={[COLORS.primary, '#9D85F6']} style={styles.ctaGradient}>
          <Text style={styles.ctaTitle}>Compare Retail Energy Deals</Text>
          <Text style={styles.ctaSubtitle}>Find the best rates for your shop</Text>
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
  tipCard: { flexDirection: isDesktop ? 'row' : 'column', marginBottom: 24, backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#E5E7EB' },
  tipIcon: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#F0EBFF', justifyContent: 'center', alignItems: 'center', marginRight: isDesktop ? 20 : 0, marginBottom: isDesktop ? 0 : 16 },
  tipContent: { flex: 1 },
  tipTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A2E', marginBottom: 8 },
  tipText: { fontSize: 15, color: '#6B7280', lineHeight: 24 },
  actionBox: { backgroundColor: '#FEF3C7', borderRadius: 16, padding: 24, marginTop: 16 },
  actionTitle: { fontSize: 20, fontWeight: '700', color: '#92400E', marginBottom: 16 },
  actionList: { gap: 12 },
  actionItem: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  actionNumber: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#92400E', color: '#FFFFFF', textAlign: 'center', lineHeight: 28, fontSize: 14, fontWeight: '700', overflow: 'hidden' },
  actionText: { flex: 1, fontSize: 15, color: '#92400E' },
  ctaSection: { paddingHorizontal: 24, paddingVertical: 40 },
  ctaGradient: { borderRadius: 24, padding: 60, alignItems: 'center', maxWidth: 800, marginHorizontal: 'auto' },
  ctaTitle: { fontSize: isDesktop ? 36 : 28, fontWeight: '800', color: '#FFFFFF', textAlign: 'center', marginBottom: 16 },
  ctaSubtitle: { fontSize: 18, color: 'rgba(255,255,255,0.9)', textAlign: 'center', marginBottom: 32 },
});
