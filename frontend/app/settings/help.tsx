import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp, FadeIn } from 'react-native-reanimated';
import { COLORS, SHADOWS } from '../../src/constants/colors';
import { TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../src/constants/typography';
import { Enezi } from '../../src/components/mascot/Enezi';
import { SpeechBubble } from '../../src/components/ui/SpeechBubble';
import { Ionicons } from '@expo/vector-icons';

const FAQ_DATA = [
  {
    question: 'How does Enerzo help me save money?',
    answer: 'Enerzo compares energy deals from major UK suppliers to find you the best rates. We analyze your current usage and show you potential savings with different providers. On average, UK businesses save £450+ per year by switching!',
  },
  {
    question: 'Is switching suppliers safe?',
    answer: 'Absolutely! Switching is regulated by Ofgem, the UK energy regulator. Your supply will never be interrupted during the switch, which typically takes 2-3 weeks. We handle all the paperwork for you.',
  },
  {
    question: 'What information do I need to get a quote?',
    answer: 'You\'ll need your current supplier name, approximate monthly bill amount, and your business postcode. The more accurate your information, the better we can estimate your potential savings.',
  },
  {
    question: 'Are there any fees for using Enerzo?',
    answer: 'Enerzo is completely free to use! We earn a small commission from suppliers when you switch through us, but this never affects the prices you see. You\'ll always get the same rate as going direct.',
  },
  {
    question: 'How long does it take to switch?',
    answer: 'The switching process typically takes 2-3 weeks from when you confirm your new deal. During this time, your energy supply continues uninterrupted with your current supplier.',
  },
  {
    question: 'Can I switch if I\'m in a contract?',
    answer: 'You can still compare deals while in a contract! We\'ll show you when your contract ends and help you find the best deal for when you\'re free to switch. Some suppliers may charge exit fees, which we\'ll factor into your savings calculation.',
  },
  {
    question: 'What types of businesses can use Enerzo?',
    answer: 'Enerzo is designed for all UK independent businesses - from cafes and salons to mechanics and timber merchants. If you have a business energy bill, we can help you save!',
  },
  {
    question: 'How do I contact support?',
    answer: 'You can email us at support@enerzo.com or use the contact form below. Our UK-based team typically responds within 24 hours. For urgent queries, call us on 0800 123 4567.',
  },
];

export default function HelpScreen() {
  const router = useRouter();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  const filteredFAQs = FAQ_DATA.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmitContact = () => {
    if (contactName && contactEmail && contactMessage) {
      alert('Thanks for your message! We\'ll get back to you within 24 hours.');
      setContactName('');
      setContactEmail('');
      setContactMessage('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View entering={FadeIn.duration(400)} style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Help & FAQs</Text>
          <View style={styles.placeholder} />
        </Animated.View>

        {/* Enezi */}
        <Animated.View entering={FadeIn.delay(200).duration(500)} style={styles.eneziSection}>
          <SpeechBubble
            message="Got questions? I've got answers! 🤓"
            position="bottom"
            delay={300}
          />
          <Enezi size={100} expression="happy" animated />
        </Animated.View>

        {/* Search */}
        <Animated.View entering={FadeInUp.delay(300).duration(500)} style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={20} color={COLORS.textMuted} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search FAQs..."
              placeholderTextColor={COLORS.textMuted}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color={COLORS.textMuted} />
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>

        {/* FAQs */}
        <Animated.View entering={FadeInUp.delay(400).duration(500)} style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          <View style={styles.faqContainer}>
            {filteredFAQs.map((faq, index) => (
              <TouchableOpacity
                key={index}
                style={styles.faqItem}
                onPress={() => setExpandedIndex(expandedIndex === index ? null : index)}
                activeOpacity={0.7}
              >
                <View style={styles.faqHeader}>
                  <Text style={styles.faqQuestion}>{faq.question}</Text>
                  <Ionicons
                    name={expandedIndex === index ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color={COLORS.primaryGreen}
                  />
                </View>
                {expandedIndex === index && (
                  <Text style={styles.faqAnswer}>{faq.answer}</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Contact Form */}
        <Animated.View entering={FadeInUp.delay(500).duration(500)} style={styles.section}>
          <Text style={styles.sectionTitle}>Still Need Help?</Text>
          <View style={styles.contactCard}>
            <Text style={styles.contactSubtitle}>Send us a message</Text>
            
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Your Name"
                placeholderTextColor={COLORS.textMuted}
                value={contactName}
                onChangeText={setContactName}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Your Email"
                placeholderTextColor={COLORS.textMuted}
                value={contactEmail}
                onChangeText={setContactEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="How can we help?"
                placeholderTextColor={COLORS.textMuted}
                value={contactMessage}
                onChangeText={setContactMessage}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
            
            <TouchableOpacity
              style={[
                styles.submitButton,
                (!contactName || !contactEmail || !contactMessage) && styles.submitButtonDisabled,
              ]}
              onPress={handleSubmitContact}
              disabled={!contactName || !contactEmail || !contactMessage}
            >
              <Text style={styles.submitButtonText}>Send Message</Text>
              <Ionicons name="send" size={18} color={COLORS.textLight} />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Contact Info */}
        <Animated.View entering={FadeInUp.delay(600).duration(500)} style={styles.contactInfoSection}>
          <View style={styles.contactInfoCard}>
            <View style={styles.contactInfoItem}>
              <View style={styles.contactInfoIcon}>
                <Ionicons name="mail" size={20} color={COLORS.primaryGreen} />
              </View>
              <View>
                <Text style={styles.contactInfoLabel}>Email</Text>
                <Text style={styles.contactInfoValue}>support@enerzo.com</Text>
              </View>
            </View>
            <View style={styles.contactInfoItem}>
              <View style={styles.contactInfoIcon}>
                <Ionicons name="call" size={20} color={COLORS.primaryGreen} />
              </View>
              <View>
                <Text style={styles.contactInfoLabel}>Phone</Text>
                <Text style={styles.contactInfoValue}>0800 123 4567</Text>
              </View>
            </View>
            <View style={styles.contactInfoItem}>
              <View style={styles.contactInfoIcon}>
                <Ionicons name="time" size={20} color={COLORS.primaryGreen} />
              </View>
              <View>
                <Text style={styles.contactInfoLabel}>Hours</Text>
                <Text style={styles.contactInfoValue}>Mon-Fri 9am-6pm</Text>
              </View>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  headerTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
  },
  placeholder: {
    width: 40,
  },
  eneziSection: {
    alignItems: 'center',
    marginVertical: SPACING.md,
  },
  searchContainer: {
    marginTop: SPACING.md,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    ...SHADOWS.small,
  },
  searchInput: {
    flex: 1,
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
    marginLeft: SPACING.sm,
  },
  section: {
    marginTop: SPACING.xl,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  faqContainer: {
    gap: SPACING.sm,
  },
  faqItem: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    ...SHADOWS.small,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
    fontWeight: '600',
    flex: 1,
    marginRight: SPACING.sm,
  },
  faqAnswer: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    marginTop: SPACING.md,
    lineHeight: 22,
  },
  contactCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    ...SHADOWS.small,
  },
  contactSubtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  inputContainer: {
    marginBottom: SPACING.md,
  },
  input: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  textArea: {
    height: 100,
  },
  submitButton: {
    backgroundColor: COLORS.primaryGreen,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
  },
  submitButtonDisabled: {
    backgroundColor: COLORS.textMuted,
  },
  submitButtonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.textLight,
  },
  contactInfoSection: {
    marginTop: SPACING.xl,
  },
  contactInfoCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    ...SHADOWS.small,
  },
  contactInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  contactInfoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F8F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  contactInfoLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textMuted,
  },
  contactInfoValue: {
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
  },
});
