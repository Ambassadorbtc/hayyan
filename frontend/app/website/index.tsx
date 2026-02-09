import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Platform, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeInLeft,
  FadeInRight,
  SlideInLeft,
  SlideInRight,
  ZoomIn,
  BounceIn,
  BounceInDown,
  BounceInLeft,
  BounceInRight,
  FlipInXUp,
  LightSpeedInLeft,
  LightSpeedInRight,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withSpring,
  withDelay,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../src/constants/colors';
import { WebHeader } from '../../src/components/web/WebHeader';
import { WebFooter } from '../../src/components/web/WebFooter';
import CookieConsent from '../../src/components/web/CookieConsent';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');
const isDesktop = Platform.OS === 'web' && width > 768;

// ==================== BOUNCING PARTICLE ====================
const BouncingParticle = ({ emoji, style, delay = 0 }: any) => {
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const rotate = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    // Vertical bounce
    translateY.value = withDelay(delay, withRepeat(
      withSequence(
        withSpring(-30, { damping: 3, stiffness: 80 }),
        withSpring(0, { damping: 3, stiffness: 80 })
      ),
      -1,
      true
    ));
    // Horizontal sway
    translateX.value = withDelay(delay + 200, withRepeat(
      withSequence(
        withTiming(20, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(-20, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    ));
    // Rotation
    rotate.value = withDelay(delay, withRepeat(
      withSequence(
        withTiming(15, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(-15, { duration: 1500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    ));
    // Scale pulse
    scale.value = withDelay(delay, withRepeat(
      withSequence(
        withTiming(1.3, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    ));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { translateX: translateX.value },
      { rotate: `${rotate.value}deg` },
      { scale: scale.value },
    ],
  }));

  return (
    <Animated.View style={[style, animatedStyle]}>
      <Text style={styles.particleEmoji}>{emoji}</Text>
    </Animated.View>
  );
};

// ==================== JUMPING STAT CARD ====================
const JumpingStatCard = ({ stat, index }: { stat: any; index: number }) => {
  const [count, setCount] = useState(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);

  useEffect(() => {
    // Continuous jump
    translateY.value = withDelay(index * 200, withRepeat(
      withSequence(
        withSpring(-15, { damping: 4, stiffness: 100 }),
        withSpring(0, { damping: 4, stiffness: 100 })
      ),
      -1,
      true
    ));
    // Wiggle
    rotate.value = withDelay(index * 100, withRepeat(
      withSequence(
        withTiming(3, { duration: 300 }),
        withTiming(-3, { duration: 300 }),
        withTiming(0, { duration: 300 })
      ),
      -1,
      true
    ));
  }, []);

  // Count up animation
  useEffect(() => {
    const timer = setTimeout(() => {
      let start = 0;
      const increment = stat.value / 50;
      const counter = setInterval(() => {
        start += increment;
        if (start >= stat.value) {
          setCount(stat.value);
          clearInterval(counter);
        } else {
          setCount(Math.floor(start));
        }
      }, 30);
      return () => clearInterval(counter);
    }, 500 + index * 200);
    return () => clearTimeout(timer);
  }, []);

  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { rotate: `${rotate.value}deg` },
      { scale: scale.value },
    ],
  }));

  const handleHover = (hovering: boolean) => {
    scale.value = withSpring(hovering ? 1.15 : 1, { damping: 10 });
  };

  return (
    <Animated.View
      entering={BounceInDown.delay(300 + index * 150).duration(800)}
      style={[styles.statCard, cardStyle]}
      // @ts-ignore
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      <Text style={styles.statValue}>{count.toLocaleString()}{stat.suffix}</Text>
      <Text style={styles.statLabel}>{stat.label}</Text>
    </Animated.View>
  );
};

// ==================== SLIDING FEATURE ITEM ====================
const SlidingFeatureItem = ({ feature, index, direction }: any) => {
  const translateX = useSharedValue(0);
  const scale = useSharedValue(1);
  const iconBounce = useSharedValue(0);

  useEffect(() => {
    // Continuous slide back and forth
    translateX.value = withDelay(index * 100, withRepeat(
      withSequence(
        withTiming(direction === 'left' ? 10 : -10, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(direction === 'left' ? -10 : 10, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    ));
    // Icon bounce
    iconBounce.value = withDelay(index * 150, withRepeat(
      withSequence(
        withSpring(-8, { damping: 3, stiffness: 100 }),
        withSpring(0, { damping: 3, stiffness: 100 })
      ),
      -1,
      true
    ));
  }, []);

  const itemStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { scale: scale.value },
    ],
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: iconBounce.value }],
  }));

  return (
    <Animated.View
      entering={direction === 'left' ? BounceInLeft.delay(200 + index * 100).duration(700) : BounceInRight.delay(200 + index * 100).duration(700)}
      style={[styles.featureItem, itemStyle]}
      // @ts-ignore
      onMouseEnter={() => { scale.value = withSpring(1.05); }}
      onMouseLeave={() => { scale.value = withSpring(1); }}
    >
      <Animated.View style={[styles.featureIcon, iconStyle]}>
        <Ionicons name={feature.icon} size={28} color={COLORS.primary} />
      </Animated.View>
      <View style={styles.featureContent}>
        <Text style={styles.featureTitle}>{feature.title}</Text>
        <Text style={styles.featureDesc}>{feature.desc}</Text>
      </View>
    </Animated.View>
  );
};

