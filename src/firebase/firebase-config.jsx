// Import Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // If using Firestore
import { getStorage } from "firebase/storage"; // If using Firebase Storage
import { getAnalytics } from "firebase/analytics"; // Optional for tracking

// ✅ Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyALjY1Nm3XJf64tUIsAfVMfG8JaDsnyFS8",
  authDomain: "urbancart-8b9ab.firebaseapp.com",
  projectId: "urbancart-8b9ab",
  storageBucket: "urbancart-8b9ab.appspot.com",  // ✅ Fixed Storage URL
  messagingSenderId: "524880359066",
  appId: "1:524880359066:web:729f9fe4877a7f042e3923",
  measurementId: "G-17WXDL5664"
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
