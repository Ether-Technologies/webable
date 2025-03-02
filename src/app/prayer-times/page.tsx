"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import moment from "moment";
import "moment-timezone";
import { AnimatePresence } from "framer-motion";
import { getPrayerTimes, getCurrentPrayer, PrayerTimesType, PrayerInfo } from "@/utils/prayerCalculations";
import prayerData from "@/data/prayerTimes";
import { City } from "@/data/prayerTimes";
import dynamic from "next/dynamic";
import { Settings as SettingsIcon } from "lucide-react";
import translations from "@/data/translations";
import { loadSettings, saveSettings, AppSettings } from "@/utils/storage";
import { requestNotificationPermission, scheduleNotification } from "@/utils/notifications";
import { formatTime } from "@/utils/formatters";
import { useSettings } from "@/hooks/useSettings";
import PrayerList from "@/components/PrayerList";
import NextPrayer from "@/components/NextPrayer";
import CurrentTime from "@/components/CurrentTime";
import Settings from "@/components/Settings";
import { calculatePrayerTimes } from "@/utils/prayerCalculations";

// Dynamically import components
const Header = dynamic(() => import("@/components/Header"), { ssr: false });

// Set timezone to Bangladesh
moment.tz.setDefault("Asia/Dhaka");

export default function PrayerTimesPage() {
  const { settings, updateSettings } = useSettings();
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

  useEffect(() => {
    const updateCurrentAndNextPrayer = () => {
      const now = moment();
      const prayers = Object.entries(prayerTimes);
      
      let current = "";
      let next = "";
      
      for (let i = 0; i < prayers.length; i++) {
        const [prayer, time] = prayers[i];
        const prayerTime = moment(time, "HH:mm");
        
        if (now.isBefore(prayerTime)) {
          current = i === 0 ? prayers[prayers.length - 1][0] : prayers[i - 1][0];
          next = prayer;
          break;
        }
      }
      
      if (!next) {
        current = prayers[prayers.length - 1][0];
        next = prayers[0][0];
      }

      setCurrentPrayerInfo({
        current,
        next,
        isBeforeIftar: currentPrayerInfo.isBeforeIftar
      });
    };

    const updateTimeRemaining = () => {
      if (!currentPrayerInfo.next || !prayerTimes[currentPrayerInfo.next.toLowerCase()]) return;

      const now = moment();
      let nextTime = moment(prayerTimes[currentPrayerInfo.next.toLowerCase()], "HH:mm");

      if (now.isAfter(nextTime)) {
        nextTime.add(1, 'day');
      }

      setCurrentPrayerInfo({
        ...currentPrayerInfo,
        timeRemaining: moment.duration(nextTime.diff(now))
      });
    };

    updateCurrentAndNextPrayer();
    updateTimeRemaining();

    const timer = setInterval(() => {
      updateCurrentAndNextPrayer();
      updateTimeRemaining();
    }, 1000);

    return () => clearInterval(timer);
  }, [prayerTimes, currentPrayerInfo.next]);

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
    updateSettings({
      ...settings,
      notifications: notificationSettings
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-dark/20 to-primary-darker/20">
      <div className="container mx-auto px-4 py-8 lg:grid lg:grid-cols-2 lg:gap-8 lg:py-12 lg:min-h-screen lg:items-center">
        {/* Main Prayer App Container - Mobile full width, Desktop left column */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full max-w-md mx-auto lg:max-w-none lg:w-full flex flex-col bg-primary relative rounded-3xl overflow-hidden shadow-2xl"
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
            {/* Only show Header with settings on mobile */}
            <div className="lg:hidden">
              <Header onSettingsClick={() => setShowSettings(true)} />
            </div>

            <CurrentTime
              city={selectedCity.name}
              country={selectedCity.country}
              sehriTime={formatTime(prayerTimes.sehri, selectedLanguage)}
              iftarTime={formatTime(prayerTimes.iftar, selectedLanguage)}
              isBeforeIftar={currentPrayerInfo.isBeforeIftar}
              translations={translations[selectedLanguage]}
            />

            <NextPrayer
              currentPrayer={currentPrayerInfo.current || "Fajr"}
              nextPrayer={currentPrayerInfo.next || "Dhuhr"}
              prayerTimes={prayerTimes}
              timeRemaining={currentPrayerInfo.timeRemaining}
              translations={translations[selectedLanguage]}
              language={selectedLanguage}
            />
          </div>
        </motion.div>

        {/* Desktop Right Column - Prayer Times */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:block w-full bg-surface-transparent backdrop-blur-md rounded-3xl p-8 shadow-xl"
        >
          <div className="space-y-8">
            <div className="bg-primary/5 rounded-2xl p-6">
              <h2 className="text-3xl font-bold text-text-primary mb-6">
                {translations[selectedLanguage].ui.prayerTimes}
              </h2>
              <div className="grid gap-4">
                {Object.entries(prayerTimes)
                  .filter(([key]) => !['sehri', 'iftar'].includes(key))
                  .map(([prayer, time]) => (
                    <motion.div 
                      key={prayer}
                      className={`bg-surface p-6 rounded-xl shadow-sm hover-card ${
                        currentPrayerInfo.current === prayer 
                          ? "bg-primary-gradient text-on-primary" 
                          : ""
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="text-xl font-bold">
                          {translations[selectedLanguage].prayerNames[prayer.toLowerCase()]}
                        </div>
                        <div className="text-2xl font-bold">
                          {formatTime(time, selectedLanguage)}
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>

            {/* Quick Settings - Only visible on desktop */}
            <div className="bg-primary/5 rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <select
                  value={selectedCity.name}
                  onChange={(e) => handleCityChange(e.target.value)}
                  className="flex-1 p-3 rounded-xl bg-surface text-text-primary border border-primary/20"
                >
                  {prayerData.cities.map((city) => (
                    <option key={city.name} value={city.name}>
                      {city.name}, {city.country}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedLanguage}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="w-32 p-3 rounded-xl bg-surface text-text-primary border border-primary/20"
                >
                  <option value="en">English</option>
                  <option value="bn">বাংলা</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mobile Prayer List */}
        <div className="lg:hidden">
          <PrayerList
            prayerTimes={prayerTimes}
            currentPrayer={currentPrayerInfo.current}
            translations={translations[selectedLanguage]}
            language={selectedLanguage}
          />
        </div>
      </div>

      {/* Mobile Settings Modal */}
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
    </div>
  );
} 