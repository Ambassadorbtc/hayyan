import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeInLeft,
  FadeInRight,
  SlideInRight,
  SlideInLeft,
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
  useAnimatedScrollHandler,
  runOnJS,
} from 'react-native-reanimated';
import { COLORS } from '../../constants/colors';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

// ==================== HOVER CARD ====================
// Card that scales and glows on hover
export const HoverCard = ({ children, style, onPress, delay = 0 }: any) => {
  const scale = useSharedValue(1);
  const shadowOpacity = useSharedValue(0.1);
  const translateY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateY: translateY.value },
    ],
    shadowOpacity: shadowOpacity.value,
  }));

  const handleHoverIn = () => {
    scale.value = withSpring(1.03, { damping: 15 });
    shadowOpacity.value = withTiming(0.25, { duration: 200 });
    translateY.value = withSpring(-5, { damping: 15 });
  };

  const handleHoverOut = () => {
    scale.value = withSpring(1, { damping: 15 });
    shadowOpacity.value = withTiming(0.1, { duration: 200 });
    translateY.value = withSpring(0, { damping: 15 });
  };

  return (
    <Animated.View
      entering={FadeInUp.delay(delay).duration(600).springify()}
      style={[style, animatedStyle]}
      // @ts-ignore - web only
      onMouseEnter={isWeb ? handleHoverIn : undefined}
      onMouseLeave={isWeb ? handleHoverOut : undefined}
    >
      <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
};

