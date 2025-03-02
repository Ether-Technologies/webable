import { useState, useEffect } from 'react';
import { AppSettings, loadSettings, saveSettings } from '@/utils/storage';

export const useSettings = () => {
  const [settings, setSettings] = useState<AppSettings>({
    city: 'Dhaka',
    language: 'en',
    notifications: {
      enabled: true,
      sound: true,
      vibration: true,
      notifyBeforeMinutes: 5
    },
    theme: 'default'
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedSettings = loadSettings();
    setSettings(savedSettings);
  }, []);

  const updateSettings = (newSettings: AppSettings) => {
    if (!mounted) return;
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  return {
    settings,
    updateSettings
  };
}; 