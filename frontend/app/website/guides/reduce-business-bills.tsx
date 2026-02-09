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

export default function ReduceBusinessBillsGuide() {
  const router = useRouter();

  const tips = [
    {
      number: '1',
      title: 'Switch to LED Lighting',
      content: 'LED bulbs use up to 90% less energy than traditional incandescent bulbs and last up to 25 times longer. For a typical small business, switching to LED lighting can save £200-£500 per year. Start with the areas that are lit the longest - reception areas, main workspaces, and exterior lighting.',
    },
    {
      number: '2',
      title: 'Optimise Your Heating Schedule',
      content: 'Most businesses heat their premises for longer than necessary. Install a programmable thermostat and set heating to come on 30 minutes before staff arrive and turn off 30 minutes before closing. Reducing your thermostat by just 1°C can cut heating bills by up to 8%.',
    },
    {
      number: '3',
      title: 'Conduct an Energy Audit',
      content: 'An energy audit identifies where your business is wasting energy. Many energy suppliers offer free audits, or you can use the Hayyan app to analyse your usage patterns. Common findings include inefficient equipment, poor insulation, and unnecessary standby power consumption.',
    },
    {
      number: '4',
      title: 'Upgrade to Energy-Efficient Equipment',
      content: 'When replacing equipment, always check the energy rating. A-rated appliances use significantly less energy than older models. For refrigeration units, this can mean savings of £100+ per year per unit. The initial investment typically pays for itself within 2-3 years.',
    },
    {
      number: '5',
      title: 'Implement Smart Power Management',
      content: 'Install smart power strips that automatically cut power to devices in standby mode. A typical office workstation uses £50-100 of electricity per year just on standby. Smart strips can eliminate this "phantom load" entirely.',
    },
    {
      number: '6',
      title: 'Maximise Natural Light',
      content: 'Rearrange workspaces to take advantage of natural daylight. Clean windows regularly to maximise light transmission. Consider installing skylights or light tubes in darker areas. Daylight sensors that automatically dim artificial lights when natural light is sufficient can save 20-40% on lighting costs.',
    },
    {
      number: '7',
      title: 'Maintain Your HVAC System',
      content: 'A well-maintained heating and cooling system operates 15-20% more efficiently. Change air filters monthly, clean vents and ducts annually, and have a professional service your system before winter and summer. Blocked filters alone can increase energy consumption by 15%.',
    },
    {
      number: '8',
      title: 'Switch Energy Suppliers',
      content: 'Many businesses stay with their current supplier out of inertia, often paying hundreds or thousands more than necessary. Use Hayyan to compare all UK suppliers instantly and find the best deal for your business. Switching typically takes just 2-3 weeks with no interruption to supply.',
    },
    {
      number: '9',
      title: 'Install Motion Sensors',
      content: 'Motion-activated lighting in toilets, storage areas, corridors, and meeting rooms ensures lights are only on when needed. Sensors cost £10-30 each and typically pay for themselves within 6 months through reduced electricity usage.',
    },
    {
      number: '10',
      title: 'Educate Your Staff',
      content: 'Employee behaviour accounts for up to 20% of a business\'s energy use. Simple habits like turning off lights, closing doors, and shutting down computers can make a significant difference. Consider appointing an "energy champion" and setting up a staff suggestion scheme with rewards for the best energy-saving ideas.',
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <WebHeader />

      {/* Hero Section */}
      <LinearGradient colors={['#F5F3FF', '#EDE9FE', '#FFFFFF']} style={styles.heroSection}>
        <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.heroContent}>
          <TouchableOpacity onPress={() => router.push('/website/guides')} style={styles.backLink}>
            <Ionicons name="arrow-back" size={20} color={COLORS.primary} />
            <Text style={styles.backLinkText}>Back to Guides</Text>
          </TouchableOpacity>
          <Text style={styles.heroLabel}>ENERGY SAVING</Text>
          <Text style={styles.heroTitle}>10 Ways to Reduce Business Energy Bills</Text>
          <View style={styles.metaInfo}>
            <Text style={styles.metaText}>5 min read</Text>
            <Text style={styles.metaDot}>•</Text>
            <Text style={styles.metaText}>Updated January 2025</Text>
          </View>
        </Animated.View>
      </LinearGradient>

      {/* Content */}
      <View style={styles.contentSection}>
        <View style={styles.contentContainer}>
          <Animated.Text entering={FadeInUp.delay(200).duration(600)} style={styles.intro}>
            Energy costs are one of the biggest overheads for UK businesses. The good news? There are plenty of practical steps you can take to reduce your bills without affecting productivity. Here are our top 10 energy-saving tips that can help your business save hundreds—or even thousands—of pounds each year.
          </Animated.Text>

          {tips.map((tip, index) => (
            <Animated.View
              key={tip.number}
              entering={FadeInUp.delay(300 + index * 50).duration(500)}
              style={styles.tipCard}
            >
              <View style={styles.tipNumber}>
                <Text style={styles.tipNumberText}>{tip.number}</Text>
              </View>
              <View style={styles.tipContent}>
                <Text style={styles.tipTitle}>{tip.title}</Text>
                <Text style={styles.tipText}>{tip.content}</Text>
              </View>
            </Animated.View>
          ))}

          <Animated.View entering={FadeInUp.delay(800).duration(600)} style={styles.summaryBox}>
            <Text style={styles.summaryTitle}>Quick Summary</Text>
            <Text style={styles.summaryText}>
              By implementing these 10 tips, a typical small business can save between £500 and £2,000 per year on energy costs. The key is to start with the quick wins (LED lighting, thermostat adjustment, supplier switching) and then tackle the bigger investments over time.
            </Text>
          </Animated.View>
        </View>
      </View>

      {/* CTA */}
      <View style={styles.ctaSection}>
        <LinearGradient colors={[COLORS.primary, '#9D85F6']} style={styles.ctaGradient}>
          <Animated.View entering={FadeInUp.duration(600)}>
            <Text style={styles.ctaTitle}>Ready to Start Saving?</Text>
            <Text style={styles.ctaSubtitle}>Compare energy suppliers instantly with Hayyan</Text>
            <AppStoreButtons delay={200} />
          </Animated.View>
        </LinearGradient>
      </View>

      <WebFooter />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  heroSection: {
    paddingTop: 140,
    paddingBottom: 60,
    paddingHorizontal: 24,
  },
  heroContent: {
    maxWidth: 800,
    marginHorizontal: 'auto',
  },
  backLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 8,
  },
  backLinkText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '500',
  },
  heroLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
    letterSpacing: 2,
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: isDesktop ? 48 : 32,
    fontWeight: '800',
    color: '#1A1A2E',
    marginBottom: 20,
    lineHeight: isDesktop ? 56 : 40,
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaText: {
    fontSize: 14,
    color: '#6B7280',
  },
  metaDot: {
    fontSize: 14,
    color: '#6B7280',
  },
  contentSection: {
    paddingVertical: 60,
    paddingHorizontal: 24,
  },
  contentContainer: {
    maxWidth: 800,
    marginHorizontal: 'auto',
  },
  intro: {
    fontSize: 18,
    color: '#374151',
    lineHeight: 30,
    marginBottom: 40,
  },
  tipCard: {
    flexDirection: isDesktop ? 'row' : 'column',
    marginBottom: 32,
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  tipNumber: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: isDesktop ? 20 : 0,
    marginBottom: isDesktop ? 0 : 16,
  },
  tipNumberText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 12,
  },
  tipText: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 26,
  },
  summaryBox: {
    backgroundColor: '#F0EBFF',
    borderRadius: 16,
    padding: 24,
    marginTop: 20,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 26,
  },
  ctaSection: {
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  ctaGradient: {
    borderRadius: 24,
    padding: 60,
    alignItems: 'center',
    maxWidth: 800,
    marginHorizontal: 'auto',
  },
  ctaTitle: {
    fontSize: isDesktop ? 36 : 28,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  ctaSubtitle: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginBottom: 32,
  },
});
