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

export default function SolarPanelsGuide() {
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
          <Text style={styles.heroLabel}>GREEN ENERGY</Text>
          <Text style={styles.heroTitle}>Solar Panels for Business: Is It Worth It?</Text>
          <View style={styles.metaInfo}>
            <Text style={styles.metaText}>8 min read</Text>
            <Text style={styles.metaDot}>•</Text>
            <Text style={styles.metaText}>Updated January 2025</Text>
          </View>
        </Animated.View>
      </LinearGradient>

      <View style={styles.contentSection}>
        <View style={styles.contentContainer}>
          <Animated.Text entering={FadeInUp.delay(200).duration(600)} style={styles.intro}>
            With electricity prices at record highs, more UK businesses are considering solar panels. A well-sized system can cut electricity bills by 30-70% and pay for itself in 4-7 years. But solar isn't right for every business. Here's an honest cost-benefit analysis to help you decide.
          </Animated.Text>

          <Animated.View entering={FadeInUp.delay(300).duration(500)} style={styles.costsBox}>
            <Text style={styles.costsTitle}>Typical Installation Costs</Text>
            <View style={styles.costsGrid}>
              <View style={styles.costItem}>
                <Text style={styles.costSize}>10kW System</Text>
                <Text style={styles.costPrice}>£8,000 - £12,000</Text>
                <Text style={styles.costNote}>Small shop/office</Text>
              </View>
              <View style={styles.costItem}>
                <Text style={styles.costSize}>30kW System</Text>
                <Text style={styles.costPrice}>£20,000 - £30,000</Text>
                <Text style={styles.costNote}>Medium business</Text>
              </View>
              <View style={styles.costItem}>
                <Text style={styles.costSize}>50kW+ System</Text>
                <Text style={styles.costPrice}>£35,000 - £50,000+</Text>
                <Text style={styles.costNote}>Large premises</Text>
              </View>
            </View>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(350).duration(500)} style={styles.section}>
            <Text style={styles.sectionTitle}>When Solar Makes Sense</Text>
            <View style={styles.checkList}>
              <View style={styles.checkItem}>
                <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                <Text style={styles.checkText}>You own your premises (or have a long lease 10+ years)</Text>
              </View>
              <View style={styles.checkItem}>
                <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                <Text style={styles.checkText}>You have a south-facing roof with minimal shading</Text>
              </View>
              <View style={styles.checkItem}>
                <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                <Text style={styles.checkText}>You use most electricity during daylight hours (9am-5pm)</Text>
              </View>
              <View style={styles.checkItem}>
                <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                <Text style={styles.checkText}>Your annual electricity bill is £5,000+ per year</Text>
              </View>
              <View style={styles.checkItem}>
                <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                <Text style={styles.checkText}>You can access capital or financing</Text>
              </View>
            </View>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(400).duration(500)} style={styles.section}>
            <Text style={styles.sectionTitle}>When to Reconsider</Text>
            <View style={styles.checkList}>
              <View style={styles.checkItem}>
                <Ionicons name="close-circle" size={20} color="#EF4444" />
                <Text style={styles.checkText}>You rent your premises or have a short lease</Text>
              </View>
              <View style={styles.checkItem}>
                <Ionicons name="close-circle" size={20} color="#EF4444" />
                <Text style={styles.checkText}>Your roof is north-facing, shaded, or in poor condition</Text>
              </View>
              <View style={styles.checkItem}>
                <Ionicons name="close-circle" size={20} color="#EF4444" />
                <Text style={styles.checkText}>You mainly use electricity at night/weekends</Text>
              </View>
              <View style={styles.checkItem}>
                <Ionicons name="close-circle" size={20} color="#EF4444" />
                <Text style={styles.checkText}>You plan to relocate in the next 5 years</Text>
              </View>
            </View>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(450).duration(500)} style={styles.exampleBox}>
            <Text style={styles.exampleTitle}>Real Example: Small Retail Shop</Text>
            <View style={styles.exampleContent}>
              <Text style={styles.exampleLine}><Text style={styles.bold}>System size:</Text> 10kW</Text>
              <Text style={styles.exampleLine}><Text style={styles.bold}>Installation cost:</Text> £9,500</Text>
              <Text style={styles.exampleLine}><Text style={styles.bold}>Previous annual bill:</Text> £4,800</Text>
              <Text style={styles.exampleLine}><Text style={styles.bold}>New annual bill:</Text> £2,100</Text>
              <Text style={styles.exampleLine}><Text style={styles.bold}>Annual savings:</Text> £2,700</Text>
              <Text style={styles.exampleLine}><Text style={styles.bold}>SEG income:</Text> £150/year</Text>
              <Text style={styles.exampleResult}>Payback period: 3.3 years</Text>
            </View>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(500).duration(500)} style={styles.section}>
            <Text style={styles.sectionTitle}>Smart Export Guarantee (SEG)</Text>
            <Text style={styles.sectionContent}>
              When your panels generate more than you use, you can sell the excess back to the grid. Under the SEG, suppliers must offer you at least 1p per kWh (some offer 5-15p). A typical business system might export 20-40% of generation, earning £100-500 per year.
            </Text>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(550).duration(500)} style={styles.tipBox}>
            <Ionicons name="bulb" size={24} color="#92400E" />
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Our Recommendation</Text>
              <Text style={styles.tipText}>
                Before investing in solar, first make sure you're on the best energy tariff for your current usage. Use Hayyan to compare suppliers—you might save 20-30% immediately without any capital investment. Then, if solar makes sense for your situation, you'll have a lower baseline bill to improve on.
              </Text>
            </View>
          </Animated.View>
        </View>
      </View>

      <View style={styles.ctaSection}>
        <LinearGradient colors={[COLORS.primary, '#9D85F6']} style={styles.ctaGradient}>
          <Text style={styles.ctaTitle}>Start With Your Energy Tariff</Text>
          <Text style={styles.ctaSubtitle}>Compare deals and save before investing in solar</Text>
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
  costsBox: { backgroundColor: '#F9FAFB', borderRadius: 16, padding: 24, marginBottom: 32 },
  costsTitle: { fontSize: 20, fontWeight: '700', color: '#1A1A2E', marginBottom: 20, textAlign: 'center' },
  costsGrid: { flexDirection: isDesktop ? 'row' : 'column', gap: 16 },
  costItem: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: '#E5E7EB' },
  costSize: { fontSize: 14, fontWeight: '600', color: '#6B7280', marginBottom: 4 },
  costPrice: { fontSize: 20, fontWeight: '800', color: COLORS.primary, marginBottom: 4 },
  costNote: { fontSize: 12, color: '#9CA3AF' },
  section: { marginBottom: 32 },
  sectionTitle: { fontSize: 24, fontWeight: '700', color: '#1A1A2E', marginBottom: 16 },
  sectionContent: { fontSize: 16, color: '#6B7280', lineHeight: 26 },
  checkList: { gap: 12 },
  checkItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  checkText: { flex: 1, fontSize: 16, color: '#374151', lineHeight: 24 },
  exampleBox: { backgroundColor: '#ECFDF5', borderRadius: 16, padding: 24, marginBottom: 32 },
  exampleTitle: { fontSize: 18, fontWeight: '700', color: '#065F46', marginBottom: 16 },
  exampleContent: { gap: 4 },
  exampleLine: { fontSize: 14, color: '#065F46' },
  bold: { fontWeight: '700' },
  exampleResult: { fontSize: 16, fontWeight: '700', color: '#10B981', marginTop: 12 },
  tipBox: { flexDirection: 'row', backgroundColor: '#FEF3C7', borderRadius: 16, padding: 20, gap: 16, alignItems: 'flex-start' },
  tipContent: { flex: 1 },
  tipTitle: { fontSize: 16, fontWeight: '700', color: '#92400E', marginBottom: 4 },
  tipText: { fontSize: 14, color: '#92400E', lineHeight: 22 },
  ctaSection: { paddingHorizontal: 24, paddingVertical: 40 },
  ctaGradient: { borderRadius: 24, padding: 60, alignItems: 'center', maxWidth: 800, marginHorizontal: 'auto' },
  ctaTitle: { fontSize: isDesktop ? 36 : 28, fontWeight: '800', color: '#FFFFFF', textAlign: 'center', marginBottom: 16 },
  ctaSubtitle: { fontSize: 18, color: 'rgba(255,255,255,0.9)', textAlign: 'center', marginBottom: 32 },
});
