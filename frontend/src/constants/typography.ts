import { TextStyle } from 'react-native';

export const TYPOGRAPHY: Record<string, TextStyle> = {
  // Headings - Inter Bold
  h1: {
    fontWeight: '700',
    fontSize: 32,
    lineHeight: 40,
  },
  h2: {
    fontWeight: '700',
    fontSize: 28,
    lineHeight: 36,
  },
  h3: {
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 32,
  },
  h4: {
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 28,
  },
  
  // Body - Poppins Regular equivalent
  bodyLarge: {
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 28,
  },
  body: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
  },
  bodySmall: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
  },
  
  // Labels
  label: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 20,
  },
  labelSmall: {
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 16,
  },
  
  // Button Text
  button: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
  },
  buttonSmall: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 20,
  },
  
  // Caption
  caption: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};
