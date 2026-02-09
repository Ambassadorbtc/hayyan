import React from 'react';
import { Text, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withSequence,
  withTiming,
  interpolateColor
} from 'react-native-reanimated';
import { COLORS, SHADOWS } from '../../constants/colors';
import { TYPOGRAPHY, BORDER_RADIUS, SPACING } from '../../constants/typography';
import { Ionicons } from '@expo/vector-icons';

interface AnimatedButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'coral';
  size?: 'small' | 'medium' | 'large';
  icon?: keyof typeof Ionicons.glyphMap;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  pulsing?: boolean;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  icon,
  iconPosition = 'left',
  disabled = false,
  fullWidth = false,
  style,
  textStyle,
  pulsing = false,
}) => {
  const scale = useSharedValue(1);
  const pulseOpacity = useSharedValue(1);

  React.useEffect(() => {
    if (pulsing && !disabled) {
      pulseOpacity.value = withSequence(
        withTiming(0.7, { duration: 800 }),
        withTiming(1, { duration: 800 })
      );
      const interval = setInterval(() => {
        pulseOpacity.value = withSequence(
          withTiming(0.7, { duration: 800 }),
          withTiming(1, { duration: 800 })
        );
      }, 1600);
      return () => clearInterval(interval);
    }
  }, [pulsing, disabled]);

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 10, stiffness: 400 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 10, stiffness: 400 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: pulseOpacity.value,
  }));

  const getBackgroundColor = () => {
    if (disabled) return COLORS.textMuted;
    switch (variant) {
      case 'primary':
        return COLORS.primaryGreen;
      case 'coral':
        return COLORS.accentCoral;
      case 'secondary':
        return COLORS.electricBlue;
      case 'outline':
        return 'transparent';
      default:
        return COLORS.primaryGreen;
    }
  };

  const getTextColor = () => {
    if (disabled) return COLORS.textLight;
    return variant === 'outline' ? COLORS.primaryGreen : COLORS.textLight;
  };

  const getSizeStyles = (): ViewStyle => {
    switch (size) {
      case 'small':
        return { paddingVertical: SPACING.sm, paddingHorizontal: SPACING.md };
      case 'large':
        return { paddingVertical: SPACING.lg, paddingHorizontal: SPACING.xl };
      default:
        return { paddingVertical: SPACING.md, paddingHorizontal: SPACING.lg };
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'small':
        return 16;
      case 'large':
        return 24;
      default:
        return 20;
    }
  };

  return (
    <AnimatedTouchable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      activeOpacity={0.9}
      style={[
        styles.button,
        getSizeStyles(),
        {
          backgroundColor: getBackgroundColor(),
          borderColor: variant === 'outline' ? COLORS.primaryGreen : 'transparent',
          borderWidth: variant === 'outline' ? 2 : 0,
          width: fullWidth ? '100%' : 'auto',
        },
        !disabled && SHADOWS.medium,
        animatedStyle,
        style,
      ]}
    >
      {icon && iconPosition === 'left' && (
        <Ionicons 
          name={icon} 
          size={getIconSize()} 
          color={getTextColor()} 
          style={styles.iconLeft} 
        />
      )}
      <Text style={[
        styles.text,
        size === 'small' ? TYPOGRAPHY.buttonSmall : TYPOGRAPHY.button,
        { color: getTextColor() },
        textStyle,
      ]}>
        {title}
      </Text>
      {icon && iconPosition === 'right' && (
        <Ionicons 
          name={icon} 
          size={getIconSize()} 
          color={getTextColor()} 
          style={styles.iconRight} 
        />
      )}
    </AnimatedTouchable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDER_RADIUS.lg,
  },
  text: {
    textAlign: 'center',
  },
  iconLeft: {
    marginRight: SPACING.sm,
  },
  iconRight: {
    marginLeft: SPACING.sm,
  },
});

export default AnimatedButton;
