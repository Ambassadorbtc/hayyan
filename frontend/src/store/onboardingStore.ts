import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface OnboardingData {
  // Screen 2 - Worries
  worries: string[];
  
  // Screen 3 - Supplier History
  lastSupplierChange: string;
  
  // Screen 4 - Business Type
  businessType: string;
  
  // Screen 5 - Business Details
  businessStructure: string;
  businessName: string;
  postcode: string;
  mobileNumber: string;
  
  // Screen 6 - Personal Details
  firstName: string;
  lastName: string;
  email: string;
  
  // Current Supplier Info
  currentElectricSupplier: string;
  currentGasSupplier: string;
  monthlyElectricBill: number;
  monthlyGasBill: number;
}

interface OnboardingState extends OnboardingData {
  currentStep: number;
  isCompleted: boolean;
  userId: string | null;
  
  // Actions
  setWorries: (worries: string[]) => void;
  setLastSupplierChange: (value: string) => void;
  setBusinessType: (type: string) => void;
  setBusinessDetails: (details: Partial<Pick<OnboardingData, 'businessStructure' | 'businessName' | 'postcode' | 'mobileNumber'>>) => void;
  setPersonalDetails: (details: Partial<Pick<OnboardingData, 'firstName' | 'lastName' | 'email'>>) => void;
  setSupplierInfo: (info: Partial<Pick<OnboardingData, 'currentElectricSupplier' | 'currentGasSupplier' | 'monthlyElectricBill' | 'monthlyGasBill'>>) => void;
  setCurrentStep: (step: number) => void;
  completeOnboarding: (userId: string) => void;
  resetOnboarding: () => void;
  loadFromStorage: () => Promise<void>;
  saveToStorage: () => Promise<void>;
}

const initialState: OnboardingData = {
  worries: [],
  lastSupplierChange: '',
  businessType: '',
  businessStructure: '',
  businessName: '',
  postcode: '',
  mobileNumber: '',
  firstName: '',
  lastName: '',
  email: '',
  currentElectricSupplier: '',
  currentGasSupplier: '',
  monthlyElectricBill: 0,
  monthlyGasBill: 0,
};

export const useOnboardingStore = create<OnboardingState>((set, get) => ({
  ...initialState,
  currentStep: 0,
  isCompleted: false,
  userId: null,
  
  setWorries: (worries) => {
    set({ worries });
    get().saveToStorage();
  },
  
  setLastSupplierChange: (lastSupplierChange) => {
    set({ lastSupplierChange });
    get().saveToStorage();
  },
  
  setBusinessType: (businessType) => {
    set({ businessType });
    get().saveToStorage();
  },
  
  setBusinessDetails: (details) => {
    set((state) => ({ ...state, ...details }));
    get().saveToStorage();
  },
  
  setPersonalDetails: (details) => {
    set((state) => ({ ...state, ...details }));
    get().saveToStorage();
  },
  
  setSupplierInfo: (info) => {
    set((state) => ({ ...state, ...info }));
    get().saveToStorage();
  },
  
  setCurrentStep: (currentStep) => {
    set({ currentStep });
    get().saveToStorage();
  },
  
  completeOnboarding: (userId) => {
    set({ isCompleted: true, userId });
    get().saveToStorage();
  },
  
  resetOnboarding: () => {
    set({ ...initialState, currentStep: 0, isCompleted: false, userId: null });
    AsyncStorage.removeItem('hayyan_onboarding');
  },
  
  loadFromStorage: async () => {
    try {
      const data = await AsyncStorage.getItem('hayyan_onboarding');
      if (data) {
        const parsed = JSON.parse(data);
        set(parsed);
      }
    } catch (error) {
      console.error('Error loading onboarding data:', error);
    }
  },
  
  saveToStorage: async () => {
    try {
      const state = get();
      await AsyncStorage.setItem('hayyan_onboarding', JSON.stringify({
        ...state,
        setWorries: undefined,
        setLastSupplierChange: undefined,
        setBusinessType: undefined,
        setBusinessDetails: undefined,
        setPersonalDetails: undefined,
        setSupplierInfo: undefined,
        setCurrentStep: undefined,
        completeOnboarding: undefined,
        resetOnboarding: undefined,
        loadFromStorage: undefined,
        saveToStorage: undefined,
      }));
    } catch (error) {
      console.error('Error saving onboarding data:', error);
    }
  },
}));
