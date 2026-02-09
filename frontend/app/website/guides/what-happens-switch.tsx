import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Platform, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../../src/constants/colors';
import { WebHeader } from '../../../src/components/web/WebHeader';
import { WebFooter } from '../../../src/components/web/WebFooter';
import { AppStoreButtons } from '../../../src/components/web/AppStoreButtons';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const isDesktop = Platform.OS === 'web' && width > 768;

export default function WhatHappensSwitchGuide() {
  const router = useRouter();

  const timeline = [
    { day: 'Day 1', title: 'You Sign Up', description: 'You choose your new supplier through Hayyan and accept their terms. Your new supplier receives your details.' },
    { day: 'Day 2-3', title: 'Supplier Contact', description: 'Your new supplier contacts your current supplier to initiate the transfer. They verify your meter details and account information.' },
    { day: 'Day 4-7', title: 'Cooling Off Period', description: 'You have 14 days to change your mind (cooling off period). During this time, you can cancel without any fees.' },
    { day: 'Day 7-14', title: 'Transfer Processing', description: 'Behind the scenes, suppliers coordinate the transfer. Your current supplier prepares your final bill.' },
    { day: 'Day 14-21', title: 'Switch Day', description: 'Your supply officially transfers. Take a meter reading on this day. Your old supplier sends your final bill.' },
    { day: 'Day 21+', title: 'New Account Active', description: 'You\'re now with your new supplier. You\'ll receive a welcome pack and first bill. Set up Direct Debit for easy payments.' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <WebHeader />

      <LinearGradient colors={['#F5F3FF', '#EDE9FE', '#FFFFFF']} style={styles.heroSection}>
        <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.heroContent}>
          <TouchableOpacity onPress={() => router.push('/website/guides')} style={styles.backLink}>
            <Ionicons name="arrow-back" size={20} color={COLORS.primary} />
            <Text style={styles.backLinkText}>Back to Guides</Text>
          </TouchableOpacity>
          <Text style={styles.heroLabel}>SWITCHING GUIDES</Text>
          <Text style={styles.heroTitle}>What Happens When You Switch Energy Suppliers?</Text>
          <View style={styles.metaInfo}>
            <Text style={styles.metaText}>4 min read</Text>
            <Text style={styles.metaDot}>•</Text>
            <Text style={styles.metaText}>Updated January 2025</Text>
          </View>
        </Animated.View>
      </LinearGradient>

      <View style={styles.contentSection}>
        <View style={styles.contentContainer}>
          <Animated.Text entering={FadeInUp.delay(200).duration(600)} style={styles.intro}>
            Many business owners worry about what happens during an energy switch. Will there be disruption? What if something goes wrong? This guide walks you through exactly what happens from the moment you sign up to your first bill with your new supplier.
          </Animated.Text>

          <Animated.View entering={FadeInUp.delay(300).duration(600)} style={styles.keyPoint}>
            <Ionicons name="information-circle" size={24} color={COLORS.primary} />
            <Text style={styles.keyPointText}>
              <Text style={styles.keyPointBold}>Key fact:</Text> Your physical energy supply never changes. The same wires and pipes deliver your energy—only who you pay changes.
            </Text>
          </Animated.View>

          <Text style={styles.sectionTitle}>The Switching Timeline</Text>
          
          <View style={styles.timeline}>
            {timeline.map((item, index) => (
              <Animated.View
                key={item.day}
                entering={FadeInUp.delay(350 + index * 50).duration(500)}
                style={styles.timelineItem}
              >
                <View style={styles.timelineDot}>
                  <View style={styles.timelineDotInner} />
                </View>
                {index < timeline.length - 1 && <View style={styles.timelineLine} />}
                <View style={styles.timelineContent}>
                  <Text style={styles.timelineDay}>{item.day}</Text>
                  <Text style={styles.timelineTitle}>{item.title}</Text>
                  <Text style={styles.timelineDesc}>{item.description}</Text>
                </View>
              </Animated.View>
            ))}
          </View>

          <Animated.View entering={FadeInUp.delay(700).duration(600)} style={styles.guaranteeBox}>
            <Text style={styles.guaranteeTitle}>The Energy Switch Guarantee</Text>
            <Text style={styles.guaranteeText}>
              All UK energy suppliers follow the Energy Switch Guarantee, which promises:
            </Text>
            <View style={styles.guaranteeList}>
              <View style={styles.guaranteeItem}>
                <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                <Text style={styles.guaranteeItemText}>Your switch will be completed within 21 days</Text>
              </View>
              <View style={styles.guaranteeItem}>
                <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                <Text style={styles.guaranteeItemText}>You can cancel within 14 days without charge</Text>
              </View>
              <View style={styles.guaranteeItem}>
                <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                <Text style={styles.guaranteeItemText}>Your supply will never be interrupted</Text>
              </View>
              <View style={styles.guaranteeItem}>
                <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                <Text style={styles.guaranteeItemText}>Any problems will be fixed quickly</Text>
              </View>
            </View>
          </Animated.View>
        </View>
      </View>

      <View style={styles.ctaSection}>
        <LinearGradient colors={[COLORS.primary, '#9D85F6']} style={styles.ctaGradient}>
          <Text style={styles.ctaTitle}>Switch with Confidence</Text>
          <Text style={styles.ctaSubtitle}>Hayyan makes switching simple and stress-free</Text>
          <AppStoreButtons delay={200} />
        </LinearGradient>
      </View>

      <WebFooter />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  heroSection: { paddingTop: 140, paddingBottom: 60, paddingHorizontal: 24 },
  heroContent: { maxWidth: 800, marginHorizontal: 'auto' },
  backLink: { flexDirection: 'row', alignItems: 'center', marginBottom: 24, gap: 8 },
  backLinkText: { fontSize: 16, color: COLORS.primary, fontWeight: '500' },
  heroLabel: { fontSize: 12, fontWeight: '700', color: COLORS.primary, letterSpacing: 2, marginBottom: 16 },
  heroTitle: { fontSize: isDesktop ? 48 : 32, fontWeight: '800', color: '#1A1A2E', marginBottom: 20, lineHeight: isDesktop ? 56 : 40 },
  metaInfo: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  metaText: { fontSize: 14, color: '#6B7280' },
  metaDot: { fontSize: 14, color: '#6B7280' },
  contentSection: { paddingVertical: 60, paddingHorizontal: 24 },
  contentContainer: { maxWidth: 800, marginHorizontal: 'auto' },
  intro: { fontSize: 18, color: '#374151', lineHeight: 30, marginBottom: 32 },
  keyPoint: { flexDirection: 'row', backgroundColor: '#F0EBFF', borderRadius: 12, padding: 16, gap: 12, marginBottom: 40, alignItems: 'flex-start' },
  keyPointText: { flex: 1, fontSize: 16, color: '#374151', lineHeight: 24 },
  keyPointBold: { fontWeight: '700' },
  sectionTitle: { fontSize: 28, fontWeight: '700', color: '#1A1A2E', marginBottom: 24 },
  timeline: { marginBottom: 40 },
  timelineItem: { flexDirection: 'row', marginBottom: 0, position: 'relative' },
  timelineDot: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#F0EBFF', justifyContent: 'center', alignItems: 'center', marginRight: 16, marginTop: 4, zIndex: 1 },
  timelineDotInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.primary },
  timelineLine: { position: 'absolute', left: 9, top: 24, width: 2, height: '100%', backgroundColor: '#E5E7EB' },
  timelineContent: { flex: 1, paddingBottom: 32 },
  timelineDay: { fontSize: 12, fontWeight: '700', color: COLORS.primary, marginBottom: 4 },
  timelineTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A2E', marginBottom: 8 },
  timelineDesc: { fontSize: 14, color: '#6B7280', lineHeight: 22 },
  guaranteeBox: { backgroundColor: '#ECFDF5', borderRadius: 16, padding: 24 },
  guaranteeTitle: { fontSize: 20, fontWeight: '700', color: '#065F46', marginBottom: 12 },
  guaranteeText: { fontSize: 16, color: '#065F46', marginBottom: 16 },
  guaranteeList: { gap: 12 },
  guaranteeItem: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  guaranteeItemText: { fontSize: 14, color: '#065F46' },
  ctaSection: { paddingHorizontal: 24, paddingVertical: 40 },
  ctaGradient: { borderRadius: 24, padding: 60, alignItems: 'center', maxWidth: 800, marginHorizontal: 'auto' },
  ctaTitle: { fontSize: isDesktop ? 36 : 28, fontWeight: '800', color: '#FFFFFF', textAlign: 'center', marginBottom: 16 },
  ctaSubtitle: { fontSize: 18, color: 'rgba(255,255,255,0.9)', textAlign: 'center', marginBottom: 32 },
});
