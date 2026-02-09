import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Platform } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../src/constants/colors';
import { WebHeader } from '../../src/components/web/WebHeader';
import { WebFooter } from '../../src/components/web/WebFooter';

const { width } = Dimensions.get('window');
const isDesktop = Platform.OS === 'web' && width > 768;

export default function TermsPage() {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: `By accessing or using the Hayyan mobile application and website ("Services"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Services.`,
    },
    {
      title: '2. Description of Services',
      content: `Hayyan provides an energy comparison platform that enables UK businesses to:\n\n• Compare energy suppliers\n• Receive personalized quotes\n• Switch energy suppliers\n• Track potential savings\n\nWe act as an intermediary and do not supply energy directly.`,
    },
    {
      title: '3. User Accounts',
      content: `To use certain features of our Services, you must create an account. You are responsible for:\n\n• Maintaining the confidentiality of your account credentials\n• All activities that occur under your account\n• Providing accurate and current information\n• Notifying us immediately of any unauthorized use`,
    },
    {
      title: '4. Energy Switching',
      content: `When you request to switch energy suppliers through our Services:\n\n• We will facilitate the introduction between you and the new supplier\n• The contract for energy supply is directly between you and the supplier\n• We are not responsible for the supplier's performance\n• Switching typically takes 2-3 weeks to complete`,
    },
    {
      title: '5. Fees and Payment',
      content: `Our comparison and switching services are free for users. We receive commission from energy suppliers when you successfully switch through our platform. This does not affect the price you pay for energy.`,
    },
    {
      title: '6. Intellectual Property',
      content: `All content, features, and functionality of our Services are owned by Hayyan Ltd and are protected by copyright, trademark, and other intellectual property laws.`,
    },
    {
      title: '7. Limitation of Liability',
      content: `To the fullest extent permitted by law, Hayyan Ltd shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our Services.`,
    },
    {
      title: '8. Governing Law',
      content: `These Terms shall be governed by and construed in accordance with the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.`,
    },
    {
      title: '9. Contact Information',
      content: `For questions about these Terms, please contact us at:\n\nHayyan Ltd\nEmail: legal@hayyan.com\nAddress: 123 Energy Street, London, EC1A 1BB`,
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <WebHeader />

      <LinearGradient colors={['#F5F3FF', '#EDE9FE', '#FFFFFF']} style={styles.heroSection}>
        <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.heroContent}>
          <Text style={styles.heroLabel}>LEGAL</Text>
          <Text style={styles.heroTitle}>Terms of Service</Text>
          <Text style={styles.heroSubtitle}>Last updated: January 2025</Text>
        </Animated.View>
      </LinearGradient>

      <View style={styles.contentSection}>
        <View style={styles.contentContainer}>
          {sections.map((section, index) => (
            <Animated.View
              key={index}
              entering={FadeInDown.delay(200 + index * 50).duration(500)}
              style={styles.section}
            >
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.sectionContent}>{section.content}</Text>
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
    paddingBottom: 60,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  heroContent: {
    alignItems: 'center',
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
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 16,
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
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 16,
  },
  sectionContent: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 28,
  },
});
