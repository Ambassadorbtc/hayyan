import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeIn,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  withRepeat,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SHADOWS } from '../../src/constants/colors';
import { TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../src/constants/typography';
import { Enezi } from '../../src/components/mascot/Enezi';
import { SpeechBubble } from '../../src/components/ui/SpeechBubble';
import { AnimatedButton } from '../../src/components/ui/AnimatedButton';
import { SuccessOverlay } from '../../src/components/ui/SuccessOverlay';
import { useOnboardingStore } from '../../src/store/onboardingStore';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CARD_SIZE = (width - SPACING.lg * 2 - SPACING.md * 2) / 3;

const BUSINESS_TYPES = [
  { id: 'cafe', title: 'Cafe / Restaurant', icon: 'cafe', color: '#FF8A65' },
  { id: 'salon', title: 'Salon / Barbers', icon: 'cut', color: '#BA68C8' },
  { id: 'shop', title: 'Convenience Store', icon: 'storefront', color: '#4FC3F7' },
  { id: 'mechanic', title: 'Mechanic / Garage', icon: 'build', color: '#78909C' },
  { id: 'groomer', title: 'Dog Groomer', icon: 'paw', color: '#A1887F' },
  { id: 'timber', title: 'Timber Merchant', icon: 'construct', color: '#8D6E63' },
  { id: 'retail', title: 'Retail Shop', icon: 'bag-handle', color: '#F06292' },
  { id: 'office', title: 'Office', icon: 'desktop', color: '#64B5F6' },
  { id: 'other', title: 'Other', icon: 'ellipsis-horizontal', color: '#90A4AE' },
];

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface BusinessCardProps {
  item: typeof BUSINESS_TYPES[0];
  selected: boolean;
  onPress: () => void;
  index: number;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ item, selected, onPress, index }) => {
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 15, stiffness: 400 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 400 });
    if (!selected) {
      rotation.value = withSequence(
        withTiming(5, { duration: 100 }),
        withTiming(-5, { duration: 100 }),
        withTiming(0, { duration: 100 })
      );
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotate: `${rotation.value}deg` }],
  }));

  return (
    <Animated.View
      entering={FadeInUp.delay(400 + index * 50).duration(400)}
      style={styles.cardWrapper}
    >
      <AnimatedTouchable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
        style={[
          styles.businessCard,
          selected && styles.businessCardSelected,
          { backgroundColor: selected ? item.color : COLORS.cardBackground },
          animatedStyle,
        ]}
      >
        <View style={[styles.iconContainer, { backgroundColor: selected ? 'rgba(255,255,255,0.3)' : `${item.color}20` }]}>
          <Ionicons
            name={item.icon as any}
            size={28}
            color={selected ? COLORS.textLight : item.color}
          />
        </View>
        <Text style={[styles.cardTitle, selected && styles.cardTitleSelected]} numberOfLines={2}>
          {item.title}
        </Text>
      </AnimatedTouchable>
    </Animated.View>
  );
};

export default function BusinessTypeScreen() {
  const router = useRouter();
  const { businessType, setBusinessType, setCurrentStep } = useOnboardingStore();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCharacter, setShowCharacter] = useState(false);

  // Character animation
  const characterTranslateX = useSharedValue(width + 100);
  const characterScale = useSharedValue(1);

  useEffect(() => {
    setTimeout(() => setShowCharacter(true), 400);
    
    characterTranslateX.value = withTiming(0, { 
      duration: 1200, 
      easing: Easing.out(Easing.cubic) 
    });

    setTimeout(() => {
      characterScale.value = withRepeat(
        withSequence(
          withTiming(1.05, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 1200, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      );
    }, 1600);
  }, []);

  const characterStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: characterTranslateX.value },
      { scale: characterScale.value },
    ],
  }));

  const handleSelect = (id: string) => {
    setBusinessType(id);
  };

  const handleContinue = () => {
    if (businessType) {
      setShowSuccess(true);
    }
  };

  const handleSuccessDismiss = () => {
    setShowSuccess(false);
    setCurrentStep(4);
    router.push('/onboarding/business-details');
  };

  const handleBack = () => {
    router.back();
  };

  const getSelectedBusinessName = () => {
    const business = BUSINESS_TYPES.find((b) => b.id === businessType);
    return business?.title || 'your shop';
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[COLORS.backgroundLight, '#E8E0FF', COLORS.background]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with back button */}
        <Animated.View entering={FadeIn.duration(400)} style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
        </Animated.View>

        {/* Title */}
        <Animated.View entering={FadeInDown.delay(100).duration(500)}>
          <Text style={styles.headline}>What type of business do you run?</Text>
        </Animated.View>

        {/* Character Section */}
        <Animated.View entering={FadeIn.delay(300).duration(500)} style={styles.characterSection}>
          <SpeechBubble
            message={businessType ? `Ace! I'll tailor savings for ${getSelectedBusinessName()}! 🎯` : "Pick your business type and I'll customize your savings! 💼"}
            position="bottom"
            delay={400}
          />
          {showCharacter && (
            <Animated.View style={[styles.characterContainer, characterStyle]}>
              <Enezi
                size={100}
                expression={businessType ? 'pointing' : 'happy'}
                animated={false}
              />
            </Animated.View>
          )}
        </Animated.View>

        {/* Business Type Grid */}
        <View style={styles.gridContainer}>
          {BUSINESS_TYPES.map((item, index) => (
            <BusinessCard
              key={item.id}
              item={item}
              selected={businessType === item.id}
              onPress={() => handleSelect(item.id)}
              index={index}
            />
          ))}
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <Animated.View entering={FadeInUp.delay(800).duration(400)} style={styles.bottomSection}>
        <AnimatedButton
          title="Continue"
          onPress={handleContinue}
          variant="primary"
          size="large"
          fullWidth
          disabled={!businessType}
          icon="arrow-forward"
          iconPosition="right"
        />
      </Animated.View>

      {/* Progress indicator */}
      <View style={styles.progressContainer}>
        <View style={styles.progressDot} />
        <View style={styles.progressDot} />
        <View style={styles.progressDot} />
        <View style={[styles.progressDot, styles.progressDotActive]} />
        <View style={styles.progressDot} />
        <View style={styles.progressDot} />
        <View style={styles.progressDot} />
      </View>

      {/* Success Overlay */}
      <SuccessOverlay
        visible={showSuccess}
        onDismiss={handleSuccessDismiss}
        title="Perfect!"
        message={`We know ${getSelectedBusinessName()} inside out!`}
        eneziExpression="celebrating"
        autoHideDuration={2000}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  headline: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  characterSection: {
    alignItems: 'center',
    marginVertical: SPACING.md,
  },
  characterContainer: {
    marginTop: SPACING.sm,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: SPACING.md,
  },
  cardWrapper: {
    width: '31%',
    marginBottom: SPACING.md,
  },
  businessCard: {
    width: '100%',
    aspectRatio: 0.85,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.sm,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.cardBorder,
    ...SHADOWS.small,
  },
  businessCardSelected: {
    borderColor: 'transparent',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  cardTitle: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textPrimary,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 11,
  },
  cardTitleSelected: {
    color: COLORS.textLight,
  },
  bottomSection: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: SPACING.lg,
    gap: SPACING.sm,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.cardBorder,
  },
  progressDotActive: {
    backgroundColor: COLORS.primary,
    width: 24,
  },
});
