declare module 'adhan' {
  export class Coordinates {
    constructor(latitude: number, longitude: number);
  }
  
  export class PrayerTimes {
    constructor(coordinates: Coordinates, date: Date, params: CalculationParameters);
    fajr: Date;
    sunrise: Date;
    dhuhr: Date;
    asr: Date;
    maghrib: Date;
    isha: Date;
  }
  
  export class CalculationParameters {
    madhab: number;
  }
  
  export class CalculationMethod {
    static Karachi(): CalculationParameters;
  }
  
  export class Madhab {
    static Hanafi: number;
  }
} 