import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeInLeft,
  FadeInRight,
  SlideInRight,
  SlideInLeft,
  SlideInUp,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withSpring,
  withDelay,
  Easing,
  interpolate,
  useAnimatedScrollHandler,
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
  
  // Multiple animation values for rich effects
  const phoneFloat = useSharedValue(0);
  const phoneRotate = useSharedValue(0);
  const glowPulse = useSharedValue(0);
  const particleFloat1 = useSharedValue(0);
  const particleFloat2 = useSharedValue(0);
  const particleFloat3 = useSharedValue(0);
  const scrollY = useSharedValue(0);
  
  useEffect(() => {
    // Floating phone animation
    phoneFloat.value = withRepeat(
      withSequence(
        withTiming(-20, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 2500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
    
    // Subtle rotation
    phoneRotate.value = withRepeat(
      withSequence(
        withTiming(2, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
        withTiming(-2, { duration: 3000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
    
    // Glow pulse
    glowPulse.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    // Particle animations
    particleFloat1.value = withRepeat(
      withSequence(
        withTiming(-30, { duration: 4000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 4000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
    
    particleFloat2.value = withDelay(500, withRepeat(
      withSequence(
        withTiming(-25, { duration: 3500, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 3500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    ));
    
    particleFloat3.value = withDelay(1000, withRepeat(
      withSequence(
        withTiming(-35, { duration: 5000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 5000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    ));
  }, []);

  const phoneStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: phoneFloat.value },
      { rotate: `${phoneRotate.value}deg` },
    ],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    transform: [{ scale: glowPulse.value }],
    opacity: interpolate(glowPulse.value, [1, 1.2], [0.3, 0.6]),
  }));

  const particle1Style = useAnimatedStyle(() => ({
    transform: [{ translateY: particleFloat1.value }],
  }));

  const particle2Style = useAnimatedStyle(() => ({
    transform: [{ translateY: particleFloat2.value }],
  }));

  const particle3Style = useAnimatedStyle(() => ({
    transform: [{ translateY: particleFloat3.value }],
  }));

  const features = [
    {
      icon: 'flash',
      title: 'Instant Comparisons',
      description: 'Compare all UK energy suppliers in seconds. See your potential savings immediately.',
      color: '#FF9800',
      delay: 0,
    },
    {
      icon: 'trending-down',
      title: 'Save Up to 40%',
      description: 'UK businesses save an average of £600/year by switching with Hayyan.',
      color: '#4CAF50',
      delay: 100,
    },
    {
      icon: 'shield-checkmark',
      title: 'Ofgem Regulated',
      description: 'All suppliers are regulated by Ofgem. Your switch is 100% guaranteed safe.',
      color: '#2196F3',
      delay: 200,
    },
    {
      icon: 'time',
      title: 'Switch in Minutes',
      description: 'No paperwork, no hassle. We handle everything for a seamless switch.',
      color: COLORS.primary,
      delay: 300,
    },
  ];

  const stats = [
    { value: '10,000+', label: 'Businesses Helped', icon: '🏪' },
    { value: '£2.5M+', label: 'Total Savings', icon: '💰' },
    { value: '4.9★', label: 'App Rating', icon: '⭐' },
    { value: '2 min', label: 'Average Switch Time', icon: '⚡' },
  ];

  const testimonials = [
    {
      quote: "Saved £800 on our cafe's energy bills in the first year. The app made it so easy!",
      author: 'Sarah M.',
      business: 'The Corner Cafe, Manchester',
      avatar: '👩‍🍳',
    },
    {
      quote: "As a mechanic, I never had time to compare suppliers. Hayyan did it all for me.",
      author: 'James T.',
      business: 'JT Auto Repairs, Birmingham',
      avatar: '👨‍🔧',
    },
    {
      quote: "Finally, an energy app that actually understands small business needs!",
      author: 'Priya K.',
      business: 'Glow Beauty Salon, London',
      avatar: '💇‍♀️',
    },
  ];

  const howItWorks = [
    { step: '01', title: 'Download', desc: 'Get the free app', icon: 'download' },
    { step: '02', title: 'Enter Details', desc: 'Your current supplier', icon: 'create' },
    { step: '03', title: 'Compare', desc: 'See all deals instantly', icon: 'bar-chart' },
    { step: '04', title: 'Save', desc: 'Switch & save money', icon: 'checkmark-circle' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <WebHeader />

      {/* HERO SECTION - BIG & BOLD */}
      <View style={styles.heroSection}>
        <LinearGradient
          colors={['#F5F3FF', '#EDE9FE', '#E8E0FF', '#FFFFFF']}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        
        {/* Animated Background Particles */}
        <Animated.View style={[styles.particle, styles.particle1, particle1Style]}>
          <Text style={styles.particleEmoji}>⚡</Text>
        </Animated.View>
        <Animated.View style={[styles.particle, styles.particle2, particle2Style]}>
          <Text style={styles.particleEmoji}>💡</Text>
        </Animated.View>
        <Animated.View style={[styles.particle, styles.particle3, particle3Style]}>
          <Text style={styles.particleEmoji}>🔋</Text>
        </Animated.View>
        <Animated.View style={[styles.particle, styles.particle4, particle1Style]}>
          <Text style={styles.particleEmoji}>💰</Text>
        </Animated.View>
        <Animated.View style={[styles.particle, styles.particle5, particle2Style]}>
          <Text style={styles.particleEmoji}>🏪</Text>
        </Animated.View>

        <View style={styles.heroContent}>
          {/* Left Side - Text */}
          <View style={styles.heroText}>
            <Animated.View entering={SlideInLeft.delay(200).duration(800).springify()}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>🇬🇧 #1 Energy App for UK Businesses</Text>
              </View>
            </Animated.View>

            <Animated.Text 
              entering={SlideInLeft.delay(400).duration(800).springify()} 
              style={styles.heroTitle}
            >
              Slash Your{'\n'}Business{'\n'}
              <Text style={styles.heroTitleHighlight}>Energy Bills</Text>
            </Animated.Text>

            <Animated.Text 
              entering={SlideInLeft.delay(600).duration(800).springify()} 
              style={styles.heroSubtitle}
            >
              Compare UK energy suppliers instantly. Save up to 40% on your business energy costs with our free app.
            </Animated.Text>

            <Animated.View entering={SlideInLeft.delay(800).duration(800).springify()}>
              <AppStoreButtons delay={0} size="large" />
            </Animated.View>

            <Animated.View 
              entering={FadeInUp.delay(1000).duration(600)} 
              style={styles.heroTrust}
            >
              <View style={styles.trustItem}>
                <Ionicons name="star" size={20} color="#FFD700" />
                <Text style={styles.trustText}>4.9 Rating</Text>
              </View>
              <View style={styles.trustDivider} />
              <View style={styles.trustItem}>
                <Ionicons name="download" size={20} color={COLORS.primary} />
                <Text style={styles.trustText}>50K+ Downloads</Text>
              </View>
              <View style={styles.trustDivider} />
              <View style={styles.trustItem}>
                <Ionicons name="shield-checkmark" size={20} color="#4CAF50" />
                <Text style={styles.trustText}>Ofgem Regulated</Text>
              </View>
            </Animated.View>
          </View>

          {/* Right Side - BIG Phone with ACTUAL App Screenshot */}
          <Animated.View 
            entering={SlideInRight.delay(400).duration(1000).springify()}
            style={styles.heroPhoneContainer}
          >
            {/* Glow effect behind phone */}
            <Animated.View style={[styles.phoneGlow, glowStyle]} />
            
            <Animated.View style={[styles.phoneMockupLarge, phoneStyle]}>
              {/* Phone Frame */}
              <View style={styles.phoneFrame}>
                <View style={styles.phoneNotch} />
                {/* ACTUAL APP SCREENSHOT */}
                <View style={styles.phoneScreen}>
                  <Image
                    source={require('../../assets/images/app-screenshot.png')}
                    style={styles.appScreenshot}
                    resizeMode="cover"
                  />
                </View>
              </View>
              
              {/* Floating elements around phone */}
              <Animated.View style={[styles.floatingCard, styles.floatingCard1, particle1Style]}>
                <Text style={styles.floatingEmoji}>💷</Text>
                <Text style={styles.floatingText}>Save £432/yr</Text>
              </Animated.View>
              
              <Animated.View style={[styles.floatingCard, styles.floatingCard2, particle2Style]}>
                <Text style={styles.floatingEmoji}>⚡</Text>
                <Text style={styles.floatingText}>18% cheaper</Text>
              </Animated.View>
              
              <Animated.View style={[styles.floatingCard, styles.floatingCard3, particle3Style]}>
                <Text style={styles.floatingEmoji}>✓</Text>
                <Text style={styles.floatingText}>Instant switch</Text>
              </Animated.View>
            </Animated.View>
          </Animated.View>
        </View>
      </View>

      {/* TRUSTED BY - Animated Logos */}
      <Animated.View entering={FadeInUp.delay(200).duration(800)} style={styles.trustedSection}>
        <Text style={styles.trustedTitle}>AS SEEN IN</Text>
        <View style={styles.trustedLogos}>
          {['BBC', 'The Guardian', 'Telegraph', 'Forbes', 'TechCrunch', 'Wired'].map((logo, index) => (
            <Animated.View 
              key={logo} 
              entering={FadeIn.delay(300 + index * 100).duration(600)}
              style={styles.trustedLogo}
            >
              <Text style={styles.trustedLogoText}>{logo}</Text>
            </Animated.View>
          ))}
        </View>
      </Animated.View>

      {/* HOW IT WORKS - Animated Steps */}
      <View style={styles.howSection}>
        <Animated.View entering={FadeInDown.duration(600)} style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>HOW IT WORKS</Text>
          <Text style={styles.sectionTitle}>Save Money in 4 Simple Steps</Text>
        </Animated.View>

        <View style={styles.stepsContainer}>
          {howItWorks.map((item, index) => (
            <Animated.View
              key={item.step}
              entering={SlideInUp.delay(200 + index * 150).duration(600).springify()}
              style={styles.stepCard}
            >
              <View style={[styles.stepIcon, { backgroundColor: `${COLORS.primary}15` }]}>
                <Ionicons name={item.icon as any} size={32} color={COLORS.primary} />
              </View>
              <Text style={styles.stepNumber}>{item.step}</Text>
              <Text style={styles.stepTitle}>{item.title}</Text>
              <Text style={styles.stepDesc}>{item.desc}</Text>
            </Animated.View>
          ))}
        </View>

        {/* CTA */}
        <Animated.View entering={FadeInUp.delay(800).duration(600)} style={styles.sectionCta}>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Download Free App</Text>
            <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* FEATURES - Cards with Hover Effects */}
      <View style={styles.featuresSection}>
        <LinearGradient
          colors={['#FFFFFF', '#F9FAFB', '#FFFFFF']}
          style={StyleSheet.absoluteFill}
        />
        
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
              entering={SlideInUp.delay(300 + index * 100).duration(600).springify()}
              style={styles.featureCard}
            >
              <View style={[styles.featureIcon, { backgroundColor: `${feature.color}15` }]}>
                <Ionicons name={feature.icon as any} size={32} color={feature.color} />
              </View>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </Animated.View>
          ))}
        </View>

        {/* CTA */}
        <Animated.View entering={FadeInUp.delay(700).duration(600)} style={styles.sectionCta}>
          <AppStoreButtons variant="light" />
        </Animated.View>
      </View>

      {/* STATS - Big Numbers */}
      <View style={styles.statsSection}>
        <LinearGradient
          colors={[COLORS.primary, '#9D85F6', '#B8A4F8']}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        
        <View style={styles.statsContent}>
          {stats.map((stat, index) => (
            <Animated.View
              key={stat.label}
              entering={SlideInUp.delay(index * 150).duration(600).springify()}
              style={styles.statItem}
            >
              <Text style={styles.statIcon}>{stat.icon}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </Animated.View>
          ))}
        </View>
      </View>

      {/* TESTIMONIALS */}
      <View style={styles.testimonialsSection}>
        <Animated.View entering={FadeInDown.duration(600)} style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>TESTIMONIALS</Text>
          <Text style={styles.sectionTitle}>Loved by Business Owners</Text>
        </Animated.View>

        <View style={styles.testimonialsGrid}>
          {testimonials.map((testimonial, index) => (
            <Animated.View
              key={index}
              entering={SlideInUp.delay(200 + index * 150).duration(600).springify()}
              style={styles.testimonialCard}
            >
              <View style={styles.testimonialStars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Ionicons key={star} name="star" size={18} color="#FFD700" />
                ))}
              </View>
              <Text style={styles.testimonialQuote}>"{testimonial.quote}"</Text>
              <View style={styles.testimonialAuthor}>
                <Text style={styles.testimonialAvatar}>{testimonial.avatar}</Text>
                <View>
                  <Text style={styles.testimonialName}>{testimonial.author}</Text>
                  <Text style={styles.testimonialBusiness}>{testimonial.business}</Text>
                </View>
              </View>
            </Animated.View>
          ))}
        </View>

        {/* CTA */}
        <Animated.View entering={FadeInUp.delay(600).duration(600)} style={styles.sectionCta}>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Join 10,000+ Businesses</Text>
            <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* FINAL CTA - Big & Bold */}
      <View style={styles.finalCtaSection}>
        <LinearGradient
          colors={['#1A1A2E', '#2D2D44', '#1A1A2E']}
          style={styles.finalCtaGradient}
        >
          <Animated.View entering={SlideInUp.duration(800).springify()}>
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
      <CookieConsent />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  
  // HERO SECTION
  heroSection: {
    minHeight: isDesktop ? height * 0.95 : 'auto',
    paddingTop: 100,
    paddingBottom: 60,
    position: 'relative',
    overflow: 'hidden',
  },
  heroContent: {
    maxWidth: 1400,
    marginHorizontal: 'auto',
    paddingHorizontal: 40,
    flexDirection: isDesktop ? 'row' : 'column',
    alignItems: 'center',
    width: '100%',
  },
  heroText: {
    flex: 1,
    paddingRight: isDesktop ? 60 : 0,
    alignItems: isDesktop ? 'flex-start' : 'center',
    zIndex: 10,
  },
  badge: {
    backgroundColor: 'rgba(123, 92, 246, 0.1)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 100,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: 'rgba(123, 92, 246, 0.2)',
  },
  badgeText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  heroTitle: {
    fontSize: isDesktop ? 72 : 42,
    fontWeight: '800',
    color: '#1A1A2E',
    marginBottom: 24,
    lineHeight: isDesktop ? 82 : 50,
    textAlign: isDesktop ? 'left' : 'center',
  },
  heroTitleHighlight: {
    color: COLORS.primary,
  },
  heroSubtitle: {
    fontSize: isDesktop ? 22 : 18,
    color: '#6B7280',
    marginBottom: 40,
    lineHeight: isDesktop ? 34 : 28,
    textAlign: isDesktop ? 'left' : 'center',
    maxWidth: 500,
  },
  heroTrust: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    flexWrap: 'wrap',
    gap: 16,
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  trustText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  trustDivider: {
    width: 1,
    height: 20,
    backgroundColor: '#E5E7EB',
  },
  
  // Phone Mockup - BIG
  heroPhoneContainer: {
    flex: isDesktop ? 1.2 : undefined,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: isDesktop ? 0 : 60,
    position: 'relative',
  },
  phoneGlow: {
    position: 'absolute',
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: COLORS.primary,
  },
  phoneMockupLarge: {
    position: 'relative',
    zIndex: 10,
  },
  phoneFrame: {
    width: isDesktop ? 320 : 280,
    height: isDesktop ? 650 : 570,
    backgroundColor: '#1A1A2E',
    borderRadius: 50,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 30 },
    shadowOpacity: 0.4,
    shadowRadius: 60,
    elevation: 30,
  },
  phoneNotch: {
    width: 120,
    height: 28,
    backgroundColor: '#1A1A2E',
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 8,
    zIndex: 100,
  },
  phoneScreen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 38,
    overflow: 'hidden',
  },
  appScreenshot: {
    width: '100%',
    height: '100%',
  },
  
  // Floating Cards
  floatingCard: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 10,
  },
  floatingCard1: {
    top: 80,
    left: -80,
  },
  floatingCard2: {
    top: 200,
    right: -70,
  },
  floatingCard3: {
    bottom: 150,
    left: -60,
  },
  floatingEmoji: {
    fontSize: 20,
  },
  floatingText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
  },
  
  // Particles
  particle: {
    position: 'absolute',
    opacity: 0.6,
  },
  particle1: { top: '15%', left: '5%' },
  particle2: { top: '25%', right: '8%' },
  particle3: { top: '45%', left: '10%' },
  particle4: { bottom: '25%', right: '5%' },
  particle5: { bottom: '35%', left: '3%' },
  particleEmoji: {
    fontSize: 32,
  },
  
  // Trusted Section
  trustedSection: {
    paddingVertical: 50,
    paddingHorizontal: 24,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
  },
  trustedTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#9CA3AF',
    letterSpacing: 3,
    marginBottom: 30,
  },
  trustedLogos: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 48,
  },
  trustedLogo: {
    opacity: 0.4,
  },
  trustedLogoText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#374151',
  },
  
  // Section Styles
  sectionHeader: {
    alignItems: 'center',
    marginBottom: 60,
    paddingHorizontal: 24,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
    letterSpacing: 3,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: isDesktop ? 48 : 32,
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
    lineHeight: 28,
  },
  sectionCta: {
    alignItems: 'center',
    marginTop: 48,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 18,
    borderRadius: 100,
    gap: 12,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  
  // How Section
  howSection: {
    paddingVertical: 100,
    paddingHorizontal: 24,
  },
  stepsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 32,
    maxWidth: 1200,
    marginHorizontal: 'auto',
  },
  stepCard: {
    width: isDesktop ? 260 : '45%',
    alignItems: 'center',
    padding: 24,
  },
  stepIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 8,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 8,
  },
  stepDesc: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  
  // Features
  featuresSection: {
    paddingVertical: 100,
    position: 'relative',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 24,
    maxWidth: 1200,
    marginHorizontal: 'auto',
    paddingHorizontal: 24,
  },
  featureCard: {
    width: isDesktop ? '23%' : '45%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 5,
  },
  featureIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 12,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  
  // Stats
  statsSection: {
    paddingVertical: 80,
    position: 'relative',
  },
  statsContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    maxWidth: 1100,
    marginHorizontal: 'auto',
    paddingHorizontal: 24,
  },
  statItem: {
    alignItems: 'center',
    minWidth: 200,
    marginVertical: 24,
  },
  statIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  statValue: {
    fontSize: 48,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 8,
    fontWeight: '500',
  },
  
  // Testimonials
  testimonialsSection: {
    paddingVertical: 100,
    paddingHorizontal: 24,
    backgroundColor: '#FAFAFA',
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
    borderRadius: 24,
    padding: 32,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 5,
  },
  testimonialStars: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 4,
  },
  testimonialQuote: {
    fontSize: 17,
    color: '#374151',
    lineHeight: 28,
    marginBottom: 24,
    fontStyle: 'italic',
  },
  testimonialAuthor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  testimonialAvatar: {
    fontSize: 36,
  },
  testimonialName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  testimonialBusiness: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  
  // Final CTA
  finalCtaSection: {
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  finalCtaGradient: {
    borderRadius: 32,
    padding: 80,
    alignItems: 'center',
    maxWidth: 1000,
    marginHorizontal: 'auto',
  },
  finalCtaEmoji: {
    fontSize: 72,
    textAlign: 'center',
    marginBottom: 24,
  },
  finalCtaTitle: {
    fontSize: isDesktop ? 48 : 32,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  finalCtaSubtitle: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginBottom: 40,
    maxWidth: 500,
    lineHeight: 28,
  },
  finalCtaButtons: {
    alignItems: 'center',
  },
});
