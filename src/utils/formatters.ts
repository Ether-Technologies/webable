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

export const convertToBengaliNumerals = (text: string): string => {
  return text.split('').map(char => bengaliNumerals[char] || char).join('');
};

export const formatTime = (time: string, language: string = 'en'): string => {
  if (!time) return '';
  
  // Convert 24h to 12h format
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? translations[language].ui.pm : translations[language].ui.am;
  const hours12 = hours % 12 || 12;
  const formattedTime = `${hours12.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
  
  // Convert to Bengali if needed
  if (language === 'bn') {
    return convertToBengaliNumerals(formattedTime.replace(period, '')) + ' ' + period;
  }
  
  return formattedTime;
}; 