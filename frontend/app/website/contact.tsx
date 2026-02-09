import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Dimensions, Platform, Linking } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../src/constants/colors';
import { WebHeader } from '../../src/components/web/WebHeader';
import { WebFooter } from '../../src/components/web/WebFooter';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const isDesktop = Platform.OS === 'web' && width > 768;

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    // Handle form submission
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const contactMethods = [
    {
      icon: 'mail',
      title: 'Email Us',
      description: 'support@hayyan.com',
      action: () => Linking.openURL('mailto:support@hayyan.com'),
    },
    {
      icon: 'call',
      title: 'Call Us',
      description: '0800 123 4567',
      action: () => Linking.openURL('tel:08001234567'),
    },
    {
      icon: 'chatbubbles',
      title: 'Live Chat',
      description: 'Available 9am-5pm Mon-Fri',
      action: () => {},
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <WebHeader />

      {/* Hero Section */}
      <LinearGradient colors={['#F5F3FF', '#EDE9FE', '#FFFFFF']} style={styles.heroSection}>
        <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.heroContent}>
          <Text style={styles.heroLabel}>CONTACT US</Text>
          <Text style={styles.heroTitle}>We're Here to Help</Text>
          <Text style={styles.heroSubtitle}>
            Got questions about switching energy suppliers? Our team is ready to help.
          </Text>
        </Animated.View>
      </LinearGradient>

      {/* Contact Methods */}
      <View style={styles.methodsSection}>
        <View style={styles.methodsGrid}>
          {contactMethods.map((method, index) => (
            <Animated.View
              key={method.title}
              entering={FadeInUp.delay(200 + index * 100).duration(600)}
            >
              <TouchableOpacity style={styles.methodCard} onPress={method.action}>
                <View style={styles.methodIcon}>
                  <Ionicons name={method.icon as any} size={28} color={COLORS.primary} />
                </View>
                <Text style={styles.methodTitle}>{method.title}</Text>
                <Text style={styles.methodDescription}>{method.description}</Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </View>

      {/* Contact Form */}
      <View style={styles.formSection}>
        <Animated.View entering={FadeInDown.duration(600)} style={styles.formContainer}>
          <Text style={styles.formTitle}>Send us a Message</Text>
          <Text style={styles.formSubtitle}>Fill out the form and we'll get back to you within 24 hours.</Text>

          {submitted ? (
            <View style={styles.successMessage}>
              <Ionicons name="checkmark-circle" size={48} color={COLORS.primary} />
              <Text style={styles.successTitle}>Message Sent!</Text>
              <Text style={styles.successText}>We'll get back to you soon.</Text>
            </View>
          ) : (
            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder="John Smith"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email Address</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="john@business.com"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="email-address"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Message</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={message}
                  onChangeText={setMessage}
                  placeholder="How can we help you?"
                  placeholderTextColor="#9CA3AF"
                  multiline
                  numberOfLines={5}
                />
              </View>

              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Send Message</Text>
                <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          )}
        </Animated.View>
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
    paddingBottom: 60,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  heroContent: {
    alignItems: 'center',
    maxWidth: 600,
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
  methodsSection: {
    paddingVertical: 60,
    paddingHorizontal: 24,
  },
  methodsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 24,
    maxWidth: 900,
    marginHorizontal: 'auto',
  },
  methodCard: {
    width: isDesktop ? 260 : '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  methodIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F0EBFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  methodTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 8,
  },
  methodDescription: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '500',
  },
  formSection: {
    paddingVertical: 60,
    paddingHorizontal: 24,
    backgroundColor: '#F9FAFB',
  },
  formContainer: {
    maxWidth: 600,
    marginHorizontal: 'auto',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 40,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  formTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 8,
  },
  formSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 32,
  },
  form: {
    gap: 20,
  },
  inputGroup: {
    marginBottom: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#1A1A2E',
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 16,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  successMessage: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A2E',
    marginTop: 16,
  },
  successText: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 8,
  },
});
