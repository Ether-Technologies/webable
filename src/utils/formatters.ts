import translations from '@/data/translations';

const bengaliNumerals: { [key: string]: string } = {
  '0': '০',
  '1': '১',
  '2': '২',
  '3': '৩',
  '4': '৪',
  '5': '৫',
  '6': '৬',
  '7': '৭',
  '8': '৮',
  '9': '৯',
  ':': ':',
  ' ': ' '
};

const bengaliTimePeriods: { [key: string]: string } = {
  'fajr': 'ভোর',
  'morning': 'বেলা',
  'afternoon': 'বেলা',
  'evening': 'বিকেল',
  'night': 'সন্ধ্যা'
};

export const convertToBengaliNumerals = (text: string): string => {
  return text.split('').map(char => bengaliNumerals[char] || char).join('');
};

const getTimePeriod = (hours: number, prayer?: string): string => {
  if (prayer === 'fajr') return bengaliTimePeriods.fajr;
  if (hours >= 15 && hours < 18) return bengaliTimePeriods.evening; // Asr to Maghrib
  if (hours >= 18 && hours < 20) return bengaliTimePeriods.night; // Maghrib to Isha
  if (hours >= 4 && hours < 15) return bengaliTimePeriods.morning; // Morning to Asr
  return bengaliTimePeriods.night; // Isha onwards
};

export const formatTime = (time: string, language: string = 'en', prayer?: string): string => {
  if (!time) return '';
  
  // Convert 24h to 12h format
  const [hours, minutes] = time.split(':').map(Number);
  const hours12 = hours % 12 || 12;
  
  if (language === 'bn') {
    const timePeriod = getTimePeriod(hours, prayer);
    const formattedHours = convertToBengaliNumerals(hours12.toString());
    const formattedMinutes = convertToBengaliNumerals(minutes.toString().padStart(2, '0'));
    return `${timePeriod} ${formattedHours}:${formattedMinutes}`;
  }
  
  // English format
  const period = hours >= 12 ? translations[language].ui.pm : translations[language].ui.am;
  return `${hours12.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
}; 