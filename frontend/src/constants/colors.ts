// Hayyan Color Palette - Purple Theme
export const COLORS = {
  // Primary Colors
  primary: '#7B5CF6',       // Main purple
  primaryLight: '#9D85F6',  // Light purple
  primaryDark: '#5B3CD6',   // Dark purple
  accent: '#00D4AA',        // Teal accent
  highlight: '#FFD93D',     // Yellow highlight
  
  // Backgrounds
  background: '#FFFFFF',
  backgroundLight: '#F5F3FF',  // Light purple tint
  backgroundDark: '#1A1A2E',
  backgroundPurple: '#C8C2EB', // Soft purple background
  
  // Text Colors
  textPrimary: '#1A1A2E',
  textSecondary: '#6B7280',
  textLight: '#FFFFFF',
  textMuted: '#9CA3AF',
  
  // Status Colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  
  // Card/Surface Colors
  cardBackground: '#FFFFFF',
  cardBorder: '#E5E7EB',
  
  // Gradient Presets
  gradientPrimary: ['#7B5CF6', '#9D85F6'],
  gradientAccent: ['#00D4AA', '#00F0C0'],
  gradientPurple: ['#7B5CF6', '#A78BFA'],
  gradientSunset: ['#FF6B6B', '#FFD93D'],
  gradientBlue: ['#00A3FF', '#00D4FF'],
  
  // Legacy support (mapping old names)
  primaryGreen: '#7B5CF6',    // Now purple
  accentCoral: '#FF6B6B',
  electricBlue: '#00A3FF',
  highlightYellow: '#FFD93D',
  
  // Mascot Colors
  hayyanBlue: '#327BEE',
  hayyanGlow: '#A0DFFF',
};

export const SHADOWS = {
  small: {
    shadowColor: '#7B5CF6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#7B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#7B5CF6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};
