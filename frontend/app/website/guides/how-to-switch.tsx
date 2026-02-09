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

export default function HowToSwitchGuide() {
  const router = useRouter();

  const steps = [
    {
      number: '1',
      title: 'Gather Your Information',
      content: 'Before you start, have your current energy bill handy. You\'ll need your business name and address, current supplier name, MPAN (electricity) or MPRN (gas) numbers, and your current tariff details. This information helps suppliers give you accurate quotes.',
    },
    {
      number: '2',
      title: 'Compare Suppliers',
      content: 'Use Hayyan to instantly compare all UK business energy suppliers. Enter your business details and see quotes from every supplier, ranked by potential savings. Look beyond just the unit rate—consider standing charges, contract length, and customer service ratings.',
    },
    {
      number: '3',
      title: 'Check Your Current Contract',
      content: 'Review your existing contract for any exit fees or notice periods. Most fixed-term contracts have early termination fees, typically £50-150 per fuel. However, the savings from switching often outweigh these fees. Rolling contracts usually require 28 days\' notice.',
    },
    {
      number: '4',
      title: 'Choose Your New Supplier',
      content: 'Select the deal that best fits your business needs. Consider factors like: contract length (12, 24, or 36 months), fixed vs variable rates, green energy options, and any additional services offered. Hayyan shows you all these details upfront.',
    },
    {
      number: '5',
      title: 'Complete the Switch',
      content: 'Once you\'ve chosen, your new supplier handles everything. They\'ll contact your current supplier, arrange the transfer date, and set up your new account. You don\'t need to do anything else—just wait for the switch to complete.',
    },
    {
      number: '6',
      title: 'Switch Day Arrives',
      content: 'On your switch date (typically 2-3 weeks after signing up), your supply automatically transfers to your new supplier. There\'s no interruption to your energy supply—the only change is who you pay. Take a meter reading on switch day for accurate final billing.',
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
          <Text style={styles.heroLabel}>SWITCHING GUIDES</Text>
          <Text style={styles.heroTitle}>How to Switch Business Energy Suppliers</Text>
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
            Switching business energy suppliers is one of the easiest ways to reduce your overheads. Despite what many business owners think, the process is straightforward, completely handled by your new supplier, and there's never any interruption to your energy supply. Here's your step-by-step guide.
          </Animated.Text>

          {steps.map((step, index) => (
            <Animated.View
              key={step.number}
              entering={FadeInUp.delay(300 + index * 50).duration(500)}
              style={styles.stepCard}
            >
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{step.number}</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepText}>{step.content}</Text>
              </View>
            </Animated.View>
          ))}

          <Animated.View entering={FadeInUp.delay(600).duration(600)} style={styles.faqSection}>
            <Text style={styles.faqTitle}>Common Questions</Text>
            
            <View style={styles.faqItem}>
              <Text style={styles.faqQuestion}>Will my supply be interrupted?</Text>
              <Text style={styles.faqAnswer}>No, never. The physical supply remains exactly the same—only the billing changes.</Text>
            </View>
            
            <View style={styles.faqItem}>
              <Text style={styles.faqQuestion}>How long does switching take?</Text>
              <Text style={styles.faqAnswer}>Typically 2-3 weeks for electricity and 3-4 weeks for gas.</Text>
            </View>
            
            <View style={styles.faqItem}>
              <Text style={styles.faqQuestion}>Do I need a smart meter?</Text>
              <Text style={styles.faqAnswer}>No, you can switch with any type of meter. Your new supplier may offer a smart meter upgrade.</Text>
            </View>
          </Animated.View>
        </View>
      </View>

      <View style={styles.ctaSection}>
        <LinearGradient colors={[COLORS.primary, '#9D85F6']} style={styles.ctaGradient}>
          <Text style={styles.ctaTitle}>Ready to Switch?</Text>
          <Text style={styles.ctaSubtitle}>Compare suppliers in under 2 minutes</Text>
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
  stepCard: { flexDirection: isDesktop ? 'row' : 'column', marginBottom: 24, backgroundColor: '#F9FAFB', borderRadius: 16, padding: 24, borderWidth: 1, borderColor: '#E5E7EB' },
  stepNumber: { width: 48, height: 48, borderRadius: 24, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center', marginRight: isDesktop ? 20 : 0, marginBottom: isDesktop ? 0 : 16 },
  stepNumberText: { fontSize: 20, fontWeight: '700', color: '#FFFFFF' },
  stepContent: { flex: 1 },
  stepTitle: { fontSize: 20, fontWeight: '700', color: '#1A1A2E', marginBottom: 12 },
  stepText: { fontSize: 16, color: '#6B7280', lineHeight: 26 },
  faqSection: { marginTop: 40, backgroundColor: '#F0EBFF', borderRadius: 16, padding: 24 },
  faqTitle: { fontSize: 24, fontWeight: '700', color: '#1A1A2E', marginBottom: 20 },
  faqItem: { marginBottom: 16 },
  faqQuestion: { fontSize: 16, fontWeight: '600', color: '#1A1A2E', marginBottom: 4 },
  faqAnswer: { fontSize: 14, color: '#6B7280', lineHeight: 22 },
  ctaSection: { paddingHorizontal: 24, paddingVertical: 40 },
  ctaGradient: { borderRadius: 24, padding: 60, alignItems: 'center', maxWidth: 800, marginHorizontal: 'auto' },
  ctaTitle: { fontSize: isDesktop ? 36 : 28, fontWeight: '800', color: '#FFFFFF', textAlign: 'center', marginBottom: 16 },
  ctaSubtitle: { fontSize: 18, color: 'rgba(255,255,255,0.9)', textAlign: 'center', marginBottom: 32 },
});
