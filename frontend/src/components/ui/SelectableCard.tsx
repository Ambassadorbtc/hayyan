import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';
import { COLORS, SHADOWS } from '../../constants/colors';
import { TYPOGRAPHY, BORDER_RADIUS, SPACING } from '../../constants/typography';
import { Ionicons } from '@expo/vector-icons';

interface SelectableCardProps {
  title: string;
  subtitle?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  selected: boolean;
  onPress: () => void;
  variant?: 'checkbox' | 'radio';
  disabled?: boolean;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export const SelectableCard: React.FC<SelectableCardProps> = ({
  title,
  subtitle,
  icon,
  selected,
  onPress,
  variant = 'checkbox',
  disabled = false,
}) => {
  const scale = useSharedValue(1);
  const borderColorProgress = useSharedValue(selected ? 1 : 0);

  React.useEffect(() => {
    borderColorProgress.value = withTiming(selected ? 1 : 0, { duration: 200 });
  }, [selected]);

  const handlePressIn = () => {
    scale.value = withSpring(0.97, { damping: 15, stiffness: 400 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 400 });
  };

  const animatedStyle = useAnimatedStyle(() => {
    const borderColor = interpolateColor(
      borderColorProgress.value,
      [0, 1],
      [COLORS.cardBorder, COLORS.primaryGreen]
    );
    const backgroundColor = interpolateColor(
      borderColorProgress.value,
      [0, 1],
      [COLORS.cardBackground, '#E8F8F3']
    );

    return {
      transform: [{ scale: scale.value }],
      borderColor,
      backgroundColor,
    };
  });

  return (
    <AnimatedTouchable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      activeOpacity={0.9}
      style={[styles.card, SHADOWS.small, animatedStyle]}
    >
      <View style={styles.leftContent}>
        {icon && (
          <View style={[styles.iconContainer, selected && styles.iconContainerSelected]}>
            <Ionicons 
              name={icon} 
              size={24} 
              color={selected ? COLORS.textLight : COLORS.primaryGreen} 
            />
          </View>
        )}
        <View style={styles.textContainer}>
          <Text style={[styles.title, selected && styles.titleSelected]}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>
      
      <View style={[styles.indicator, variant === 'radio' && styles.indicatorRadio]}>
        {selected && (
          <Animated.View style={styles.indicatorInner}>
            {variant === 'checkbox' ? (
              <Ionicons name="checkmark" size={16} color={COLORS.textLight} />
            ) : (
              <View style={styles.radioDot} />
            )}
          </Animated.View>
        )}
      </View>
    </AnimatedTouchable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 2,
    marginBottom: SPACING.sm,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: '#E8F8F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  iconContainerSelected: {
    backgroundColor: COLORS.primaryGreen,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  titleSelected: {
    color: COLORS.primaryGreen,
  },
  subtitle: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  indicator: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: COLORS.cardBorder,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SPACING.md,
  },
  indicatorRadio: {
    borderRadius: 12,
  },
  indicatorInner: {
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: COLORS.primaryGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.textLight,
  },
});

export default SelectableCard;
