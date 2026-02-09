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

export default function UnderstandingEnergyBillGuide() {
  const router = useRouter();

  const sections = [
    {
      title: 'Unit Rates',
      icon: 'flash',
      content: 'The unit rate is what you pay for each kilowatt-hour (kWh) of energy you use. For electricity, this typically ranges from 25-35p per kWh for businesses. Gas unit rates are usually lower, around 7-10p per kWh. Your unit rate depends on your tariff, location, and consumption level. High-usage businesses often qualify for lower unit rates.',
    },
    {
      title: 'Standing Charges',
      icon: 'calendar',
      content: 'The standing charge is a daily fixed fee you pay regardless of how much energy you use. This covers the cost of maintaining the connection to your property. Standing charges typically range from 25-50p per day for electricity and 15-30p for gas. Some tariffs offer lower standing charges but higher unit rates, which can benefit low-usage businesses.',
    },
    {
      title: 'Climate Change Levy (CCL)',
      icon: 'leaf',
      content: 'The Climate Change Levy is a tax on energy used by businesses to encourage energy efficiency and reduce carbon emissions. As of 2024, the CCL rate is approximately 0.775p per kWh for electricity and 0.672p per kWh for gas. Some businesses may qualify for CCL exemptions if they use renewable energy or are in certain sectors.',
    },
    {
      title: 'VAT on Energy',
      icon: 'receipt',
      content: 'Business energy bills are subject to 20% VAT (compared to 5% for domestic customers). However, some businesses can claim a reduced VAT rate of 5% if they use less than 1,000 kWh of electricity or 4,397 kWh of gas per month, or if at least 60% of the energy is used for domestic purposes (e.g., a home-based business).',
    },
    {
      title: 'Meter Readings',
      icon: 'speedometer',
      content: 'Your bill is based on either actual meter readings or estimated readings. Estimated readings are calculated from your historical usage and can result in underpaying or overpaying. Always submit regular meter readings to ensure accurate billing. Smart meters eliminate this issue by sending automatic readings to your supplier.',
    },
    {
      title: 'Capacity Charges',
      icon: 'trending-up',
      content: 'Larger businesses may see capacity charges (also called availability charges) on their bills. This is based on the maximum amount of power your premises can draw at any time, measured in kVA. If your business has periods of very high demand, you may need to pay for additional capacity.',
    },
    {
      title: 'Reactive Power Charges',
      icon: 'pulse',
      content: 'Some business electricity bills include reactive power charges. Reactive power is "wasted" electrical energy that doesn\'t perform useful work. If your business has a low power factor (typically from running large motors or machinery), you may be charged for excess reactive power. Power factor correction equipment can reduce these charges.',
    },
    {
      title: 'Feed-in Tariff Payments',
      icon: 'sunny',
      content: 'If your business has solar panels or other renewable generation installed before March 2019, you may receive Feed-in Tariff (FiT) payments. These appear as credits on your bill for energy you generate and export to the grid. The Smart Export Guarantee (SEG) replaced FiT for newer installations.',
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
          <Text style={styles.heroLabel}>ENERGY SAVING</Text>
          <Text style={styles.heroTitle}>Understanding Your Business Energy Bill</Text>
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
            Business energy bills can be confusing, with multiple charges, taxes, and fees that aren't always clearly explained. Understanding each component of your bill helps you identify opportunities to save money and spot any errors. Here's a comprehensive breakdown of everything you'll find on a typical UK business energy bill.
          </Animated.Text>

          {sections.map((section, index) => (
            <Animated.View
              key={section.title}
              entering={FadeInUp.delay(300 + index * 50).duration(500)}
              style={styles.sectionCard}
            >
              <View style={styles.sectionHeader}>
                <View style={styles.sectionIcon}>
                  <Ionicons name={section.icon as any} size={24} color={COLORS.primary} />
                </View>
                <Text style={styles.sectionTitle}>{section.title}</Text>
              </View>
              <Text style={styles.sectionContent}>{section.content}</Text>
            </Animated.View>
          ))}

          <Animated.View entering={FadeInUp.delay(700).duration(600)} style={styles.tipBox}>
            <Ionicons name="bulb" size={24} color="#92400E" />
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Pro Tip</Text>
              <Text style={styles.tipText}>
                Always compare the "total cost per kWh" rather than just the unit rate when shopping for energy deals. This calculation should include standing charges, CCL, and VAT to give you a true cost comparison.
              </Text>
            </View>
          </Animated.View>
        </View>
      </View>

      <View style={styles.ctaSection}>
        <LinearGradient colors={[COLORS.primary, '#9D85F6']} style={styles.ctaGradient}>
          <Text style={styles.ctaTitle}>Want to Lower Your Bills?</Text>
          <Text style={styles.ctaSubtitle}>Compare suppliers and find better rates with Hayyan</Text>
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
  sectionCard: { marginBottom: 32, backgroundColor: '#FFFFFF', borderRadius: 16, padding: 24, borderWidth: 1, borderColor: '#E5E7EB' },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, gap: 12 },
  sectionIcon: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#F0EBFF', justifyContent: 'center', alignItems: 'center' },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#1A1A2E', flex: 1 },
  sectionContent: { fontSize: 16, color: '#6B7280', lineHeight: 26 },
  tipBox: { flexDirection: 'row', backgroundColor: '#FEF3C7', borderRadius: 16, padding: 20, gap: 16, alignItems: 'flex-start' },
  tipContent: { flex: 1 },
  tipTitle: { fontSize: 16, fontWeight: '700', color: '#92400E', marginBottom: 4 },
  tipText: { fontSize: 14, color: '#92400E', lineHeight: 22 },
  ctaSection: { paddingHorizontal: 24, paddingVertical: 40 },
  ctaGradient: { borderRadius: 24, padding: 60, alignItems: 'center', maxWidth: 800, marginHorizontal: 'auto' },
  ctaTitle: { fontSize: isDesktop ? 36 : 28, fontWeight: '800', color: '#FFFFFF', textAlign: 'center', marginBottom: 16 },
  ctaSubtitle: { fontSize: 18, color: 'rgba(255,255,255,0.9)', textAlign: 'center', marginBottom: 32 },
});
