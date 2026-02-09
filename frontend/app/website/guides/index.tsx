import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Platform } from 'react-native';
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

export default function GuidesPage() {
  const router = useRouter();

  const guides = [
    {
      category: 'Energy Saving',
      items: [
        {
          title: '10 Ways to Reduce Business Energy Bills',
          description: 'Simple, actionable tips to cut your energy costs without affecting productivity.',
          readTime: '5 min read',
          icon: 'bulb',
          href: '/website/guides/reduce-business-bills',
        },
        {
          title: 'Understanding Your Energy Bill',
          description: 'A breakdown of all the charges on your business energy bill and what they mean.',
          readTime: '8 min read',
          icon: 'document-text',
          href: '/website/guides/understanding-energy-bill',
        },
        {
          title: 'Peak vs Off-Peak Energy: A Guide',
          description: 'How to shift your energy usage to save money on time-of-use tariffs.',
          readTime: '4 min read',
          icon: 'time',
          href: '/website/guides/peak-off-peak',
        },
      ],
    },
    {
      category: 'Switching Guides',
      items: [
        {
          title: 'How to Switch Business Energy Suppliers',
          description: 'A step-by-step guide to switching your business energy supplier hassle-free.',
          readTime: '6 min read',
          icon: 'swap-horizontal',
          href: '/website/guides/how-to-switch',
        },
        {
          title: 'What Happens When You Switch?',
          description: 'Everything you need to know about the switching process and timeline.',
          readTime: '4 min read',
          icon: 'help-circle',
          href: '/website/guides/what-happens-switch',
        },
        {
          title: 'Avoiding Exit Fees When Switching',
          description: 'How to check your contract and minimize costs when switching suppliers.',
          readTime: '5 min read',
          icon: 'warning',
          href: '/website/guides/avoiding-exit-fees',
        },
      ],
    },
    {
      category: 'Business Types',
      items: [
        {
          title: 'Energy Tips for Cafes & Restaurants',
          description: 'Industry-specific advice for reducing energy costs in food service businesses.',
          readTime: '7 min read',
          icon: 'cafe',
          href: '/website/guides/cafes-restaurants',
        },
        {
          title: 'Salon & Spa Energy Efficiency Guide',
          description: 'How beauty businesses can cut energy costs while maintaining service quality.',
          readTime: '5 min read',
          icon: 'cut',
          href: '/website/guides/salon-spa',
        },
        {
          title: 'Retail Shop Energy Savings',
          description: 'From lighting to heating, how retail shops can reduce their energy bills.',
          readTime: '6 min read',
          icon: 'storefront',
          href: '/website/guides/retail-shop',
        },
      ],
    },
    {
      category: 'Green Energy',
      items: [
        {
          title: 'Switching to Renewable Energy',
          description: 'How to make your business more sustainable without paying a premium.',
          readTime: '5 min read',
          icon: 'leaf',
          href: '/website/guides/renewable-energy',
        },
        {
          title: 'Understanding Carbon Offsetting',
          description: 'What carbon offsetting is and whether it\'s right for your business.',
          readTime: '4 min read',
          icon: 'earth',
          href: '/website/guides/carbon-offsetting',
        },
        {
          title: 'Solar Panels for Business: Worth It?',
          description: 'A cost-benefit analysis of installing solar panels for your business.',
          readTime: '8 min read',
          icon: 'sunny',
          href: '/website/guides/solar-panels',
        },
      ],
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <WebHeader />

      {/* Hero Section */}
      <LinearGradient colors={['#F5F3FF', '#EDE9FE', '#FFFFFF']} style={styles.heroSection}>
        <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.heroContent}>
          <Text style={styles.heroLabel}>RESOURCES</Text>
          <Text style={styles.heroTitle}>Energy Guides for UK Businesses</Text>
          <Text style={styles.heroSubtitle}>
            Expert advice, tips, and guides to help you understand and reduce your business energy costs.
          </Text>
        </Animated.View>
      </LinearGradient>

      {/* Guides Sections */}
      {guides.map((section, sectionIndex) => (
        <View key={section.category} style={styles.guideSection}>
          <Animated.View
            entering={FadeInDown.delay(200).duration(600)}
            style={styles.sectionHeader}
          >
            <Text style={styles.sectionTitle}>{section.category}</Text>
          </Animated.View>

          <View style={styles.guidesGrid}>
            {section.items.map((guide, index) => (
              <Animated.View
                key={guide.title}
                entering={FadeInUp.delay(200 + index * 100).duration(600)}
              >
                <TouchableOpacity 
                  style={styles.guideCard}
                  onPress={() => router.push(guide.href as any)}
                >
                  <View style={styles.guideIcon}>
                    <Ionicons name={guide.icon as any} size={24} color={COLORS.primary} />
                  </View>
                  <Text style={styles.guideTitle}>{guide.title}</Text>
                  <Text style={styles.guideDescription}>{guide.description}</Text>
                  <View style={styles.guideFooter}>
                    <Text style={styles.guideReadTime}>{guide.readTime}</Text>
                    <Ionicons name="arrow-forward" size={16} color={COLORS.primary} />
                  </View>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </View>
      ))}

      {/* CTA Section */}
      <View style={styles.ctaSection}>
        <LinearGradient colors={[COLORS.primary, '#9D85F6']} style={styles.ctaGradient}>
          <Animated.View entering={FadeInUp.duration(600)}>
            <Text style={styles.ctaTitle}>Ready to Start Saving?</Text>
            <Text style={styles.ctaSubtitle}>
              Download Hayyan and compare energy suppliers in under 2 minutes.
            </Text>
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
  guideSection: {
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  sectionHeader: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  guidesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    maxWidth: 1200,
    marginHorizontal: 'auto',
  },
  guideCard: {
    width: isDesktop ? 370 : '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  guideIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0EBFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  guideTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 8,
  },
  guideDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 22,
    marginBottom: 16,
  },
  guideFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  guideReadTime: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  ctaSection: {
    paddingHorizontal: 24,
    paddingVertical: 60,
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
