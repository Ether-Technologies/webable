const STORAGE_KEY = 'prayer-app-settings';

export interface AppSettings {
  city: string;
  language: string;
  notifications: {
    enabled: boolean;
    sound: boolean;
    vibration: boolean;
    notifyBeforeMinutes: number;
  };
  theme: string;
}

const defaultSettings: AppSettings = {
  city: 'Dhaka',
  language: 'en',
  notifications: {
    enabled: true,
    sound: true,
    vibration: true,
    notifyBeforeMinutes: 5
  },
  theme: 'dark'
};

export const loadSettings = (): AppSettings => {
  if (typeof window === 'undefined') return defaultSettings;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultSettings;
    
    const settings = JSON.parse(stored);
    return { ...defaultSettings, ...settings };
  } catch (error) {
    console.error('Error loading settings:', error);
    return defaultSettings;
  }
};

export const saveSettings = (settings: Partial<AppSettings>): void => {
  if (typeof window === 'undefined') return;
  
  try {
    const current = loadSettings();
    const updated = { ...current, ...settings };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error saving settings:', error);
  }
};

export const clearSettings = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}; 