// ==================== PULSE BUTTON ====================
// Button that continuously pulses to draw attention
export const PulseButton = ({ children, style, onPress, delay = 0 }: any) => {
  const scale = useSharedValue(1);
  const glow = useSharedValue(0);

  useEffect(() => {
    // Continuous pulse
    scale.value = withDelay(delay, withRepeat(
      withSequence(
        withTiming(1.05, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    ));
    
    glow.value = withDelay(delay, withRepeat(
      withSequence(
        withTiming(0.4, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 1000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    ));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    shadowOpacity: 0.3 + glow.value,
    shadowRadius: 10 + glow.value * 20,
  }));

  return (
    <Animated.View
      entering={ZoomIn.delay(delay).duration(500)}
      style={[style, animatedStyle]}
    >
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
};

// ==================== FLOAT ELEMENT ====================
// Element that continuously floats up and down
export const FloatElement = ({ children, style, delay = 0, amplitude = 10 }: any) => {
  const translateY = useSharedValue(0);
  const rotate = useSharedValue(0);

  useEffect(() => {
    translateY.value = withDelay(delay, withRepeat(
      withSequence(
        withTiming(-amplitude, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(amplitude, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    ));
    
    rotate.value = withDelay(delay, withRepeat(
      withSequence(
        withTiming(-2, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
        withTiming(2, { duration: 3000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    ));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { rotate: `${rotate.value}deg` },
    ],
  }));

  return (
    <Animated.View
      entering={FadeIn.delay(delay).duration(800)}
      style={[style, animatedStyle]}
    >
      {children}
    </Animated.View>
  );
};

// ==================== BREATHE ELEMENT ====================
// Element that breathes (scale pulse)
export const BreatheElement = ({ children, style, delay = 0 }: any) => {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withDelay(delay, withRepeat(
      withSequence(
        withTiming(1.05, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    ));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      entering={ZoomIn.delay(delay).duration(600)}
      style={[style, animatedStyle]}
    >
      {children}
    </Animated.View>
  );
};

// ==================== SLIDE IN SECTION ====================
// Section that slides in from direction when in view
export const SlideInSection = ({ 
  children, 
  style, 
  direction = 'up', 
  delay = 0 
}: { 
  children: any; 
  style?: any; 
  direction?: 'up' | 'down' | 'left' | 'right'; 
  delay?: number;
}) => {
  const enteringAnimation = {
    up: FadeInUp.delay(delay).duration(700).springify(),
    down: FadeInDown.delay(delay).duration(700).springify(),
    left: FadeInLeft.delay(delay).duration(700).springify(),
    right: FadeInRight.delay(delay).duration(700).springify(),
  };

  return (
    <Animated.View entering={enteringAnimation[direction]} style={style}>
      {children}
    </Animated.View>
  );
};

// ==================== ANIMATED COUNTER ====================
// Numbers that count up with animation
export const AnimatedCounter = ({ 
  target, 
  duration = 2000, 
  prefix = '', 
  suffix = '',
  style,
}: { 
  target: number; 
  duration?: number; 
  prefix?: string;
  suffix?: string;
  style?: any;
}) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    // Start counting after a short delay
    const startTimer = setTimeout(() => {
      setHasStarted(true);
    }, 500);

    return () => clearTimeout(startTimer);
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    
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
  }, [target, hasStarted]);

  return (
    <Text style={style}>
      {prefix}{count.toLocaleString()}{suffix}
    </Text>
  );
};

// ==================== GLOW BOX ====================
// Box with animated glowing border/shadow
export const GlowBox = ({ children, style, color = COLORS.primary, delay = 0 }: any) => {
  const glow = useSharedValue(0.2);

  useEffect(() => {
    glow.value = withDelay(delay, withRepeat(
      withSequence(
        withTiming(0.6, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.2, { duration: 1500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    ));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    shadowColor: color,
    shadowOpacity: glow.value,
    shadowRadius: 15 + glow.value * 20,
    shadowOffset: { width: 0, height: 0 },
  }));

  return (
    <Animated.View
      entering={FadeIn.delay(delay).duration(600)}
      style={[style, animatedStyle]}
    >
      {children}
    </Animated.View>
  );
};

// ==================== SHAKE ON HOVER ====================
// Element that shakes when hovered
export const ShakeOnHover = ({ children, style }: any) => {
  const rotate = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));

  const handleHoverIn = () => {
    rotate.value = withSequence(
      withTiming(-5, { duration: 50 }),
      withTiming(5, { duration: 100 }),
      withTiming(-5, { duration: 100 }),
      withTiming(5, { duration: 100 }),
      withTiming(0, { duration: 50 })
    );
  };

  return (
    <Animated.View
      style={[style, animatedStyle]}
      // @ts-ignore
      onMouseEnter={isWeb ? handleHoverIn : undefined}
    >
      {children}
    </Animated.View>
  );
};

// ==================== TYPING TEXT ====================
// Text that types out character by character
export const TypingText = ({ text, style, delay = 0, speed = 50 }: any) => {
  const [displayText, setDisplayText] = useState('');
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setHasStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!hasStarted) return;
    
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.substring(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    
    return () => clearInterval(timer);
  }, [text, hasStarted, speed]);

  return (
    <Text style={style}>
      {displayText}
      <Text style={{ opacity: hasStarted && displayText.length < text.length ? 1 : 0 }}>|</Text>
    </Text>
  );
};

// ==================== PARALLAX SCROLL ====================
// Element that moves at different speed than scroll
export const ParallaxElement = ({ children, style, speed = 0.5 }: any) => {
  const translateY = useSharedValue(0);
  
  // This would need to be connected to a scroll handler
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value * speed }],
  }));

  return (
    <Animated.View style={[style, animatedStyle]}>
      {children}
    </Animated.View>
  );
};

// ==================== STAGGER CHILDREN ====================
// Wrapper that staggers animation of children
export const StaggerChildren = ({ 
  children, 
  style, 
  staggerDelay = 100,
  baseDelay = 0,
}: any) => {
  return (
    <View style={style}>
      {React.Children.map(children, (child, index) => (
        <Animated.View 
          entering={FadeInUp.delay(baseDelay + index * staggerDelay).duration(500).springify()}
        >
          {child}
        </Animated.View>
      ))}
    </View>
  );
};

export default {
  HoverCard,
  PulseButton,
  FloatElement,
  BreatheElement,
  SlideInSection,
  AnimatedCounter,
  GlowBox,
  ShakeOnHover,
  TypingText,
  ParallaxElement,
  StaggerChildren,
};
