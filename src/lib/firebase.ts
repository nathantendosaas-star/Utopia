import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported, logEvent } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Analytics is only supported in some environments (client-side)
let analytics: any = null;

const initAnalytics = async () => {
  if (await isSupported()) {
    analytics = getAnalytics(app);
    return analytics;
  }
  return null;
};

const logAnalyticsEvent = async (name: string, params?: any) => {
  try {
    const instance = analytics || await initAnalytics();
    if (instance) {
      logEvent(instance, name, params);
    }
  } catch (err) {
    // Silently fail analytics
  }
};

export { db, analytics, auth, googleProvider, logAnalyticsEvent };
