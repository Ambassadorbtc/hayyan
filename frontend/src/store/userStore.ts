import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  businessName: string;
  businessType: string;
  postcode: string;
  mobileNumber: string;
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  setUser: (user: User) => void;
  logout: () => void;
  loadUser: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  
  setUser: (user) => {
    set({ user, isAuthenticated: true, isLoading: false });
    AsyncStorage.setItem('enerzo_user', JSON.stringify(user));
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false, isLoading: false });
    AsyncStorage.removeItem('enerzo_user');
    AsyncStorage.removeItem('enerzo_onboarding');
  },
  
  loadUser: async () => {
    try {
      const data = await AsyncStorage.getItem('enerzo_user');
      if (data) {
        const user = JSON.parse(data);
        set({ user, isAuthenticated: true, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      console.error('Error loading user:', error);
      set({ isLoading: false });
    }
  },
}));
