"use client";

import React, { useState, useEffect } from "react";
import { PrayerTimesType } from "@/utils/prayerCalculations";
import { Sunrise, Sun, Sunset, Moon } from "lucide-react";
import { Translation } from "@/data/translations";
import moment from "moment";
import { motion } from "framer-motion";
import { formatTime } from "@/utils/formatters";

interface PrayerItemProps {
  name: string;
  time: string;
  icon: React.ReactNode;
  active: boolean;
  translations: Translation;
  language: string;
}

const PrayerItem: React.FC<PrayerItemProps> = ({ 
  name, 
  time, 
  icon, 
  active,
  translations,
  language
}) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const translatedName = translations.prayerNames[name.toLowerCase()];
  const formattedTime = formatTime(time, language, name.toLowerCase());
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={`mb-4 p-6 rounded-2xl transition-all duration-300 ${
        active 
          ? "bg-primary-gradient text-on-primary shadow-lg shadow-primary/20" 
          : "bg-surface hover:bg-surface/90 text-text-primary"
      }`}
    >
      <div className="grid grid-cols-[auto,1fr,auto] gap-4 items-center">
        <div className={`flex justify-center p-3 rounded-xl ${
          active 
            ? "bg-primary-dark/30 text-secondary" 
            : "bg-primary-light/10 text-primary"
        }`}>
          {React.cloneElement(icon as React.ReactElement, { 
            size: 32,
            className: "transition-transform duration-300 transform group-hover:scale-110" 
          })}
        </div>
        
        <div className="flex flex-col">
          <div className="text-2xl md:text-3xl font-bold tracking-tight">
            {mounted ? translatedName : name}
          </div>
        </div>
        
        <div className="text-right">
          <div className={`text-2xl md:text-3xl font-bold tracking-tight ${
            active ? "text-on-primary" : "text-primary"
          }`}>
            {mounted ? formattedTime : time}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface PrayerListProps {
  prayerTimes: PrayerTimesType;
  currentPrayer: string;
  translations: Translation;
  language: string;
}

const PrayerList: React.FC<PrayerListProps> = ({ 
  prayerTimes, 
  currentPrayer, 
  translations,
  language
}) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const now = moment();
  
  const prayers = [
    { name: "Fajr", icon: <Sunrise />, time: prayerTimes.fajr },
    { name: "Dhuhr", icon: <Sun />, time: prayerTimes.dhuhr },
    { name: "Asr", icon: <Sun />, time: prayerTimes.asr },
    { name: "Maghrib", icon: <Sunset />, time: prayerTimes.maghrib },
    { name: "Isha", icon: <Moon />, time: prayerTimes.isha }
  ];

  // Filter out past prayers based on current prayer
  const currentPrayerIndex = prayers.findIndex(p => p.name === currentPrayer);
  const futurePrayers = prayers.filter((_, index) => {
    if (currentPrayer === "Isha") {
      return true; // Show all prayers after Isha for next day
    }
    return index >= currentPrayerIndex - 1; // Show current prayer and future prayers
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-4 py-6 bg-surface-transparent backdrop-blur-md rounded-3xl mt-2 w-full shadow-xl"
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-text-primary tracking-tight">
          {mounted ? translations.ui.prayerTimes : "Prayer Times"}
        </h2>
        <div className="text-base md:text-lg font-medium text-primary bg-primary-light/10 px-4 py-1 rounded-full">
          {mounted ? translations.ui.today : "Today"}
        </div>
      </div>
      
      <div className="space-y-4">
        {futurePrayers.map((prayer, index) => (
          <motion.div
            key={prayer.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { delay: index * 0.1 }
            }}
          >
            <PrayerItem
              name={prayer.name}
              time={prayer.time || ""}
              icon={prayer.icon}
              active={prayer.name === currentPrayer}
              translations={translations}
              language={language}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PrayerList; 