export default function WebsiteHomePage() {
  const router = useRouter();

  // ===== HERO ANIMATIONS =====
  const phoneSlide = useSharedValue(500);
  const phoneRotate = useSharedValue(0);
  const phoneFloat = useSharedValue(0);
  const phoneGlow = useSharedValue(0.3);
  const heroTextSlide = useSharedValue(-100);
  
  // ===== CONTINUOUS ANIMATIONS =====
  const mascotBounce = useSharedValue(0);
  const mascotRotate = useSharedValue(0);
  const mascotScale = useSharedValue(1);
  const ctaBounce = useSharedValue(0);
  const ctaGlow = useSharedValue(0);

  useEffect(() => {
    // Phone slide in and then float
    phoneSlide.value = withDelay(300, withSpring(0, { damping: 12, stiffness: 80 }));
    phoneRotate.value = withDelay(300, withSpring(-12, { damping: 15 }));
    
    // Continuous phone float
    phoneFloat.value = withDelay(1500, withRepeat(
      withSequence(
        withTiming(-20, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(20, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    ));

    // Glow pulse
    phoneGlow.value = withDelay(1000, withRepeat(
      withSequence(
        withTiming(0.8, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.3, { duration: 1500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    ));

    // Hero text slide
    heroTextSlide.value = withDelay(200, withSpring(0, { damping: 15 }));

    // Mascot bounce continuously
    mascotBounce.value = withRepeat(
      withSequence(
        withSpring(-20, { damping: 3, stiffness: 80 }),
        withSpring(0, { damping: 3, stiffness: 80 })
      ),
      -1,
      true
    );
    mascotRotate.value = withRepeat(
      withSequence(
        withTiming(-5, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(5, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
    mascotScale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    // CTA button bounce
    ctaBounce.value = withRepeat(
      withSequence(
        withSpring(-5, { damping: 4, stiffness: 100 }),
        withSpring(0, { damping: 4, stiffness: 100 })
      ),
      -1,
      true
    );
    ctaGlow.value = withRepeat(
      withSequence(
        withTiming(0.6, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.2, { duration: 1000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, []);

  // Animated styles
  const phoneAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: phoneSlide.value },
      { translateY: phoneFloat.value },
      { rotate: `${phoneRotate.value}deg` },
    ],
  }));

  const glowAnimatedStyle = useAnimatedStyle(() => ({
    opacity: phoneGlow.value,
    transform: [
      { scale: 1 + phoneGlow.value * 0.2 },
    ],
  }));

  const heroTextStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: heroTextSlide.value }],
  }));

  const mascotStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: mascotBounce.value },
      { rotate: `${mascotRotate.value}deg` },
      { scale: mascotScale.value },
    ],
  }));

  const ctaStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: ctaBounce.value }],
    shadowOpacity: ctaGlow.value,
    shadowRadius: 20,
    shadowColor: COLORS.primary,
  }));

  const stats = [
    { value: 10000, suffix: '+', label: 'Happy Businesses' },
    { value: 2500000, suffix: '', label: '£ Saved' },
    { value: 4.9, suffix: '/5', label: 'App Rating' },
    { value: 2, suffix: ' min', label: 'To Compare' },
  ];

  const features = [
    { icon: 'flash', title: 'Instant Results', desc: 'Compare all UK suppliers in seconds' },
    { icon: 'shield-checkmark', title: 'Verified Deals', desc: 'All Ofgem-regulated suppliers' },
    { icon: 'cash', title: 'No Hidden Fees', desc: 'Transparent pricing always' },
    { icon: 'sync', title: 'Easy Switch', desc: 'We handle everything for you' },
    { icon: 'notifications', title: 'Price Alerts', desc: 'Get notified of better deals' },
    { icon: 'leaf', title: 'Green Options', desc: '100% renewable tariffs available' },
  ];

  const whatWeDo = [
    'We scan every UK business energy supplier',
    'Find you the best deal in under 30 seconds',
    'Handle the entire switch for you — free',
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <WebHeader />

      {/* ==================== HERO SECTION ==================== */}
      <LinearGradient colors={['#F5F3FF', '#EDE9FE', '#DDD6FE', '#F5F3FF']} style={styles.heroSection}>
        {/* Bouncing Particles */}
        <BouncingParticle emoji="⚡" style={[styles.particle, { top: '10%', left: '5%' }]} delay={0} />
        <BouncingParticle emoji="💰" style={[styles.particle, { top: '20%', right: '10%' }]} delay={300} />
        <BouncingParticle emoji="💡" style={[styles.particle, { top: '60%', left: '8%' }]} delay={600} />
        <BouncingParticle emoji="🔋" style={[styles.particle, { bottom: '20%', right: '5%' }]} delay={900} />
        <BouncingParticle emoji="🌟" style={[styles.particle, { top: '40%', left: '15%' }]} delay={450} />
        <BouncingParticle emoji="💜" style={[styles.particle, { bottom: '30%', left: '20%' }]} delay={750} />

        <View style={styles.heroContent}>
          {/* LEFT SIDE - Text */}
          <Animated.View style={[styles.heroLeft, heroTextStyle]}>
            <Animated.Text 
              entering={LightSpeedInLeft.duration(800)}
              style={styles.heroLabel}
            >
              UK'S #1 BUSINESS ENERGY APP
            </Animated.Text>
            
            <Animated.Text 
              entering={BounceInLeft.delay(200).duration(800)}
              style={styles.heroTitle}
            >
              Zap your business{'\n'}bills in thirty{'\n'}seconds flat.
            </Animated.Text>
            
            <Animated.Text 
              entering={FadeInLeft.delay(500).duration(600)}
              style={styles.heroSubtitle}
            >
              Compare every UK energy supplier instantly.{'\n'}
              Switch for free. Save hundreds.
            </Animated.Text>

            {/* App Store Buttons */}
            <Animated.View 
              entering={BounceInDown.delay(700).duration(600)}
              style={[styles.appStoreRow, ctaStyle]}
            >
              <TouchableOpacity style={styles.appStoreBtn}>
                <Ionicons name="logo-apple" size={24} color="#FFFFFF" />
                <View>
                  <Text style={styles.appStoreBtnSmall}>Download on the</Text>
                  <Text style={styles.appStoreBtnLarge}>App Store</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.appStoreBtn}>
                <Ionicons name="logo-google-playstore" size={24} color="#FFFFFF" />
                <View>
                  <Text style={styles.appStoreBtnSmall}>Get it on</Text>
                  <Text style={styles.appStoreBtnLarge}>Google Play</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>

            {/* Trust badges */}
            <Animated.View 
              entering={FadeInUp.delay(900).duration(500)}
              style={styles.trustBadges}
            >
              <View style={styles.trustBadge}>
                <Text style={styles.trustBadgeIcon}>⭐</Text>
                <Text style={styles.trustBadgeText}>4.9 Rating</Text>
              </View>
              <View style={styles.trustBadge}>
                <Text style={styles.trustBadgeIcon}>✓</Text>
                <Text style={styles.trustBadgeText}>Ofgem Regulated</Text>
              </View>
              <View style={styles.trustBadge}>
                <Text style={styles.trustBadgeIcon}>👥</Text>
                <Text style={styles.trustBadgeText}>50K+ Users</Text>
              </View>
            </Animated.View>
          </Animated.View>

          {/* RIGHT SIDE - Phone */}
          <View style={styles.heroRight}>
            {/* Glow Effect */}
            <Animated.View style={[styles.phoneGlow, glowAnimatedStyle]} />
            
            {/* Phone */}
            <Animated.View style={[styles.phoneContainer, phoneAnimatedStyle]}>
              <View style={styles.phoneMockup}>
                <View style={styles.phoneNotch} />
                <View style={styles.phoneScreen}>
                  <View style={styles.screenHeader}>
                    <Text style={styles.screenTitle}>Compare Deals</Text>
                  </View>
                  
                  <Animated.View entering={BounceInRight.delay(1000).duration(500)} style={styles.supplierCard}>
                    <View style={styles.supplierTop}>
                      <Text style={styles.supplierEmoji}>🐙</Text>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.supplierName}>Octopus Energy</Text>
                        <View style={styles.savingsBadge}>
                          <Text style={styles.savingsText}>Save 18%</Text>
                        </View>
                      </View>
                    </View>
                    <Text style={styles.savingsAmount}>£432/year savings</Text>
                    <TouchableOpacity style={styles.viewDealBtn}>
                      <Text style={styles.viewDealText}>View Deal →</Text>
                    </TouchableOpacity>
                  </Animated.View>
                  
                  <Animated.View entering={BounceInRight.delay(1200).duration(500)} style={styles.supplierCard}>
                    <View style={styles.supplierTop}>
                      <Text style={styles.supplierEmoji}>🔥</Text>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.supplierName}>British Gas</Text>
                        <View style={styles.savingsBadge}>
                          <Text style={styles.savingsText}>Save 15%</Text>
                        </View>
                      </View>
                    </View>
                    <Text style={styles.savingsAmount}>£360/year savings</Text>
                  </Animated.View>
                  
                  <Animated.View entering={BounceInRight.delay(1400).duration(500)} style={styles.supplierCard}>
                    <View style={styles.supplierTop}>
                      <Text style={styles.supplierEmoji}>⚡</Text>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.supplierName}>EDF Energy</Text>
                        <View style={styles.savingsBadge}>
                          <Text style={styles.savingsText}>Save 12%</Text>
                        </View>
                      </View>
                    </View>
                    <Text style={styles.savingsAmount}>£288/year savings</Text>
                  </Animated.View>
                </View>
              </View>

              {/* Floating badges */}
              <BouncingParticle emoji="💷" style={[styles.floatingBadge, { top: -20, right: -30 }]} delay={200} />
              <BouncingParticle emoji="✓" style={[styles.floatingBadge, { bottom: 50, left: -40 }]} delay={500} />
            </Animated.View>
          </View>
        </View>
      </LinearGradient>

      {/* ==================== WHAT WE DO ==================== */}
      <View style={styles.whatWeDoSection}>
        <Animated.Text 
          entering={BounceInDown.duration(700)}
          style={styles.sectionTitle}
        >
          What We Do
        </Animated.Text>
        
        <View style={styles.whatWeDoList}>
          {whatWeDo.map((item, index) => (
            <Animated.View
              key={index}
              entering={index % 2 === 0 ? BounceInLeft.delay(200 + index * 150).duration(600) : BounceInRight.delay(200 + index * 150).duration(600)}
              style={styles.whatWeDoItem}
            >
              <View style={styles.whatWeDoNumber}>
                <Text style={styles.whatWeDoNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.whatWeDoText}>{item}</Text>
            </Animated.View>
          ))}
        </View>
      </View>

      {/* ==================== STATS SECTION ==================== */}
      <View style={styles.statsSection}>
        <LinearGradient colors={[COLORS.primary, '#9D85F6', '#8B5CF6']} style={styles.statsGradient}>
          <Animated.Text 
            entering={FlipInXUp.duration(800)}
            style={styles.statsSectionTitle}
          >
            Trusted by UK Businesses
          </Animated.Text>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <JumpingStatCard key={stat.label} stat={stat} index={index} />
            ))}
          </View>
        </LinearGradient>
      </View>

      {/* ==================== HOW WE HELP - MASCOT ==================== */}
      <View style={styles.howWeHelpSection}>
        <LinearGradient colors={['#FFFFFF', '#F9F7FF', '#FFFFFF']} style={StyleSheet.absoluteFill} />
        
        <View style={styles.howWeHelpContent}>
          {/* Mascot - Bouncing */}
          <Animated.View 
            entering={BounceIn.delay(300).duration(800)}
            style={[styles.mascotContainer, mascotStyle]}
          >
            <View style={styles.mascotCircle}>
              <Image 
                source={require('../../assets/images/character.png')}
                style={styles.mascotImage}
                resizeMode="contain"
              />
            </View>
            <Animated.View 
              entering={BounceInRight.delay(600).duration(500)}
              style={styles.speechBubble}
            >
              <Text style={styles.speechText}>Hey! I'm Hayyan.{'\n'}Let me save you money! ⚡</Text>
            </Animated.View>
          </Animated.View>

          {/* Features */}
          <Animated.Text 
            entering={BounceInDown.duration(700)}
            style={styles.sectionTitle}
          >
            How We Help
          </Animated.Text>
          
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <SlidingFeatureItem 
                key={feature.title} 
                feature={feature} 
                index={index}
                direction={index % 2 === 0 ? 'left' : 'right'}
              />
            ))}
          </View>
        </View>
      </View>

      {/* ==================== FINAL CTA ==================== */}
      <View style={styles.finalCtaSection}>
        <LinearGradient colors={['#1A1A2E', '#2D2D44', '#1A1A2E']} style={styles.finalCtaGradient}>
          <BouncingParticle emoji="⚡" style={[styles.particle, { top: '10%', left: '10%' }]} delay={0} />
          <BouncingParticle emoji="💜" style={[styles.particle, { top: '20%', right: '15%' }]} delay={300} />
          <BouncingParticle emoji="💰" style={[styles.particle, { bottom: '20%', left: '15%' }]} delay={600} />
          
          <Animated.Text 
            entering={BounceInDown.duration(700)}
            style={styles.finalCtaTitle}
          >
            Start Saving Today
          </Animated.Text>
          <Animated.Text 
            entering={FadeInUp.delay(300).duration(500)}
            style={styles.finalCtaSubtitle}
          >
            Join 50,000+ UK businesses already saving with Hayyan
          </Animated.Text>
          
          <Animated.View 
            entering={BounceInUp.delay(500).duration(600)}
            style={ctaStyle}
          >
            <TouchableOpacity 
              style={styles.finalCtaButton}
              onPress={() => router.push('/onboarding/welcome')}
            >
              <Text style={styles.finalCtaButtonText}>Compare Deals Now</Text>
              <Ionicons name="arrow-forward" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </Animated.View>
        </LinearGradient>
      </View>

      <WebFooter />
      <CookieConsent />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  
  // Hero
  heroSection: { paddingTop: 120, paddingBottom: 80, paddingHorizontal: 24, position: 'relative', overflow: 'hidden', minHeight: isDesktop ? 700 : undefined },
  particle: { position: 'absolute', zIndex: 10 },
  particleEmoji: { fontSize: 36 },
  heroContent: { flexDirection: isDesktop ? 'row' : 'column', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1200, marginHorizontal: 'auto' },
  heroLeft: { flex: 1, paddingRight: isDesktop ? 40 : 0, marginBottom: isDesktop ? 0 : 40 },
  heroLabel: { fontSize: 12, fontWeight: '800', color: COLORS.primary, letterSpacing: 3, marginBottom: 20 },
  heroTitle: { fontSize: isDesktop ? 56 : 36, fontWeight: '900', color: '#1A1A2E', lineHeight: isDesktop ? 64 : 44, marginBottom: 24 },
  heroSubtitle: { fontSize: 18, color: '#6B7280', lineHeight: 28, marginBottom: 32 },
  appStoreRow: { flexDirection: 'row', gap: 16, marginBottom: 32 },
  appStoreBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1A1A2E', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 12, gap: 12 },
  appStoreBtnSmall: { fontSize: 10, color: 'rgba(255,255,255,0.7)' },
  appStoreBtnLarge: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  trustBadges: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  trustBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(139, 92, 246, 0.1)', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20, gap: 6 },
  trustBadgeIcon: { fontSize: 16 },
  trustBadgeText: { fontSize: 13, fontWeight: '600', color: COLORS.primary },
  
  // Phone
  heroRight: { position: 'relative', width: isDesktop ? 400 : 320 },
  phoneGlow: { position: 'absolute', width: '150%', height: '150%', left: '-25%', top: '-25%', backgroundColor: COLORS.primary, borderRadius: 300, opacity: 0.3 },
  phoneContainer: { position: 'relative', zIndex: 5 },
  phoneMockup: { width: isDesktop ? 320 : 260, height: isDesktop ? 650 : 530, backgroundColor: '#1A1A2E', borderRadius: 45, padding: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 20 }, shadowOpacity: 0.3, shadowRadius: 40 },
  phoneNotch: { width: 120, height: 30, backgroundColor: '#1A1A2E', borderRadius: 20, alignSelf: 'center', marginBottom: 8, zIndex: 10 },
  phoneScreen: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 35, padding: 16, overflow: 'hidden' },
  screenHeader: { paddingVertical: 12, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#E5E7EB', marginBottom: 12 },
  screenTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A2E' },
  supplierCard: { backgroundColor: '#F9FAFB', borderRadius: 16, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: '#E5E7EB' },
  supplierTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 10 },
  supplierEmoji: { fontSize: 28 },
  supplierName: { fontSize: 15, fontWeight: '700', color: '#1A1A2E' },
  savingsBadge: { backgroundColor: '#ECFDF5', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8, alignSelf: 'flex-start', marginTop: 2 },
  savingsText: { fontSize: 11, fontWeight: '600', color: '#10B981' },
  savingsAmount: { fontSize: 16, fontWeight: '800', color: COLORS.primary, marginBottom: 8 },
  viewDealBtn: { backgroundColor: COLORS.primary, borderRadius: 10, paddingVertical: 10, alignItems: 'center' },
  viewDealText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
  floatingBadge: { position: 'absolute', zIndex: 20 },
  
  // What We Do
  whatWeDoSection: { paddingVertical: 80, paddingHorizontal: 24, backgroundColor: '#FFFFFF' },
  sectionTitle: { fontSize: isDesktop ? 40 : 28, fontWeight: '800', color: '#1A1A2E', textAlign: 'center', marginBottom: 50 },
  whatWeDoList: { maxWidth: 800, marginHorizontal: 'auto', gap: 24 },
  whatWeDoItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F9FAFB', borderRadius: 20, padding: 24, gap: 20, borderWidth: 1, borderColor: '#E5E7EB' },
  whatWeDoNumber: { width: 48, height: 48, borderRadius: 24, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
  whatWeDoNumberText: { fontSize: 20, fontWeight: '800', color: '#FFFFFF' },
  whatWeDoText: { flex: 1, fontSize: 18, fontWeight: '600', color: '#1A1A2E' },
  
  // Stats
  statsSection: { paddingHorizontal: 24 },
  statsGradient: { borderRadius: 32, padding: isDesktop ? 60 : 40, maxWidth: 1000, marginHorizontal: 'auto' },
  statsSectionTitle: { fontSize: isDesktop ? 32 : 24, fontWeight: '800', color: '#FFFFFF', textAlign: 'center', marginBottom: 40 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 24 },
  statCard: { backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 20, padding: 24, minWidth: 140, alignItems: 'center' },
  statValue: { fontSize: 32, fontWeight: '900', color: '#FFFFFF' },
  statLabel: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
  
  // How We Help
  howWeHelpSection: { paddingVertical: 80, paddingHorizontal: 24, position: 'relative' },
  howWeHelpContent: { maxWidth: 1000, marginHorizontal: 'auto' },
  mascotContainer: { alignItems: 'center', marginBottom: 60 },
  mascotCircle: { width: 180, height: 180, borderRadius: 90, backgroundColor: '#F0EBFF', justifyContent: 'center', alignItems: 'center', borderWidth: 4, borderColor: COLORS.primary, overflow: 'hidden', marginBottom: 20 },
  mascotImage: { width: 160, height: 160 },
  speechBubble: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 20, borderWidth: 2, borderColor: '#E5E7EB', position: 'relative' },
  speechText: { fontSize: 18, fontWeight: '600', color: '#1A1A2E', textAlign: 'center' },
  featuresGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 20 },
  featureItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, width: isDesktop ? 'calc(50% - 10px)' : '100%', borderWidth: 1, borderColor: '#E5E7EB', gap: 16 },
  featureIcon: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#F0EBFF', justifyContent: 'center', alignItems: 'center' },
  featureContent: { flex: 1 },
  featureTitle: { fontSize: 17, fontWeight: '700', color: '#1A1A2E', marginBottom: 4 },
  featureDesc: { fontSize: 14, color: '#6B7280' },
  
  // Final CTA
  finalCtaSection: { paddingHorizontal: 24, paddingVertical: 60 },
  finalCtaGradient: { borderRadius: 32, padding: isDesktop ? 80 : 50, alignItems: 'center', position: 'relative', overflow: 'hidden' },
  finalCtaTitle: { fontSize: isDesktop ? 48 : 32, fontWeight: '900', color: '#FFFFFF', textAlign: 'center', marginBottom: 16 },
  finalCtaSubtitle: { fontSize: 18, color: 'rgba(255,255,255,0.8)', textAlign: 'center', marginBottom: 40 },
  finalCtaButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.primary, paddingVertical: 18, paddingHorizontal: 40, borderRadius: 30, gap: 12 },
  finalCtaButtonText: { fontSize: 20, fontWeight: '700', color: '#FFFFFF' },
});
