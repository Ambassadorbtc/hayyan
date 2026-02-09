import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { COLORS } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const isDesktop = Platform.OS === 'web' && width > 768;

export const WebHeader: React.FC = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: 'How It Works', href: '/website/how-it-works' },
    { label: 'About Us', href: '/website/about' },
    { label: 'Guides', href: '/website/guides' },
    { label: 'Contact', href: '/website/contact' },
  ];

  return (
    <Animated.View entering={FadeInDown.duration(600)} style={styles.header}>
      <View style={styles.headerContent}>
        {/* Logo */}
        <TouchableOpacity onPress={() => router.push('/website')} style={styles.logoContainer}>
          <Text style={styles.logoIcon}>⚡</Text>
          <Text style={styles.logoText}>Hayyan</Text>
        </TouchableOpacity>

        {/* Desktop Nav */}
        {isDesktop ? (
          <View style={styles.desktopNav}>
            {navLinks.map((link) => (
              <TouchableOpacity
                key={link.href}
                onPress={() => router.push(link.href as any)}
                style={styles.navLink}
              >
                <Text style={styles.navLinkText}>{link.label}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.ctaButton}>
              <Text style={styles.ctaButtonText}>Download App</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)} style={styles.menuButton}>
            <Ionicons name={menuOpen ? 'close' : 'menu'} size={28} color={COLORS.textPrimary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Mobile Menu */}
      {menuOpen && !isDesktop && (
        <Animated.View entering={FadeIn.duration(300)} style={styles.mobileMenu}>
          {navLinks.map((link) => (
            <TouchableOpacity
              key={link.href}
              onPress={() => {
                router.push(link.href as any);
                setMenuOpen(false);
              }}
              style={styles.mobileNavLink}
            >
              <Text style={styles.mobileNavLinkText}>{link.label}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.mobileCta}>
            <Text style={styles.mobileCtaText}>Download App</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    maxWidth: 1200,
    marginHorizontal: 'auto',
    width: '100%',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    fontSize: 28,
    marginRight: 8,
  },
  logoText: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.primary,
  },
  desktopNav: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 32,
  },
  navLink: {
    paddingVertical: 8,
  },
  navLinkText: {
    fontSize: 16,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  ctaButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 100,
  },
  ctaButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  menuButton: {
    padding: 8,
  },
  mobileMenu: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  mobileNavLink: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  mobileNavLinkText: {
    fontSize: 18,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  mobileCta: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 16,
    alignItems: 'center',
  },
  mobileCtaText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default WebHeader;
