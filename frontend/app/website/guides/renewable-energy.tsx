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

export default function RenewableEnergyGuide() {
  const router = useRouter();

  const options = [
    {
      title: 'Green Tariffs',
      icon: 'leaf',
      description: 'The simplest option. Your supplier purchases renewable energy certificates to match your usage.',
      pros: ['No upfront cost', 'Switch easily', 'Support renewable growth'],
      cons: ['May cost 5-10% more', 'You don\'t generate your own power'],
    },
    {
      title: 'Solar Panels',
      icon: 'sunny',
      description: 'Generate your own electricity from sunlight. Typical business installations are 10-50kW.',
      pros: ['Reduce bills by 30-70%', 'Sell excess to grid', '20+ year lifespan'],
      cons: ['£10,000-£50,000 investment', 'Needs suitable roof', '4-7 year payback'],
    },
    {
      title: 'Heat Pumps',
      icon: 'thermometer',
      description: 'Extract heat from air or ground to heat your premises. 3-4x more efficient than gas boilers.',
      pros: ['300-400% efficient', 'Lower running costs', 'Government grants available'],
      cons: ['High installation cost', 'May need larger radiators', 'Less effective in old buildings'],
    },
    {
      title: 'Battery Storage',
      icon: 'battery-charging',
      description: 'Store cheap off-peak or solar electricity for use during expensive peak times.',
      pros: ['Use solar power at night', 'Reduce peak charges', 'Backup power'],
      cons: ['£5,000-£15,000 cost', '10-15 year lifespan', 'Adds complexity'],
    },
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
          <Text style={styles.heroLabel}>GREEN ENERGY</Text>
          <Text style={styles.heroTitle}>Switching to Renewable Energy for Business</Text>
          <View style={styles.metaInfo}>
            <Text style={styles.metaText}>5 min read</Text>
            <Text style={styles.metaDot}>•</Text>
            <Text style={styles.metaText}>Updated January 2025</Text>
          </View>
        </Animated.View>
      </LinearGradient>

      <View style={styles.contentSection}>
        <View style={styles.contentContainer}>
          <Animated.Text entering={FadeInUp.delay(200).duration(600)} style={styles.intro}>
            More UK businesses are switching to renewable energy—both to reduce their carbon footprint and to protect against rising fossil fuel prices. The good news? Going green doesn't have to cost more. Here are your options for making your business more sustainable.
          </Animated.Text>

          {options.map((option, index) => (
            <Animated.View
              key={option.title}
              entering={FadeInUp.delay(300 + index * 50).duration(500)}
              style={styles.optionCard}
            >
              <View style={styles.optionHeader}>
                <View style={styles.optionIcon}>
                  <Ionicons name={option.icon as any} size={28} color="#10B981" />
                </View>
                <Text style={styles.optionTitle}>{option.title}</Text>
              </View>
              <Text style={styles.optionDesc}>{option.description}</Text>
              
              <View style={styles.prosConsContainer}>
                <View style={styles.prosContainer}>
                  <Text style={styles.prosTitle}>Pros</Text>
                  {option.pros.map((pro, i) => (
                    <View key={i} style={styles.proItem}>
                      <Ionicons name="checkmark" size={16} color="#10B981" />
                      <Text style={styles.proText}>{pro}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.consContainer}>
                  <Text style={styles.consTitle}>Cons</Text>
                  {option.cons.map((con, i) => (
                    <View key={i} style={styles.conItem}>
                      <Ionicons name="close" size={16} color="#EF4444" />
                      <Text style={styles.conText}>{con}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </Animated.View>
          ))}

          <Animated.View entering={FadeInUp.delay(550).duration(600)} style={styles.tipBox}>
            <Text style={styles.tipTitle}>Getting Started</Text>
            <Text style={styles.tipText}>
              The easiest first step is switching to a green tariff—you can do this today through Hayyan with no installation or upfront costs. Then consider solar panels if you have a suitable roof, as government incentives currently make them very attractive for businesses.
            </Text>
          </Animated.View>
        </View>
      </View>

      <View style={styles.ctaSection}>
        <LinearGradient colors={['#10B981', '#059669']} style={styles.ctaGradient}>
          <Text style={styles.ctaTitle}>Find Green Energy Tariffs</Text>
          <Text style={styles.ctaSubtitle}>Compare 100% renewable options with Hayyan</Text>
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
  intro: { fontSize: 18, color: '#374151', lineHeight: 30, marginBottom: 40 },
  optionCard: { marginBottom: 24, backgroundColor: '#FFFFFF', borderRadius: 16, padding: 24, borderWidth: 1, borderColor: '#E5E7EB' },
  optionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
  optionIcon: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#ECFDF5', justifyContent: 'center', alignItems: 'center' },
  optionTitle: { fontSize: 20, fontWeight: '700', color: '#1A1A2E' },
  optionDesc: { fontSize: 16, color: '#6B7280', lineHeight: 24, marginBottom: 16 },
  prosConsContainer: { flexDirection: isDesktop ? 'row' : 'column', gap: 16 },
  prosContainer: { flex: 1, backgroundColor: '#ECFDF5', borderRadius: 12, padding: 16 },
  consContainer: { flex: 1, backgroundColor: '#FEF2F2', borderRadius: 12, padding: 16 },
  prosTitle: { fontSize: 14, fontWeight: '700', color: '#065F46', marginBottom: 8 },
  consTitle: { fontSize: 14, fontWeight: '700', color: '#991B1B', marginBottom: 8 },
  proItem: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  conItem: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  proText: { fontSize: 14, color: '#065F46' },
  conText: { fontSize: 14, color: '#991B1B' },
  tipBox: { backgroundColor: '#F0EBFF', borderRadius: 16, padding: 24, marginTop: 16 },
  tipTitle: { fontSize: 20, fontWeight: '700', color: '#1A1A2E', marginBottom: 12 },
  tipText: { fontSize: 16, color: '#374151', lineHeight: 26 },
  ctaSection: { paddingHorizontal: 24, paddingVertical: 40 },
  ctaGradient: { borderRadius: 24, padding: 60, alignItems: 'center', maxWidth: 800, marginHorizontal: 'auto' },
  ctaTitle: { fontSize: isDesktop ? 36 : 28, fontWeight: '800', color: '#FFFFFF', textAlign: 'center', marginBottom: 16 },
  ctaSubtitle: { fontSize: 18, color: 'rgba(255,255,255,0.9)', textAlign: 'center', marginBottom: 32 },
});
