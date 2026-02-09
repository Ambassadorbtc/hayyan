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
  Rect,
  Polygon
} from 'react-native-svg';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withSequence,
  withSpring,
  Easing,
  withDelay
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

export const Enezi: React.FC<EneziProps> = ({
  size = 150,
  expression = 'happy',
  animated = true
}) => {
  const bounce = useSharedValue(0);
  const rotate = useSharedValue(0);
  const scale = useSharedValue(1);
  const armWave = useSharedValue(0);

  useEffect(() => {
    if (animated) {
      // Bouncing animation - like Duolingo owl
      bounce.value = withRepeat(
        withSequence(
          withTiming(-6, { duration: 500, easing: Easing.out(Easing.quad) }),
          withTiming(0, { duration: 500, easing: Easing.in(Easing.quad) })
        ),
        -1,
        true
      );

      // Subtle body sway
      rotate.value = withRepeat(
        withSequence(
          withTiming(2, { duration: 1000, easing: Easing.inOut(Easing.sin) }),
          withTiming(-2, { duration: 1000, easing: Easing.inOut(Easing.sin) })
        ),
        -1,
        true
      );

      // Arm wave for waving/cheering expressions
      if (expression === 'waving' || expression === 'cheering' || expression === 'celebrating') {
        armWave.value = withRepeat(
          withSequence(
            withTiming(15, { duration: 300 }),
            withTiming(-15, { duration: 300 })
          ),
          -1,
          true
        );
      }
    }
  }, [animated, expression]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: bounce.value },
      { rotate: `${rotate.value}deg` },
      { scale: scale.value }
    ],
  }));

  // Eye expressions
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
        return 'look_up';
      case 'excited':
      case 'celebrating':
        return 'sparkle';
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
        return 'look_up';
      case 'excited':
      case 'celebrating':
        return 'sparkle';
      default:
        return 'normal';
    }
  };

  const getMouth = () => {
    switch (expression) {
      case 'excited':
      case 'cheering':
      case 'celebrating':
        return 'big_grin';
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
        return 'proud_smile';
      default:
        return 'smile';
    }
  };

  // Render eye based on type
  const renderEye = (cx: number, cy: number, type: string, isLeft: boolean) => {
    const eyeWhiteRx = 11;
    const eyeWhiteRy = 13;
    
    if (type === 'wink') {
      return (
        <G>
          {/* Closed eye arc */}
          <Path
            d={`M ${cx - 10} ${cy} Q ${cx} ${cy + 8} ${cx + 10} ${cy}`}
            stroke="#2D3436"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        </G>
      );
    }

    return (
      <G>
        {/* Eye white */}
        <Ellipse cx={cx} cy={cy} rx={eyeWhiteRx} ry={eyeWhiteRy} fill="white" />
        <Ellipse cx={cx} cy={cy} rx={eyeWhiteRx} ry={eyeWhiteRy} fill="none" stroke="#2D3436" strokeWidth="1.5" />
        
        {/* Pupil */}
        {type === 'wide' ? (
          <>
            <Circle cx={cx} cy={cy} r={7} fill="#2D3436" />
            <Circle cx={cx + 2} cy={cy - 2} r={3} fill="white" />
          </>
        ) : type === 'sad' ? (
          <>
            <Circle cx={cx} cy={cy + 3} r={5} fill="#2D3436" />
            <Circle cx={cx + 1.5} cy={cy + 1} r={2} fill="white" />
          </>
        ) : type === 'look_up' ? (
          <>
            <Circle cx={cx + (isLeft ? -2 : 2)} cy={cy - 4} r={5} fill="#2D3436" />
            <Circle cx={cx + (isLeft ? -0.5 : 3.5)} cy={cy - 6} r={2} fill="white" />
          </>
        ) : type === 'sparkle' ? (
          <>
            <Circle cx={cx} cy={cy} r={6} fill="#2D3436" />
            <Circle cx={cx + 2} cy={cy - 2} r={2.5} fill="white" />
            <Circle cx={cx - 2} cy={cy + 2} r={1} fill="white" />
          </>
        ) : (
          <>
            <Circle cx={cx} cy={cy} r={5} fill="#2D3436" />
            <Circle cx={cx + 1.5} cy={cy - 1.5} r={2} fill="white" />
          </>
        )}
      </G>
    );
  };

  // Render mouth based on type
  const renderMouth = (type: string) => {
    const mouthY = 72;
    
    switch (type) {
      case 'big_grin':
        return (
          <G>
            <Path
              d="M 35 68 Q 50 88 65 68"
              fill="#FF6B6B"
              stroke="#2D3436"
              strokeWidth="2"
            />
            <Path
              d="M 38 68 L 62 68"
              stroke="#2D3436"
              strokeWidth="2"
            />
            {/* Tongue */}
            <Ellipse cx={50} cy={78} rx={6} ry={4} fill="#FF8A8A" />
          </G>
        );
      case 'frown':
        return (
          <Path
            d="M 38 76 Q 50 66 62 76"
            stroke="#2D3436"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        );
      case 'o_shape':
        return (
          <Ellipse cx={50} cy={72} rx={6} ry={8} fill="#2D3436" />
        );
      case 'hmm':
        return (
          <Path
            d="M 42 72 L 58 74"
            stroke="#2D3436"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        );
      case 'smirk':
        return (
          <Path
            d="M 38 70 Q 52 78 62 68"
            stroke="#2D3436"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        );
      case 'proud_smile':
        return (
          <G>
            <Path
              d="M 36 68 Q 50 80 64 68"
              stroke="#2D3436"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          </G>
        );
      default: // smile
        return (
          <Path
            d="M 38 68 Q 50 80 62 68"
            stroke="#2D3436"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        );
    }
  };

  const showArmsUp = expression === 'waving' || expression === 'cheering' || expression === 'celebrating';
  const showPointing = expression === 'pointing';

  return (
    <AnimatedView style={[styles.container, animatedStyle, { width: size, height: size * 1.2 }]}>
      <Svg width={size} height={size * 1.2} viewBox="0 0 100 120">
        <Defs>
          {/* Main body gradient - bright electric blue */}
          <LinearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#00D4FF" />
            <Stop offset="50%" stopColor="#00B4E6" />
            <Stop offset="100%" stopColor="#0099CC" />
          </LinearGradient>
          
          {/* Lightning bolt gradient - bright yellow/gold */}
          <LinearGradient id="boltGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#FFE66D" />
            <Stop offset="50%" stopColor="#FFD93D" />
            <Stop offset="100%" stopColor="#F9C80E" />
          </LinearGradient>
          
          {/* Sneaker gradient - vibrant red */}
          <LinearGradient id="sneakerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#FF6B6B" />
            <Stop offset="100%" stopColor="#EE5A5A" />
          </LinearGradient>
          
          {/* Belly highlight */}
          <LinearGradient id="bellyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#B8F4FF" />
            <Stop offset="100%" stopColor="#8EEAFF" />
          </LinearGradient>
        </Defs>

        {/* === LIGHTNING BOLT HAIR === */}
        <G>
          {/* Main center bolt */}
          <Path
            d="M 50 2 L 56 16 L 62 10 L 55 26 L 50 18 L 45 26 L 38 10 L 44 16 Z"
            fill="url(#boltGrad)"
            stroke="#E6B800"
            strokeWidth="1"
          />
          {/* Left small bolt */}
          <Path
            d="M 32 18 L 36 12 L 38 20 L 34 16 Z"
            fill="url(#boltGrad)"
            stroke="#E6B800"
            strokeWidth="0.5"
          />
          {/* Right small bolt */}
          <Path
            d="M 68 18 L 64 12 L 62 20 L 66 16 Z"
            fill="url(#boltGrad)"
            stroke="#E6B800"
            strokeWidth="0.5"
          />
        </G>

        {/* === MAIN BODY === */}
        {/* Body - round cute shape like Duo owl */}
        <Ellipse
          cx={50}
          cy={55}
          rx={30}
          ry={35}
          fill="url(#bodyGrad)"
          stroke="#0088AA"
          strokeWidth="2"
        />
        
        {/* Belly - lighter area */}
        <Ellipse
          cx={50}
          cy={60}
          rx={20}
          ry={24}
          fill="url(#bellyGrad)"
        />

        {/* === ARMS === */}
        {showArmsUp ? (
          <>
            {/* Left arm raised */}
            <Path
              d="M 22 50 Q 8 35 12 22"
              stroke="url(#bodyGrad)"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
            />
            <Circle cx={12} cy={22} r={6} fill="url(#bodyGrad)" stroke="#0088AA" strokeWidth="1" />
            
            {/* Right arm raised */}
            <Path
              d="M 78 50 Q 92 35 88 22"
              stroke="url(#bodyGrad)"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
            />
            <Circle cx={88} cy={22} r={6} fill="url(#bodyGrad)" stroke="#0088AA" strokeWidth="1" />
          </>
        ) : showPointing ? (
          <>
            {/* Left arm normal */}
            <Path
              d="M 22 55 Q 10 55 8 50"
              stroke="url(#bodyGrad)"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
            />
            <Circle cx={8} cy={50} r={5} fill="url(#bodyGrad)" stroke="#0088AA" strokeWidth="1" />
            
            {/* Right arm pointing */}
            <Path
              d="M 78 50 Q 95 45 100 40"
              stroke="url(#bodyGrad)"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
            />
            <Circle cx={100} cy={40} r={5} fill="url(#bodyGrad)" stroke="#0088AA" strokeWidth="1" />
          </>
        ) : (
          <>
            {/* Left arm at side */}
            <Path
              d="M 22 55 Q 10 58 8 65"
              stroke="url(#bodyGrad)"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
            />
            <Circle cx={8} cy={65} r={5} fill="url(#bodyGrad)" stroke="#0088AA" strokeWidth="1" />
            
            {/* Right arm at side */}
            <Path
              d="M 78 55 Q 90 58 92 65"
              stroke="url(#bodyGrad)"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
            />
            <Circle cx={92} cy={65} r={5} fill="url(#bodyGrad)" stroke="#0088AA" strokeWidth="1" />
          </>
        )}

        {/* === FACE === */}
        {/* Eyebrows based on expression */}
        {expression === 'sad' && (
          <>
            <Path d="M 30 38 Q 39 42 46 40" stroke="#2D3436" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <Path d="M 70 38 Q 61 42 54 40" stroke="#2D3436" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </>
        )}
        {(expression === 'excited' || expression === 'celebrating') && (
          <>
            <Path d="M 30 42 Q 38 36 46 40" stroke="#2D3436" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <Path d="M 70 42 Q 62 36 54 40" stroke="#2D3436" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </>
        )}
        {expression === 'thinking' && (
          <>
            <Path d="M 30 40 L 46 38" stroke="#2D3436" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <Path d="M 70 38 Q 62 40 54 40" stroke="#2D3436" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </>
        )}

        {/* Eyes */}
        {renderEye(39, 52, getLeftEye(), true)}
        {renderEye(61, 52, getRightEye(), false)}

        {/* Blush marks */}
        <Ellipse cx={26} cy={60} rx={6} ry={3} fill="#FFB6C1" opacity={0.6} />
        <Ellipse cx={74} cy={60} rx={6} ry={3} fill="#FFB6C1" opacity={0.6} />

        {/* Mouth */}
        {renderMouth(getMouth())}

        {/* === LEGS & SNEAKERS === */}
        {/* Left leg */}
        <Rect x={35} y={86} width={10} height={12} rx={3} fill="url(#bodyGrad)" />
        {/* Left sneaker */}
        <G>
          <Path
            d="M 32 96 L 32 104 Q 32 108 36 108 L 48 108 Q 52 108 52 104 L 52 96 Q 52 94 48 94 L 36 94 Q 32 94 32 96 Z"
            fill="url(#sneakerGrad)"
            stroke="#CC4444"
            strokeWidth="1"
          />
          {/* Sneaker details - white stripes */}
          <Path d="M 34 100 L 42 100" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <Path d="M 34 104 L 42 104" stroke="white" strokeWidth="2" strokeLinecap="round" />
          {/* Sole */}
          <Rect x={32} y={106} width={20} height={3} rx={1} fill="#FFFFFF" />
        </G>

        {/* Right leg */}
        <Rect x={55} y={86} width={10} height={12} rx={3} fill="url(#bodyGrad)" />
        {/* Right sneaker */}
        <G>
          <Path
            d="M 48 96 L 48 104 Q 48 108 52 108 L 64 108 Q 68 108 68 104 L 68 96 Q 68 94 64 94 L 52 94 Q 48 94 48 96 Z"
            fill="url(#sneakerGrad)"
            stroke="#CC4444"
            strokeWidth="1"
          />
          {/* Sneaker details - white stripes */}
          <Path d="M 58 100 L 66 100" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <Path d="M 58 104 L 66 104" stroke="white" strokeWidth="2" strokeLinecap="round" />
          {/* Sole */}
          <Rect x={48} y={106} width={20} height={3} rx={1} fill="#FFFFFF" />
        </G>

        {/* === SPARKLES for excited/celebrating === */}
        {(expression === 'excited' || expression === 'celebrating' || expression === 'cheering') && (
          <>
            <Path d="M 10 30 L 12 35 L 10 40 L 8 35 Z" fill="#FFD93D" />
            <Path d="M 90 30 L 92 35 L 90 40 L 88 35 Z" fill="#FFD93D" />
            <Circle cx={5} cy={50} r={2} fill="#FFD93D" />
            <Circle cx={95} cy={50} r={2} fill="#FFD93D" />
            <Path d="M 15 15 L 17 18 L 15 21 L 13 18 Z" fill="#FFD93D" />
            <Path d="M 85 15 L 87 18 L 85 21 L 83 18 Z" fill="#FFD93D" />
          </>
        )}

        {/* Small lightning bolt on belly - like a logo */}
        <Path
          d="M 50 55 L 53 60 L 51 60 L 54 67 L 47 62 L 49 62 L 46 55 Z"
          fill="url(#boltGrad)"
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
