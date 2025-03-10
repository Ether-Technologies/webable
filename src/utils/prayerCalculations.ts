import { PrayerTimes, Coordinates, CalculationMethod, Madhab } from "adhan";
import moment from "moment";
import { getRamadanPrayerTimes, isRamadan } from "./ramadanData";

export type PrayerName = 'fajr' | 'sunrise' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';

export interface PrayerTimesType {
  [key: string]: string;
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  sehri: string;
  iftar: string;
}

export interface PrayerInfo {
  current: string;
  next: string;
  nextTime?: moment.Moment;
  timeRemaining?: moment.Duration;
  isBeforeIftar: boolean;
}

export const getPrayerTimes = (latitude: number, longitude: number, date: Date = new Date()): PrayerTimesType => {
  // First check if we're in Ramadan and have specific data
  const ramadanTimes = getRamadanPrayerTimes(date);
  if (ramadanTimes) {
    return ramadanTimes;
  }

  // If not Ramadan or no Ramadan data available, calculate using adhan library
  const coordinates = new Coordinates(latitude, longitude);
  // Using Hanafi calculation method which is common in Bangladesh
  const params = CalculationMethod.Karachi();
  params.madhab = Madhab.Hanafi;
  
  const prayerTimes = new PrayerTimes(coordinates, date, params);
  
  // Sehri time is 10 minutes before Fajr
  const sehriTime = moment(prayerTimes.fajr).subtract(10, 'minutes');
  // Iftar time is same as Maghrib
  const iftarTime = moment(prayerTimes.maghrib);
  
  return {
    fajr: moment(prayerTimes.fajr).format("HH:mm"),
    sunrise: moment(prayerTimes.sunrise).format("HH:mm"),
    dhuhr: moment(prayerTimes.dhuhr).format("HH:mm"),
    asr: moment(prayerTimes.asr).format("HH:mm"),
    maghrib: moment(prayerTimes.maghrib).format("HH:mm"),
    isha: moment(prayerTimes.isha).format("HH:mm"),
    sehri: sehriTime.format("HH:mm"),
    iftar: iftarTime.format("HH:mm")
  };
};

export const getCurrentPrayer = (prayerTimes: PrayerTimesType): PrayerInfo => {
  const now = moment();
  const prayers = [
    { name: "Fajr", time: moment(prayerTimes.fajr, "HH:mm") },
    { name: "Dhuhr", time: moment(prayerTimes.dhuhr, "HH:mm") },
    { name: "Asr", time: moment(prayerTimes.asr, "HH:mm") },
    { name: "Maghrib", time: moment(prayerTimes.maghrib, "HH:mm") },
    { name: "Isha", time: moment(prayerTimes.isha, "HH:mm") }
  ];

  const iftarTime = moment(prayerTimes.iftar, "HH:mm");
  const isBeforeIftar = now.isBefore(iftarTime);

  // Find the next prayer
  for (let i = 0; i < prayers.length; i++) {
    if (now.isBefore(prayers[i].time)) {
      return {
        current: i === 0 ? prayers[prayers.length - 1].name : prayers[i - 1].name,
        next: prayers[i].name,
        nextTime: prayers[i].time,
        timeRemaining: moment.duration(prayers[i].time.diff(now)),
        isBeforeIftar
      };
    }
  }

  // If we're after the last prayer of the day
  return {
    current: prayers[prayers.length - 1].name,
    next: prayers[0].name,
    nextTime: prayers[0].time.add(1, "day"),
    timeRemaining: moment.duration(prayers[0].time.add(1, "day").diff(now)),
    isBeforeIftar
  };
};

export const formatTimeRemaining = (duration?: moment.Duration): string => {
  if (!duration) return "00:00:00";
  
  const hours = Math.floor(duration.asHours()).toString().padStart(2, "0");
  const minutes = duration.minutes().toString().padStart(2, "0");
  const seconds = duration.seconds().toString().padStart(2, "0");
  
  return `${hours}:${minutes}:${seconds}`;
};

// Function to check if today is Ramadan
export const isRamadanToday = (): boolean => {
  return isRamadan(new Date());
};

export const calculatePrayerTimes = (): PrayerTimesType => {
  // This is a placeholder implementation
  // In a real application, this would calculate prayer times based on location and date
  return {
    fajr: '04:15',
    sunrise: '05:45',
    dhuhr: '12:15',
    asr: '16:30',
    maghrib: '18:45',
    isha: '20:15',
    sehri: '04:05',
    iftar: '18:45'
  };
}; 