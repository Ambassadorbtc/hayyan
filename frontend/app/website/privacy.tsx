import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Platform } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../src/constants/colors';
import { WebHeader } from '../../src/components/web/WebHeader';
import { WebFooter } from '../../src/components/web/WebFooter';

const { width } = Dimensions.get('window');
const isDesktop = Platform.OS === 'web' && width > 768;

export default function PrivacyPage() {
  const sections = [
    {
      title: '1. Information We Collect',
      content: `We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.\n\nThis includes:\n• Personal information (name, email, phone number)\n• Business information (business name, type, postcode)\n• Energy usage data (current supplier, monthly bills)\n• Device and usage information`,
    },
    {
      title: '2. How We Use Your Information',
      content: `We use the information we collect to:\n\n• Provide, maintain, and improve our services\n• Compare energy suppliers and provide personalized quotes\n• Process your requests and transactions\n• Send you technical notices and support messages\n• Respond to your comments and questions\n• Develop new features and services`,
    },
    {
      title: '3. Information Sharing',
      content: `We do not sell your personal information. We may share your information with:\n\n• Energy suppliers (with your consent) to process switch requests\n• Service providers who assist in our operations\n• Professional advisors (lawyers, accountants)\n• Regulatory authorities when required by law`,
    },
    {
      title: '4. Data Security',
      content: `We implement appropriate technical and organizational measures to protect your personal information, including:\n\n• Encryption of data in transit and at rest\n• Regular security assessments\n• Access controls and authentication\n• Employee training on data protection`,
    },
    {
      title: '5. Your Rights',
      content: `Under UK GDPR, you have the right to:\n\n• Access your personal data\n• Correct inaccurate data\n• Request deletion of your data\n• Object to processing\n• Data portability\n• Withdraw consent\n\nTo exercise these rights, contact us at privacy@hayyan.com`,
    },
    {
      title: '6. Cookies',
      content: `We use cookies and similar technologies to improve your experience. For more information, please see our Cookie Policy.`,
    },
    {
      title: '7. Contact Us',
      content: `If you have questions about this Privacy Policy, please contact us at:\n\nHayyan Ltd\nEmail: privacy@hayyan.com\nAddress: 123 Energy Street, London, EC1A 1BB`,
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <WebHeader />

      <LinearGradient colors={['#F5F3FF', '#EDE9FE', '#FFFFFF']} style={styles.heroSection}>
        <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.heroContent}>
          <Text style={styles.heroLabel}>LEGAL</Text>
          <Text style={styles.heroTitle}>Privacy Policy</Text>
          <Text style={styles.heroSubtitle}>Last updated: January 2025</Text>
        </Animated.View>
      </LinearGradient>

      <View style={styles.contentSection}>
        <View style={styles.contentContainer}>
          <Text style={styles.intro}>
            Hayyan Ltd ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share your personal information when you use our mobile application and website.
          </Text>

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
  intro: {
    fontSize: 18,
    color: '#374151',
    lineHeight: 30,
    marginBottom: 40,
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
