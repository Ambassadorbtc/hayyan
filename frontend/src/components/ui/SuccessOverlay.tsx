import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Modal } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
  withDelay,
  runOnJS,
  Easing,
} from 'react-native-reanimated';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY, SPACING } from '../../constants/typography';
import { Enezi } from '../mascot/Enezi';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

interface ConfettiPiece {
  id: number;
  x: number;
  delay: number;
  color: string;
  size: number;
  rotation: number;
}

interface SuccessOverlayProps {
  visible: boolean;
  onDismiss: () => void;
  title?: string;
  message?: string;
  eneziExpression?: 'happy' | 'excited' | 'cheering' | 'celebrating';
  autoHideDuration?: number;
}

const ConfettiParticle: React.FC<{ piece: ConfettiPiece }> = ({ piece }) => {
  const translateY = useSharedValue(-50);
  const translateX = useSharedValue(piece.x);
  const rotate = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    translateY.value = withDelay(
      piece.delay,
      withTiming(height + 100, { duration: 3000, easing: Easing.linear })
    );
    translateX.value = withDelay(
      piece.delay,
      withSequence(
        withTiming(piece.x + 30, { duration: 500 }),
        withTiming(piece.x - 30, { duration: 500 }),
        withTiming(piece.x + 20, { duration: 500 }),
        withTiming(piece.x - 20, { duration: 500 }),
        withTiming(piece.x, { duration: 1000 })
      )
    );
    rotate.value = withDelay(
      piece.delay,
      withTiming(piece.rotation + 720, { duration: 3000 })
    );
    opacity.value = withDelay(
      piece.delay + 2000,
      withTiming(0, { duration: 1000 })
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { translateX: translateX.value },
      { rotate: `${rotate.value}deg` },
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.confetti,
        {
          width: piece.size,
          height: piece.size,
          backgroundColor: piece.color,
          borderRadius: piece.size / 4,
        },
        animatedStyle,
      ]}
    />
  );
};

export const SuccessOverlay: React.FC<SuccessOverlayProps> = ({
  visible,
  onDismiss,
  title = 'Awesome!',
  message = 'You\'re doing great!',
  eneziExpression = 'celebrating',
  autoHideDuration = 3000,
}) => {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const overlayOpacity = useSharedValue(0);
  const contentScale = useSharedValue(0.5);
  const eneziTranslateY = useSharedValue(100);
  const checkmarkScale = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      // Generate confetti
      const colors = [COLORS.primaryGreen, COLORS.accentCoral, COLORS.electricBlue, COLORS.highlightYellow, '#FF69B4', '#9B59B6'];
      const pieces: ConfettiPiece[] = [];
      for (let i = 0; i < 50; i++) {
        pieces.push({
          id: i,
          x: Math.random() * width - width / 2,
          delay: Math.random() * 500,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 10 + 5,
          rotation: Math.random() * 360,
        });
      }
      setConfetti(pieces);

      // Animate in
      overlayOpacity.value = withTiming(1, { duration: 300 });
      contentScale.value = withSpring(1, { damping: 12, stiffness: 200 });
      eneziTranslateY.value = withSpring(0, { damping: 15, stiffness: 150 });
      checkmarkScale.value = withDelay(
        400,
        withSpring(1, { damping: 10, stiffness: 300 })
      );

      // Auto dismiss
      const timer = setTimeout(() => {
        handleDismiss();
      }, autoHideDuration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const handleDismiss = () => {
    overlayOpacity.value = withTiming(0, { duration: 300 }, (finished) => {
      if (finished) {
        runOnJS(onDismiss)();
      }
    });
    contentScale.value = withTiming(0.5, { duration: 300 });
    eneziTranslateY.value = withTiming(100, { duration: 300 });
  };

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }));

  const contentStyle = useAnimatedStyle(() => ({
    transform: [{ scale: contentScale.value }],
  }));

  const eneziStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: eneziTranslateY.value }],
  }));

  const checkmarkStyle = useAnimatedStyle(() => ({
    transform: [{ scale: checkmarkScale.value }],
  }));

  if (!visible) return null;

  return (
    <Modal transparent visible={visible} animationType="none">
      <Animated.View style={[styles.overlay, overlayStyle]}>
        {/* Confetti */}
        <View style={styles.confettiContainer}>
          {confetti.map((piece) => (
            <ConfettiParticle key={piece.id} piece={piece} />
          ))}
        </View>

        <Animated.View style={[styles.content, contentStyle]}>
          {/* Checkmark */}
          <Animated.View style={[styles.checkmarkContainer, checkmarkStyle]}>
            <View style={styles.checkmarkCircle}>
              <Ionicons name="checkmark" size={48} color={COLORS.textLight} />
            </View>
          </Animated.View>

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          {/* Enezi mascot */}
          <Animated.View style={[styles.eneziContainer, eneziStyle]}>
            <Enezi size={120} expression={eneziExpression} animated />
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 166, 118, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confettiContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    overflow: 'hidden',
  },
  confetti: {
    position: 'absolute',
    top: 0,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
  checkmarkContainer: {
    marginBottom: SPACING.lg,
  },
  checkmarkCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...TYPOGRAPHY.h1,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  message: {
    ...TYPOGRAPHY.bodyLarge,
    color: COLORS.textLight,
    textAlign: 'center',
    opacity: 0.9,
  },
  eneziContainer: {
    marginTop: SPACING.xl,
  },
});

export default SuccessOverlay;
