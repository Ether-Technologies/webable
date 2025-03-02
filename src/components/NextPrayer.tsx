"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import moment from "moment";
import { PrayerTimesType } from "@/utils/prayerCalculations";
import { Sunrise, Sunset, Sun, Moon, Clock, AlertCircle } from "lucide-react";

interface NextPrayerProps {
  currentPrayer: string;
  nextPrayer: string;
  prayerTimes: PrayerTimesType;
  timeRemaining?: moment.Duration;
}

const NextPrayer: React.FC<NextPrayerProps> = ({ 
  currentPrayer, 
  nextPrayer, 
  prayerTimes,
  timeRemaining 
}) => {
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const updateCountdown = () => {
      // Calculate time remaining directly
      const now = moment();
      let nextTime;
      
      if (prayerTimes[nextPrayer.toLowerCase() as keyof PrayerTimesType]) {
        nextTime = moment(prayerTimes[nextPrayer.toLowerCase() as keyof PrayerTimesType], "HH:mm");
        
        // If next prayer is tomorrow (e.g., current prayer is Isha and next is Fajr)
        if (now.isAfter(nextTime)) {
          nextTime.add(1, 'day');
        }
        
        const diff = moment.duration(nextTime.diff(now));
        
        // Update countdown values
        setHours(Math.floor(diff.asHours()).toString().padStart(2, '0'));
        setMinutes(diff.minutes().toString().padStart(2, '0'));
        setSeconds(diff.seconds().toString().padStart(2, '0'));
        
        // Calculate progress percentage
        const totalSeconds = diff.asSeconds();
        const maxSeconds = 5 * 60 * 60; // 5 hours max
        const percentage = Math.min(100, (totalSeconds / maxSeconds) * 100);
        setProgress(percentage);
      }
    };

    // Initial update
    updateCountdown();
    
    // Update every second
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [nextPrayer, prayerTimes]);

  const getIcon = (prayer: string) => {
    switch (prayer) {
      case "Fajr":
        return <Sunrise className="text-yellow-300" />;
      case "Dhuhr":
        return <Sun className="text-yellow-500" />;
      case "Asr":
        return <Sun className="text-orange-400" />;
      case "Maghrib":
        return <Sunset className="text-orange-600" />;
      case "Isha":
        return <Moon className="text-blue-200" />;
      default:
        return <Clock />;
    }
  };

  const getCurrentPrayerTime = (): string => {
    const key = currentPrayer.toLowerCase() as keyof PrayerTimesType;
    return prayerTimes[key] || "";
  };

  const getNextPrayerTime = (): string => {
    const key = nextPrayer.toLowerCase() as keyof PrayerTimesType;
    return prayerTimes[key] || "";
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mx-4 mb-4"
    >
      {/* Progress bar */}
      <div className="relative h-1 bg-emerald-900/30 rounded-full mb-4 overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-emerald-300"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="flex justify-between items-center p-4 text-white bg-emerald-800/50 rounded-lg shadow-lg">
        <div className="flex items-center">
          <div className="mr-3 p-2 bg-emerald-900/50 rounded-full">
            {getIcon(currentPrayer)}
          </div>
          <div>
            <div className="font-medium">{currentPrayer}</div>
            <div className="text-sm opacity-80">{getCurrentPrayerTime()}</div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-xs mb-1 flex items-center">
            <AlertCircle size={12} className="mr-1" />
            <span>Next Prayer In</span>
          </div>
          
          <div className="flex items-center justify-center gap-1">
            <div className="flex flex-col items-center">
              <div className="bg-emerald-900/70 w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-lg sm:text-xl font-bold">
                {hours}
              </div>
              <div className="text-[8px] sm:text-[10px] mt-1">HRS</div>
            </div>
            <div className="text-lg sm:text-xl font-bold">:</div>
            <div className="flex flex-col items-center">
              <div className="bg-emerald-900/70 w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-lg sm:text-xl font-bold">
                {minutes}
              </div>
              <div className="text-[8px] sm:text-[10px] mt-1">MIN</div>
            </div>
            <div className="text-lg sm:text-xl font-bold">:</div>
            <div className="flex flex-col items-center">
              <div className="bg-emerald-900/70 w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-lg sm:text-xl font-bold">
                {seconds}
              </div>
              <div className="text-[8px] sm:text-[10px] mt-1">SEC</div>
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <div className="text-right">
            <div className="font-medium">{nextPrayer}</div>
            <div className="text-sm opacity-80">{getNextPrayerTime()}</div>
          </div>
          <div className="ml-3 p-2 bg-emerald-900/50 rounded-full">
            {getIcon(nextPrayer)}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NextPrayer; 