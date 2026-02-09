import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Platform, Image } from 'react-native';
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
  ZoomIn,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withSpring,
  withDelay,
  Easing,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../src/constants/colors';
import { WebHeader } from '../../src/components/web/WebHeader';
import { WebFooter } from '../../src/components/web/WebFooter';
import { CookieConsent } from '../../src/components/web/CookieConsent';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');
const isDesktop = Platform.OS === 'web' && width > 768;

// Animated Counter Component
const AnimatedCounter = ({ target, duration = 2000, suffix = '' }: { target: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target]);
  
  return <Text style={styles.statValue}>{count.toLocaleString()}{suffix}</Text>;
};

export default function WebsiteHomePage() {
  const router = useRouter();
  
  // Phone animations - 45 degree tilt, float, glow
  const phoneSlide = useSharedValue(300);
  const phoneRotate = useSharedValue(0);
  const phoneFloat = useSharedValue(0);
  const phoneGlow = useSharedValue(0.3);
  const phoneTilt = useSharedValue(0);
  
  // Button pulse
  const buttonPulse = useSharedValue(1);
  
  // Hayyan character
  const hayyanSlide = useSharedValue(-200);
  const hayyanPulse = useSharedValue(1);
  
  // Hand phone slide
  const handPhoneSlide = useSharedValue(400);
  
  // Particles
  const particle1 = useSharedValue(0);
  const particle2 = useSharedValue(0);
  const particle3 = useSharedValue(0);

  useEffect(() => {
    // Phone slide in from right at 45 degrees
    phoneSlide.value = withDelay(500, withSpring(0, { damping: 15, stiffness: 80 }));
    phoneRotate.value = withDelay(500, withSpring(-8, { damping: 12, stiffness: 100 }));
    phoneTilt.value = withDelay(500, withSpring(5, { damping: 12, stiffness: 100 }));
    
    // Continuous float
    phoneFloat.value = withDelay(1500, withRepeat(
      withSequence(
        withTiming(-15, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 2500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    ));
    
    // Glow pulse
    phoneGlow.value = withDelay(1000, withRepeat(
      withSequence(
        withTiming(0.8, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.3, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    ));
    
    // Button pulse
    buttonPulse.value = withDelay(1200, withRepeat(
      withSequence(
        withTiming(1.05, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    ));
    
    // Hayyan slide in
    hayyanSlide.value = withDelay(800, withSpring(0, { damping: 12, stiffness: 60 }));
    
    // Hayyan pulse
    hayyanPulse.value = withDelay(2000, withRepeat(
      withSequence(
        withTiming(1.08, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 1200, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    ));
    
    // Hand phone slide
    handPhoneSlide.value = withDelay(300, withSpring(0, { damping: 15, stiffness: 70 }));
    
    // Particles float
    particle1.value = withRepeat(
      withSequence(
        withTiming(-40, { duration: 4000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 4000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
    particle2.value = withDelay(500, withRepeat(
      withSequence(
        withTiming(-30, { duration: 3500, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 3500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    ));
    particle3.value = withDelay(1000, withRepeat(
      withSequence(
        withTiming(-50, { duration: 5000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 5000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    ));
  }, []);

  // Phone style with 45 degree tilt and glow
  const phoneAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: phoneSlide.value },
      { translateY: phoneFloat.value },
      { rotateZ: `${phoneRotate.value}deg` },
      { rotateY: `${phoneTilt.value}deg` },
    ],
  }));

  const glowAnimatedStyle = useAnimatedStyle(() => ({
    opacity: phoneGlow.value,
    transform: [{ scale: interpolate(phoneGlow.value, [0.3, 0.8], [1, 1.3]) }],
  }));

  const buttonPulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonPulse.value }],
  }));

  const hayyanAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: hayyanSlide.value },
      { scale: hayyanPulse.value },
    ],
  }));

  const handPhoneStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: handPhoneSlide.value }],
  }));

  const particle1Style = useAnimatedStyle(() => ({
    transform: [{ translateY: particle1.value }],
  }));
  const particle2Style = useAnimatedStyle(() => ({
    transform: [{ translateY: particle2.value }],
  }));
  const particle3Style = useAnimatedStyle(() => ({
    transform: [{ translateY: particle3.value }],
  }));

  const stats = [
    { value: 10000, label: 'Businesses Helped', suffix: '+', icon: '🏪' },
    { value: 2500000, label: 'Total Savings', prefix: '£', suffix: '', icon: '💰' },
    { value: 49, label: 'App Rating', suffix: '/5', icon: '⭐', decimal: true },
    { value: 2, label: 'Minute Switch', suffix: ' min', icon: '⚡' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <WebHeader />

      {/* ==================== HERO SECTION ==================== */}
      <View style={styles.heroSection}>
        <LinearGradient
          colors={['#F8F6FF', '#F0EBFF', '#E8E0FF', '#FFFFFF']}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        
        {/* Floating Particles */}
        <Animated.View style={[styles.particle, { top: '10%', left: '5%' }, particle1Style]}>
          <Text style={styles.particleEmoji}>⚡</Text>
        </Animated.View>
        <Animated.View style={[styles.particle, { top: '20%', right: '10%' }, particle2Style]}>
          <Text style={styles.particleEmoji}>💡</Text>
        </Animated.View>
        <Animated.View style={[styles.particle, { top: '60%', left: '8%' }, particle3Style]}>
          <Text style={styles.particleEmoji}>💰</Text>
        </Animated.View>
        <Animated.View style={[styles.particle, { bottom: '20%', right: '5%' }, particle1Style]}>
          <Text style={styles.particleEmoji}>🔋</Text>
        </Animated.View>

        <View style={styles.heroContent}>
          {/* LEFT SIDE - Hero Text */}
          <View style={styles.heroLeft}>
            <Animated.View entering={FadeInLeft.delay(200).duration(800)}>
              <View style={styles.heroBadge}>
                <Text style={styles.heroBadgeText}>🇬🇧 #1 Energy Savings App</Text>
              </View>
            </Animated.View>

            <Animated.Text entering={SlideInLeft.delay(400).duration(1000).springify()} style={styles.heroTitle}>
              Zap your business bills in thirty seconds flat.
            </Animated.Text>

            <Animated.Text entering={FadeInLeft.delay(700).duration(800)} style={styles.heroSubtitle}>
              Compare every UK energy supplier instantly. See exactly how much you'll save. Switch without lifting a finger.
            </Animated.Text>

            {/* App Store Buttons - PULSING */}
            <Animated.View entering={FadeInUp.delay(1000).duration(600)} style={styles.appButtonsContainer}>
              <Animated.View style={[styles.appStoreButton, buttonPulseStyle]}>
                <TouchableOpacity style={styles.appButtonInner}>
                  <Ionicons name="logo-apple" size={28} color="#FFFFFF" />
                  <View>
                    <Text style={styles.appButtonLabel}>Download on the</Text>
                    <Text style={styles.appButtonStore}>App Store</Text>
                  </View>
                </TouchableOpacity>
              </Animated.View>
              
              <Animated.View style={[styles.appStoreButton, buttonPulseStyle]}>
                <TouchableOpacity style={styles.appButtonInner}>
                  <Ionicons name="logo-google-playstore" size={28} color="#FFFFFF" />
                  <View>
                    <Text style={styles.appButtonLabel}>Get it on</Text>
                    <Text style={styles.appButtonStore}>Google Play</Text>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            </Animated.View>

            {/* Trust Badges */}
            <Animated.View entering={FadeInUp.delay(1200).duration(600)} style={styles.trustBadges}>
              <View style={styles.trustItem}>
                <Ionicons name="star" size={18} color="#FFD700" />
                <Text style={styles.trustText}>4.9 Rating</Text>
              </View>
              <View style={styles.trustItem}>
                <Ionicons name="shield-checkmark" size={18} color="#4CAF50" />
                <Text style={styles.trustText}>Ofgem Regulated</Text>
              </View>
              <View style={styles.trustItem}>
                <Ionicons name="people" size={18} color={COLORS.primary} />
                <Text style={styles.trustText}>50K+ Users</Text>
              </View>
            </Animated.View>
          </View>

          {/* RIGHT SIDE - Phone at 45 degrees with GLOW */}
          <View style={styles.heroRight}>
            {/* Glow Effect Behind Phone */}
            <Animated.View style={[styles.phoneGlowEffect, glowAnimatedStyle]} />
            
            {/* Phone Mockup with ACTUAL Screenshot - Slides in at angle */}
            <Animated.View style={[styles.phoneContainer, phoneAnimatedStyle]}>
              <View style={styles.phoneMockup}>
                <View style={styles.phoneNotch} />
                <View style={styles.phoneScreenImage}>
                  {/* App Compare Screen Mockup */}
                  <View style={styles.mockupScreen}>
                    <View style={styles.mockupHeader}>
                      <Text style={styles.mockupTitle}>Compare Deals</Text>
                    </View>
                    <View style={styles.mockupCard}>
                      <View style={styles.mockupCardHeader}>
                        <Text style={styles.mockupSupplier}>🐙 Octopus Energy</Text>
                        <View style={styles.mockupBadge}><Text style={styles.mockupBadgeText}>Save 18%</Text></View>
                      </View>
                      <Text style={styles.mockupSavings}>£432/year savings</Text>
                      <View style={styles.mockupButton}><Text style={styles.mockupButtonText}>View Deal</Text></View>
                    </View>
                    <View style={styles.mockupCard}>
                      <View style={styles.mockupCardHeader}>
                        <Text style={styles.mockupSupplier}>🔥 British Gas</Text>
                        <View style={styles.mockupBadge}><Text style={styles.mockupBadgeText}>Save 15%</Text></View>
                      </View>
                      <Text style={styles.mockupSavings}>£360/year savings</Text>
                    </View>
                    <View style={styles.mockupCard}>
                      <View style={styles.mockupCardHeader}>
                        <Text style={styles.mockupSupplier}>⚡ EDF Energy</Text>
                        <View style={styles.mockupBadge}><Text style={styles.mockupBadgeText}>Save 12%</Text></View>
                      </View>
                      <Text style={styles.mockupSavings}>£288/year savings</Text>
                    </View>
                  </View>
                </View>
              </View>
              
              {/* Floating badges around phone */}
              <Animated.View style={[styles.floatingBadge, styles.badge1, particle1Style]}>
                <Text style={styles.floatingBadgeEmoji}>💷</Text>
                <Text style={styles.floatingBadgeText}>Save £432</Text>
              </Animated.View>
              <Animated.View style={[styles.floatingBadge, styles.badge2, particle2Style]}>
                <Text style={styles.floatingBadgeEmoji}>✓</Text>
                <Text style={styles.floatingBadgeText}>Instant</Text>
              </Animated.View>
            </Animated.View>
          </View>
        </View>
      </View>

      {/* ==================== WHAT WE DO - 3 CRISP LINES ==================== */}
      <View style={styles.whatWeDoSection}>
        <Animated.View entering={FadeInUp.delay(100).duration(800)} style={styles.whatWeDoContent}>
          <Text style={styles.sectionLabel}>WHAT WE DO</Text>
          
          <Animated.Text entering={FadeInUp.delay(200).duration(800)} style={styles.whatWeDoLine}>
            Compare every UK energy supplier in seconds.
          </Animated.Text>
          <Animated.Text entering={FadeInUp.delay(400).duration(800)} style={styles.whatWeDoLine}>
            See exactly how much you'll save—no hidden fees.
          </Animated.Text>
          <Animated.Text entering={FadeInUp.delay(600).duration(800)} style={styles.whatWeDoLine}>
            Switch without paperwork. We handle everything.
          </Animated.Text>
        </Animated.View>
      </View>

      {/* ==================== HOW WE HELP - HAYYAN SLIDES IN ==================== */}
      <View style={styles.howWeHelpSection}>
        <LinearGradient
          colors={['#FFFFFF', '#F9F7FF', '#FFFFFF']}
          style={StyleSheet.absoluteFill}
        />
        
        <View style={styles.howWeHelpContent}>
          {/* Hayyan Character - Slides from left, pulses - ACTUAL IMAGE */}
          <Animated.View style={[styles.hayyanContainer, hayyanAnimatedStyle]}>
            <View style={styles.hayyanCircle}>
              <Image 
                source={require('../../assets/images/character.png')}
                style={styles.hayyanImage}
                resizeMode="contain"
              />
            </View>
            <View style={styles.hayyanSpeechBubble}>
              <Text style={styles.hayyanSpeech}>Hey! I'm Hayyan. Let me help you save money! ⚡</Text>
            </View>
          </Animated.View>
          
          {/* Text Content */}
          <Animated.View entering={FadeInRight.delay(600).duration(800)} style={styles.howWeHelpText}>
            <Text style={styles.sectionLabel}>HOW WE HELP</Text>
            <Text style={styles.howWeHelpTitle}>Your Personal Energy Savings Assistant</Text>
            <Text style={styles.howWeHelpDesc}>
              Hayyan guides you through comparing suppliers, understanding your bills, and switching to better deals—all in under 2 minutes.
            </Text>
            
            <View style={styles.helpFeatures}>
              <View style={styles.helpFeature}>
                <View style={styles.helpFeatureIcon}>
                  <Ionicons name="flash" size={24} color={COLORS.primary} />
                </View>
                <Text style={styles.helpFeatureText}>Instant comparisons</Text>
              </View>
              <View style={styles.helpFeature}>
                <View style={styles.helpFeatureIcon}>
                  <Ionicons name="shield-checkmark" size={24} color={COLORS.primary} />
                </View>
                <Text style={styles.helpFeatureText}>100% safe switching</Text>
              </View>
              <View style={styles.helpFeature}>
                <View style={styles.helpFeatureIcon}>
                  <Ionicons name="wallet" size={24} color={COLORS.primary} />
                </View>
                <Text style={styles.helpFeatureText}>No hidden fees</Text>
              </View>
            </View>
          </Animated.View>
        </View>
      </View>

      {/* ==================== STATS - ZOOM ON HOVER, NUMBERS SPIN ==================== */}
      <View style={styles.statsSection}>
        <LinearGradient
          colors={[COLORS.primary, '#9D85F6', '#B8A4F8']}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        
        <Text style={styles.statsTitle}>Trusted by thousands of UK businesses</Text>
        
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <Animated.View
              key={stat.label}
              entering={ZoomIn.delay(200 + index * 150).duration(600)}
              style={styles.statCard}
            >
              <Text style={styles.statIcon}>{stat.icon}</Text>
              <View style={styles.statValueContainer}>
                {stat.decimal ? (
                  <Text style={styles.statValue}>4.9{stat.suffix}</Text>
                ) : (
                  <>
                    {stat.prefix && <Text style={styles.statValue}>{stat.prefix}</Text>}
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </>
                )}
              </View>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </Animated.View>
          ))}
        </View>
      </View>

      {/* ==================== DASHBOARD SECTION - PHONE IN HAND ==================== */}
      <View style={styles.dashboardSection}>
        <View style={styles.dashboardContent}>
          {/* Left - Text */}
          <Animated.View entering={FadeInLeft.delay(200).duration(800)} style={styles.dashboardText}>
            <Text style={styles.sectionLabel}>YOUR DASHBOARD</Text>
            <Text style={styles.dashboardTitle}>Track Your Savings in Real-Time</Text>
            <Text style={styles.dashboardDesc}>
              See exactly how much you're saving every month. Get personalized tips to reduce your bills even further. All from one beautiful dashboard.
            </Text>
            
            <View style={styles.dashboardFeatures}>
              <View style={styles.dashFeature}>
                <Ionicons name="trending-down" size={24} color="#4CAF50" />
                <Text style={styles.dashFeatureText}>Live savings tracker</Text>
              </View>
              <View style={styles.dashFeature}>
                <Ionicons name="notifications" size={24} color="#FF9800" />
                <Text style={styles.dashFeatureText}>Better deal alerts</Text>
              </View>
              <View style={styles.dashFeature}>
                <Ionicons name="bar-chart" size={24} color="#2196F3" />
                <Text style={styles.dashFeatureText}>Usage insights</Text>
              </View>
            </View>
            
            {/* CTA */}
            <TouchableOpacity style={styles.ctaButton}>
              <Text style={styles.ctaButtonText}>Download Free</Text>
              <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </Animated.View>
          
          {/* Right - Phone in Hand sliding in */}
          <Animated.View style={[styles.handPhoneContainer, handPhoneStyle]}>
            <View style={styles.handPhoneMockup}>
              <View style={styles.handPhoneScreen}>
                {/* Dashboard Screen */}
                <View style={styles.dashScreenHeader}>
                  <Text style={styles.dashScreenTitle}>Hi, Sarah! 👋</Text>
                </View>
                <View style={styles.dashSavingsCard}>
                  <Text style={styles.dashSavingsLabel}>Your Savings</Text>
                  <Text style={styles.dashSavingsValue}>£432</Text>
                  <Text style={styles.dashSavingsPeriod}>This Year</Text>
                </View>
                <View style={styles.dashTip}>
                  <Text style={styles.dashTipEmoji}>💡</Text>
                  <Text style={styles.dashTipText}>Switch heating off-peak to save £50 more!</Text>
                </View>
              </View>
            </View>
            {/* Hand silhouette effect */}
            <View style={styles.handSilhouette} />
          </Animated.View>
        </View>
      </View>

      {/* ==================== FINAL CTA ==================== */}
      <View style={styles.finalCtaSection}>
        <LinearGradient
          colors={['#1A1A2E', '#2D2D44']}
          style={styles.finalCtaGradient}
        >
          <Animated.View entering={FadeInUp.duration(800)}>
            <Text style={styles.finalCtaEmoji}>⚡</Text>
            <Text style={styles.finalCtaTitle}>Start Saving Today</Text>
            <Text style={styles.finalCtaSubtitle}>
              Join 10,000+ UK businesses already saving with Hayyan
            </Text>
            
            <View style={styles.finalCtaButtons}>
              <TouchableOpacity style={styles.finalCtaAppButton}>
                <Ionicons name="logo-apple" size={24} color="#FFFFFF" />
                <View>
                  <Text style={styles.finalCtaAppLabel}>Download on</Text>
                  <Text style={styles.finalCtaAppStore}>App Store</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.finalCtaAppButton}>
                <Ionicons name="logo-google-playstore" size={24} color="#FFFFFF" />
                <View>
                  <Text style={styles.finalCtaAppLabel}>Get it on</Text>
                  <Text style={styles.finalCtaAppStore}>Google Play</Text>
                </View>
              </TouchableOpacity>
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
  
  // ========== HERO ==========
  heroSection: {
    minHeight: isDesktop ? height * 0.95 : 'auto',
    paddingTop: 120,
    paddingBottom: 80,
    position: 'relative',
    overflow: 'hidden',
  },
  heroContent: {
    maxWidth: 1400,
    marginHorizontal: 'auto',
    paddingHorizontal: isDesktop ? 60 : 24,
    flexDirection: isDesktop ? 'row' : 'column',
    alignItems: 'center',
    width: '100%',
  },
  heroLeft: {
    flex: 1,
    paddingRight: isDesktop ? 40 : 0,
    zIndex: 10,
  },
  heroBadge: {
    backgroundColor: 'rgba(123, 92, 246, 0.1)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 100,
    alignSelf: 'flex-start',
    marginBottom: 32,
    borderWidth: 1,
    borderColor: 'rgba(123, 92, 246, 0.2)',
  },
  heroBadgeText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '700',
  },
  heroTitle: {
    fontSize: isDesktop ? 64 : 36,
    fontWeight: '800',
    color: '#1A1A2E',
    lineHeight: isDesktop ? 76 : 44,
    marginBottom: 24,
  },
  heroSubtitle: {
    fontSize: isDesktop ? 20 : 16,
    color: '#6B7280',
    lineHeight: isDesktop ? 32 : 26,
    marginBottom: 40,
    maxWidth: 520,
  },
  appButtonsContainer: {
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
  },
  appStoreButton: {
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  appButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A2E',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 14,
    gap: 12,
  },
  appButtonLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  appButtonStore: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  trustBadges: {
    flexDirection: 'row',
    gap: 24,
    marginTop: 40,
    flexWrap: 'wrap',
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
  
  // Phone Mockup
  heroRight: {
    flex: isDesktop ? 1.1 : undefined,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: isDesktop ? 0 : 60,
    position: 'relative',
    minHeight: isDesktop ? 600 : 500,
  },
  phoneGlowEffect: {
    position: 'absolute',
    width: 350,
    height: 350,
    borderRadius: 175,
    backgroundColor: COLORS.primary,
  },
  phoneContainer: {
    position: 'relative',
  },
  phoneMockup: {
    width: isDesktop ? 300 : 260,
    height: isDesktop ? 620 : 540,
    backgroundColor: '#1A1A2E',
    borderRadius: 45,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 30 },
    shadowOpacity: 0.5,
    shadowRadius: 50,
    elevation: 30,
  },
  phoneNotch: {
    width: 100,
    height: 24,
    backgroundColor: '#1A1A2E',
    borderRadius: 12,
    alignSelf: 'center',
    marginTop: 4,
    marginBottom: 8,
  },
  phoneScreen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 35,
    padding: 16,
    overflow: 'hidden',
  },
  phoneScreenImage: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 35,
    overflow: 'hidden',
  },
  appScreenshot: {
    width: '100%',
    height: '100%',
  },
  screenHeader: {
    marginBottom: 16,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A1A2E',
  },
  supplierCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  supplierCardAlt: {
    borderColor: COLORS.primary,
    borderWidth: 2,
    backgroundColor: '#F5F0FF',
  },
  supplierTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  supplierEmoji: {
    fontSize: 28,
  },
  supplierName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  savingsBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginTop: 2,
  },
  savingsText: {
    fontSize: 11,
    color: '#4CAF50',
    fontWeight: '700',
  },
  savingsAmount: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '700',
  },
  viewDealBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  viewDealText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  
  // Floating badges
  floatingBadge: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  badge1: {
    top: 100,
    left: -60,
  },
  badge2: {
    bottom: 150,
    right: -50,
  },
  floatingBadgeEmoji: {
    fontSize: 18,
  },
  floatingBadgeText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
  },
  
  // Particles
  particle: {
    position: 'absolute',
    opacity: 0.5,
  },
  particleEmoji: {
    fontSize: 36,
  },
  
  // ========== WHAT WE DO ==========
  whatWeDoSection: {
    paddingVertical: 100,
    paddingHorizontal: 24,
    backgroundColor: '#FAFAFA',
  },
  whatWeDoContent: {
    maxWidth: 800,
    marginHorizontal: 'auto',
    alignItems: 'center',
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: 3,
    marginBottom: 32,
  },
  whatWeDoLine: {
    fontSize: isDesktop ? 28 : 20,
    fontWeight: '600',
    color: '#1A1A2E',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: isDesktop ? 40 : 30,
  },
  
  // ========== HOW WE HELP ==========
  howWeHelpSection: {
    paddingVertical: 100,
    position: 'relative',
  },
  howWeHelpContent: {
    maxWidth: 1200,
    marginHorizontal: 'auto',
    paddingHorizontal: 24,
    flexDirection: isDesktop ? 'row' : 'column',
    alignItems: 'center',
    gap: 60,
  },
  hayyanContainer: {
    alignItems: 'center',
  },
  hayyanCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#F0EBFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 4,
    borderColor: COLORS.primary,
    overflow: 'hidden',
  },
  hayyanImage: {
    width: 160,
    height: 160,
  },
  hayyanEmoji: {
    fontSize: 80,
  },
  hayyanSpeechBubble: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 20,
    maxWidth: 260,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  hayyanSpeech: {
    fontSize: 15,
    color: '#374151',
    textAlign: 'center',
    lineHeight: 22,
  },
  howWeHelpText: {
    flex: 1,
  },
  howWeHelpTitle: {
    fontSize: isDesktop ? 40 : 28,
    fontWeight: '800',
    color: '#1A1A2E',
    marginBottom: 20,
  },
  howWeHelpDesc: {
    fontSize: 18,
    color: '#6B7280',
    lineHeight: 30,
    marginBottom: 32,
  },
  helpFeatures: {
    gap: 16,
  },
  helpFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  helpFeatureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0EBFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  helpFeatureText: {
    fontSize: 17,
    color: '#374151',
    fontWeight: '600',
  },
  
  // ========== STATS ==========
  statsSection: {
    paddingVertical: 80,
    position: 'relative',
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginBottom: 48,
    letterSpacing: 1,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 32,
    paddingHorizontal: 24,
  },
  statCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    minWidth: 200,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  statIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  statValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  statValue: {
    fontSize: 44,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 8,
  },
  
  // ========== DASHBOARD SECTION ==========
  dashboardSection: {
    paddingVertical: 100,
    paddingHorizontal: 24,
    backgroundColor: '#FAFAFA',
    overflow: 'hidden',
  },
  dashboardContent: {
    maxWidth: 1200,
    marginHorizontal: 'auto',
    flexDirection: isDesktop ? 'row' : 'column',
    alignItems: 'center',
    gap: 60,
  },
  dashboardText: {
    flex: 1,
  },
  dashboardTitle: {
    fontSize: isDesktop ? 40 : 28,
    fontWeight: '800',
    color: '#1A1A2E',
    marginBottom: 20,
  },
  dashboardDesc: {
    fontSize: 18,
    color: '#6B7280',
    lineHeight: 30,
    marginBottom: 32,
  },
  dashboardFeatures: {
    gap: 16,
    marginBottom: 32,
  },
  dashFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  dashFeatureText: {
    fontSize: 17,
    color: '#374151',
    fontWeight: '600',
  },
  ctaButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 18,
    borderRadius: 14,
    gap: 12,
    alignSelf: 'flex-start',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  ctaButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  handPhoneContainer: {
    position: 'relative',
  },
  handPhoneMockup: {
    width: 280,
    height: 500,
    backgroundColor: '#1A1A2E',
    borderRadius: 40,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: -10, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 40,
    elevation: 20,
  },
  handPhoneScreen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 20,
  },
  dashScreenHeader: {
    marginBottom: 20,
  },
  dashScreenTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  dashSavingsCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  dashSavingsLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  dashSavingsValue: {
    fontSize: 48,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  dashSavingsPeriod: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  dashTip: {
    flexDirection: 'row',
    backgroundColor: '#FFF9E6',
    borderRadius: 12,
    padding: 14,
    gap: 10,
    alignItems: 'center',
  },
  dashTipEmoji: {
    fontSize: 24,
  },
  dashTipText: {
    flex: 1,
    fontSize: 14,
    color: '#92400E',
    lineHeight: 20,
  },
  handSilhouette: {
    position: 'absolute',
    bottom: -40,
    right: -30,
    width: 120,
    height: 180,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 20,
    transform: [{ rotate: '-15deg' }],
  },
  
  // ========== FINAL CTA ==========
  finalCtaSection: {
    paddingHorizontal: 24,
    paddingVertical: 60,
  },
  finalCtaGradient: {
    borderRadius: 32,
    padding: 80,
    alignItems: 'center',
    maxWidth: 900,
    marginHorizontal: 'auto',
  },
  finalCtaEmoji: {
    fontSize: 64,
    textAlign: 'center',
    marginBottom: 24,
  },
  finalCtaTitle: {
    fontSize: isDesktop ? 44 : 32,
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
  },
  finalCtaButtons: {
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  finalCtaAppButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 14,
    gap: 12,
  },
  finalCtaAppLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
  },
  finalCtaAppStore: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
