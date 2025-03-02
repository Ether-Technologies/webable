"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Sunrise, Sunset } from "lucide-react";
import { Translation } from "@/data/translations";

interface CurrentTimeProps {
  city: string;
  country: string;
  sehriTime: string;
  iftarTime: string;
  isBeforeIftar: boolean;
  translations: Translation;
}

const CurrentTime: React.FC<CurrentTimeProps> = ({ 
  city, 
  country, 
  sehriTime,
  iftarTime,
  isBeforeIftar,
  translations
}) => {
  const mainTime = isBeforeIftar ? iftarTime : sehriTime;
  const secondaryTime = isBeforeIftar ? sehriTime : iftarTime;
  const mainLabel = isBeforeIftar ? translations.prayerNames.iftar : translations.prayerNames.sehri;
  const secondaryLabel = isBeforeIftar ? translations.prayerNames.sehri : translations.prayerNames.iftar;

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
      
      <motion.div 
        className="text-6xl font-bold text-white flex items-center"
        key={mainTime}
      >
        {isBeforeIftar ? <Sunset size={36} className="mr-2 text-orange-400" /> : <Sunrise size={36} className="mr-2 text-yellow-400" />}
        {mainTime}
      </motion.div>
      
      <motion.div 
        className="bg-emerald-600 text-white px-4 py-1 rounded-full mt-3 text-sm flex items-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {mainLabel}
      </motion.div>

      <motion.div 
        className="mt-4 text-white/80 text-sm flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <span className="mr-2">{translations.ui.today}</span>
        {isBeforeIftar ? <Sunrise size={14} className="mr-1 text-yellow-400" /> : <Sunset size={14} className="mr-1 text-orange-400" />}
        <span>{secondaryLabel}: {secondaryTime}</span>
      </motion.div>
    </motion.div>
  );
};

export default CurrentTime; 