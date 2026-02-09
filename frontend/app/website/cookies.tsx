import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Platform } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../src/constants/colors';
import { WebHeader } from '../../src/components/web/WebHeader';
import { WebFooter } from '../../src/components/web/WebFooter';

const { width } = Dimensions.get('window');
const isDesktop = Platform.OS === 'web' && width > 768;

export default function CookiesPage() {
  const sections = [
    {
      title: 'What Are Cookies?',
      content: `Cookies are small text files that are placed on your device when you visit our website or use our app. They help us provide you with a better experience by remembering your preferences and understanding how you use our services.`,
    },
    {
      title: 'Types of Cookies We Use',
      content: `Essential Cookies:\nThese cookies are necessary for our website to function properly. They enable core functionality such as security, account access, and preferences.\n\nAnalytics Cookies:\nWe use analytics cookies to understand how visitors interact with our website. This helps us improve our services and user experience.\n\nMarketing Cookies:\nThese cookies are used to track visitors across websites to display relevant advertisements.`,
    },
    {
      title: 'Managing Cookies',
      content: `You can control and manage cookies through your browser settings. Please note that removing or blocking certain cookies may impact your experience on our website.\n\nMost browsers allow you to:\n• View what cookies are stored\n• Delete individual or all cookies\n• Block cookies from specific sites\n• Block all cookies`,
    },
    {
      title: 'Third-Party Cookies',
      content: `We may use third-party services that set their own cookies, including:\n\n• Google Analytics (analytics)\n• Facebook Pixel (marketing)\n• Intercom (customer support)\n\nThese third parties have their own privacy policies governing the use of such cookies.`,
    },
    {
      title: 'Updates to This Policy',
      content: `We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the "Last updated" date.`,
    },
    {
      title: 'Contact Us',
      content: `If you have any questions about our use of cookies, please contact us at:\n\nEmail: privacy@hayyan.com`,
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <WebHeader />

      <LinearGradient colors={['#F5F3FF', '#EDE9FE', '#FFFFFF']} style={styles.heroSection}>
        <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.heroContent}>
          <Text style={styles.heroLabel}>LEGAL</Text>
          <Text style={styles.heroTitle}>Cookie Policy</Text>
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
