import { PrayerTimes, Coordinates, CalculationMethod, Madhab } from "adhan";
import moment from "moment";

export interface PrayerTimesType {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

export interface PrayerInfo {
  current: string;
  next: string;
  nextTime?: moment.Moment;
  timeRemaining?: moment.Duration;
}

export const getPrayerTimes = (latitude: number, longitude: number, date: Date = new Date()): PrayerTimesType => {
  const coordinates = new Coordinates(latitude, longitude);
  // Using Hanafi calculation method which is common in Bangladesh
  const params = CalculationMethod.Karachi();
  params.madhab = Madhab.Hanafi;
  
  const prayerTimes = new PrayerTimes(coordinates, date, params);
  
  return {
    fajr: moment(prayerTimes.fajr).format("HH:mm"),
    sunrise: moment(prayerTimes.sunrise).format("HH:mm"),
    dhuhr: moment(prayerTimes.dhuhr).format("HH:mm"),
    asr: moment(prayerTimes.asr).format("HH:mm"),
    maghrib: moment(prayerTimes.maghrib).format("HH:mm"),
    isha: moment(prayerTimes.isha).format("HH:mm")
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

  // Find the next prayer
  for (let i = 0; i < prayers.length; i++) {
    if (now.isBefore(prayers[i].time)) {
      return {
        current: i === 0 ? prayers[prayers.length - 1].name : prayers[i - 1].name,
        next: prayers[i].name,
        nextTime: prayers[i].time,
        timeRemaining: moment.duration(prayers[i].time.diff(now))
      };
    }
  }

  // If we're after the last prayer of the day
  return {
    current: prayers[prayers.length - 1].name,
    next: prayers[0].name,
    nextTime: prayers[0].time.add(1, "day"),
    timeRemaining: moment.duration(prayers[0].time.add(1, "day").diff(now))
  };
};

export const formatTimeRemaining = (duration?: moment.Duration): string => {
  if (!duration) return "00:00:00";
  
  const hours = Math.floor(duration.asHours()).toString().padStart(2, "0");
  const minutes = duration.minutes().toString().padStart(2, "0");
  const seconds = duration.seconds().toString().padStart(2, "0");
  
  return `${hours}:${minutes}:${seconds}`;
}; 