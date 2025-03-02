"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { PrayerTimesType } from "@/utils/prayerCalculations";
import { Duration } from "moment";
import { Translation } from "@/data/translations";
import { formatTime, convertToBengaliNumerals } from "@/utils/formatters";

interface NextPrayerProps {
  currentPrayer: string;
  nextPrayer: string;
  prayerTimes: PrayerTimesType;
  timeRemaining?: Duration;
  translations: Translation;
  language: string;
}

const NextPrayer: React.FC<NextPrayerProps> = ({
  currentPrayer,
  nextPrayer,
  prayerTimes,
  timeRemaining,
  translations,
  language
}) => {
  if (!timeRemaining) return null;

  const formatNumber = (num: number): string => {
    const formatted = num.toString().padStart(2, '0');
    return language === 'bn' ? convertToBengaliNumerals(formatted) : formatted;
  };

  const hours = Math.floor(timeRemaining.asHours());
  const minutes = timeRemaining.minutes();
  const seconds = timeRemaining.seconds();

  const progress = ((hours * 3600 + minutes * 60 + seconds) / (24 * 3600)) * 100;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mx-4 mb-4"
    >
      {/* Progress bar */}
      <div className="relative h-1 bg-primary-dark/30 rounded-full mb-4 overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-primary-light"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="flex justify-between items-center p-4 text-on-primary bg-primary-dark/50 rounded-lg shadow-lg backdrop-blur-sm">
        <div className="flex items-center">
          <div className="mr-3 p-2 bg-primary-dark/50 rounded-full">
            <AlertCircle className="text-secondary" size={24} />
          </div>
          <div>
            <div className="font-medium">{translations.prayerNames[nextPrayer.toLowerCase()]}</div>
            <div className="text-sm opacity-80">
              {formatTime(prayerTimes[nextPrayer.toLowerCase() as keyof PrayerTimesType], language)}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-xs mb-1 flex items-center">
            <AlertCircle size={12} className="mr-1" />
            <span>{translations.ui.timeRemaining}</span>
          </div>
          
          <div className="flex items-center justify-center gap-1">
            <div className="flex flex-col items-center">
              <div className="bg-primary-dark/70 w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-lg sm:text-xl font-bold">
                {formatNumber(hours)}
              </div>
              <div className="text-[8px] sm:text-[10px] mt-1 opacity-80">{translations.ui.hours}</div>
            </div>
            <div className="text-lg sm:text-xl font-bold">:</div>
            <div className="flex flex-col items-center">
              <div className="bg-primary-dark/70 w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-lg sm:text-xl font-bold">
                {formatNumber(minutes)}
              </div>
              <div className="text-[8px] sm:text-[10px] mt-1 opacity-80">{translations.ui.minutes}</div>
            </div>
            <div className="text-lg sm:text-xl font-bold">:</div>
            <div className="flex flex-col items-center">
              <div className="bg-primary-dark/70 w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-lg sm:text-xl font-bold">
                {formatNumber(seconds)}
              </div>
              <div className="text-[8px] sm:text-[10px] mt-1 opacity-80">{translations.ui.seconds}</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NextPrayer; 