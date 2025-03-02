"use client";

import React from "react";
import { PrayerTimesType } from "@/utils/prayerCalculations";
import { Sunrise, Sun, Sunset, Moon } from "lucide-react";
import { Translation } from "@/data/translations";
import moment from "moment";

interface PrayerItemProps {
  name: string;
  time: string;
  icon: React.ReactNode;
  active: boolean;
  translations: Translation;
}

const PrayerItem: React.FC<PrayerItemProps> = ({ 
  name, 
  time, 
  icon, 
  active,
  translations
}) => {
  const translatedName = translations.prayerNames[name.toLowerCase()];
  
  return (
    <div 
      className={`mb-4 p-6 rounded-2xl ${
        active ? "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white" : "bg-white text-gray-800"
      }`}
    >
      <div className="grid grid-cols-3 items-center">
        <div className={`flex justify-center p-2 rounded-full ${
          active ? "text-yellow-500 bg-emerald-600" : "text-emerald-600"
        }`}>
          {React.cloneElement(icon as React.ReactElement, { size: 32 })}
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold">{translatedName}</div>
        </div>
        
        <div className="text-right">
          <div className={`text-2xl font-bold ${
            active ? "text-white" : "text-emerald-600"
          }`}>
            {time}
          </div>
        </div>
      </div>
    </div>
  );
};

interface PrayerListProps {
  prayerTimes: PrayerTimesType;
  currentPrayer: string;
  translations: Translation;
}

const PrayerList: React.FC<PrayerListProps> = ({ prayerTimes, currentPrayer, translations }) => {
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
    <div className="px-4 py-6 bg-gray-100 rounded-3xl mt-2 w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{translations.ui.prayerTimes}</h2>
        <div className="text-lg font-medium text-emerald-800">
          {translations.ui.today}
        </div>
      </div>
      
      <div>
        {futurePrayers.map((prayer) => (
          <PrayerItem
            key={prayer.name}
            name={prayer.name}
            time={prayer.time || ""}
            icon={prayer.icon}
            active={prayer.name === currentPrayer}
            translations={translations}
          />
        ))}
      </div>
    </div>
  );
};

export default PrayerList; 