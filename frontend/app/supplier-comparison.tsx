import React from 'react';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

// Redirect from /supplier-comparison to /(tabs)/compare
export default function SupplierComparisonRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/(tabs)/compare');
  }, []);

  return null;
}
