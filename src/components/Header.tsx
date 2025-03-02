"use client";

import React from "react";
import { motion } from "framer-motion";
import { Settings } from "lucide-react";
import Image from "next/image";

interface HeaderProps {
  onSettingsClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSettingsClick }) => {
  return (
    <header className="flex justify-between items-center p-4 text-white">
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        <Image
          src="/Logo.svg"
          alt="Logo"
        width={150}
          height={100}
        />
      </motion.div>
      <motion.button 
        whileHover={{ rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        className="bg-transparent border-none text-white cursor-pointer p-2 rounded-full hover:bg-white/10"
        onClick={onSettingsClick}
      >
        <Settings size={20} />
      </motion.button>
    </header>
  );
};

export default Header; 