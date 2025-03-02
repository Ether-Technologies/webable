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
      today: "Today"
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
      today: "আজ"
    }
  }
};

export default translations; 