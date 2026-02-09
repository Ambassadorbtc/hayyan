import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Platform } from 'react-native';
import Animated, { FadeInDown, FadeInUp, FadeInLeft, FadeInRight } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../src/constants/colors';
import { WebHeader } from '../../src/components/web/WebHeader';
import { WebFooter } from '../../src/components/web/WebFooter';
import { AppStoreButtons } from '../../src/components/web/AppStoreButtons';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const isDesktop = Platform.OS === 'web' && width > 768;

export default function HowItWorksPage() {
  const steps = [
    {
      number: '01',
      title: 'Download the App',
      description: 'Get Hayyan free from the App Store or Google Play. Create your account in under 60 seconds.',
      icon: 'download',
      color: '#FF9800',
    },
    {
      number: '02',
      title: 'Enter Your Details',
      description: 'Tell us about your business and current energy supplier. We\'ll use this to find you the best deals.',
      icon: 'create',
      color: '#2196F3',
    },
    {
      number: '03',
      title: 'Compare Deals Instantly',
      description: 'See all available suppliers ranked by savings. View detailed breakdowns of each offer.',
      icon: 'bar-chart',
      color: '#4CAF50',
    },
    {
      number: '04',
      title: 'Switch & Save',
      description: 'Choose your new supplier and we handle the rest. No paperwork, no interruption to your supply.',
      icon: 'checkmark-circle',
      color: COLORS.primary,
    },
  ];

  const faqs = [
    {
      question: 'How long does switching take?',
      answer: 'The switch typically completes within 2-3 weeks. Your energy supply is never interrupted during this time.',
    },
    {
      question: 'Is there a fee for switching?',
      answer: 'No! Hayyan is completely free to use. We\'re paid by suppliers when you switch, not by you.',
    },
    {
      question: 'What if I\'m in a contract?',
      answer: 'We\'ll show you any exit fees upfront. Often, the savings still outweigh any early termination costs.',
    },
    {
      question: 'Is my data safe?',
      answer: 'Absolutely. We use bank-level encryption and never share your data with third parties without consent.',
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <WebHeader />

      {/* Hero Section */}
      <LinearGradient colors={['#F5F3FF', '#EDE9FE', '#FFFFFF']} style={styles.heroSection}>
        <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.heroContent}>
          <Text style={styles.heroLabel}>HOW IT WORKS</Text>
          <Text style={styles.heroTitle}>Switch Energy in 4 Simple Steps</Text>
          <Text style={styles.heroSubtitle}>
            We\'ve made switching energy suppliers as easy as ordering a coffee. No paperwork, no hassle.
          </Text>
        </Animated.View>
      </LinearGradient>

      {/* Steps Section */}
      <View style={styles.stepsSection}>
        {steps.map((step, index) => (
          <Animated.View
            key={step.number}
            entering={(index % 2 === 0 ? FadeInLeft : FadeInRight).delay(200 + index * 150).duration(600)}
            style={styles.stepRow}
          >
            <View style={[styles.stepCard, index % 2 !== 0 && isDesktop && styles.stepCardReverse]}>
              <View style={styles.stepVisual}>
                <View style={[styles.stepIconCircle, { backgroundColor: `${step.color}15` }]}>
                  <View style={[styles.stepIconInner, { backgroundColor: step.color }]}>
                    <Ionicons name={step.icon as any} size={32} color="#FFFFFF" />
                  </View>
                </View>
                <Text style={[styles.stepNumber, { color: step.color }]}>{step.number}</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepDescription}>{step.description}</Text>
              </View>
            </View>
            {index < steps.length - 1 && (
              <View style={styles.stepConnector}>
                <View style={styles.stepConnectorLine} />
              </View>
            )}
          </Animated.View>
        ))}
      </View>

      {/* CTA Section */}
      <View style={styles.ctaSection}>
        <LinearGradient colors={[COLORS.primary, '#9D85F6']} style={styles.ctaGradient}>
          <Animated.View entering={FadeInUp.duration(600)}>
            <Text style={styles.ctaTitle}>Ready to Start Saving?</Text>
            <Text style={styles.ctaSubtitle}>Download the app and see how much you could save today.</Text>
            <AppStoreButtons delay={200} />
          </Animated.View>
        </LinearGradient>
      </View>

      {/* FAQ Section */}
      <View style={styles.faqSection}>
        <Animated.View entering={FadeInDown.duration(600)} style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>FAQ</Text>
          <Text style={styles.sectionTitle}>Common Questions</Text>
        </Animated.View>

        <View style={styles.faqGrid}>
          {faqs.map((faq, index) => (
            <Animated.View
              key={index}
              entering={FadeInUp.delay(200 + index * 100).duration(600)}
              style={styles.faqCard}
            >
              <Text style={styles.faqQuestion}>{faq.question}</Text>
              <Text style={styles.faqAnswer}>{faq.answer}</Text>
            </Animated.View>
          ))}
        </View>
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
    paddingBottom: 80,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  heroContent: {
    alignItems: 'center',
    maxWidth: 700,
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
    textAlign: 'center',
    marginBottom: 20,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 28,
  },
  stepsSection: {
    paddingVertical: 60,
    paddingHorizontal: 24,
    maxWidth: 800,
    marginHorizontal: 'auto',
  },
  stepRow: {
    marginBottom: 20,
  },
  stepCard: {
    flexDirection: isDesktop ? 'row' : 'column',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 32,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  stepCardReverse: {
    flexDirection: 'row-reverse',
  },
  stepVisual: {
    alignItems: 'center',
    marginRight: isDesktop ? 32 : 0,
    marginBottom: isDesktop ? 0 : 24,
  },
  stepIconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepIconInner: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumber: {
    fontSize: 24,
    fontWeight: '800',
  },
  stepContent: {
    flex: 1,
    alignItems: isDesktop ? 'flex-start' : 'center',
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 12,
    textAlign: isDesktop ? 'left' : 'center',
  },
  stepDescription: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 26,
    textAlign: isDesktop ? 'left' : 'center',
  },
  stepConnector: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  stepConnectorLine: {
    width: 2,
    height: 40,
    backgroundColor: '#E5E7EB',
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
  faqSection: {
    paddingVertical: 80,
    paddingHorizontal: 24,
    backgroundColor: '#F9FAFB',
  },
  sectionHeader: {
    alignItems: 'center',
    marginBottom: 48,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
    letterSpacing: 2,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: isDesktop ? 36 : 28,
    fontWeight: '800',
    color: '#1A1A2E',
  },
  faqGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 24,
    maxWidth: 1000,
    marginHorizontal: 'auto',
  },
  faqCard: {
    width: isDesktop ? '45%' : '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  faqQuestion: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 12,
  },
  faqAnswer: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 26,
  },
});
