import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeInLeft,
  FadeInRight,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../src/constants/colors';
import { WebHeader } from '../../src/components/web/WebHeader';
import { WebFooter } from '../../src/components/web/WebFooter';
import { AppStoreButtons } from '../../src/components/web/AppStoreButtons';
import { CookieConsent } from '../../src/components/web/CookieConsent';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');
const isDesktop = Platform.OS === 'web' && width > 768;

export default function WebsiteHomePage() {
  const router = useRouter();
  
  // Floating animation for phone mockup
  const floatY = useSharedValue(0);
  
  useEffect(() => {
    floatY.value = withRepeat(
      withSequence(
        withTiming(-15, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, []);

  const phoneStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: floatY.value }],
  }));

  const features = [
    {
      icon: 'flash',
      title: 'Instant Comparisons',
      description: 'Compare energy suppliers in seconds and find the best deals for your business.',
      color: '#FF9800',
    },
    {
      icon: 'trending-down',
      title: 'Save Up to 40%',
      description: 'UK businesses save an average of £600/year by switching with Hayyan.',
      color: '#4CAF50',
    },
    {
      icon: 'shield-checkmark',
      title: 'Ofgem Regulated',
      description: 'All suppliers are regulated by Ofgem. Your switch is guaranteed safe.',
      color: '#2196F3',
    },
    {
      icon: 'time',
      title: 'Switch in Minutes',
      description: 'No paperwork, no hassle. We handle everything for a seamless switch.',
      color: '#9C27B0',
    },
  ];

  const stats = [
    { value: '10,000+', label: 'Businesses Helped' },
    { value: '£2.5M+', label: 'Total Savings' },
    { value: '4.9★', label: 'App Rating' },
    { value: '2 min', label: 'Average Switch Time' },
  ];

  const testimonials = [
    {
      quote: "Saved £800 on our cafe's energy bills in the first year. The app made it so easy!",
      author: 'Sarah M.',
      business: 'The Corner Cafe, Manchester',
    },
    {
      quote: "As a mechanic, I never had time to compare suppliers. Hayyan did it all for me.",
      author: 'James T.',
      business: 'JT Auto Repairs, Birmingham',
    },
    {
      quote: "Finally, an energy app that actually understands small business needs!",
      author: 'Priya K.',
      business: 'Glow Beauty Salon, London',
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <WebHeader />

      {/* Hero Section */}
      <LinearGradient
        colors={['#F5F3FF', '#EDE9FE', '#FFFFFF']}
        style={styles.heroSection}
      >
        <View style={styles.heroContent}>
          <View style={styles.heroText}>
            <Animated.View entering={FadeInDown.delay(200).duration(800)}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>🇬🇧 #1 Energy App for UK Businesses</Text>
              </View>
            </Animated.View>

            <Animated.Text entering={FadeInDown.delay(400).duration(800)} style={styles.heroTitle}>
              Slash Your Business{' '}
              <Text style={styles.heroTitleHighlight}>Energy Bills</Text>
            </Animated.Text>

            <Animated.Text entering={FadeInDown.delay(600).duration(800)} style={styles.heroSubtitle}>
              Compare UK energy suppliers instantly. Save up to 40% on your business energy costs with our free app.
            </Animated.Text>

            <AppStoreButtons delay={800} />

            <Animated.View entering={FadeInUp.delay(1000).duration(600)} style={styles.heroStats}>
              <View style={styles.heroStat}>
                <Ionicons name="star" size={20} color="#FFD700" />
                <Text style={styles.heroStatText}>4.9 Rating</Text>
              </View>
              <View style={styles.heroStat}>
                <Ionicons name="download" size={20} color={COLORS.primary} />
                <Text style={styles.heroStatText}>50K+ Downloads</Text>
              </View>
            </Animated.View>
          </View>

          {/* Phone Mockup with App Screenshot */}
          <Animated.View
            entering={FadeInRight.delay(400).duration(1000)}
            style={[styles.heroPhone, phoneStyle]}
          >
            <View style={styles.phoneMockup}>
              <View style={styles.phoneNotch} />
              <View style={styles.phoneScreen}>
                {/* Mock Compare Screen */}
                <View style={styles.mockHeader}>
                  <Text style={styles.mockHeaderText}>Compare Deals</Text>
                </View>
                <View style={styles.mockCard}>
                  <Text style={styles.mockCardEmoji}>💡</Text>
                  <Text style={styles.mockCardTitle}>Octopus Energy</Text>
                  <Text style={styles.mockCardSavings}>Save 18% - £432/yr</Text>
                </View>
                <View style={[styles.mockCard, styles.mockCardAlt]}>
                  <Text style={styles.mockCardEmoji}>🌟</Text>
                  <Text style={styles.mockCardTitle}>British Gas</Text>
                  <Text style={styles.mockCardSavings}>Save 15% - £360/yr</Text>
                </View>
                <View style={styles.mockCard}>
                  <Text style={styles.mockCardEmoji}>⚡</Text>
                  <Text style={styles.mockCardTitle}>EDF Energy</Text>
                  <Text style={styles.mockCardSavings}>Save 12% - £288/yr</Text>
                </View>
              </View>
            </View>
          </Animated.View>
        </View>
      </LinearGradient>

      {/* Trusted By Section */}
      <Animated.View entering={FadeIn.delay(200).duration(600)} style={styles.trustedSection}>
        <Text style={styles.trustedTitle}>TRUSTED BY BUSINESSES ACROSS THE UK</Text>
        <View style={styles.trustedLogos}>
          {['BBC', 'The Guardian', 'Telegraph', 'Forbes', 'TechCrunch'].map((logo) => (
            <View key={logo} style={styles.trustedLogo}>
              <Text style={styles.trustedLogoText}>{logo}</Text>
            </View>
          ))}
        </View>
      </Animated.View>

      {/* Features Section */}
      <View style={styles.featuresSection}>
        <Animated.View entering={FadeInDown.duration(600)} style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>WHY HAYYAN</Text>
          <Text style={styles.sectionTitle}>Everything You Need to Save</Text>
          <Text style={styles.sectionSubtitle}>
            We've built the simplest way for UK businesses to compare and switch energy suppliers.
          </Text>
        </Animated.View>

        <View style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <Animated.View
              key={feature.title}
              entering={FadeInUp.delay(200 + index * 100).duration(600)}
              style={styles.featureCard}
            >
              <View style={[styles.featureIcon, { backgroundColor: `${feature.color}15` }]}>
                <Ionicons name={feature.icon as any} size={28} color={feature.color} />
              </View>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </Animated.View>
          ))}
        </View>
      </View>

      {/* Stats Section */}
      <LinearGradient colors={[COLORS.primary, '#9D85F6']} style={styles.statsSection}>
        <View style={styles.statsContent}>
          {stats.map((stat, index) => (
            <Animated.View
              key={stat.label}
              entering={FadeInUp.delay(index * 100).duration(600)}
              style={styles.statItem}
            >
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </Animated.View>
          ))}
        </View>
      </LinearGradient>

      {/* How It Works CTA */}
      <View style={styles.ctaSection}>
        <Animated.View entering={FadeInLeft.duration(600)} style={styles.ctaContent}>
          <Text style={styles.ctaTitle}>Ready to Start Saving?</Text>
          <Text style={styles.ctaSubtitle}>
            Join thousands of UK businesses already saving with Hayyan. Download the app and compare deals in under 2 minutes.
          </Text>
          <AppStoreButtons variant="light" delay={200} />
        </Animated.View>
        <Animated.View entering={FadeInRight.delay(200).duration(600)} style={styles.ctaImage}>
          <View style={styles.ctaPhoneSmall}>
            <Text style={styles.ctaPhoneEmoji}>📱</Text>
          </View>
        </Animated.View>
      </View>

      {/* Testimonials */}
      <View style={styles.testimonialsSection}>
        <Animated.View entering={FadeInDown.duration(600)} style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>TESTIMONIALS</Text>
          <Text style={styles.sectionTitle}>Loved by Business Owners</Text>
        </Animated.View>

        <View style={styles.testimonialsGrid}>
          {testimonials.map((testimonial, index) => (
            <Animated.View
              key={index}
              entering={FadeInUp.delay(200 + index * 100).duration(600)}
              style={styles.testimonialCard}
            >
              <View style={styles.testimonialStars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Ionicons key={star} name="star" size={16} color="#FFD700" />
                ))}
              </View>
              <Text style={styles.testimonialQuote}>"{testimonial.quote}"</Text>
              <Text style={styles.testimonialAuthor}>{testimonial.author}</Text>
              <Text style={styles.testimonialBusiness}>{testimonial.business}</Text>
            </Animated.View>
          ))}
        </View>
      </View>

      {/* Final CTA */}
      <View style={styles.finalCtaSection}>
        <LinearGradient
          colors={['#1A1A2E', '#2D2D44']}
          style={styles.finalCtaGradient}
        >
          <Animated.View entering={FadeInDown.duration(600)}>
            <Text style={styles.finalCtaEmoji}>⚡</Text>
            <Text style={styles.finalCtaTitle}>Start Saving Today</Text>
            <Text style={styles.finalCtaSubtitle}>
              Download Hayyan free and find out how much you could save on your business energy bills.
            </Text>
            <View style={styles.finalCtaButtons}>
              <AppStoreButtons delay={200} />
            </View>
          </Animated.View>
        </LinearGradient>
      </View>

      <WebFooter />
      
      {/* Cookie Consent Banner */}
      <CookieConsent />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  heroSection: {
    paddingTop: 100,
    paddingBottom: 60,
    paddingHorizontal: 24,
  },
  heroContent: {
    maxWidth: 1200,
    marginHorizontal: 'auto',
    flexDirection: isDesktop ? 'row' : 'column',
    alignItems: 'center',
    width: '100%',
  },
  heroText: {
    flex: 1,
    paddingRight: isDesktop ? 60 : 0,
    alignItems: isDesktop ? 'flex-start' : 'center',
  },
  badge: {
    backgroundColor: '#F0EBFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
    marginBottom: 24,
  },
  badgeText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  heroTitle: {
    fontSize: isDesktop ? 56 : 36,
    fontWeight: '800',
    color: '#1A1A2E',
    marginBottom: 20,
    lineHeight: isDesktop ? 66 : 44,
    textAlign: isDesktop ? 'left' : 'center',
  },
  heroTitleHighlight: {
    color: COLORS.primary,
  },
  heroSubtitle: {
    fontSize: isDesktop ? 20 : 16,
    color: '#6B7280',
    marginBottom: 32,
    lineHeight: isDesktop ? 32 : 26,
    textAlign: isDesktop ? 'left' : 'center',
  },
  heroStats: {
    flexDirection: 'row',
    gap: 24,
    marginTop: 32,
  },
  heroStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  heroStatText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  heroPhone: {
    flex: isDesktop ? 1 : undefined,
    alignItems: 'center',
    marginTop: isDesktop ? 0 : 40,
  },
  phoneMockup: {
    width: 280,
    height: 560,
    backgroundColor: '#1A1A2E',
    borderRadius: 40,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 40,
    elevation: 20,
  },
  phoneNotch: {
    width: 100,
    height: 24,
    backgroundColor: '#1A1A2E',
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 8,
  },
  phoneScreen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 16,
  },
  mockHeader: {
    marginBottom: 16,
  },
  mockHeaderText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  mockCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  mockCardAlt: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  mockCardEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  mockCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A2E',
  },
  mockCardSavings: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
    marginTop: 4,
  },
  trustedSection: {
    paddingVertical: 40,
    paddingHorizontal: 24,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
  },
  trustedTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9CA3AF',
    letterSpacing: 2,
    marginBottom: 24,
  },
  trustedLogos: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 32,
  },
  trustedLogo: {
    opacity: 0.5,
  },
  trustedLogoText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#6B7280',
  },
  featuresSection: {
    paddingVertical: 80,
    paddingHorizontal: 24,
  },
  sectionHeader: {
    alignItems: 'center',
    marginBottom: 60,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
    letterSpacing: 2,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: isDesktop ? 42 : 28,
    fontWeight: '800',
    color: '#1A1A2E',
    marginBottom: 16,
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: 18,
    color: '#6B7280',
    textAlign: 'center',
    maxWidth: 600,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 24,
    maxWidth: 1200,
    marginHorizontal: 'auto',
  },
  featureCard: {
    width: isDesktop ? '22%' : '45%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  featureIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
  },
  statsSection: {
    paddingVertical: 60,
    paddingHorizontal: 24,
  },
  statsContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    maxWidth: 1000,
    marginHorizontal: 'auto',
  },
  statItem: {
    alignItems: 'center',
    minWidth: 150,
    marginVertical: 16,
  },
  statValue: {
    fontSize: 42,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 8,
  },
  ctaSection: {
    paddingVertical: 80,
    paddingHorizontal: 24,
    backgroundColor: '#F9FAFB',
    flexDirection: isDesktop ? 'row' : 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaContent: {
    flex: 1,
    maxWidth: 500,
    alignItems: isDesktop ? 'flex-start' : 'center',
  },
  ctaTitle: {
    fontSize: isDesktop ? 36 : 28,
    fontWeight: '800',
    color: '#1A1A2E',
    marginBottom: 16,
    textAlign: isDesktop ? 'left' : 'center',
  },
  ctaSubtitle: {
    fontSize: 18,
    color: '#6B7280',
    marginBottom: 32,
    lineHeight: 28,
    textAlign: isDesktop ? 'left' : 'center',
  },
  ctaImage: {
    marginTop: isDesktop ? 0 : 40,
  },
  ctaPhoneSmall: {
    width: 200,
    height: 200,
    backgroundColor: '#F0EBFF',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctaPhoneEmoji: {
    fontSize: 80,
  },
  testimonialsSection: {
    paddingVertical: 80,
    paddingHorizontal: 24,
  },
  testimonialsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 24,
    maxWidth: 1200,
    marginHorizontal: 'auto',
  },
  testimonialCard: {
    width: isDesktop ? '30%' : '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  testimonialStars: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  testimonialQuote: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 26,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  testimonialAuthor: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  testimonialBusiness: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  finalCtaSection: {
    paddingHorizontal: 24,
  },
  finalCtaGradient: {
    borderRadius: 24,
    padding: 60,
    alignItems: 'center',
    marginHorizontal: 'auto',
    maxWidth: 1000,
    marginBottom: 60,
  },
  finalCtaEmoji: {
    fontSize: 60,
    textAlign: 'center',
    marginBottom: 24,
  },
  finalCtaTitle: {
    fontSize: isDesktop ? 42 : 28,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  finalCtaSubtitle: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginBottom: 32,
    maxWidth: 500,
  },
  finalCtaButtons: {
    alignItems: 'center',
  },
});
