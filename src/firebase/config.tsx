import { initializeApp } from 'firebase/app';
import { getFirestore, Timestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA-BcctIlLs0Y8PuW2nsyAaNrzqjUzmjpk",
  authDomain: "fpoh-lost-and-found-app.firebaseapp.com",
  projectId: "fpoh-lost-and-found-app",
  storageBucket: "fpoh-lost-and-found-app.firebasestorage.app",
  messagingSenderId: "224518183377",
  appId: "1:224518183377:web:22f72641aad346f9e7e8f0",
  measurementId: "G-W6XGF5CND8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const projectFirestore = getFirestore(app);
const projectAuth = getAuth(app);
const projectStorage = getStorage(app);
const timestamp = Timestamp;

export { projectFirestore, projectAuth, projectStorage, timestamp };
