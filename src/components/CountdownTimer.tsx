import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import moment from 'moment';
import { Translation } from '@/data/translations';

interface CountdownTimerProps {
  targetTime: string;
  event: 'iftar' | 'sehri';
  translations: Translation;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetTime,
  event,
  translations
}) => {
  const [timeLeft, setTimeLeft] = useState({
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = moment();
      const target = moment(targetTime, "HH:mm");
      const diff = moment.duration(target.diff(now));
      
      setTimeLeft({
        minutes: diff.minutes(),
        seconds: diff.seconds()
      });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, [targetTime]);

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="flex flex-col items-center"
    >
      <motion.div 
        className="text-7xl font-bold text-white flex items-center justify-center"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ 
          repeat: Infinity, 
          duration: 2,
          ease: "easeInOut"
        }}
      >
        {timeLeft.minutes.toString().padStart(2, '0')}:
        {timeLeft.seconds.toString().padStart(2, '0')}
      </motion.div>
      
      <motion.div 
        className="mt-2 text-white/80 text-lg"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {translations.ui.untilEvent.replace('{event}', translations.prayerNames[event.toLowerCase()])}
      </motion.div>
    </motion.div>
  );
};

export default CountdownTimer; 