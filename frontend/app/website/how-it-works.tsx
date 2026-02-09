import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Platform, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeInLeft,
  FadeInRight,
  ZoomIn,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withSpring,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../src/constants/colors';
import { WebHeader } from '../../src/components/web/WebHeader';
import { WebFooter } from '../../src/components/web/WebFooter';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const isDesktop = Platform.OS === 'web' && width > 768;

// Animated Step Card with hover
const StepCard = ({ step, index }: { step: any; index: number }) => {
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);
  const iconRotate = useSharedValue(0);
  const glowOpacity = useSharedValue(0);

  // Continuous icon animation
  useEffect(() => {
    iconRotate.value = withDelay(index * 200, withRepeat(
      withSequence(
        withTiming(5, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(-5, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    ));
  }, []);

  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateY: translateY.value },
    ],
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${iconRotate.value}deg` }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  const handleHoverIn = () => {
    scale.value = withSpring(1.05, { damping: 15 });
    translateY.value = withSpring(-10, { damping: 15 });
    glowOpacity.value = withTiming(1, { duration: 200 });
  };

  const handleHoverOut = () => {
    scale.value = withSpring(1, { damping: 15 });
    translateY.value = withSpring(0, { damping: 15 });
    glowOpacity.value = withTiming(0, { duration: 200 });
  };

  return (
    <Animated.View
      entering={FadeInUp.delay(200 + index * 150).duration(600).springify()}
      style={[styles.stepCard, cardStyle]}
      // @ts-ignore
      onMouseEnter={Platform.OS === 'web' ? handleHoverIn : undefined}
      onMouseLeave={Platform.OS === 'web' ? handleHoverOut : undefined}
    >
      {/* Glow effect on hover */}
      <Animated.View style={[styles.stepGlow, glowStyle]} />
      
      <View style={styles.stepNumber}>
        <Text style={styles.stepNumberText}>{step.number}</Text>
      </View>
      
      <Animated.View style={[styles.stepIconContainer, iconStyle]}>
        <Ionicons name={step.icon} size={40} color={COLORS.primary} />
      </Animated.View>
      
      <Text style={styles.stepTitle}>{step.title}</Text>
      <Text style={styles.stepDescription}>{step.description}</Text>
    </Animated.View>
  );
};

// Animated Feature with floating icon
const FeatureItem = ({ feature, index }: { feature: any; index: number }) => {
  const iconFloat = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    iconFloat.value = withDelay(index * 100, withRepeat(
      withSequence(
        withTiming(-5, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(5, { duration: 1500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    ));
  }, []);

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: iconFloat.value }],
  }));

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      entering={FadeInLeft.delay(100 + index * 100).duration(500).springify()}
      style={[styles.featureItem, containerStyle]}
      // @ts-ignore
      onMouseEnter={() => { scale.value = withSpring(1.02); }}
      onMouseLeave={() => { scale.value = withSpring(1); }}
    >
      <Animated.View style={[styles.featureIcon, iconStyle]}>
        <Ionicons name={feature.icon} size={24} color={COLORS.primary} />
      </Animated.View>
      <View style={styles.featureContent}>
        <Text style={styles.featureTitle}>{feature.title}</Text>
        <Text style={styles.featureDescription}>{feature.description}</Text>
      </View>
    </Animated.View>
  );
};

export default function HowItWorksPage() {
  const router = useRouter();

  // Hero animations
  const heroFloat = useSharedValue(0);
  const particleFloat1 = useSharedValue(0);
  const particleFloat2 = useSharedValue(0);
  const particleFloat3 = useSharedValue(0);

  useEffect(() => {
    // Hero float animation
    heroFloat.value = withRepeat(
      withSequence(
        withTiming(-10, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
        withTiming(10, { duration: 3000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    // Particles
    particleFloat1.value = withRepeat(
      withSequence(
        withTiming(-20, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
        withTiming(20, { duration: 2500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
    particleFloat2.value = withDelay(500, withRepeat(
      withSequence(
        withTiming(15, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(-15, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    ));
    particleFloat3.value = withDelay(1000, withRepeat(
      withSequence(
        withTiming(-15, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
        withTiming(15, { duration: 3000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    ));
  }, []);

  const heroStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: heroFloat.value }],
  }));

  const particle1Style = useAnimatedStyle(() => ({
    transform: [{ translateY: particleFloat1.value }, { translateX: particleFloat1.value * 0.5 }],
  }));
  const particle2Style = useAnimatedStyle(() => ({
    transform: [{ translateY: particleFloat2.value }, { rotate: `${particleFloat2.value}deg` }],
  }));
  const particle3Style = useAnimatedStyle(() => ({
    transform: [{ translateY: particleFloat3.value }, { translateX: -particleFloat3.value * 0.3 }],
  }));

  const steps = [
    {
      number: '01',
      icon: 'document-text-outline',
      title: 'Enter Your Details',
      description: 'Tell us about your business - type, location, and current energy usage. Takes less than 30 seconds.',
    },
    {
      number: '02',
      icon: 'search-outline',
      title: 'We Compare For You',
      description: 'Hayyan instantly searches all UK energy suppliers to find the best deals for your specific needs.',
    },
    {
      number: '03',
      icon: 'list-outline',
      title: 'See Your Options',
      description: 'View personalized quotes ranked by savings, with clear pricing and no hidden fees.',
    },
    {
      number: '04',
      icon: 'checkmark-circle-outline',
      title: 'Switch & Save',
      description: 'Choose your preferred deal and we handle the switch. No interruption to your supply.',
    },
  ];

  const features = [
    { icon: 'flash', title: 'Instant Comparison', description: 'Results in under 30 seconds' },
    { icon: 'shield-checkmark', title: 'Verified Suppliers', description: 'All Ofgem-regulated providers' },
    { icon: 'cash', title: 'No Hidden Fees', description: 'What you see is what you pay' },
    { icon: 'sync', title: 'Hassle-Free Switch', description: 'We manage everything for you' },
    { icon: 'notifications', title: 'Price Alerts', description: 'Get notified of better deals' },
    { icon: 'leaf', title: 'Green Options', description: 'Filter for 100% renewable tariffs' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <WebHeader />

      {/* Hero Section with floating particles */}
      <LinearGradient colors={['#F5F3FF', '#EDE9FE', '#FFFFFF']} style={styles.heroSection}>
        {/* Floating particles */}
        <Animated.View style={[styles.particle, styles.particle1, particle1Style]}>
          <Text style={styles.particleEmoji}>⚡</Text>
        </Animated.View>
        <Animated.View style={[styles.particle, styles.particle2, particle2Style]}>
          <Text style={styles.particleEmoji}>💡</Text>
        </Animated.View>
        <Animated.View style={[styles.particle, styles.particle3, particle3Style]}>
          <Text style={styles.particleEmoji}>💰</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(800).springify()} style={[styles.heroContent, heroStyle]}>
          <Text style={styles.heroLabel}>HOW IT WORKS</Text>
          <Text style={styles.heroTitle}>Switch in Four{'\n'}Simple Steps</Text>
          <Text style={styles.heroSubtitle}>
            No paperwork, no phone calls, no hassle.{'\n'}
            Just instant savings for your business.
          </Text>
        </Animated.View>
      </LinearGradient>

      {/* Steps Section */}
      <View style={styles.stepsSection}>
        <Animated.Text entering={FadeInUp.delay(100).duration(600)} style={styles.sectionTitle}>
          The Hayyan Process
        </Animated.Text>
        
        <View style={styles.stepsGrid}>
          {steps.map((step, index) => (
            <StepCard key={step.number} step={step} index={index} />
          ))}
        </View>

        {/* Connecting line animation */}
        {isDesktop && (
          <Animated.View 
            entering={FadeInLeft.delay(800).duration(1000)}
            style={styles.connectingLine}
          />
        )}
      </View>

      {/* Features Section */}
      <View style={styles.featuresSection}>
        <LinearGradient colors={['#FFFFFF', '#F9F7FF', '#FFFFFF']} style={StyleSheet.absoluteFill} />
        
        <Animated.Text entering={FadeInUp.duration(600)} style={styles.sectionTitle}>
          Why Choose Hayyan?
        </Animated.Text>

        <View style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <FeatureItem key={feature.title} feature={feature} index={index} />
          ))}
        </View>
      </View>

      {/* CTA Section */}
      <View style={styles.ctaSection}>
        <LinearGradient colors={[COLORS.primary, '#9D85F6']} style={styles.ctaGradient}>
          <Animated.View entering={ZoomIn.duration(600)}>
            <Text style={styles.ctaTitle}>Ready to Start Saving?</Text>
            <Text style={styles.ctaSubtitle}>Join 50,000+ UK businesses already saving with Hayyan</Text>
            
            <Animated.View
              entering={FadeInUp.delay(300).duration(500)}
            >
              <TouchableOpacity 
                style={styles.ctaButton}
                onPress={() => router.push('/onboarding/welcome')}
              >
                <Text style={styles.ctaButtonText}>Compare Deals Now</Text>
                <Ionicons name="arrow-forward" size={20} color={COLORS.primary} />
              </TouchableOpacity>
            </Animated.View>
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
    paddingBottom: 80,
    paddingHorizontal: 24,
    position: 'relative',
    overflow: 'hidden',
  },
  heroContent: {
    maxWidth: 800,
    marginHorizontal: 'auto',
    alignItems: 'center',
  },
  heroLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
    letterSpacing: 3,
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: isDesktop ? 56 : 36,
    fontWeight: '800',
    color: '#1A1A2E',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: isDesktop ? 64 : 44,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 28,
  },
  particle: {
    position: 'absolute',
    zIndex: 1,
  },
  particle1: { top: '20%', left: '10%' },
  particle2: { top: '40%', right: '15%' },
  particle3: { bottom: '30%', left: '20%' },
  particleEmoji: {
    fontSize: 32,
  },
  stepsSection: {
    paddingVertical: 80,
    paddingHorizontal: 24,
    position: 'relative',
  },
  sectionTitle: {
    fontSize: isDesktop ? 40 : 28,
    fontWeight: '800',
    color: '#1A1A2E',
    textAlign: 'center',
    marginBottom: 60,
  },
  stepsGrid: {
    flexDirection: isDesktop ? 'row' : 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    gap: 24,
    maxWidth: 1200,
    marginHorizontal: 'auto',
  },
  stepCard: {
    flex: isDesktop ? 1 : undefined,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    position: 'relative',
    overflow: 'hidden',
  },
  stepGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.primary,
    opacity: 0.05,
    borderRadius: 24,
  },
  stepNumber: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#F0EBFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
  },
  stepIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0EBFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 12,
    textAlign: 'center',
  },
  stepDescription: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  connectingLine: {
    position: 'absolute',
    top: '50%',
    left: '15%',
    right: '15%',
    height: 2,
    backgroundColor: '#E5E7EB',
    zIndex: -1,
  },
  featuresSection: {
    paddingVertical: 80,
    paddingHorizontal: 24,
    position: 'relative',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
    maxWidth: 1000,
    marginHorizontal: 'auto',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    width: isDesktop ? 'calc(50% - 10px)' : '100%',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 16,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0EBFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  ctaSection: {
    paddingHorizontal: 24,
    paddingVertical: 60,
  },
  ctaGradient: {
    borderRadius: 32,
    padding: 60,
    alignItems: 'center',
    maxWidth: 800,
    marginHorizontal: 'auto',
  },
  ctaTitle: {
    fontSize: isDesktop ? 40 : 28,
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
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    gap: 8,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
  },
});
