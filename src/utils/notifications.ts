import { Translation } from "@/data/translations";

export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications");
    return false;
  }

  if (Notification.permission === "granted") {
    return true;
  }

  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    return permission === "granted";
  }

  return false;
};

export const showNotification = (
  title: string,
  body: string,
  options: { sound?: boolean; vibration?: boolean } = {}
) => {
  if (!("Notification" in window) || Notification.permission !== "granted") {
    return;
  }

  // Show notification
  const notification = new Notification(title, {
    body,
    icon: "/icon.png", // Make sure to add an icon
    silent: !options.sound,
  });

  // Play sound if enabled
  if (options.sound) {
    const audio = new Audio("/notification.mp3"); // Make sure to add a sound file
    audio.play().catch(console.error);
  }

  // Vibrate if enabled and supported
  if (options.vibration && "vibrate" in navigator) {
    navigator.vibrate([200, 100, 200]);
  }

  return notification;
};

export const scheduleNotification = (
  time: string,
  event: string,
  translations: Translation,
  options: { sound?: boolean; vibration?: boolean } = {}
) => {
  const now = new Date();
  const [hours, minutes] = time.split(":").map(Number);
  const scheduledTime = new Date(now);
  
  scheduledTime.setHours(hours, minutes, 0, 0);
  
  // If the time has passed today, schedule for tomorrow
  if (scheduledTime < now) {
    scheduledTime.setDate(scheduledTime.getDate() + 1);
  }

  const timeUntilNotification = scheduledTime.getTime() - now.getTime();
  
  setTimeout(() => {
    showNotification(
      translations.prayerNames[event.toLowerCase()],
      translations.ui.notifyBefore.replace("{event}", translations.prayerNames[event.toLowerCase()]),
      options
    );
  }, timeUntilNotification);

  return scheduledTime;
}; 