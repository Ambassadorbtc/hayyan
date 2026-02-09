import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeInLeft,
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
import { COLORS } from '../../../src/constants/colors';
import { WebHeader } from '../../../src/components/web/WebHeader';
import { WebFooter } from '../../../src/components/web/WebFooter';
import { AppStoreButtons } from '../../../src/components/web/AppStoreButtons';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const isDesktop = Platform.OS === 'web' && width > 768;

// Animated Guide Card with hover effects
const GuideCard = ({ guide, index }: { guide: any; index: number }) => {
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);
  const iconRotate = useSharedValue(0);
  const glowOpacity = useSharedValue(0);
  const router = useRouter();

  // Continuous subtle icon movement
  useEffect(() => {
    iconRotate.value = withDelay(index * 100, withRepeat(
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
    scale.value = withSpring(1.03, { damping: 15 });
    translateY.value = withSpring(-8, { damping: 15 });
    glowOpacity.value = withTiming(1, { duration: 200 });
  };

  const handleHoverOut = () => {
    scale.value = withSpring(1, { damping: 15 });
    translateY.value = withSpring(0, { damping: 15 });
    glowOpacity.value = withTiming(0, { duration: 200 });
  };

  return (
    <Animated.View
      entering={FadeInUp.delay(100 + index * 80).duration(500).springify()}
      style={[styles.guideCard, cardStyle]}
      // @ts-ignore
      onMouseEnter={Platform.OS === 'web' ? handleHoverIn : undefined}
      onMouseLeave={Platform.OS === 'web' ? handleHoverOut : undefined}
    >
      <TouchableOpacity 
        style={styles.guideCardInner}
        onPress={() => router.push(guide.href as any)}
        activeOpacity={0.9}
      >
        <Animated.View style={[styles.guideGlow, glowStyle]} />
        
        <Animated.View style={[styles.guideIcon, iconStyle]}>
          <Ionicons name={guide.icon as any} size={24} color={COLORS.primary} />
        </Animated.View>
        
        <Text style={styles.guideTitle}>{guide.title}</Text>
        <Text style={styles.guideDescription}>{guide.description}</Text>
        
        <View style={styles.guideFooter}>
          <Text style={styles.guideReadTime}>{guide.readTime}</Text>
          <View style={styles.guideArrow}>
            <Ionicons name="arrow-forward" size={16} color={COLORS.primary} />
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

// Animated Category Header
const CategoryHeader = ({ title, index }: { title: string; index: number }) => {
  const underlineWidth = useSharedValue(0);

  useEffect(() => {
    underlineWidth.value = withDelay(index * 200, withSpring(100, { damping: 20 }));
  }, []);

  const underlineStyle = useAnimatedStyle(() => ({
    width: `${underlineWidth.value}%`,
  }));

  return (
    <Animated.View 
      entering={FadeInLeft.delay(index * 150).duration(600)}
      style={styles.categoryHeader}
    >
      <Text style={styles.categoryTitle}>{title}</Text>
      <Animated.View style={[styles.categoryUnderline, underlineStyle]} />
    </Animated.View>
  );
};

export default function GuidesPage() {
  const router = useRouter();

  // Floating particles animation
  const float1 = useSharedValue(0);
  const float2 = useSharedValue(0);
  const float3 = useSharedValue(0);

  useEffect(() => {
    float1.value = withRepeat(
      withSequence(
        withTiming(-20, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
        withTiming(20, { duration: 3000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
    float2.value = withDelay(500, withRepeat(
      withSequence(
        withTiming(15, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
        withTiming(-15, { duration: 2500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    ));
    float3.value = withDelay(1000, withRepeat(
      withSequence(
        withTiming(-15, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(15, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    ));
  }, []);

  const particle1Style = useAnimatedStyle(() => ({
    transform: [{ translateY: float1.value }, { translateX: float1.value * 0.5 }],
  }));
  const particle2Style = useAnimatedStyle(() => ({
    transform: [{ translateY: float2.value }, { rotate: `${float2.value}deg` }],
  }));
  const particle3Style = useAnimatedStyle(() => ({
    transform: [{ translateY: float3.value }],
  }));

  const guides = [
    {
      category: 'Energy Saving',
      items: [
        { title: '10 Ways to Reduce Business Energy Bills', description: 'Simple, actionable tips to cut your energy costs without affecting productivity.', readTime: '5 min read', icon: 'bulb', href: '/website/guides/reduce-business-bills' },
        { title: 'Understanding Your Energy Bill', description: 'A breakdown of all the charges on your business energy bill and what they mean.', readTime: '8 min read', icon: 'document-text', href: '/website/guides/understanding-energy-bill' },
        { title: 'Peak vs Off-Peak Energy: A Guide', description: 'How to shift your energy usage to save money on time-of-use tariffs.', readTime: '4 min read', icon: 'time', href: '/website/guides/peak-off-peak' },
      ],
    },
    {
      category: 'Switching Guides',
      items: [
        { title: 'How to Switch Business Energy Suppliers', description: 'A step-by-step guide to switching your business energy supplier hassle-free.', readTime: '6 min read', icon: 'swap-horizontal', href: '/website/guides/how-to-switch' },
        { title: 'What Happens When You Switch?', description: 'Everything you need to know about the switching process and timeline.', readTime: '4 min read', icon: 'help-circle', href: '/website/guides/what-happens-switch' },
        { title: 'Avoiding Exit Fees When Switching', description: 'How to check your contract and minimize costs when switching suppliers.', readTime: '5 min read', icon: 'warning', href: '/website/guides/avoiding-exit-fees' },
      ],
    },
    {
      category: 'Business Types',
      items: [
        { title: 'Energy Tips for Cafes & Restaurants', description: 'Industry-specific advice for reducing energy costs in food service businesses.', readTime: '7 min read', icon: 'cafe', href: '/website/guides/cafes-restaurants' },
        { title: 'Salon & Spa Energy Efficiency Guide', description: 'How beauty businesses can cut energy costs while maintaining service quality.', readTime: '5 min read', icon: 'cut', href: '/website/guides/salon-spa' },
        { title: 'Retail Shop Energy Savings', description: 'From lighting to heating, how retail shops can reduce their energy bills.', readTime: '6 min read', icon: 'storefront', href: '/website/guides/retail-shop' },
      ],
    },
    {
      category: 'Green Energy',
      items: [
        { title: 'Switching to Renewable Energy', description: 'How to make your business more sustainable without paying a premium.', readTime: '5 min read', icon: 'leaf', href: '/website/guides/renewable-energy' },
        { title: 'Understanding Carbon Offsetting', description: 'What carbon offsetting is and whether it\'s right for your business.', readTime: '4 min read', icon: 'earth', href: '/website/guides/carbon-offsetting' },
        { title: 'Solar Panels for Business: Worth It?', description: 'A cost-benefit analysis of installing solar panels for your business.', readTime: '8 min read', icon: 'sunny', href: '/website/guides/solar-panels' },
      ],
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <WebHeader />

      {/* Hero Section */}
      <LinearGradient colors={['#F5F3FF', '#EDE9FE', '#FFFFFF']} style={styles.heroSection}>
        {/* Floating particles */}
        <Animated.View style={[styles.particle, styles.particle1, particle1Style]}>
          <Text style={styles.particleEmoji}>📚</Text>
        </Animated.View>
        <Animated.View style={[styles.particle, styles.particle2, particle2Style]}>
          <Text style={styles.particleEmoji}>💡</Text>
        </Animated.View>
        <Animated.View style={[styles.particle, styles.particle3, particle3Style]}>
          <Text style={styles.particleEmoji}>⚡</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(800).springify()} style={styles.heroContent}>
          <Text style={styles.heroLabel}>ENERGY GUIDES</Text>
          <Text style={styles.heroTitle}>Expert Tips to Save{'\n'}on Business Energy</Text>
          <Text style={styles.heroSubtitle}>
            Free guides to help UK businesses reduce energy costs, switch suppliers, and go green.
          </Text>
        </Animated.View>
      </LinearGradient>

      {/* Guides Sections */}
      {guides.map((section, sectionIndex) => (
        <View key={section.category} style={styles.categorySection}>
          <CategoryHeader title={section.category} index={sectionIndex} />
          
          <View style={styles.guidesGrid}>
            {section.items.map((guide, index) => (
              <GuideCard key={guide.title} guide={guide} index={sectionIndex * 3 + index} />
            ))}
          </View>
        </View>
      ))}

      {/* CTA Section */}
      <View style={styles.ctaSection}>
        <LinearGradient colors={[COLORS.primary, '#9D85F6']} style={styles.ctaGradient}>
          <Animated.View entering={ZoomIn.duration(600)}>
            <Text style={styles.ctaTitle}>Ready to Start Saving?</Text>
            <Text style={styles.ctaSubtitle}>Download Hayyan and compare energy deals instantly</Text>
            <AppStoreButtons delay={300} />
          </Animated.View>
        </LinearGradient>
      </View>

      <WebFooter />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  heroSection: { paddingTop: 140, paddingBottom: 60, paddingHorizontal: 24, position: 'relative', overflow: 'hidden' },
  heroContent: { maxWidth: 700, marginHorizontal: 'auto', alignItems: 'center' },
  heroLabel: { fontSize: 12, fontWeight: '700', color: COLORS.primary, letterSpacing: 3, marginBottom: 16 },
  heroTitle: { fontSize: isDesktop ? 48 : 32, fontWeight: '800', color: '#1A1A2E', textAlign: 'center', marginBottom: 20, lineHeight: isDesktop ? 56 : 40 },
  heroSubtitle: { fontSize: 18, color: '#6B7280', textAlign: 'center', lineHeight: 28 },
  particle: { position: 'absolute', zIndex: 1 },
  particle1: { top: '15%', left: '10%' },
  particle2: { top: '35%', right: '10%' },
  particle3: { bottom: '20%', left: '15%' },
  particleEmoji: { fontSize: 32 },
  categorySection: { paddingVertical: 40, paddingHorizontal: 24 },
  categoryHeader: { maxWidth: 1100, marginHorizontal: 'auto', marginBottom: 32 },
  categoryTitle: { fontSize: 28, fontWeight: '800', color: '#1A1A2E', marginBottom: 8 },
  categoryUnderline: { height: 4, backgroundColor: COLORS.primary, borderRadius: 2 },
  guidesGrid: { flexDirection: isDesktop ? 'row' : 'column', flexWrap: 'wrap', justifyContent: 'flex-start', gap: 20, maxWidth: 1100, marginHorizontal: 'auto' },
  guideCard: { width: isDesktop ? 'calc(33.333% - 14px)' : '100%', borderRadius: 20, overflow: 'hidden' },
  guideCardInner: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 24, borderWidth: 1, borderColor: '#E5E7EB', height: '100%', position: 'relative' },
  guideGlow: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: COLORS.primary, opacity: 0.05, borderRadius: 20 },
  guideIcon: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#F0EBFF', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  guideTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A2E', marginBottom: 8 },
  guideDescription: { fontSize: 14, color: '#6B7280', lineHeight: 22, marginBottom: 16, flex: 1 },
  guideFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  guideReadTime: { fontSize: 13, color: '#9CA3AF' },
  guideArrow: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#F0EBFF', justifyContent: 'center', alignItems: 'center' },
  ctaSection: { paddingHorizontal: 24, paddingVertical: 60 },
  ctaGradient: { borderRadius: 32, padding: 60, alignItems: 'center', maxWidth: 900, marginHorizontal: 'auto' },
  ctaTitle: { fontSize: isDesktop ? 40 : 28, fontWeight: '800', color: '#FFFFFF', textAlign: 'center', marginBottom: 16 },
  ctaSubtitle: { fontSize: 18, color: 'rgba(255,255,255,0.9)', textAlign: 'center', marginBottom: 32 },
});
