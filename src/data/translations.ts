export interface Translation {
  prayerNames: {
    [key: string]: string;
  };
  ui: {
    [key: string]: string;
  };
}

export interface Translations {
  [key: string]: Translation;
}

const translations: Translations = {
  en: {
    prayerNames: {
      sehri: "Sehri",
      fajr: "Fajr",
      sunrise: "Sunrise",
      dhuhr: "Dhuhr",
      asr: "Asr",
      maghrib: "Maghrib",
      iftar: "Iftar",
      isha: "Isha"
    },
    ui: {
      timeRemaining: "Time Remaining",
      prayerTimes: "Prayer Times",
      settings: "Settings",
      city: "City",
      language: "Language",
      notifications: "Notifications",
      today: "Today",
      untilEvent: "Until {event}",
      notifyBefore: "Notify before {event}",
      soundOn: "Sound On",
      soundOff: "Sound Off",
      vibrationOn: "Vibration On",
      vibrationOff: "Vibration Off",
      qiblaDirection: "Qibla Direction",
      saveSettings: "Save Settings",
      settingsSaved: "Settings saved successfully",
      hours: "HRS",
      minutes: "MIN",
      seconds: "SEC",
      am: "AM",
      pm: "PM"
    }
  },
  bn: {
    prayerNames: {
      sehri: "সেহরি",
      fajr: "ফজর",
      sunrise: "সূর্যোদয়",
      dhuhr: "যোহর",
      asr: "আসর",
      maghrib: "মাগরিব",
      iftar: "ইফতার",
      isha: "এশা"
    },
    ui: {
      timeRemaining: "বাকি সময়",
      prayerTimes: "নামাজের সময়সূচী",
      settings: "সেটিংস",
      city: "শহর",
      language: "ভাষা",
      notifications: "নোটিফিকেশন",
      today: "আজ",
      untilEvent: "{event} এর জন্য বাকি",
      notifyBefore: "{event} এর আগে নোটিফিকেশন",
      soundOn: "শব্দ চালু",
      soundOff: "শব্দ বন্ধ",
      vibrationOn: "ভাইব্রেশন চালু",
      vibrationOff: "ভাইব্রেশন বন্ধ",
      qiblaDirection: "কিবলার দিক",
      saveSettings: "সেটিংস সংরক্ষণ করুন",
      settingsSaved: "সেটিংস সফলভাবে সংরক্ষিত হয়েছে",
      hours: "ঘণ্টা",
      minutes: "মিনিট",
      seconds: "সেকেন্ড",
      am: "সকাল",
      pm: "বিকাল"
    }
  }
};

export default translations; 