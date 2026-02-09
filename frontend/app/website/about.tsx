import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Platform, Image } from 'react-native';
import Animated, { FadeInDown, FadeInUp, FadeInLeft, FadeInRight } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../src/constants/colors';
import { WebHeader } from '../../src/components/web/WebHeader';
import { WebFooter } from '../../src/components/web/WebFooter';
import { AppStoreButtons } from '../../src/components/web/AppStoreButtons';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const isDesktop = Platform.OS === 'web' && width > 768;

export default function AboutPage() {
  const values = [
    {
      icon: 'heart',
      title: 'Customer First',
      description: 'Every decision we make starts with how it helps UK businesses save money.',
    },
    {
      icon: 'shield-checkmark',
      title: 'Transparency',
      description: 'No hidden fees, no surprises. We show you exactly what you\'ll pay.',
    },
    {
      icon: 'flash',
      title: 'Simplicity',
      description: 'Complex energy markets, made simple. Compare in minutes, not hours.',
    },
    {
      icon: 'leaf',
      title: 'Sustainability',
      description: 'We help businesses find greener energy options without the premium price.',
    },
  ];

  const team = [
    { name: 'Alex Thompson', role: 'CEO & Founder', emoji: '👨‍💼' },
    { name: 'Sarah Chen', role: 'CTO', emoji: '👩‍💻' },
    { name: 'James Williams', role: 'Head of Energy', emoji: '⚡' },
    { name: 'Priya Patel', role: 'Head of Design', emoji: '🎨' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <WebHeader />

      {/* Hero Section */}
      <LinearGradient colors={['#F5F3FF', '#EDE9FE', '#FFFFFF']} style={styles.heroSection}>
        <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.heroContent}>
          <Text style={styles.heroLabel}>ABOUT US</Text>
          <Text style={styles.heroTitle}>On a Mission to Cut UK Business Energy Costs</Text>
          <Text style={styles.heroSubtitle}>
            We believe every business deserves access to fair energy prices. That's why we built Hayyan.
          </Text>
        </Animated.View>
      </LinearGradient>

      {/* Story Section */}
      <View style={styles.storySection}>
        <Animated.View entering={FadeInLeft.duration(600)} style={styles.storyContent}>
          <Text style={styles.storyTitle}>Our Story</Text>
          <Text style={styles.storyText}>
            Hayyan was born out of frustration. As small business owners ourselves, we were tired of confusing energy tariffs, hidden fees, and hours spent comparing suppliers.
          </Text>
          <Text style={styles.storyText}>
            In 2024, we set out to build something better: an app that makes energy comparison as simple as it should be. No jargon, no hassle – just instant savings for UK businesses.
          </Text>
          <Text style={styles.storyText}>
            Today, we've helped over 10,000 businesses save more than £2.5 million on their energy bills. And we're just getting started.
          </Text>
        </Animated.View>
        <Animated.View entering={FadeInRight.delay(200).duration(600)} style={styles.storyImage}>
          <View style={styles.storyImagePlaceholder}>
            <Text style={styles.storyImageEmoji}>⚡🇬🇧</Text>
          </View>
        </Animated.View>
      </View>

      {/* Values Section */}
      <View style={styles.valuesSection}>
        <Animated.View entering={FadeInDown.duration(600)} style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>OUR VALUES</Text>
          <Text style={styles.sectionTitle}>What We Stand For</Text>
        </Animated.View>

        <View style={styles.valuesGrid}>
          {values.map((value, index) => (
            <Animated.View
              key={value.title}
              entering={FadeInUp.delay(200 + index * 100).duration(600)}
              style={styles.valueCard}
            >
              <View style={styles.valueIcon}>
                <Ionicons name={value.icon as any} size={28} color={COLORS.primary} />
              </View>
              <Text style={styles.valueTitle}>{value.title}</Text>
              <Text style={styles.valueDescription}>{value.description}</Text>
            </Animated.View>
          ))}
        </View>
      </View>

      {/* Team Section */}
      <View style={styles.teamSection}>
        <Animated.View entering={FadeInDown.duration(600)} style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>OUR TEAM</Text>
          <Text style={styles.sectionTitle}>Meet the People Behind Hayyan</Text>
        </Animated.View>

        <View style={styles.teamGrid}>
          {team.map((member, index) => (
            <Animated.View
              key={member.name}
              entering={FadeInUp.delay(200 + index * 100).duration(600)}
              style={styles.teamCard}
            >
              <View style={styles.teamAvatar}>
                <Text style={styles.teamEmoji}>{member.emoji}</Text>
              </View>
              <Text style={styles.teamName}>{member.name}</Text>
              <Text style={styles.teamRole}>{member.role}</Text>
            </Animated.View>
          ))}
        </View>
      </View>

      {/* CTA Section */}
      <View style={styles.ctaSection}>
        <LinearGradient colors={[COLORS.primary, '#9D85F6']} style={styles.ctaGradient}>
          <Animated.View entering={FadeInUp.duration(600)}>
            <Text style={styles.ctaTitle}>Join Thousands of UK Businesses</Text>
            <Text style={styles.ctaSubtitle}>
              Download Hayyan today and start your journey to lower energy bills.
            </Text>
            <AppStoreButtons delay={200} />
          </Animated.View>
        </LinearGradient>
      </View>

      <WebFooter />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  heroSection: {
    paddingTop: 140,
    paddingBottom: 80,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  heroContent: {
    alignItems: 'center',
    maxWidth: 700,
  },
  heroLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
    letterSpacing: 2,
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: isDesktop ? 48 : 32,
    fontWeight: '800',
    color: '#1A1A2E',
    textAlign: 'center',
    marginBottom: 20,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 28,
  },
  storySection: {
    paddingVertical: 80,
    paddingHorizontal: 24,
    flexDirection: isDesktop ? 'row' : 'column',
    maxWidth: 1200,
    marginHorizontal: 'auto',
    alignItems: 'center',
  },
  storyContent: {
    flex: 1,
    paddingRight: isDesktop ? 60 : 0,
  },
  storyTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1A1A2E',
    marginBottom: 24,
  },
  storyText: {
    fontSize: 18,
    color: '#6B7280',
    lineHeight: 30,
    marginBottom: 20,
  },
  storyImage: {
    marginTop: isDesktop ? 0 : 40,
  },
  storyImagePlaceholder: {
    width: 300,
    height: 300,
    backgroundColor: '#F5F3FF',
    borderRadius: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyImageEmoji: {
    fontSize: 80,
  },
  valuesSection: {
    paddingVertical: 80,
    paddingHorizontal: 24,
    backgroundColor: '#F9FAFB',
  },
  sectionHeader: {
    alignItems: 'center',
    marginBottom: 48,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
    letterSpacing: 2,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: isDesktop ? 36 : 28,
    fontWeight: '800',
    color: '#1A1A2E',
  },
  valuesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 24,
    maxWidth: 1000,
    marginHorizontal: 'auto',
  },
  valueCard: {
    width: isDesktop ? '22%' : '45%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  valueIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F0EBFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  valueTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 8,
    textAlign: 'center',
  },
  valueDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
  },
  teamSection: {
    paddingVertical: 80,
    paddingHorizontal: 24,
  },
  teamGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 24,
    maxWidth: 1000,
    marginHorizontal: 'auto',
  },
  teamCard: {
    width: isDesktop ? '22%' : '45%',
    alignItems: 'center',
  },
  teamAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F5F3FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  teamEmoji: {
    fontSize: 40,
  },
  teamName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 4,
  },
  teamRole: {
    fontSize: 14,
    color: '#6B7280',
  },
  ctaSection: {
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  ctaGradient: {
    borderRadius: 24,
    padding: 60,
    alignItems: 'center',
    maxWidth: 800,
    marginHorizontal: 'auto',
  },
  ctaTitle: {
    fontSize: isDesktop ? 36 : 28,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  ctaSubtitle: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginBottom: 32,
  },
});
