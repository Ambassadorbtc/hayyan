# Enerzo - Product Requirements Document

## Overview
Enerzo is a mobile-first energy bill savings app designed for UK independent business owners. The app features a playful mascot called "Enezi" (a cheeky electric zap character) that guides users through the experience with heavy animations and delightful success overlays.

## Design Inspiration
- **Monzo**: Hot coral playfulness, emotional tone
- **Revolut**: Premium gradients, smooth motion
- **Loop**: Clean dashboards, green sustainability feel
- **Duolingo/Phantom**: Mascot-driven emotional feedback

## Color Palette
- Primary Green: #00A676
- Accent Coral: #FF4D4D
- Electric Blue: #00A3FF
- Highlight Yellow: #FFD700

## Core Features

### 1. Onboarding Flow (7 Screens)
- **Welcome**: Address rising cost concerns with Enezi greeting
- **Main Worry**: Multi-select concerns (energy bills, cashflow, supplier costs)
- **Supplier History**: When user last switched supplier
- **Business Type**: Icon grid for business selection (cafe, salon, mechanic, etc.)
- **Business Details**: Business structure, name, postcode, mobile
- **Personal Details**: First name, last name, email
- **Sign Up**: Google/Email authentication with celebration

### 2. Dashboard
- Potential annual savings card with animated counter
- Current supplier information display
- Quick action buttons (Compare Deals, Add Bills)
- Enezi's tip section
- CTA to compare energy deals

### 3. Supplier Comparison
- List of 8 UK energy suppliers with ratings
- Sort by savings or rating
- Estimated annual savings display
- Click through to offer details

### 4. Supplier Input
- Dropdown selection for electricity and gas suppliers
- Monthly bill input fields
- Integration with UK supplier list

### 5. Offer Details
- Supplier hero with branding
- Savings breakdown (annual savings, new monthly bill)
- Features included (100% Renewable, Price Lock, Smart Meters, 24/7 Support)
- How switching works (3 steps)
- Get Quote CTA

### 6. Profile
- User profile card with business info
- Business information display
- Settings menu
- Logout functionality

## Mascot: Enezi
- Cheeky electric zap/bolt character
- Big eyes, lightning hair, red sneakers
- Multiple expressions: happy, excited, thinking, sad, surprised, winking, cheering, pointing, waving, celebrating
- Animated bounce and rotation effects
- Used for guidance, feedback, and delight across all screens

## Animations
- Heavy use of react-native-reanimated
- Success overlays with confetti on positive actions
- Button pulse effects
- Smooth screen transitions
- Speech bubbles with Enezi messages
- Card hover/tap effects

## Backend API
- User management (create, read, update)
- Supplier information storage
- Quote request tracking
- UK suppliers endpoint

## Tech Stack
- Frontend: Expo Router, React Native, react-native-reanimated
- State: Zustand, AsyncStorage
- Backend: FastAPI, MongoDB
- Styling: StyleSheet.create, LinearGradient

## UK Energy Suppliers (Mock Data)
1. Octopus Energy - 4.8 rating, 15% savings
2. Bulb - 4.5 rating, 12% savings
3. OVO Energy - 4.6 rating, 18% savings
4. EDF Energy - 4.2 rating, 10% savings
5. British Gas - 4.0 rating, 8% savings
6. Shell Energy - 4.3 rating, 14% savings
7. E.ON Next - 4.4 rating, 11% savings
8. Scottish Power - 4.1 rating, 9% savings
