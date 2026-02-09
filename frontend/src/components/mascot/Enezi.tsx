import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { 
  Path, 
  Circle, 
  Ellipse, 
  G,
  Defs,
  LinearGradient,
  Stop,
  Rect
} from 'react-native-svg';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withRepeat, 
  withTiming, 
  withSequence,
  withSpring,
  Easing,
  interpolate,
  withDelay
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { COLORS } from '../../constants/colors';

export type EneziExpression = 
  | 'happy' 
  | 'excited' 
  | 'thinking' 
  | 'sad' 
  | 'surprised' 
  | 'winking' 
  | 'cheering'
  | 'pointing'
  | 'waving'
  | 'celebrating';

interface EneziProps {
  size?: number;
  expression?: EneziExpression;
  animated?: boolean;
}

const AnimatedView = Animated.createAnimatedComponent(View);

export const Enezi: React.FC<EneziProps> = ({ 
  size = 150, 
  expression = 'happy',
  animated = true 
}) => {
  const bounce = useSharedValue(0);
  const rotate = useSharedValue(0);
  const scale = useSharedValue(1);
  const eyeBlink = useSharedValue(1);

  useEffect(() => {
    if (animated) {
      // Bouncing animation
      bounce.value = withRepeat(
        withSequence(
          withTiming(-8, { duration: 400, easing: Easing.out(Easing.quad) }),
          withTiming(0, { duration: 400, easing: Easing.in(Easing.quad) })
        ),
        -1,
        true
      );

      // Subtle rotation
      rotate.value = withRepeat(
        withSequence(
          withTiming(3, { duration: 800, easing: Easing.inOut(Easing.sin) }),
          withTiming(-3, { duration: 800, easing: Easing.inOut(Easing.sin) })
        ),
        -1,
        true
      );

      // Eye blinking
      const startBlinking = () => {
        eyeBlink.value = withSequence(
          withTiming(0.1, { duration: 100 }),
          withTiming(1, { duration: 100 }),
          withDelay(2000 + Math.random() * 2000, withTiming(1, { duration: 0 }))
        );
        setTimeout(startBlinking, 3000 + Math.random() * 2000);
      };
      setTimeout(startBlinking, 1000);
    }
  }, [animated]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: bounce.value },
      { rotate: `${rotate.value}deg` },
      { scale: scale.value }
    ],
  }));

  const getEyeExpression = () => {
    switch (expression) {
      case 'excited':
        return { leftEye: 'star', rightEye: 'star' };
      case 'winking':
        return { leftEye: 'open', rightEye: 'closed' };
      case 'sad':
        return { leftEye: 'sad', rightEye: 'sad' };
      case 'surprised':
        return { leftEye: 'wide', rightEye: 'wide' };
      case 'thinking':
        return { leftEye: 'looking_up', rightEye: 'looking_up' };
      default:
        return { leftEye: 'open', rightEye: 'open' };
    }
  };

  const getMouth = () => {
    switch (expression) {
      case 'excited':
      case 'cheering':
      case 'celebrating':
        return 'big_smile';
      case 'sad':
        return 'frown';
      case 'surprised':
        return 'o_shape';
      case 'thinking':
        return 'hmm';
      default:
        return 'smile';
    }
  };

  return (
    <AnimatedView style={[styles.container, animatedStyle, { width: size, height: size * 1.2 }]}>
      <Svg width={size} height={size * 1.2} viewBox="0 0 100 120">
        <Defs>
          {/* Body Gradient */}
          <LinearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#00C4FF" />
            <Stop offset="100%" stopColor="#0088CC" />
          </LinearGradient>
          
          {/* Bolt Gradient */}
          <LinearGradient id="boltGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#FFE066" />
            <Stop offset="100%" stopColor="#FFD700" />
          </LinearGradient>
          
          {/* Sneaker Gradient */}
          <LinearGradient id="sneakerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#FF6B6B" />
            <Stop offset="100%" stopColor="#FF4D4D" />
          </LinearGradient>
        </Defs>
        
        {/* Lightning Hair */}
        <Path
          d="M50 5 L55 18 L65 12 L58 28 L70 22 L55 38 L50 25 L45 38 L30 22 L42 28 L35 12 L45 18 Z"
          fill="url(#boltGradient)"
        />
        
        {/* Body - Rounded bolt shape */}
        <Ellipse cx="50" cy="60" rx="28" ry="32" fill="url(#bodyGradient)" />
        
        {/* Face area - lighter */}
        <Ellipse cx="50" cy="55" rx="22" ry="25" fill="#B8EBFF" opacity="0.5" />
        
        {/* Left Eye */}
        <G>
          <Ellipse cx="40" cy="50" rx="8" ry="10" fill="white" />
          <Circle cx="40" cy="50" r="5" fill={COLORS.eneziEyes} />
          <Circle cx="42" cy="48" r="2" fill="white" />
        </G>
        
        {/* Right Eye */}
        <G>
          <Ellipse cx="60" cy="50" rx="8" ry="10" fill="white" />
          <Circle cx="60" cy="50" r="5" fill={COLORS.eneziEyes} />
          <Circle cx="62" cy="48" r="2" fill="white" />
        </G>
        
        {/* Eyebrows based on expression */}
        {expression === 'excited' && (
          <>
            <Path d="M32 40 Q40 35 48 40" stroke={COLORS.eneziEyes} strokeWidth="2" fill="none" />
            <Path d="M52 40 Q60 35 68 40" stroke={COLORS.eneziEyes} strokeWidth="2" fill="none" />
          </>
        )}
        {expression === 'sad' && (
          <>
            <Path d="M32 42 Q40 45 48 42" stroke={COLORS.eneziEyes} strokeWidth="2" fill="none" />
            <Path d="M52 42 Q60 45 68 42" stroke={COLORS.eneziEyes} strokeWidth="2" fill="none" />
          </>
        )}
        
        {/* Mouth based on expression */}
        {getMouth() === 'smile' && (
          <Path d="M40 68 Q50 78 60 68" stroke={COLORS.eneziEyes} strokeWidth="3" fill="none" strokeLinecap="round" />
        )}
        {getMouth() === 'big_smile' && (
          <Path d="M35 65 Q50 85 65 65" stroke={COLORS.eneziEyes} strokeWidth="3" fill="#FF6B6B" strokeLinecap="round" />
        )}
        {getMouth() === 'frown' && (
          <Path d="M40 75 Q50 65 60 75" stroke={COLORS.eneziEyes} strokeWidth="3" fill="none" strokeLinecap="round" />
        )}
        {getMouth() === 'o_shape' && (
          <Circle cx="50" cy="70" r="6" fill={COLORS.eneziEyes} />
        )}
        {getMouth() === 'hmm' && (
          <Path d="M45 70 L55 72" stroke={COLORS.eneziEyes} strokeWidth="3" fill="none" strokeLinecap="round" />
        )}
        
        {/* Blush marks */}
        <Ellipse cx="30" cy="58" rx="5" ry="3" fill="#FFB6C1" opacity="0.6" />
        <Ellipse cx="70" cy="58" rx="5" ry="3" fill="#FFB6C1" opacity="0.6" />
        
        {/* Arms */}
        {(expression === 'waving' || expression === 'cheering') && (
          <>
            <Path d="M22 55 Q10 45 15 35" stroke="url(#bodyGradient)" strokeWidth="8" fill="none" strokeLinecap="round" />
            <Path d="M78 55 Q90 45 85 35" stroke="url(#bodyGradient)" strokeWidth="8" fill="none" strokeLinecap="round" />
          </>
        )}
        {expression === 'pointing' && (
          <Path d="M78 55 Q95 50 100 45" stroke="url(#bodyGradient)" strokeWidth="8" fill="none" strokeLinecap="round" />
        )}
        
        {/* Left Leg/Sneaker */}
        <G>
          <Rect x="35" y="88" width="12" height="15" rx="4" fill="url(#sneakerGradient)" />
          <Rect x="33" y="98" width="16" height="6" rx="3" fill="url(#sneakerGradient)" />
          <Path d="M35 101 L47 101" stroke="white" strokeWidth="1.5" />
          <Path d="M35 103 L47 103" stroke="white" strokeWidth="1.5" />
        </G>
        
        {/* Right Leg/Sneaker */}
        <G>
          <Rect x="53" y="88" width="12" height="15" rx="4" fill="url(#sneakerGradient)" />
          <Rect x="51" y="98" width="16" height="6" rx="3" fill="url(#sneakerGradient)" />
          <Path d="M53 101 L65 101" stroke="white" strokeWidth="1.5" />
          <Path d="M53 103 L65 103" stroke="white" strokeWidth="1.5" />
        </G>
        
        {/* Sparkles for excited/celebrating */}
        {(expression === 'excited' || expression === 'celebrating') && (
          <>
            <Path d="M15 25 L18 30 L15 35 L12 30 Z" fill="#FFD700" />
            <Path d="M85 25 L88 30 L85 35 L82 30 Z" fill="#FFD700" />
            <Circle cx="10" cy="50" r="2" fill="#FFD700" />
            <Circle cx="90" cy="50" r="2" fill="#FFD700" />
          </>
        )}
      </Svg>
    </AnimatedView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Enezi;
