"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock, MapPin } from "lucide-react";

interface CurrentTimeProps {
  city: string;
  country: string;
  currentPrayer: string;
  currentTime: string;
}

const CurrentTime: React.FC<CurrentTimeProps> = ({ 
  city, 
  country, 
  currentPrayer,
  currentTime 
}) => {
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
        key={currentTime}
      >
        <Clock size={24} className="mr-2" />
        {currentTime.substring(0, 5)}
        <span className="text-2xl ml-1">{currentTime.substring(6, 8)}</span>
      </motion.div>
      
      <motion.div 
        className="bg-red-600 text-white px-4 py-1 rounded-full mt-3 text-sm flex items-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        
      >
        {currentPrayer} Time
      </motion.div>
    </motion.div>
  );
};

export default CurrentTime; 