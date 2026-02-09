import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../src/constants/colors';
import { WebHeader } from '../../src/components/web/WebHeader';
import { WebFooter } from '../../src/components/web/WebFooter';

const { width } = Dimensions.get('window');
const isDesktop = Platform.OS === 'web' && width > 768;

export default function SitemapPage() {
  const router = useRouter();

  const sitemapSections = [
    {
      title: 'Main Pages',
      links: [
        { label: 'Home', href: '/website' },
        { label: 'How It Works', href: '/website/how-it-works' },
        { label: 'About Us', href: '/website/about' },
        { label: 'Contact', href: '/website/contact' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Energy Saving Guides', href: '/website/guides' },
        { label: 'Switching Guides', href: '/website/guides' },
        { label: 'Business Type Guides', href: '/website/guides' },
        { label: 'Green Energy Guides', href: '/website/guides' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/website/privacy' },
        { label: 'Cookie Policy', href: '/website/cookies' },
        { label: 'Terms of Service', href: '/website/terms' },
      ],
    },
    {
      title: 'Download',
      links: [
        { label: 'iOS App Store', href: 'https://apps.apple.com' },
        { label: 'Google Play Store', href: 'https://play.google.com' },
      ],
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <WebHeader />

      <LinearGradient colors={['#F5F3FF', '#EDE9FE', '#FFFFFF']} style={styles.heroSection}>
        <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.heroContent}>
          <Text style={styles.heroLabel}>NAVIGATION</Text>
          <Text style={styles.heroTitle}>Sitemap</Text>
          <Text style={styles.heroSubtitle}>Find your way around Hayyan</Text>
        </Animated.View>
      </LinearGradient>

      <View style={styles.contentSection}>
        <View style={styles.sitemapGrid}>
          {sitemapSections.map((section, sectionIndex) => (
            <Animated.View
              key={section.title}
              entering={FadeInUp.delay(200 + sectionIndex * 100).duration(600)}
              style={styles.sitemapColumn}
            >
              <Text style={styles.columnTitle}>{section.title}</Text>
              {section.links.map((link) => (
                <TouchableOpacity
                  key={link.label}
                  onPress={() => router.push(link.href as any)}
                  style={styles.sitemapLink}
                >
                  <Text style={styles.sitemapLinkText}>{link.label}</Text>
                </TouchableOpacity>
              ))}
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
  sitemapGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 48,
    maxWidth: 1000,
    marginHorizontal: 'auto',
  },
  sitemapColumn: {
    minWidth: 200,
  },
  columnTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 20,
  },
  sitemapLink: {
    paddingVertical: 8,
  },
  sitemapLinkText: {
    fontSize: 16,
    color: COLORS.primary,
  },
});
