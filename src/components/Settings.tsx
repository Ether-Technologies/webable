"use client";

import React from "react";
import { motion } from "framer-motion";
import { City } from "@/data/prayerTimes";
import { X, MapPin, Bell, Globe, Volume2, Vibrate, Moon } from "lucide-react";
import { Translation } from "@/data/translations";
import { AppSettings } from "@/utils/storage";
import { useTheme } from "@/hooks/useTheme";

interface SettingsProps {
  show: boolean;
  onClose: () => void;
  cities: City[];
  selectedCity: string;
  onCityChange: (cityName: string) => void;
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
  translations: Translation;
  notifications: AppSettings['notifications'];
  onNotificationSettingsChange: (settings: AppSettings['notifications']) => void;
}

const Settings: React.FC<SettingsProps> = ({
  show,
  onClose,
  cities,
  selectedCity,
  onCityChange,
  selectedLanguage,
  onLanguageChange,
  translations,
  notifications,
  onNotificationSettingsChange
}) => {
  const { theme, toggleTheme } = useTheme();

  if (!show) return null;

  const languages = [
    { code: "en", name: "English" },
    { code: "bn", name: "বাংলা" }
  ];

  const toggleNotification = () => {
    onNotificationSettingsChange({
      ...notifications,
      enabled: !notifications.enabled
    });
  };

  const toggleSound = () => {
    onNotificationSettingsChange({
      ...notifications,
      sound: !notifications.sound
    });
  };

  const toggleVibration = () => {
    onNotificationSettingsChange({
      ...notifications,
      vibration: !notifications.vibration
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 500 }}
        className="absolute bottom-0 left-0 right-0 bg-gray-900 text-white rounded-t-3xl p-6"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{translations.ui.settings}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col gap-4"
        >
          <div className="flex justify-between items-center p-3 border-b border-white/20">
            <div className="flex items-center">
              <MapPin size={18} className="mr-2" />
              <span>{translations.ui.city}</span>
            </div>
            <select
              value={selectedCity}
              onChange={(e) => onCityChange(e.target.value)}
              className="p-2 rounded bg-gray-800 text-white border border-gray-700"
            >
              {cities.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}, {city.country}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-between items-center p-3 border-b border-white/20">
            <div className="flex items-center">
              <Globe size={18} className="mr-2" />
              <span>{translations.ui.language}</span>
            </div>
            <select
              value={selectedLanguage}
              onChange={(e) => onLanguageChange(e.target.value)}
              className="p-2 rounded bg-gray-800 text-white border border-gray-700"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-between items-center p-3 border-b border-white/20">
            <div className="flex items-center">
              <Moon size={18} className="mr-2" />
              <span>{translations.ui.theme || "Theme"}</span>
            </div>
            <div 
              className={`w-12 h-6 ${theme === 'dark' ? 'bg-primary' : 'bg-gray-600'} rounded-full relative cursor-pointer transition-colors`}
              onClick={toggleTheme}
            >
              <motion.div 
                className="w-5 h-5 bg-white rounded-full absolute top-0.5"
                animate={{ right: theme === 'dark' ? '0.5rem' : '2rem' }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </div>
          </div>

          <motion.div 
            whileHover={{ x: 5 }}
            className="flex justify-between items-center p-3 border-b border-white/20"
          >
            <div className="flex items-center">
              <Bell size={18} className="mr-2" />
              <span>{translations.ui.notifications}</span>
            </div>
            <div 
              className={`w-12 h-6 ${notifications.enabled ? 'bg-emerald-600' : 'bg-gray-600'} rounded-full relative cursor-pointer transition-colors`}
              onClick={toggleNotification}
            >
              <motion.div 
                className="w-5 h-5 bg-white rounded-full absolute top-0.5"
                animate={{ right: notifications.enabled ? '0.5rem' : '2rem' }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </div>
          </motion.div>

          {notifications.enabled && (
            <>
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-between items-center p-3 border-b border-white/20"
              >
                <div className="flex items-center">
                  <Volume2 size={18} className="mr-2" />
                  <span>{translations.ui[notifications.sound ? 'soundOn' : 'soundOff']}</span>
                </div>
                <div 
                  className={`w-12 h-6 ${notifications.sound ? 'bg-emerald-600' : 'bg-gray-600'} rounded-full relative cursor-pointer transition-colors`}
                  onClick={toggleSound}
                >
                  <motion.div 
                    className="w-5 h-5 bg-white rounded-full absolute top-0.5"
                    animate={{ right: notifications.sound ? '0.5rem' : '2rem' }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-between items-center p-3 border-b border-white/20"
              >
                <div className="flex items-center">
                  <Vibrate size={18} className="mr-2" />
                  <span>{translations.ui[notifications.vibration ? 'vibrationOn' : 'vibrationOff']}</span>
                </div>
                <div 
                  className={`w-12 h-6 ${notifications.vibration ? 'bg-emerald-600' : 'bg-gray-600'} rounded-full relative cursor-pointer transition-colors`}
                  onClick={toggleVibration}
                >
                  <motion.div 
                    className="w-5 h-5 bg-white rounded-full absolute top-0.5"
                    animate={{ right: notifications.vibration ? '0.5rem' : '2rem' }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </div>
              </motion.div>
            </>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Settings; 