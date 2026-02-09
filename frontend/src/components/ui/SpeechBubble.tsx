import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  FadeIn,
  SlideInDown,
} from 'react-native-reanimated';
import { COLORS, SHADOWS } from '../../constants/colors';
import { TYPOGRAPHY, BORDER_RADIUS, SPACING } from '../../constants/typography';

interface SpeechBubbleProps {
  message: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

export const SpeechBubble: React.FC<SpeechBubbleProps> = ({
  message,
  position = 'top',
  delay = 300,
}) => {
  const getArrowStyle = () => {
    switch (position) {
      case 'top':
        return styles.arrowBottom;
      case 'bottom':
        return styles.arrowTop;
      case 'left':
        return styles.arrowRight;
      case 'right':
        return styles.arrowLeft;
      default:
        return styles.arrowBottom;
    }
  };

  return (
    <Animated.View
      entering={FadeIn.delay(delay).duration(300)}
      style={[styles.container, SHADOWS.medium]}
    >
      <Text style={styles.message}>{message}</Text>
      <View style={[styles.arrow, getArrowStyle()]} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    maxWidth: 280,
    position: 'relative',
  },
  message: {
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  arrow: {
    position: 'absolute',
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
  },
  arrowBottom: {
    bottom: -10,
    left: '50%',
    marginLeft: -10,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: COLORS.cardBackground,
  },
  arrowTop: {
    top: -10,
    left: '50%',
    marginLeft: -10,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: COLORS.cardBackground,
  },
  arrowLeft: {
    left: -10,
    top: '50%',
    marginTop: -10,
    borderTopWidth: 10,
    borderBottomWidth: 10,
    borderRightWidth: 10,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: COLORS.cardBackground,
  },
  arrowRight: {
    right: -10,
    top: '50%',
    marginTop: -10,
    borderTopWidth: 10,
    borderBottomWidth: 10,
    borderLeftWidth: 10,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: COLORS.cardBackground,
  },
});

export default SpeechBubble;
