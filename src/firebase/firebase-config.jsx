import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAjM53CrrJwXLqmI0oZQONSBW191_G4IMQ",
    authDomain: "paycart-5ebcc.firebaseapp.com",
    projectId: "paycart-5ebcc",
    storageBucket: "paycart-5ebcc.appspot.com",
    messagingSenderId: "420632775985",
    appId: "1:420632775985:web:d2b30c2d95248a089df410"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
