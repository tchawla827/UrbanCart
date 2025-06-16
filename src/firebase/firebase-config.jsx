// Import Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // If using Firestore
import { getStorage } from "firebase/storage"; // If using Firebase Storage
import { getAnalytics } from "firebase/analytics"; // Optional for tracking

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "urbancart-683a4.firebaseapp.com",
  projectId: "urbancart-683a4",
  storageBucket: "urbancart-683a4.firebasestorage.app",
  messagingSenderId: "341179639992",
  appId: "1:341179639992:web:1af58789b635f3e7e3ac4d"
};


// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Firebase Services
export const auth = getAuth(app);        // Authentication
export const googleProvider = new GoogleAuthProvider(); // ✅ Added GoogleAuthProvider
export const db = getFirestore(app);     // Firestore (if needed)
export const storage = getStorage(app);  // Storage (if needed)

// ✅ Initialize Analytics (Optional, Wrapped in Try-Catch)
try {
  if (typeof window !== "undefined") {
    getAnalytics(app);
  }
} catch (error) {
  console.warn("Analytics not initialized:", error.message);
}

export default app;
