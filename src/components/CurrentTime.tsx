"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Sunrise, Sunset } from "lucide-react";
import { Translation } from "@/data/translations";
import moment from "moment";
import CountdownTimer from "./CountdownTimer";

interface CurrentTimeProps {
  city: string;
  country: string;
  sehriTime: string;
  iftarTime: string;
  isBeforeIftar: boolean;
  translations: Translation;
}

const COUNTDOWN_THRESHOLD_MINUTES = 2;

const CurrentTime: React.FC<CurrentTimeProps> = ({ 
  city, 
  country, 
  sehriTime,
  iftarTime,
  isBeforeIftar,
  translations
}) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const mainTime = isBeforeIftar ? iftarTime : sehriTime;
  const secondaryTime = isBeforeIftar ? sehriTime : iftarTime;
  const mainLabel = isBeforeIftar ? translations.prayerNames.iftar : translations.prayerNames.sehri;
  const secondaryLabel = isBeforeIftar ? translations.prayerNames.sehri : translations.prayerNames.iftar;

  const showCountdown = useMemo(() => {
    if (!mainTime) return false;
    const timeToEvent = moment(mainTime, "HH:mm").diff(moment(), 'minutes');
    return timeToEvent <= COUNTDOWN_THRESHOLD_MINUTES && timeToEvent > 0;
  }, [mainTime]);

  if (!mounted) {
    return (
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col items-center py-5"
      >
        <div className="flex items-center text-lg text-white mb-1">
          <MapPin size={16} className="mr-1" />
          <span>{city}, {country}</span>
        </div>
        
        <div className="h-32" /> {/* Placeholder height */}
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="flex flex-col items-center py-5"
    >
      <div className="flex items-center text-lg text-white mb-1">
        <MapPin size={16} className="mr-1" />
        <span>{city}, {country}</span>
      </div>
      
      {showCountdown ? (
        <CountdownTimer
          targetTime={mainTime}
          event={isBeforeIftar ? "iftar" : "sehri"}
          translations={translations}
        />
      ) : (
        <>
          <motion.div 
            className="text-6xl font-bold text-white flex items-center"
            key={mainTime}
          >
            {isBeforeIftar ? 
              <Sunset size={36} className="mr-2 text-orange-400" /> : 
              <Sunrise size={36} className="mr-2 text-yellow-400" />
            }
            {mainTime}
          </motion.div>
          
          <motion.div 
            className="bg-emerald-600 text-white px-4 py-1 rounded-full mt-3 text-sm flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {mainLabel}
          </motion.div>
        </>
      )}

      <motion.div 
        className="mt-4 text-white/80 text-sm flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <span className="mr-2">{translations.ui.today}</span>
        {isBeforeIftar ? 
          <Sunrise size={14} className="mr-1 text-yellow-400" /> : 
          <Sunset size={14} className="mr-1 text-orange-400" />
        }
        <span>{secondaryLabel}: {secondaryTime}</span>
      </motion.div>
    </motion.div>
  );
};

export default CurrentTime; 