import { useState, useEffect } from 'react';
import { AppSettings, loadSettings, saveSettings } from '@/utils/storage';

export const useSettings = () => {
  const [settings, setSettings] = useState<AppSettings>(loadSettings());

  const updateSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  return {
    settings,
    updateSettings
  };
}; 