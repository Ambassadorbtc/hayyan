import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, {
  Path,
  Circle,
  Ellipse,
  G,
  Rect,
} from 'react-native-svg';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withSequence,
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
 * Retro cartoon style with bold outlines, big eyes, wide smile
 * Inspired by classic rubber hose animation style
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
      // Bouncy animation
      bounce.value = withRepeat(
        withSequence(
          withTiming(-5, { duration: 400, easing: Easing.out(Easing.quad) }),
          withTiming(0, { duration: 400, easing: Easing.in(Easing.quad) })
        ),
        -1,
        true
      );

      // Slight sway
      rotate.value = withRepeat(
        withSequence(
          withTiming(3, { duration: 600, easing: Easing.inOut(Easing.ease) }),
          withTiming(-3, { duration: 600, easing: Easing.inOut(Easing.ease) })
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

  // Get mouth based on expression
  const getMouth = () => {
    switch (expression) {
      case 'excited':
      case 'cheering':
      case 'celebrating':
      case 'happy':
      case 'waving':
        return 'big_smile'; // Wide open mouth with tongue
      case 'sad':
        return 'frown';
      case 'surprised':
        return 'o_shape';
      case 'thinking':
        return 'hmm';
      case 'cheeky':
      case 'winking':
        return 'smirk';
      case 'proud':
        return 'smile';
      default:
        return 'big_smile';
    }
  };

  // Get eye style based on expression
  const getLeftEye = () => {
    switch (expression) {
      case 'winking':
      case 'cheeky':
        return 'wink';
      case 'sad':
        return 'sad';
      case 'surprised':
        return 'wide';
      case 'thinking':
        return 'look_side';
      default:
        return 'normal';
    }
  };

  const getRightEye = () => {
    switch (expression) {
      case 'sad':
        return 'sad';
      case 'surprised':
        return 'wide';
      case 'thinking':
        return 'look_side';
      default:
        return 'normal';
    }
  };

  // Render classic cartoon eye
  const renderEye = (cx: number, cy: number, type: string, isLeft: boolean) => {
    if (type === 'wink') {
      return (
        <Path
          d={`M ${cx - 8} ${cy - 2} Q ${cx} ${cy + 6} ${cx + 8} ${cy - 2}`}
          stroke="#000000"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      );
    }

    // Classic big oval white eye with black pupil
    return (
      <G>
        {/* White of eye */}
        <Ellipse
          cx={cx}
          cy={cy}
          rx={10}
          ry={12}
          fill="white"
          stroke="#000000"
          strokeWidth="2.5"
        />
        {/* Black pupil */}
        <Ellipse
          cx={type === 'look_side' ? (isLeft ? cx - 3 : cx + 3) : cx}
          cy={type === 'sad' ? cy + 3 : cy}
          rx={5}
          ry={6}
          fill="#000000"
        />
      </G>
    );
  };

  // Render mouth
  const renderMouth = (type: string) => {
    switch (type) {
      case 'big_smile':
        // Wide open smile with tongue - classic cartoon style
        return (
          <G>
            {/* Mouth opening */}
            <Path
              d="M 32 62 Q 50 82 68 62 Q 50 75 32 62 Z"
              fill="#000000"
              stroke="#000000"
              strokeWidth="2.5"
            />
            {/* Tongue */}
            <Ellipse cx={50} cy={70} rx={8} ry={5} fill="#FF6B6B" />
          </G>
        );
      case 'frown':
        return (
          <Path
            d="M 38 70 Q 50 62 62 70"
            stroke="#000000"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        );
      case 'o_shape':
        return (
          <Ellipse
            cx={50}
            cy={68}
            rx={8}
            ry={10}
            fill="#000000"
            stroke="#000000"
            strokeWidth="2"
          />
        );
      case 'hmm':
        return (
          <Path
            d="M 42 68 L 58 66"
            stroke="#000000"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        );
      case 'smirk':
        return (
          <Path
            d="M 38 65 Q 55 72 65 62"
            stroke="#000000"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        );
      case 'smile':
        return (
          <Path
            d="M 38 64 Q 50 74 62 64"
            stroke="#000000"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        );
      default:
        return null;
    }
  };

  const showArmsUp = expression === 'waving' || expression === 'cheering' || expression === 'celebrating' || expression === 'excited';
  const showPointing = expression === 'pointing';

  return (
    <AnimatedView style={[styles.container, animatedStyle, { width: size, height: size * 1.15 }]}>
      <Svg width={size} height={size * 1.15} viewBox="0 0 100 115">
        
        {/* === FLAME/SPARK ON TOP === */}
        <G>
          <Path
            d="M 50 8 Q 54 2 52 10 Q 56 6 54 14 Q 50 10 50 16 Q 46 10 46 14 Q 44 6 48 10 Q 46 2 50 8 Z"
            fill="#FF6B00"
            stroke="#000000"
            strokeWidth="2"
          />
          <Path
            d="M 50 10 Q 52 6 51 12 Q 50 8 50 14 Q 48 8 49 12 Q 48 6 50 10 Z"
            fill="#FFCC00"
          />
        </G>

        {/* === MAIN BODY - Yellow energy drop shape === */}
        <Path
          d="M 50 18 
             C 70 18 78 35 78 52 
             C 78 72 68 82 50 82 
             C 32 82 22 72 22 52 
             C 22 35 30 18 50 18 Z"
          fill="#FFD93D"
          stroke="#000000"
          strokeWidth="3"
        />

        {/* Highlight on body */}
        <Ellipse cx={36} cy={40} rx={6} ry={8} fill="#FFEC8B" opacity={0.6} />

        {/* === ARMS === */}
        {showArmsUp ? (
          <>
            {/* Left arm up */}
            <G>
              <Path
                d="M 26 52 Q 14 42 10 32"
                stroke="#FFD93D"
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
              />
              <Path
                d="M 26 52 Q 14 42 10 32"
                stroke="#000000"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                opacity={0.3}
              />
              <Circle cx={10} cy={32} r={6} fill="#FFD93D" stroke="#000000" strokeWidth="2.5" />
            </G>
            {/* Right arm up */}
            <G>
              <Path
                d="M 74 52 Q 86 42 90 32"
                stroke="#FFD93D"
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
              />
              <Path
                d="M 74 52 Q 86 42 90 32"
                stroke="#000000"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                opacity={0.3}
              />
              <Circle cx={90} cy={32} r={6} fill="#FFD93D" stroke="#000000" strokeWidth="2.5" />
            </G>
          </>
        ) : showPointing ? (
          <>
            {/* Left arm at side */}
            <G>
              <Path
                d="M 26 55 Q 16 58 12 62"
                stroke="#FFD93D"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
              />
              <Circle cx={12} cy={62} r={5} fill="#FFD93D" stroke="#000000" strokeWidth="2" />
            </G>
            {/* Right arm pointing */}
            <G>
              <Path
                d="M 74 50 Q 88 45 96 42"
                stroke="#FFD93D"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
              />
              <Circle cx={96} cy={42} r={5} fill="#FFD93D" stroke="#000000" strokeWidth="2" />
            </G>
          </>
        ) : (
          <>
            {/* Arms at sides - curly style */}
            <G>
              <Path
                d="M 26 55 Q 16 58 14 65 Q 12 70 16 72"
                stroke="#FFD93D"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
              />
              <Circle cx={16} cy={72} r={5} fill="#FFD93D" stroke="#000000" strokeWidth="2" />
            </G>
            <G>
              <Path
                d="M 74 55 Q 84 58 86 65 Q 88 70 84 72"
                stroke="#FFD93D"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
              />
              <Circle cx={84} cy={72} r={5} fill="#FFD93D" stroke="#000000" strokeWidth="2" />
            </G>
          </>
        )}

        {/* === EYEBROWS === */}
        {expression === 'sad' && (
          <>
            <Path d="M 32 38 L 44 42" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
            <Path d="M 68 38 L 56 42" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
          </>
        )}
        {(expression === 'excited' || expression === 'celebrating') && (
          <>
            <Path d="M 32 40 Q 38 36 44 40" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <Path d="M 56 40 Q 62 36 68 40" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </>
        )}

        {/* === EYES === */}
        {renderEye(40, 50, getLeftEye(), true)}
        {renderEye(60, 50, getRightEye(), false)}

        {/* === BLUSH MARKS - Red circles on cheeks === */}
        <Circle cx={28} cy={58} r={5} fill="#FF6B6B" opacity={0.7} />
        <Circle cx={72} cy={58} r={5} fill="#FF6B6B" opacity={0.7} />

        {/* === MOUTH === */}
        {renderMouth(getMouth())}

        {/* === LEGS === */}
        {/* Left leg */}
        <Path
          d="M 40 80 L 40 90"
          stroke="#FFD93D"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <Path
          d="M 40 80 L 40 90"
          stroke="#000000"
          strokeWidth="10"
          strokeLinecap="round"
          opacity={0.2}
        />
        
        {/* Right leg */}
        <Path
          d="M 60 80 L 60 90"
          stroke="#FFD93D"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <Path
          d="M 60 80 L 60 90"
          stroke="#000000"
          strokeWidth="10"
          strokeLinecap="round"
          opacity={0.2}
        />

        {/* === RED SNEAKERS === */}
        {/* Left sneaker */}
        <G>
          <Path
            d="M 30 88 L 30 98 Q 30 104 36 104 L 48 104 Q 52 104 52 98 L 52 92 Q 52 88 46 88 L 34 88 Q 30 88 30 92 Z"
            fill="#FF4D4D"
            stroke="#000000"
            strokeWidth="2.5"
          />
          {/* Sneaker sole */}
          <Rect x={30} y={102} width={22} height={4} rx={2} fill="#FFFFFF" stroke="#000000" strokeWidth="1.5" />
          {/* Sneaker detail */}
          <Path d="M 33 96 L 42 96" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </G>

        {/* Right sneaker */}
        <G>
          <Path
            d="M 48 92 L 48 98 Q 48 104 54 104 L 66 104 Q 70 104 70 98 L 70 88 Q 70 88 64 88 L 52 88 Q 48 88 48 92 Z"
            fill="#FF4D4D"
            stroke="#000000"
            strokeWidth="2.5"
          />
          {/* Sneaker sole */}
          <Rect x={48} y={102} width={22} height={4} rx={2} fill="#FFFFFF" stroke="#000000" strokeWidth="1.5" />
          {/* Sneaker detail */}
          <Path d="M 58 96 L 67 96" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </G>

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
