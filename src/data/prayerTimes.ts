export interface City {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export interface PrayerTimesData {
  cities: City[];
}

const prayerData: PrayerTimesData = {
  cities: [
    {
      name: "Dhaka",
      country: "Bangladesh",
      latitude: 23.8103,
      longitude: 90.4125,
      timezone: "Asia/Dhaka"
    },
    {
      name: "Chittagong",
      country: "Bangladesh",
      latitude: 22.3569,
      longitude: 91.7832,
      timezone: "Asia/Dhaka"
    },
    {
      name: "Sylhet",
      country: "Bangladesh",
      latitude: 24.8949,
      longitude: 91.8687,
      timezone: "Asia/Dhaka"
    }
  ]
};

export default prayerData; 