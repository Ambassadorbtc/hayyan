import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, {
  Path,
  Circle,
  Ellipse,
  G,
  Defs,
  LinearGradient,
  Stop,
  RadialGradient,
} from 'react-native-svg';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withSequence,
  withSpring,
  Easing,
} from 'react-native-reanimated';

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
  | 'celebrating'
  | 'cheeky'
  | 'proud';

interface EneziProps {
  size?: number;
  expression?: EneziExpression;
  animated?: boolean;
}

const AnimatedView = Animated.createAnimatedComponent(View);

/**
 * Enezi - The Enerzo Mascot
 * A cute, friendly lightning bolt character inspired by Phantom's ghost and Duolingo's owl
 * Clean, minimalist design with expressive eyes and smooth animations
 */
export const Enezi: React.FC<EneziProps> = ({
  size = 150,
  expression = 'happy',
  animated = true
}) => {
  const bounce = useSharedValue(0);
  const rotate = useSharedValue(0);

  useEffect(() => {
    if (animated) {
      // Gentle floating animation
      bounce.value = withRepeat(
        withSequence(
          withTiming(-4, { duration: 800, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 800, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      );

      // Subtle sway
      rotate.value = withRepeat(
        withSequence(
          withTiming(2, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
          withTiming(-2, { duration: 1200, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      );
    }
  }, [animated]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: bounce.value },
      { rotate: `${rotate.value}deg` },
    ],
  }));

  // Eye positions and sizes based on expression
  const getEyes = () => {
    switch (expression) {
      case 'winking':
      case 'cheeky':
        return { left: 'open', right: 'wink' };
      case 'sad':
        return { left: 'sad', right: 'sad' };
      case 'surprised':
        return { left: 'wide', right: 'wide' };
      case 'thinking':
        return { left: 'look_up', right: 'look_up' };
      case 'excited':
      case 'celebrating':
      case 'cheering':
        return { left: 'sparkle', right: 'sparkle' };
      default:
        return { left: 'open', right: 'open' };
    }
  };

  const getMouthPath = () => {
    switch (expression) {
      case 'excited':
      case 'cheering':
      case 'celebrating':
        // Big open smile
        return "M 38 70 Q 50 82 62 70 Q 50 78 38 70 Z";
      case 'sad':
        // Frown
        return "M 40 74 Q 50 68 60 74";
      case 'surprised':
        // O shape
        return "M 50 72 m -5 0 a 5 6 0 1 0 10 0 a 5 6 0 1 0 -10 0";
      case 'thinking':
        // Hmm line
        return "M 44 72 L 56 73";
      case 'cheeky':
      case 'winking':
        // Smirk
        return "M 40 70 Q 50 78 60 68";
      case 'proud':
        // Confident smile
        return "M 38 68 Q 50 80 62 68";
      default:
        // Happy smile
        return "M 40 68 Q 50 78 60 68";
    }
  };

  const renderEye = (cx: number, cy: number, type: string) => {
    if (type === 'wink') {
      // Curved closed eye
      return (
        <Path
          d={`M ${cx - 7} ${cy} Q ${cx} ${cy + 5} ${cx + 7} ${cy}`}
          stroke="#1A1A2E"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
      );
    }

    if (type === 'sad') {
      return (
        <G>
          <Ellipse cx={cx} cy={cy} rx={8} ry={9} fill="white" />
          <Circle cx={cx} cy={cy + 2} r={4} fill="#1A1A2E" />
          <Circle cx={cx + 1} cy={cy} r={1.5} fill="white" />
          {/* Sad eyebrow */}
          <Path
            d={`M ${cx - 8} ${cy - 12} L ${cx + 4} ${cy - 8}`}
            stroke="#1A1A2E"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </G>
      );
    }

    if (type === 'wide') {
      return (
        <G>
          <Ellipse cx={cx} cy={cy} rx={10} ry={12} fill="white" />
          <Circle cx={cx} cy={cy} r={6} fill="#1A1A2E" />
          <Circle cx={cx + 2} cy={cy - 2} r={2.5} fill="white" />
        </G>
      );
    }

    if (type === 'look_up') {
      return (
        <G>
          <Ellipse cx={cx} cy={cy} rx={8} ry={9} fill="white" />
          <Circle cx={cx} cy={cy - 3} r={4} fill="#1A1A2E" />
          <Circle cx={cx + 1} cy={cy - 5} r={1.5} fill="white" />
        </G>
      );
    }

    if (type === 'sparkle') {
      return (
        <G>
          <Ellipse cx={cx} cy={cy} rx={9} ry={10} fill="white" />
          <Circle cx={cx} cy={cy} r={5} fill="#1A1A2E" />
          <Circle cx={cx + 2} cy={cy - 2} r={2} fill="white" />
          <Circle cx={cx - 2} cy={cy + 2} r={1} fill="white" />
          {/* Star sparkle */}
          <Path
            d={`M ${cx + 10} ${cy - 8} L ${cx + 11} ${cy - 5} L ${cx + 14} ${cy - 6} L ${cx + 12} ${cy - 4} L ${cx + 14} ${cy - 2} L ${cx + 11} ${cy - 3} L ${cx + 10} ${cy} L ${cx + 9} ${cy - 3} L ${cx + 6} ${cy - 2} L ${cx + 8} ${cy - 4} L ${cx + 6} ${cy - 6} L ${cx + 9} ${cy - 5} Z`}
            fill="#FFD93D"
          />
        </G>
      );
    }

    // Default open eye
    return (
      <G>
        <Ellipse cx={cx} cy={cy} rx={8} ry={9} fill="white" />
        <Circle cx={cx} cy={cy} r={4} fill="#1A1A2E" />
        <Circle cx={cx + 1.5} cy={cy - 1.5} r={1.5} fill="white" />
      </G>
    );
  };

  const eyes = getEyes();
  const showArmsUp = expression === 'waving' || expression === 'cheering' || expression === 'celebrating';

  return (
    <AnimatedView style={[styles.container, animatedStyle, { width: size, height: size * 1.1 }]}>
      <Svg width={size} height={size * 1.1} viewBox="0 0 100 110">
        <Defs>
          {/* Main body gradient - electric blue like Phantom's style */}
          <LinearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#00D4FF" />
            <Stop offset="100%" stopColor="#00A3FF" />
          </LinearGradient>
          
          {/* Lightning hair gradient */}
          <LinearGradient id="boltGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#FFE566" />
            <Stop offset="100%" stopColor="#FFD93D" />
          </LinearGradient>
          
          {/* Belly highlight */}
          <RadialGradient id="bellyGradient" cx="50%" cy="40%" rx="50%" ry="50%">
            <Stop offset="0%" stopColor="#B8F4FF" stopOpacity="0.8" />
            <Stop offset="100%" stopColor="#00D4FF" stopOpacity="0" />
          </RadialGradient>
          
          {/* Sneaker gradient */}
          <LinearGradient id="sneakerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#FF6B6B" />
            <Stop offset="100%" stopColor="#FF4D4D" />
          </LinearGradient>
        </Defs>

        {/* Lightning bolt hair - iconic like the brief requested */}
        <Path
          d="M 50 5 L 54 15 L 60 10 L 54 22 L 58 18 L 52 28 L 50 20 L 48 28 L 42 18 L 46 22 L 40 10 L 46 15 Z"
          fill="url(#boltGradient)"
          stroke="#E6B800"
          strokeWidth="1"
        />

        {/* Main body - clean rounded shape like Phantom ghost */}
        <Path
          d="M 50 25 
             C 75 25 80 45 80 60 
             C 80 80 70 90 50 90 
             C 30 90 20 80 20 60 
             C 20 45 25 25 50 25 Z"
          fill="url(#bodyGradient)"
        />
        
        {/* Belly highlight */}
        <Ellipse cx={50} cy={55} rx={18} ry={20} fill="url(#bellyGradient)" />

        {/* Arms based on expression */}
        {showArmsUp ? (
          <>
            {/* Left arm up */}
            <Path
              d="M 25 55 Q 10 40 15 28"
              stroke="url(#bodyGradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
            />
            <Circle cx={15} cy={28} r={5} fill="#00D4FF" />
            {/* Right arm up */}
            <Path
              d="M 75 55 Q 90 40 85 28"
              stroke="url(#bodyGradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
            />
            <Circle cx={85} cy={28} r={5} fill="#00D4FF" />
          </>
        ) : expression === 'pointing' ? (
          <>
            {/* Left arm relaxed */}
            <Path
              d="M 25 55 Q 12 60 10 65"
              stroke="url(#bodyGradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
            />
            <Circle cx={10} cy={65} r={4} fill="#00D4FF" />
            {/* Right arm pointing */}
            <Path
              d="M 75 50 Q 92 45 98 42"
              stroke="url(#bodyGradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
            />
            <Circle cx={98} cy={42} r={4} fill="#00D4FF" />
          </>
        ) : (
          <>
            {/* Arms at sides */}
            <Path
              d="M 25 55 Q 12 60 10 68"
              stroke="url(#bodyGradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
            />
            <Circle cx={10} cy={68} r={4} fill="#00D4FF" />
            <Path
              d="M 75 55 Q 88 60 90 68"
              stroke="url(#bodyGradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
            />
            <Circle cx={90} cy={68} r={4} fill="#00D4FF" />
          </>
        )}

        {/* Face - eyes */}
        {renderEye(40, 52, eyes.left)}
        {renderEye(60, 52, eyes.right)}

        {/* Blush */}
        <Ellipse cx={28} cy={58} rx={5} ry={3} fill="#FFB6C1" opacity={0.5} />
        <Ellipse cx={72} cy={58} rx={5} ry={3} fill="#FFB6C1" opacity={0.5} />

        {/* Mouth */}
        <Path
          d={getMouthPath()}
          stroke="#1A1A2E"
          strokeWidth="2.5"
          fill={expression === 'excited' || expression === 'cheering' || expression === 'celebrating' ? '#FF6B6B' : 'none'}
          strokeLinecap="round"
        />

        {/* Red sneakers */}
        {/* Left sneaker */}
        <G>
          <Path
            d="M 35 88 L 35 96 Q 35 100 39 100 L 48 100 Q 52 100 52 96 L 52 92 L 35 88 Z"
            fill="url(#sneakerGradient)"
          />
          <Path d="M 37 95 L 45 95" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <Path d="M 37 98 L 45 98" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </G>
        
        {/* Right sneaker */}
        <G>
          <Path
            d="M 48 92 L 48 96 Q 48 100 52 100 L 61 100 Q 65 100 65 96 L 65 88 L 48 92 Z"
            fill="url(#sneakerGradient)"
          />
          <Path d="M 55 95 L 63 95" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <Path d="M 55 98 L 63 98" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </G>

        {/* Sparkles for excited expressions */}
        {(expression === 'excited' || expression === 'celebrating' || expression === 'cheering') && (
          <>
            <Path d="M 12 35 L 14 40 L 12 45 L 10 40 Z" fill="#FFD93D" />
            <Path d="M 88 35 L 90 40 L 88 45 L 86 40 Z" fill="#FFD93D" />
            <Circle cx={8} cy={55} r={2} fill="#FFD93D" />
            <Circle cx={92} cy={55} r={2} fill="#FFD93D" />
          </>
        )}

        {/* Small lightning bolt emblem on belly */}
        <Path
          d="M 50 58 L 52 62 L 50 62 L 53 68 L 47 64 L 50 64 L 47 58 Z"
          fill="url(#boltGradient)"
          stroke="#E6B800"
          strokeWidth="0.5"
        />
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
