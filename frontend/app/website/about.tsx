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

// Animated Team Card with hover effects
const TeamCard = ({ member, index }: { member: any; index: number }) => {
  const scale = useSharedValue(1);
  const imageScale = useSharedValue(1);
  const translateY = useSharedValue(0);

  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateY: translateY.value },
    ],
  }));

  const imageStyle = useAnimatedStyle(() => ({
    transform: [{ scale: imageScale.value }],
  }));

  const handleHoverIn = () => {
    scale.value = withSpring(1.05, { damping: 15 });
    translateY.value = withSpring(-8, { damping: 15 });
    imageScale.value = withSpring(1.1, { damping: 15 });
  };

  const handleHoverOut = () => {
    scale.value = withSpring(1, { damping: 15 });
    translateY.value = withSpring(0, { damping: 15 });
    imageScale.value = withSpring(1, { damping: 15 });
  };

  return (
    <Animated.View
      entering={FadeInUp.delay(200 + index * 100).duration(600).springify()}
      style={[styles.teamCard, cardStyle]}
      // @ts-ignore
      onMouseEnter={Platform.OS === 'web' ? handleHoverIn : undefined}
      onMouseLeave={Platform.OS === 'web' ? handleHoverOut : undefined}
    >
      <Animated.View style={[styles.teamImageContainer, imageStyle]}>
        <View style={styles.teamImagePlaceholder}>
          <Text style={styles.teamInitials}>{member.initials}</Text>
        </View>
      </Animated.View>
      <Text style={styles.teamName}>{member.name}</Text>
      <Text style={styles.teamRole}>{member.role}</Text>
      <Text style={styles.teamBio}>{member.bio}</Text>
    </Animated.View>
  );
};

