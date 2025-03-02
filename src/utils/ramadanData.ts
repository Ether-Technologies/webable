import moment from "moment";
import { PrayerTimesType } from "./prayerCalculations";

// Cache for the ramadan data
let ramadanData: RamadanDay[] | null = null;

export interface RamadanDay {
  date: string;
  sehri_end: string;
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

/**
 * Fetch the Ramadan data from the JSON file
 * @returns Promise that resolves to the Ramadan data
 */
export const fetchRamadanData = async (): Promise<RamadanDay[]> => {
  if (ramadanData) {
    return ramadanData;
  }

  try {
    const response = await fetch('/api/ramadan');
    const data = await response.json();
    ramadanData = data;
    return data;
  } catch (error) {
    console.error("Failed to fetch Ramadan data:", error);
    throw error;
  }
};

/**
 * Check if the current date is within Ramadan
 * @returns Boolean indicating whether today is in Ramadan
 */
export const isRamadan = (date: Date = new Date()): boolean => {
  const currentDate = moment(date).format('YYYY-MM-DD');
  
  // We need to load the data and check
  if (!ramadanData) {
    return false;
  }
  
  // Check if current date is in the Ramadan data range
  return ramadanData.some(day => day.date === currentDate);
};

/**
 * Get the prayer times for a specific date from Ramadan data
 * @param date The date to get prayer times for
 * @returns Prayer times for the specified date or null if not in Ramadan
 */
export const getRamadanPrayerTimes = (date: Date = new Date()): PrayerTimesType | null => {
  const currentDate = moment(date).format('YYYY-MM-DD');
  
  if (!ramadanData) {
    return null;
  }
  
  const dayData = ramadanData.find(day => day.date === currentDate);
  
  if (!dayData) {
    return null;
  }
  
  return {
    fajr: moment(dayData.fajr, 'hh:mm A').format('HH:mm'),
    sunrise: moment(dayData.sunrise, 'hh:mm A').format('HH:mm'),
    dhuhr: moment(dayData.dhuhr, 'hh:mm A').format('HH:mm'),
    asr: moment(dayData.asr, 'hh:mm A').format('HH:mm'),
    maghrib: moment(dayData.maghrib, 'hh:mm A').format('HH:mm'),
    isha: moment(dayData.isha, 'hh:mm A').format('HH:mm'),
    sehri: moment(dayData.sehri_end, 'hh:mm A').format('HH:mm'),
    iftar: moment(dayData.maghrib, 'hh:mm A').format('HH:mm')
  };
}; 