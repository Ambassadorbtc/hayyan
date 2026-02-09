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

export default function CarbonOffsettingGuide() {
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
          <Text style={styles.heroTitle}>Understanding Carbon Offsetting for Business</Text>
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
            Carbon offsetting allows businesses to compensate for their emissions by funding projects that reduce CO2 elsewhere. But is it right for your business? Here's an honest look at what carbon offsetting is, how it works, and whether it's worth considering.
          </Animated.Text>

          <Animated.View entering={FadeInUp.delay(300).duration(500)} style={styles.section}>
            <Text style={styles.sectionTitle}>What Is Carbon Offsetting?</Text>
            <Text style={styles.sectionContent}>
              When you buy a carbon offset, you're paying for a project that removes or prevents CO2 emissions somewhere else in the world. One "carbon credit" typically equals one tonne of CO2. Projects include tree planting, renewable energy in developing countries, methane capture from landfills, and protecting existing forests from deforestation.
            </Text>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(350).duration(500)} style={styles.section}>
            <Text style={styles.sectionTitle}>How Much Does It Cost?</Text>
            <Text style={styles.sectionContent}>
              Carbon credits vary widely in price depending on quality and verification standard. Budget credits cost £5-15 per tonne, while high-quality verified credits cost £15-50+ per tonne. A typical small business emits 10-50 tonnes of CO2 annually from energy use, meaning offsetting costs £150-£2,500 per year.
            </Text>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(400).duration(500)} style={styles.warningBox}>
            <Ionicons name="warning" size={24} color="#92400E" />
            <View style={styles.warningContent}>
              <Text style={styles.warningTitle}>Important Caveat</Text>
              <Text style={styles.warningText}>
                Offsetting should complement, not replace, genuine emission reductions. The most credible approach is: (1) measure your emissions, (2) reduce what you can, (3) offset what remains. "Greenwashing" through low-quality offsets damages trust and achieves little.
              </Text>
            </View>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(450).duration(500)} style={styles.section}>
            <Text style={styles.sectionTitle}>Choosing Quality Offsets</Text>
            <Text style={styles.sectionContent}>
              Look for offsets verified by recognised standards:
            </Text>
            <View style={styles.standardsList}>
              <View style={styles.standardItem}>
                <Text style={styles.standardName}>Gold Standard</Text>
                <Text style={styles.standardDesc}>The highest quality, also benefits local communities</Text>
              </View>
              <View style={styles.standardItem}>
                <Text style={styles.standardName}>Verified Carbon Standard (VCS)</Text>
                <Text style={styles.standardDesc}>Widely used, rigorous verification</Text>
              </View>
              <View style={styles.standardItem}>
                <Text style={styles.standardName}>Woodland Carbon Code</Text>
                <Text style={styles.standardDesc}>UK-specific forestry standard</Text>
              </View>
            </View>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(500).duration(500)} style={styles.section}>
            <Text style={styles.sectionTitle}>Is It Worth It?</Text>
            <Text style={styles.sectionContent}>
              For most small businesses, we recommend prioritizing direct emission reductions first—they save money AND reduce your carbon footprint. Switching to a green energy tariff, improving efficiency, and reducing waste all achieve more than buying cheap offsets. However, high-quality offsets can be a valuable addition for businesses committed to true carbon neutrality.
            </Text>
          </Animated.View>
        </View>
      </View>

      <View style={styles.ctaSection}>
        <LinearGradient colors={[COLORS.primary, '#9D85F6']} style={styles.ctaGradient}>
          <Text style={styles.ctaTitle}>Reduce Emissions First</Text>
          <Text style={styles.ctaSubtitle}>Find green tariffs and efficiency tips with Hayyan</Text>
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
  warningBox: { flexDirection: 'row', backgroundColor: '#FEF3C7', borderRadius: 16, padding: 20, gap: 16, marginBottom: 32, alignItems: 'flex-start' },
  warningContent: { flex: 1 },
  warningTitle: { fontSize: 16, fontWeight: '700', color: '#92400E', marginBottom: 4 },
  warningText: { fontSize: 14, color: '#92400E', lineHeight: 22 },
  standardsList: { marginTop: 16, gap: 12 },
  standardItem: { backgroundColor: '#F9FAFB', borderRadius: 12, padding: 16 },
  standardName: { fontSize: 16, fontWeight: '700', color: '#1A1A2E', marginBottom: 4 },
  standardDesc: { fontSize: 14, color: '#6B7280' },
  ctaSection: { paddingHorizontal: 24, paddingVertical: 40 },
  ctaGradient: { borderRadius: 24, padding: 60, alignItems: 'center', maxWidth: 800, marginHorizontal: 'auto' },
  ctaTitle: { fontSize: isDesktop ? 36 : 28, fontWeight: '800', color: '#FFFFFF', textAlign: 'center', marginBottom: 16 },
  ctaSubtitle: { fontSize: 18, color: 'rgba(255,255,255,0.9)', textAlign: 'center', marginBottom: 32 },
});
