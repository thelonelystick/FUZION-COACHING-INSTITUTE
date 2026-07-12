import { getAnalytics, isSupported } from "firebase/analytics";
import { getApp, getApps, initializeApp, type FirebaseApp, type FirebaseOptions } from "firebase/app";

const env = import.meta.env;

const firebaseConfig: FirebaseOptions = {
  apiKey: env.VITE_FIREBASE_API_KEY || "AIzaSyBExHnrcKAm8Lz25ZXlQJrFpFsuaMJe4wM",
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || "fuzion-coaching-institute.firebaseapp.com",
  projectId: env.VITE_FIREBASE_PROJECT_ID || "fuzion-coaching-institute",
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || "fuzion-coaching-institute.firebasestorage.app",
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || "629429740936",
  appId: env.VITE_FIREBASE_APP_ID || "1:629429740936:web:d5ccc319b4f2aca345863d",
  measurementId: env.VITE_FIREBASE_MEASUREMENT_ID || "G-0M3668CMN2",
};

const requiredKeys: Array<keyof FirebaseOptions> = ["apiKey", "authDomain", "projectId", "storageBucket", "messagingSenderId", "appId"];
const missingKeys = requiredKeys.filter((key) => !firebaseConfig[key]);

export const isFirebaseConfigured = missingKeys.length === 0;

export const app: FirebaseApp | null = isFirebaseConfigured
  ? getApps().length > 0
    ? getApp()
    : initializeApp(firebaseConfig)
  : null;

if (!isFirebaseConfigured) {
  console.warn("Firebase configuration is incomplete. Missing:", missingKeys.join(", "));
}

export const analytics = async () => {
  if (!app) {
    return null;
  }

  if (await isSupported()) {
    return getAnalytics(app);
  }

  return null;
};