// Animated Value Card
const ValueCard = ({ value, index }: { value: any; index: number }) => {
  const iconRotate = useSharedValue(0);
  const scale = useSharedValue(1);
  const glowOpacity = useSharedValue(0);

  useEffect(() => {
    iconRotate.value = withDelay(index * 200, withRepeat(
      withSequence(
        withTiming(10, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(-10, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    ));
  }, []);

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${iconRotate.value}deg` }],
  }));

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  return (
    <Animated.View
      entering={FadeInUp.delay(100 + index * 150).duration(600).springify()}
      style={[styles.valueCard, cardStyle]}
      // @ts-ignore
      onMouseEnter={() => {
        scale.value = withSpring(1.03);
        glowOpacity.value = withTiming(1);
      }}
      onMouseLeave={() => {
        scale.value = withSpring(1);
        glowOpacity.value = withTiming(0);
      }}
    >
      <Animated.View style={[styles.valueGlow, glowStyle]} />
      <Animated.View style={[styles.valueIcon, iconStyle]}>
        <Ionicons name={value.icon} size={32} color={COLORS.primary} />
      </Animated.View>
      <Text style={styles.valueTitle}>{value.title}</Text>
      <Text style={styles.valueDescription}>{value.description}</Text>
    </Animated.View>
  );
};

// Animated Stat
const AnimatedStat = ({ stat, index }: { stat: any; index: number }) => {
  const [count, setCount] = React.useState(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      let start = 0;
      const increment = stat.value / 60;
      const counter = setInterval(() => {
        start += increment;
        if (start >= stat.value) {
          setCount(stat.value);
          clearInterval(counter);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(counter);
    }, 500 + index * 200);
    return () => clearTimeout(timer);
  }, []);

  const statStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      entering={ZoomIn.delay(200 + index * 100).duration(500)}
      style={[styles.statItem, statStyle]}
      // @ts-ignore
      onMouseEnter={() => { scale.value = withSpring(1.1); }}
      onMouseLeave={() => { scale.value = withSpring(1); }}
    >
      <Text style={styles.statValue}>{count.toLocaleString()}{stat.suffix}</Text>
      <Text style={styles.statLabel}>{stat.label}</Text>
    </Animated.View>
  );
};

export default function AboutPage() {
  const router = useRouter();

  // Floating animations
  const float1 = useSharedValue(0);
  const float2 = useSharedValue(0);
  const mascotFloat = useSharedValue(0);
  const mascotRotate = useSharedValue(0);

  useEffect(() => {
    float1.value = withRepeat(
      withSequence(
        withTiming(-15, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
        withTiming(15, { duration: 3000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    float2.value = withDelay(1000, withRepeat(
      withSequence(
        withTiming(20, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
        withTiming(-20, { duration: 2500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    ));

    mascotFloat.value = withRepeat(
      withSequence(
        withTiming(-10, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(10, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    mascotRotate.value = withRepeat(
      withSequence(
        withTiming(-3, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
        withTiming(3, { duration: 3000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, []);

  const particle1Style = useAnimatedStyle(() => ({
    transform: [{ translateY: float1.value }, { translateX: float1.value * 0.5 }],
  }));

  const particle2Style = useAnimatedStyle(() => ({
    transform: [{ translateY: float2.value }, { rotate: `${float2.value}deg` }],
  }));

  const mascotStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: mascotFloat.value },
      { rotate: `${mascotRotate.value}deg` },
    ],
  }));

  const team = [
    { initials: 'AK', name: 'Ahmed Khan', role: 'Founder & CEO', bio: 'Former energy analyst with 10+ years helping businesses save on utilities.' },
    { initials: 'SJ', name: 'Sarah Johnson', role: 'CTO', bio: 'Tech veteran who built comparison platforms for major UK brands.' },
    { initials: 'MP', name: 'Michael Patel', role: 'Head of Partnerships', bio: 'Relationships with all major UK energy suppliers.' },
    { initials: 'ER', name: 'Emma Roberts', role: 'Customer Success', bio: 'Dedicated to making every switch seamless for our users.' },
  ];

  const values = [
    { icon: 'heart', title: 'Customer First', description: 'Every decision starts with how it helps our users save money.' },
    { icon: 'eye', title: 'Transparency', description: 'No hidden fees, no surprises. Clear pricing always.' },
    { icon: 'rocket', title: 'Innovation', description: 'Constantly improving to make energy switching easier.' },
    { icon: 'people', title: 'Community', description: 'Building tools that help UK businesses thrive together.' },
  ];

  const stats = [
    { value: 50000, suffix: '+', label: 'Happy Businesses' },
    { value: 2500000, suffix: '', label: 'Pounds Saved' },
    { value: 98, suffix: '%', label: 'Satisfaction Rate' },
    { value: 4, suffix: '.9', label: 'App Store Rating' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <WebHeader />

      {/* Hero Section */}
      <LinearGradient colors={['#F5F3FF', '#EDE9FE', '#FFFFFF']} style={styles.heroSection}>
        {/* Floating particles */}
        <Animated.View style={[styles.particle, styles.particle1, particle1Style]}>
          <Text style={styles.particleEmoji}>💜</Text>
        </Animated.View>
        <Animated.View style={[styles.particle, styles.particle2, particle2Style]}>
          <Text style={styles.particleEmoji}>⚡</Text>
        </Animated.View>

        <View style={styles.heroContent}>
          <Animated.View entering={FadeInDown.duration(800).springify()}>
            <Text style={styles.heroLabel}>ABOUT HAYYAN</Text>
            <Text style={styles.heroTitle}>On a Mission to Help{'\n'}UK Businesses Save</Text>
          </Animated.View>
          
          {/* Mascot */}
          <Animated.View 
            entering={ZoomIn.delay(500).duration(600)}
            style={[styles.mascotContainer, mascotStyle]}
          >
            <Image 
              source={require('../../assets/images/character.png')}
              style={styles.mascotImage}
              resizeMode="contain"
            />
          </Animated.View>
        </View>
      </LinearGradient>

      {/* Story Section */}
      <View style={styles.storySection}>
        <Animated.View entering={FadeInLeft.duration(700).springify()} style={styles.storyContent}>
          <Text style={styles.storyTitle}>Our Story</Text>
          <Text style={styles.storyText}>
            Hayyan was born from frustration. Our founder, Ahmed, spent years watching small businesses 
            overpay for energy simply because comparing suppliers was too complicated and time-consuming.
          </Text>
          <Text style={styles.storyText}>
            In 2023, we set out to change that. We built Hayyan to be the simplest, fastest way for 
            UK businesses to find better energy deals. No jargon, no endless forms, no sales calls 
            — just instant comparisons and real savings.
          </Text>
          <Text style={styles.storyText}>
            Today, we've helped over 50,000 businesses save more than £2.5 million on their energy 
            bills. And we're just getting started.
          </Text>
        </Animated.View>
      </View>

      {/* Stats Section */}
      <View style={styles.statsSection}>
        <LinearGradient colors={[COLORS.primary, '#9D85F6']} style={styles.statsGradient}>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <AnimatedStat key={stat.label} stat={stat} index={index} />
            ))}
          </View>
        </LinearGradient>
      </View>

      {/* Values Section */}
      <View style={styles.valuesSection}>
        <Animated.Text entering={FadeInUp.duration(600)} style={styles.sectionTitle}>
          Our Values
        </Animated.Text>
        <View style={styles.valuesGrid}>
          {values.map((value, index) => (
            <ValueCard key={value.title} value={value} index={index} />
          ))}
        </View>
      </View>

      {/* Team Section */}
      <View style={styles.teamSection}>
        <LinearGradient colors={['#FFFFFF', '#F9F7FF', '#FFFFFF']} style={StyleSheet.absoluteFill} />
        
        <Animated.Text entering={FadeInUp.duration(600)} style={styles.sectionTitle}>
          Meet the Team
        </Animated.Text>
        <View style={styles.teamGrid}>
          {team.map((member, index) => (
            <TeamCard key={member.name} member={member} index={index} />
          ))}
        </View>
      </View>

      {/* CTA Section */}
      <View style={styles.ctaSection}>
        <Animated.View entering={ZoomIn.duration(600)} style={styles.ctaBox}>
          <Text style={styles.ctaTitle}>Ready to Join Us?</Text>
          <Text style={styles.ctaSubtitle}>Start saving on your business energy today</Text>
          <TouchableOpacity 
            style={styles.ctaButton}
            onPress={() => router.push('/onboarding/welcome')}
          >
            <Text style={styles.ctaButtonText}>Get Started Free</Text>
            <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </Animated.View>
      </View>

      <WebFooter />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  heroSection: { paddingTop: 140, paddingBottom: 60, paddingHorizontal: 24, position: 'relative', overflow: 'hidden' },
  heroContent: { maxWidth: 900, marginHorizontal: 'auto', flexDirection: isDesktop ? 'row' : 'column', alignItems: 'center', justifyContent: 'space-between' },
  heroLabel: { fontSize: 12, fontWeight: '700', color: COLORS.primary, letterSpacing: 3, marginBottom: 16 },
  heroTitle: { fontSize: isDesktop ? 48 : 32, fontWeight: '800', color: '#1A1A2E', lineHeight: isDesktop ? 56 : 40, marginBottom: 20 },
  mascotContainer: { marginTop: isDesktop ? 0 : 40 },
  mascotImage: { width: 200, height: 200 },
  particle: { position: 'absolute', zIndex: 1 },
  particle1: { top: '15%', right: '20%' },
  particle2: { bottom: '20%', left: '10%' },
  particleEmoji: { fontSize: 32 },
  storySection: { paddingVertical: 80, paddingHorizontal: 24 },
  storyContent: { maxWidth: 700, marginHorizontal: 'auto' },
  storyTitle: { fontSize: 32, fontWeight: '800', color: '#1A1A2E', marginBottom: 24 },
  storyText: { fontSize: 17, color: '#6B7280', lineHeight: 28, marginBottom: 20 },
  statsSection: { paddingHorizontal: 24, marginBottom: 40 },
  statsGradient: { borderRadius: 24, padding: 40, maxWidth: 900, marginHorizontal: 'auto' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', gap: 20 },
  statItem: { alignItems: 'center', minWidth: 120 },
  statValue: { fontSize: 36, fontWeight: '800', color: '#FFFFFF' },
  statLabel: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
  valuesSection: { paddingVertical: 60, paddingHorizontal: 24 },
  sectionTitle: { fontSize: isDesktop ? 36 : 28, fontWeight: '800', color: '#1A1A2E', textAlign: 'center', marginBottom: 50 },
  valuesGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 20, maxWidth: 900, marginHorizontal: 'auto' },
  valueCard: { width: isDesktop ? 'calc(50% - 10px)' : '100%', backgroundColor: '#FFFFFF', borderRadius: 20, padding: 28, borderWidth: 1, borderColor: '#E5E7EB', position: 'relative', overflow: 'hidden' },
  valueGlow: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: COLORS.primary, opacity: 0.03, borderRadius: 20 },
  valueIcon: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#F0EBFF', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  valueTitle: { fontSize: 20, fontWeight: '700', color: '#1A1A2E', marginBottom: 8 },
  valueDescription: { fontSize: 15, color: '#6B7280', lineHeight: 24 },
  teamSection: { paddingVertical: 60, paddingHorizontal: 24, position: 'relative' },
  teamGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 24, maxWidth: 1000, marginHorizontal: 'auto' },
  teamCard: { width: isDesktop ? 220 : '100%', backgroundColor: '#FFFFFF', borderRadius: 20, padding: 24, alignItems: 'center', borderWidth: 1, borderColor: '#E5E7EB' },
  teamImageContainer: { marginBottom: 16, overflow: 'hidden', borderRadius: 50 },
  teamImagePlaceholder: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#F0EBFF', justifyContent: 'center', alignItems: 'center' },
  teamInitials: { fontSize: 32, fontWeight: '700', color: COLORS.primary },
  teamName: { fontSize: 18, fontWeight: '700', color: '#1A1A2E', marginBottom: 4 },
  teamRole: { fontSize: 14, color: COLORS.primary, fontWeight: '600', marginBottom: 12 },
  teamBio: { fontSize: 13, color: '#6B7280', textAlign: 'center', lineHeight: 20 },
  ctaSection: { paddingHorizontal: 24, paddingVertical: 60 },
  ctaBox: { backgroundColor: '#1A1A2E', borderRadius: 24, padding: 50, alignItems: 'center', maxWidth: 700, marginHorizontal: 'auto' },
  ctaTitle: { fontSize: isDesktop ? 32 : 24, fontWeight: '800', color: '#FFFFFF', marginBottom: 12, textAlign: 'center' },
  ctaSubtitle: { fontSize: 16, color: 'rgba(255,255,255,0.7)', marginBottom: 28, textAlign: 'center' },
  ctaButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.primary, paddingVertical: 16, paddingHorizontal: 32, borderRadius: 30, gap: 8 },
  ctaButtonText: { fontSize: 18, fontWeight: '700', color: '#FFFFFF' },
});
