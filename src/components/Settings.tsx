"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { City } from "@/data/prayerTimes";
import { X, MapPin, Bell, Globe } from "lucide-react";
import { Translation } from "@/data/translations";

interface SettingsProps {
  show: boolean;
  onClose: () => void;
  cities: City[];
  selectedCity: string;
  onCityChange: (cityName: string) => void;
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
  translations: Translation;
}

const Settings: React.FC<SettingsProps> = ({
  show,
  onClose,
  cities,
  selectedCity,
  onCityChange,
  selectedLanguage,
  onLanguageChange,
  translations
}) => {
  if (!show) return null;

  const languages = [
    { code: "en", name: "English" },
    { code: "bn", name: "বাংলা" }
  ];

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

          <motion.div 
            whileHover={{ x: 5 }}
            className="flex justify-between items-center p-3 border-b border-white/20"
          >
            <div className="flex items-center">
              <Bell size={18} className="mr-2" />
              <span>{translations.ui.notifications}</span>
            </div>
            <div className="w-12 h-6 bg-emerald-700 rounded-full relative cursor-pointer">
              <motion.div 
                className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Settings; 