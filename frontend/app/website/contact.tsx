import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Dimensions, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeInLeft,
  FadeInRight,
  ZoomIn,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withSpring,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../src/constants/colors';
import { WebHeader } from '../../src/components/web/WebHeader';
import { WebFooter } from '../../src/components/web/WebFooter';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const isDesktop = Platform.OS === 'web' && width > 768;

// Animated Contact Card
const ContactCard = ({ item, index }: { item: any; index: number }) => {
  const scale = useSharedValue(1);
  const iconFloat = useSharedValue(0);
  const glowOpacity = useSharedValue(0);

  useEffect(() => {
    iconFloat.value = withDelay(index * 200, withRepeat(
      withSequence(
        withTiming(-5, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(5, { duration: 1500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    ));
  }, []);

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: iconFloat.value }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  return (
    <Animated.View
      entering={FadeInUp.delay(200 + index * 100).duration(600).springify()}
      style={[styles.contactCard, cardStyle]}
      // @ts-ignore
      onMouseEnter={() => {
        scale.value = withSpring(1.05);
        glowOpacity.value = withTiming(1);
      }}
      onMouseLeave={() => {
        scale.value = withSpring(1);
        glowOpacity.value = withTiming(0);
      }}
    >
      <Animated.View style={[styles.contactGlow, glowStyle]} />
      <Animated.View style={[styles.contactIcon, iconStyle]}>
        <Ionicons name={item.icon} size={28} color={COLORS.primary} />
      </Animated.View>
      <Text style={styles.contactTitle}>{item.title}</Text>
      <Text style={styles.contactValue}>{item.value}</Text>
      {item.subtext && <Text style={styles.contactSubtext}>{item.subtext}</Text>}
    </Animated.View>
  );
};

// Animated Input Field
const AnimatedInput = ({ 
  label, 
  placeholder, 
  value, 
  onChangeText, 
  multiline = false,
  index = 0,
}: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const borderColor = useSharedValue('#E5E7EB');
  const labelY = useSharedValue(0);
  const shadowOpacity = useSharedValue(0);

  const inputStyle = useAnimatedStyle(() => ({
    borderColor: borderColor.value,
    shadowOpacity: shadowOpacity.value,
    shadowColor: COLORS.primary,
    shadowRadius: 10,
  }));

  const handleFocus = () => {
    setIsFocused(true);
    borderColor.value = withTiming(COLORS.primary, { duration: 200 });
    shadowOpacity.value = withTiming(0.2, { duration: 200 });
  };

  const handleBlur = () => {
    setIsFocused(false);
    borderColor.value = withTiming('#E5E7EB', { duration: 200 });
    shadowOpacity.value = withTiming(0, { duration: 200 });
  };

  return (
    <Animated.View
      entering={FadeInLeft.delay(300 + index * 100).duration(500).springify()}
      style={styles.inputContainer}
    >
      <Text style={[styles.inputLabel, isFocused && styles.inputLabelFocused]}>{label}</Text>
      <Animated.View style={[styles.inputWrapper, inputStyle]}>
        <TextInput
          style={[styles.input, multiline && styles.inputMultiline]}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          multiline={multiline}
          numberOfLines={multiline ? 4 : 1}
        />
      </Animated.View>
    </Animated.View>
  );
};

export default function ContactPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    business: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Floating animations
  const float1 = useSharedValue(0);
  const float2 = useSharedValue(0);
  const float3 = useSharedValue(0);

  // Button pulse
  const buttonPulse = useSharedValue(1);
  const buttonGlow = useSharedValue(0);

  useEffect(() => {
    float1.value = withRepeat(
      withSequence(
        withTiming(-20, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
        withTiming(20, { duration: 3000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    float2.value = withDelay(500, withRepeat(
      withSequence(
        withTiming(15, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
        withTiming(-15, { duration: 2500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    ));

    float3.value = withDelay(1000, withRepeat(
      withSequence(
        withTiming(-10, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(10, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    ));

    // Button pulse animation
    buttonPulse.value = withRepeat(
      withSequence(
        withTiming(1.02, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    buttonGlow.value = withRepeat(
      withSequence(
        withTiming(0.4, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.1, { duration: 1500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, []);

  const particle1Style = useAnimatedStyle(() => ({
    transform: [{ translateY: float1.value }, { translateX: float1.value * 0.5 }],
  }));

  const particle2Style = useAnimatedStyle(() => ({
    transform: [{ translateY: float2.value }, { rotate: `${float2.value}deg` }],
  }));

  const particle3Style = useAnimatedStyle(() => ({
    transform: [{ translateY: float3.value }],
  }));

  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonPulse.value }],
    shadowOpacity: buttonGlow.value,
    shadowRadius: 15,
    shadowColor: COLORS.primary,
  }));

  const contactInfo = [
    { icon: 'mail', title: 'Email Us', value: 'hello@hayyan.co.uk', subtext: 'We reply within 24 hours' },
    { icon: 'call', title: 'Call Us', value: '0800 123 4567', subtext: 'Mon-Fri 9am-6pm' },
    { icon: 'location', title: 'Visit Us', value: 'London, UK', subtext: 'By appointment only' },
  ];

  const handleSubmit = () => {
    setIsSubmitted(true);
    // Reset after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <WebHeader />

      {/* Hero Section */}
      <LinearGradient colors={['#F5F3FF', '#EDE9FE', '#FFFFFF']} style={styles.heroSection}>
        {/* Floating particles */}
        <Animated.View style={[styles.particle, styles.particle1, particle1Style]}>
          <Text style={styles.particleEmoji}>💬</Text>
        </Animated.View>
        <Animated.View style={[styles.particle, styles.particle2, particle2Style]}>
          <Text style={styles.particleEmoji}>📧</Text>
        </Animated.View>
        <Animated.View style={[styles.particle, styles.particle3, particle3Style]}>
          <Text style={styles.particleEmoji}>👋</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(800).springify()} style={styles.heroContent}>
          <Text style={styles.heroLabel}>GET IN TOUCH</Text>
          <Text style={styles.heroTitle}>We'd Love to{'\n'}Hear From You</Text>
          <Text style={styles.heroSubtitle}>
            Have a question? Need help switching? Our team is here to assist.
          </Text>
        </Animated.View>
      </LinearGradient>

      {/* Contact Cards */}
      <View style={styles.contactCardsSection}>
        <View style={styles.contactCardsGrid}>
          {contactInfo.map((item, index) => (
            <ContactCard key={item.title} item={item} index={index} />
          ))}
        </View>
      </View>

      {/* Contact Form */}
      <View style={styles.formSection}>
        <View style={styles.formContainer}>
          <Animated.Text entering={FadeInUp.duration(600)} style={styles.formTitle}>
            Send Us a Message
          </Animated.Text>

          {isSubmitted ? (
            <Animated.View 
              entering={ZoomIn.duration(500)}
              style={styles.successMessage}
            >
              <View style={styles.successIcon}>
                <Ionicons name="checkmark-circle" size={60} color="#10B981" />
              </View>
              <Text style={styles.successTitle}>Message Sent!</Text>
              <Text style={styles.successText}>We'll get back to you within 24 hours.</Text>
            </Animated.View>
          ) : (
            <>
              <View style={styles.formRow}>
                <AnimatedInput
                  label="Your Name"
                  placeholder="John Smith"
                  value={formData.name}
                  onChangeText={(text: string) => setFormData({ ...formData, name: text })}
                  index={0}
                />
                <AnimatedInput
                  label="Email Address"
                  placeholder="john@company.co.uk"
                  value={formData.email}
                  onChangeText={(text: string) => setFormData({ ...formData, email: text })}
                  index={1}
                />
              </View>

              <AnimatedInput
                label="Business Name"
                placeholder="Your Business Ltd"
                value={formData.business}
                onChangeText={(text: string) => setFormData({ ...formData, business: text })}
                index={2}
              />

              <AnimatedInput
                label="Your Message"
                placeholder="How can we help you?"
                value={formData.message}
                onChangeText={(text: string) => setFormData({ ...formData, message: text })}
                multiline
                index={3}
              />

              <Animated.View
                entering={FadeInUp.delay(700).duration(500)}
                style={buttonStyle}
              >
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                  <Text style={styles.submitButtonText}>Send Message</Text>
                  <Ionicons name="send" size={20} color="#FFFFFF" />
                </TouchableOpacity>
              </Animated.View>
            </>
          )}
        </View>
      </View>

      {/* FAQ Preview */}
      <View style={styles.faqSection}>
        <LinearGradient colors={['#FFFFFF', '#F9F7FF', '#FFFFFF']} style={StyleSheet.absoluteFill} />
        
        <Animated.Text entering={FadeInUp.duration(600)} style={styles.faqTitle}>
          Frequently Asked Questions
        </Animated.Text>

        {[
          { q: 'How quickly can I switch suppliers?', a: 'Most switches complete within 2-3 weeks with no interruption to your supply.' },
          { q: 'Is there a fee to use Hayyan?', a: 'No, Hayyan is completely free. We\'re paid a small commission by suppliers.' },
          { q: 'Can I switch if I\'m in a contract?', a: 'Yes, though you may face exit fees. We show you the net savings after any fees.' },
        ].map((faq, index) => (
          <Animated.View
            key={index}
            entering={FadeInRight.delay(200 + index * 100).duration(500).springify()}
            style={styles.faqItem}
          >
            <Text style={styles.faqQuestion}>{faq.q}</Text>
            <Text style={styles.faqAnswer}>{faq.a}</Text>
          </Animated.View>
        ))}

        <Animated.View entering={FadeInUp.delay(600).duration(500)}>
          <TouchableOpacity 
            style={styles.faqLink}
            onPress={() => router.push('/website/guides')}
          >
            <Text style={styles.faqLinkText}>View All Guides & FAQs</Text>
            <Ionicons name="arrow-forward" size={16} color={COLORS.primary} />
          </TouchableOpacity>
        </Animated.View>
      </View>

      <WebFooter />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  heroSection: { paddingTop: 140, paddingBottom: 60, paddingHorizontal: 24, position: 'relative', overflow: 'hidden' },
  heroContent: { maxWidth: 700, marginHorizontal: 'auto', alignItems: 'center' },
  heroLabel: { fontSize: 12, fontWeight: '700', color: COLORS.primary, letterSpacing: 3, marginBottom: 16 },
  heroTitle: { fontSize: isDesktop ? 48 : 32, fontWeight: '800', color: '#1A1A2E', textAlign: 'center', marginBottom: 20, lineHeight: isDesktop ? 56 : 40 },
  heroSubtitle: { fontSize: 18, color: '#6B7280', textAlign: 'center', lineHeight: 28 },
  particle: { position: 'absolute', zIndex: 1 },
  particle1: { top: '20%', left: '10%' },
  particle2: { top: '30%', right: '15%' },
  particle3: { bottom: '25%', left: '20%' },
  particleEmoji: { fontSize: 32 },
  contactCardsSection: { paddingVertical: 40, paddingHorizontal: 24, marginTop: -40 },
  contactCardsGrid: { flexDirection: isDesktop ? 'row' : 'column', justifyContent: 'center', gap: 20, maxWidth: 900, marginHorizontal: 'auto' },
  contactCard: { flex: isDesktop ? 1 : undefined, backgroundColor: '#FFFFFF', borderRadius: 20, padding: 28, alignItems: 'center', borderWidth: 1, borderColor: '#E5E7EB', position: 'relative', overflow: 'hidden' },
  contactGlow: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: COLORS.primary, opacity: 0.05, borderRadius: 20 },
  contactIcon: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#F0EBFF', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  contactTitle: { fontSize: 14, fontWeight: '600', color: '#6B7280', marginBottom: 8 },
  contactValue: { fontSize: 18, fontWeight: '700', color: '#1A1A2E', marginBottom: 4 },
  contactSubtext: { fontSize: 13, color: '#9CA3AF' },
  formSection: { paddingVertical: 60, paddingHorizontal: 24 },
  formContainer: { maxWidth: 700, marginHorizontal: 'auto', backgroundColor: '#FFFFFF', borderRadius: 24, padding: 40, borderWidth: 1, borderColor: '#E5E7EB' },
  formTitle: { fontSize: 28, fontWeight: '800', color: '#1A1A2E', marginBottom: 32, textAlign: 'center' },
  formRow: { flexDirection: isDesktop ? 'row' : 'column', gap: 16 },
  inputContainer: { flex: 1, marginBottom: 20 },
  inputLabel: { fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 8 },
  inputLabelFocused: { color: COLORS.primary },
  inputWrapper: { borderWidth: 2, borderRadius: 12, overflow: 'hidden' },
  input: { padding: 14, fontSize: 16, color: '#1A1A2E', backgroundColor: '#FFFFFF' },
  inputMultiline: { minHeight: 120, textAlignVertical: 'top' },
  submitButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.primary, paddingVertical: 16, borderRadius: 30, gap: 8, marginTop: 16 },
  submitButtonText: { fontSize: 18, fontWeight: '700', color: '#FFFFFF' },
  successMessage: { alignItems: 'center', paddingVertical: 40 },
  successIcon: { marginBottom: 16 },
  successTitle: { fontSize: 24, fontWeight: '700', color: '#1A1A2E', marginBottom: 8 },
  successText: { fontSize: 16, color: '#6B7280' },
  faqSection: { paddingVertical: 60, paddingHorizontal: 24, position: 'relative' },
  faqTitle: { fontSize: isDesktop ? 32 : 24, fontWeight: '800', color: '#1A1A2E', textAlign: 'center', marginBottom: 40 },
  faqItem: { maxWidth: 700, marginHorizontal: 'auto', backgroundColor: '#FFFFFF', borderRadius: 16, padding: 24, marginBottom: 16, borderWidth: 1, borderColor: '#E5E7EB' },
  faqQuestion: { fontSize: 17, fontWeight: '700', color: '#1A1A2E', marginBottom: 8 },
  faqAnswer: { fontSize: 15, color: '#6B7280', lineHeight: 24 },
  faqLink: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 24 },
  faqLinkText: { fontSize: 16, fontWeight: '600', color: COLORS.primary },
});
