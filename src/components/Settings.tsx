"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { City } from "@/data/prayerTimes";
import { X, MapPin, Bell, Palette } from "lucide-react";

interface SettingsProps {
  show: boolean;
  onClose: () => void;
  cities: City[];
  selectedCity: string;
  onCityChange: (cityName: string) => void;
}

const Settings: React.FC<SettingsProps> = ({
  show,
  onClose,
  cities,
  selectedCity,
  onCityChange
}) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 z-50 flex flex-col p-5 text-white"
        >
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex justify-between items-center mb-6"
          >
            <h2 className="text-xl font-bold m-0">Settings</h2>
            <motion.button
              whileHover={{ rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="bg-transparent border-none text-white text-2xl cursor-pointer p-2 rounded-full hover:bg-white/10"
            >
              <X size={24} />
            </motion.button>
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            <div className="flex justify-between items-center p-3 border-b border-white/20">
              <div className="flex items-center">
                <MapPin size={18} className="mr-2" />
                <span>City</span>
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

            <motion.div 
              whileHover={{ x: 5 }}
              className="flex justify-between items-center p-3 border-b border-white/20"
            >
              <div className="flex items-center">
                <Bell size={18} className="mr-2" />
                <span>Notifications</span>
              </div>
              <div className="w-12 h-6 bg-emerald-700 rounded-full relative cursor-pointer">
                <motion.div 
                  className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                />
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ x: 5 }}
              className="flex justify-between items-center p-3 border-b border-white/20"
            >
              <div className="flex items-center">
                <Palette size={18} className="mr-2" />
                <span>Theme</span>
              </div>
              <div className="flex gap-2">
                <motion.div 
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-6 h-6 bg-emerald-600 rounded-full cursor-pointer"
                />
                <motion.div 
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-6 h-6 bg-blue-600 rounded-full cursor-pointer"
                />
                <motion.div 
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-6 h-6 bg-purple-600 rounded-full cursor-pointer"
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Settings; 