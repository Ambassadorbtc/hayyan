import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
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
  variant?: 'character' | 'mascot';
}

const AnimatedView = Animated.createAnimatedComponent(View);

/**
 * Hayyan Mascot Component
 * Displays either the 3D character or the lightning bolt mascot
 */
export const Enezi: React.FC<EneziProps> = ({
  size = 150,
  expression = 'happy',
  animated = true,
  variant = 'character'
}) => {
  const bounce = useSharedValue(0);
  const rotate = useSharedValue(0);
  const scale = useSharedValue(1);

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

      // Scale pulse for excited expressions
      if (expression === 'excited' || expression === 'celebrating' || expression === 'cheering') {
        scale.value = withRepeat(
          withSequence(
            withTiming(1.05, { duration: 500 }),
            withTiming(1, { duration: 500 })
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
      { scale: scale.value },
    ],
  }));

  // Use character image for character variant, mascot for others
  const imageSource = variant === 'mascot' 
    ? require('../../../assets/images/mascot.png')
    : require('../../../assets/images/character.png');

  return (
    <AnimatedView style={[styles.container, animatedStyle, { width: size, height: size * 1.2 }]}>
      <Image
        source={imageSource}
        style={[styles.image, { width: size, height: size * 1.2 }]}
        resizeMode="contain"
      />
    </AnimatedView>
  );
};

// Alias for Hayyan mascot
export const Hayyan = Enezi;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    // Image styling
  },
});

export default Enezi;
