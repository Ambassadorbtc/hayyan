import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

interface AppStoreButtonsProps {
  variant?: 'dark' | 'light';
  size?: 'small' | 'large';
  delay?: number;
}

export const AppStoreButtons: React.FC<AppStoreButtonsProps> = ({
  variant = 'dark',
  size = 'large',
  delay = 0,
}) => {
  const isDark = variant === 'dark';
  const isLarge = size === 'large';

  const handleAppStore = () => {
    Linking.openURL('https://apps.apple.com/gb/app/hayyan');
  };

  const handlePlayStore = () => {
    Linking.openURL('https://play.google.com/store/apps/details?id=com.hayyan.app');
  };

  return (
    <Animated.View
      entering={FadeInUp.delay(delay).duration(600)}
      style={styles.container}
    >
      <TouchableOpacity
        style={[
          styles.button,
          isDark ? styles.buttonDark : styles.buttonLight,
          isLarge ? styles.buttonLarge : styles.buttonSmall,
        ]}
        onPress={handleAppStore}
      >
        <Ionicons
          name="logo-apple"
          size={isLarge ? 28 : 22}
          color={isDark ? '#FFFFFF' : '#000000'}
        />
        <View>
          <Text style={[styles.label, isDark ? styles.labelDark : styles.labelLight]}>
            Download on the
          </Text>
          <Text
            style={[
              styles.storeName,
              isDark ? styles.storeNameDark : styles.storeNameLight,
              isLarge ? styles.storeNameLarge : styles.storeNameSmall,
            ]}
          >
            App Store
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          isDark ? styles.buttonDark : styles.buttonLight,
          isLarge ? styles.buttonLarge : styles.buttonSmall,
        ]}
        onPress={handlePlayStore}
      >
        <Ionicons
          name="logo-google-playstore"
          size={isLarge ? 28 : 22}
          color={isDark ? '#FFFFFF' : '#000000'}
        />
        <View>
          <Text style={[styles.label, isDark ? styles.labelDark : styles.labelLight]}>
            Get it on
          </Text>
          <Text
            style={[
              styles.storeName,
              isDark ? styles.storeNameDark : styles.storeNameLight,
              isLarge ? styles.storeNameLarge : styles.storeNameSmall,
            ]}
          >
            Google Play
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    gap: 12,
  },
  buttonDark: {
    backgroundColor: '#000000',
  },
  buttonLight: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  buttonLarge: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  buttonSmall: {
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  label: {
    fontSize: 10,
  },
  labelDark: {
    color: '#9CA3AF',
  },
  labelLight: {
    color: '#6B7280',
  },
  storeName: {
    fontWeight: '600',
  },
  storeNameDark: {
    color: '#FFFFFF',
  },
  storeNameLight: {
    color: '#000000',
  },
  storeNameLarge: {
    fontSize: 18,
  },
  storeNameSmall: {
    fontSize: 14,
  },
});

export default AppStoreButtons;
