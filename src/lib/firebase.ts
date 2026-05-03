import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// This will be populated with your details later
const firebaseConfig = {
  apiKey: "PLACEHOLDER",
  authDomain: "PLACEHOLDER",
  projectId: "PLACEHOLDER",
  storageBucket: "PLACEHOLDER",
  messagingSenderId: "PLACEHOLDER",
  appId: "PLACEHOLDER",
  measurementId: "PLACEHOLDER"
};

// Initialize Firebase (conditionally to avoid errors before config is provided)
let app;
let db: any = null;
let storage: any = null;
let analytics: any = null;

if (firebaseConfig.apiKey !== "PLACEHOLDER") {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  storage = getStorage(app);
  analytics = getAnalytics(app);
}

export { db, storage, analytics };
