import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
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

interface AnimatedInputProps extends TextInputProps {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  error?: string;
  helperText?: string;
}

const AnimatedView = Animated.createAnimatedComponent(View);

export const AnimatedInput: React.FC<AnimatedInputProps> = ({
  label,
  icon,
  error,
  helperText,
  value,
  onFocus,
  onBlur,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const focusProgress = useSharedValue(0);
  const scale = useSharedValue(1);
  const labelPosition = useSharedValue(value ? 1 : 0);

  React.useEffect(() => {
    if (value) {
      labelPosition.value = withTiming(1, { duration: 200 });
    } else if (!isFocused) {
      labelPosition.value = withTiming(0, { duration: 200 });
    }
  }, [value]);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    focusProgress.value = withTiming(1, { duration: 200 });
    scale.value = withSpring(1.01, { damping: 15, stiffness: 400 });
    labelPosition.value = withTiming(1, { duration: 200 });
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    focusProgress.value = withTiming(0, { duration: 200 });
    scale.value = withSpring(1, { damping: 15, stiffness: 400 });
    if (!value) {
      labelPosition.value = withTiming(0, { duration: 200 });
    }
    onBlur?.(e);
  };

  const containerStyle = useAnimatedStyle(() => {
    const borderColor = error
      ? COLORS.error
      : interpolateColor(
          focusProgress.value,
          [0, 1],
          [COLORS.cardBorder, COLORS.primary]
        );

    return {
      borderColor,
      transform: [{ scale: scale.value }],
    };
  });

  const labelStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: labelPosition.value * -12 },
      { scale: 1 - labelPosition.value * 0.1 },
    ],
    opacity: labelPosition.value === 0 ? 1 : 0.8,
  }));

  return (
    <View style={styles.wrapper}>
      <AnimatedView style={[styles.container, containerStyle]}>
        {icon && (
          <Ionicons
            name={icon}
            size={22}
            color={isFocused ? COLORS.primary : COLORS.textSecondary}
            style={styles.icon}
          />
        )}
        <View style={styles.inputWrapper}>
          {/* Floating label - only show when not focused and no value */}
          {!value && !isFocused && (
            <Text style={styles.placeholderLabel}>{label}</Text>
          )}
          <TextInput
            style={styles.input}
            value={value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={isFocused ? label : ''}
            placeholderTextColor={COLORS.textMuted}
            {...props}
          />
        </View>
      </AnimatedView>
      {(error || helperText) && (
        <Text style={[styles.helperText, error && styles.errorText]}>
          {error || helperText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: SPACING.md,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1.5,
    borderColor: COLORS.cardBorder,
    paddingHorizontal: SPACING.md,
    minHeight: 60,
  },
  icon: {
    marginRight: SPACING.sm,
  },
  inputWrapper: {
    flex: 1,
    justifyContent: 'center',
    height: 44,
  },
  placeholderLabel: {
    position: 'absolute',
    ...TYPOGRAPHY.body,
    color: COLORS.textMuted,
  },
  input: {
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
    flex: 1,
    height: 44,
    paddingVertical: 0,
  },
  helperText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
    marginLeft: SPACING.sm,
  },
  errorText: {
    color: COLORS.error,
  },
});

export default AnimatedInput;
