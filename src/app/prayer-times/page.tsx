"use client";

import React, { useState, useEffect } from "react";
import moment from "moment";
import "moment-timezone";
import { motion, AnimatePresence } from "framer-motion";
import { getPrayerTimes, getCurrentPrayer, PrayerTimesType, PrayerInfo } from "@/utils/prayerCalculations";
import prayerData from "@/data/prayerTimes";
import { City } from "@/data/prayerTimes";
import dynamic from "next/dynamic";
import { Settings as SettingsIcon } from "lucide-react";
import translations from "@/data/translations";
import { loadSettings, saveSettings, AppSettings } from "@/utils/storage";
import { requestNotificationPermission, scheduleNotification } from "@/utils/notifications";

// Dynamically import components
const Header = dynamic(() => import("@/components/Header"), { ssr: false });
const CurrentTime = dynamic(() => import("@/components/CurrentTime"), { ssr: false });
const NextPrayer = dynamic(() => import("@/components/NextPrayer"), { ssr: false });
const PrayerList = dynamic(() => import("@/components/PrayerList"), { ssr: false });
const Settings = dynamic(() => import("@/components/Settings"), { ssr: false });

// Set timezone to Bangladesh
moment.tz.setDefault("Asia/Dhaka");

export default function PrayerTimesPage() {
  // Load settings from localStorage
  const [settings, setSettings] = useState<AppSettings>(loadSettings());
  const [selectedCity, setSelectedCity] = useState<City>(
    prayerData.cities.find(c => c.name === settings.city) || prayerData.cities[0]
  );
  const [selectedLanguage, setSelectedLanguage] = useState(settings.language);
  
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimesType>({
    fajr: "",
    sunrise: "",
    dhuhr: "",
    asr: "",
    maghrib: "",
    isha: "",
    sehri: "",
    iftar: ""
  });
  const [currentPrayerInfo, setCurrentPrayerInfo] = useState<PrayerInfo>({
    current: "",
    next: "",
    isBeforeIftar: true
  });
  const [showSettings, setShowSettings] = useState(false);

  // Request notification permission on mount
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  // Update settings when they change
  useEffect(() => {
    saveSettings({
      city: selectedCity.name,
      language: selectedLanguage,
      notifications: settings.notifications,
      theme: settings.theme
    });
  }, [selectedCity.name, selectedLanguage, settings.notifications, settings.theme]);

  useEffect(() => {
    const city =
      prayerData.cities.find((c) => c.name === selectedCity.name) ||
      prayerData.cities[0];
    setSelectedCity(city);

    const updatePrayerTimes = () => {
      const times = getPrayerTimes(city.latitude, city.longitude);
      setPrayerTimes(times);

      const prayerInfo = getCurrentPrayer(times);
      setCurrentPrayerInfo(prayerInfo);

      // Schedule notifications if enabled
      if (settings.notifications.enabled) {
        scheduleNotification(
          times.sehri,
          "sehri",
          translations[selectedLanguage],
          {
            sound: settings.notifications.sound,
            vibration: settings.notifications.vibration
          }
        );
        scheduleNotification(
          times.iftar,
          "iftar",
          translations[selectedLanguage],
          {
            sound: settings.notifications.sound,
            vibration: settings.notifications.vibration
          }
        );
      }
    };

    updatePrayerTimes();
    const timer = setInterval(updatePrayerTimes, 1000);

    return () => clearInterval(timer);
  }, [selectedCity.name, settings.notifications, selectedLanguage]);

  const handleCityChange = (cityName: string) => {
    const city = prayerData.cities.find((c) => c.name === cityName);
    if (city) {
      setSelectedCity(city);
    }
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };

  const handleNotificationSettingsChange = (notificationSettings: AppSettings['notifications']) => {
    setSettings(prev => ({
      ...prev,
      notifications: notificationSettings
    }));
  };

  return (
    <div className="h-screen overflow-y-auto overflow-x-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-md mx-auto min-h-screen flex flex-col bg-emerald-700 relative pb-6 overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.7, 0.8, 0.7] 
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 5 
            }}
            className="absolute top-12 left-1/2 -translate-x-1/2 w-72 h-72 bg-radial-gradient rounded-full"
            style={{ maxWidth: '100%' }}
          />
        </div>
        
        <div className="relative z-10 flex-1 flex flex-col">
          <Header onSettingsClick={() => setShowSettings(true)} />

          <CurrentTime
            city={selectedCity.name}
            country={selectedCity.country}
            sehriTime={prayerTimes.sehri}
            iftarTime={prayerTimes.iftar}
            isBeforeIftar={currentPrayerInfo.isBeforeIftar}
            translations={translations[selectedLanguage]}
          />

          <NextPrayer
            currentPrayer={currentPrayerInfo.current || "Fajr"}
            nextPrayer={currentPrayerInfo.next || "Dhuhr"}
            prayerTimes={prayerTimes}
            timeRemaining={currentPrayerInfo.timeRemaining}
          />

          <PrayerList
            prayerTimes={prayerTimes}
            currentPrayer={currentPrayerInfo.current}
            translations={translations[selectedLanguage]}
          />
        </div>

        <AnimatePresence>
          {showSettings && (
            <Settings
              show={showSettings}
              onClose={() => setShowSettings(false)}
              cities={prayerData.cities}
              selectedCity={selectedCity.name}
              onCityChange={handleCityChange}
              selectedLanguage={selectedLanguage}
              onLanguageChange={handleLanguageChange}
              translations={translations[selectedLanguage]}
              notifications={settings.notifications}
              onNotificationSettingsChange={handleNotificationSettingsChange}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
} 