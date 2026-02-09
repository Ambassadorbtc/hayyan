import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Platform, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { COLORS } from '../../src/constants/colors';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const isDesktop = Platform.OS === 'web' && width > 768;

export const WebFooter: React.FC = () => {
  const router = useRouter();

  const footerSections = [
    {
      title: 'Product',
      links: [
        { label: 'How It Works', href: '/website/how-it-works' },
        { label: 'Features', href: '/website/how-it-works' },
        { label: 'Compare Suppliers', href: '/website/how-it-works' },
        { label: 'Download App', href: '#download' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/website/about' },
        { label: 'Contact', href: '/website/contact' },
        { label: 'Careers', href: '/website/about' },
        { label: 'Press Kit', href: '/website/about' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Energy Saving Tips', href: '/website/guides' },
        { label: 'Business Energy Guide', href: '/website/guides' },
        { label: 'Switching Guide', href: '/website/guides' },
        { label: 'FAQ', href: '/website/guides' },
      ],
    },
    {
      title: 'Help Guides',
      links: [
        { label: 'How to Reduce Bills', href: '/website/guides' },
        { label: 'Understanding Tariffs', href: '/website/guides' },
        { label: 'Smart Meters Explained', href: '/website/guides' },
        { label: 'Green Energy Options', href: '/website/guides' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/website/privacy' },
        { label: 'Cookie Policy', href: '/website/cookies' },
        { label: 'Terms of Service', href: '/website/terms' },
        { label: 'Sitemap', href: '/website/sitemap' },
      ],
    },
  ];

  const socialLinks = [
    { icon: 'logo-twitter', url: 'https://twitter.com/hayyan' },
    { icon: 'logo-facebook', url: 'https://facebook.com/hayyan' },
    { icon: 'logo-instagram', url: 'https://instagram.com/hayyan' },
    { icon: 'logo-linkedin', url: 'https://linkedin.com/company/hayyan' },
    { icon: 'logo-tiktok', url: 'https://tiktok.com/@hayyan' },
  ];

  return (
    <Animated.View entering={FadeInUp.duration(600)} style={styles.footer}>
      {/* Main Footer Content */}
      <View style={styles.footerMain}>
        {/* Brand Column */}
        <View style={styles.brandColumn}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoIcon}>⚡</Text>
            <Text style={styles.logoText}>Hayyan</Text>
          </View>
          <Text style={styles.brandDescription}>
            Helping UK businesses slash their energy bills with instant comparisons and smart savings.
          </Text>
          
          {/* App Store Buttons */}
          <View style={styles.appButtons}>
            <TouchableOpacity style={styles.appStoreButton}>
              <Ionicons name="logo-apple" size={24} color="#FFFFFF" />
              <View>
                <Text style={styles.appStoreLabel}>Download on the</Text>
                <Text style={styles.appStoreName}>App Store</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.appStoreButton}>
              <Ionicons name="logo-google-playstore" size={24} color="#FFFFFF" />
              <View>
                <Text style={styles.appStoreLabel}>Get it on</Text>
                <Text style={styles.appStoreName}>Google Play</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Social Links */}
          <View style={styles.socialLinks}>
            {socialLinks.map((social) => (
              <TouchableOpacity
                key={social.icon}
                style={styles.socialButton}
                onPress={() => Linking.openURL(social.url)}
              >
                <Ionicons name={social.icon as any} size={20} color={COLORS.textSecondary} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Link Columns */}
        <View style={styles.linksContainer}>
          {footerSections.map((section) => (
            <View key={section.title} style={styles.linkColumn}>
              <Text style={styles.linkColumnTitle}>{section.title}</Text>
              {section.links.map((link) => (
                <TouchableOpacity
                  key={link.label}
                  onPress={() => router.push(link.href as any)}
                  style={styles.footerLink}
                >
                  <Text style={styles.footerLinkText}>{link.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </View>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <Text style={styles.copyright}>© 2025 Hayyan. All rights reserved.</Text>
        <Text style={styles.tagline}>Made with ⚡ for UK businesses</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#1A1A2E',
    paddingTop: 60,
  },
  footerMain: {
    flexDirection: isDesktop ? 'row' : 'column',
    maxWidth: 1200,
    marginHorizontal: 'auto',
    paddingHorizontal: 24,
    paddingBottom: 40,
    width: '100%',
  },
  brandColumn: {
    flex: isDesktop ? 1.5 : undefined,
    marginBottom: isDesktop ? 0 : 40,
    marginRight: isDesktop ? 60 : 0,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoIcon: {
    fontSize: 32,
    marginRight: 8,
  },
  logoText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  brandDescription: {
    fontSize: 16,
    color: '#9CA3AF',
    lineHeight: 24,
    marginBottom: 24,
  },
  appButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  appStoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#374151',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 10,
  },
  appStoreLabel: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  appStoreName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  socialLinks: {
    flexDirection: 'row',
    gap: 12,
  },
  socialButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
  },
  linksContainer: {
    flex: isDesktop ? 3 : undefined,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  linkColumn: {
    width: isDesktop ? '20%' : '50%',
    marginBottom: 32,
  },
  linkColumnTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  footerLink: {
    marginBottom: 12,
  },
  footerLinkText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  bottomBar: {
    borderTopWidth: 1,
    borderTopColor: '#374151',
    paddingVertical: 24,
    paddingHorizontal: 24,
    flexDirection: isDesktop ? 'row' : 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  copyright: {
    fontSize: 14,
    color: '#6B7280',
  },
  tagline: {
    fontSize: 14,
    color: '#6B7280',
  },
});

export default WebFooter;
