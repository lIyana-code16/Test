import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAouOQq22C_XLC3Thyl5nLnromnBMdOmHU",
  authDomain: "testing-d2043.firebaseapp.com",
  projectId: "testing-d2043",
  storageBucket: "testing-d2043.firebasestorage.app",
  messagingSenderId: "403192987855",
  appId: "1:403192987855:web:001fe1ef02e0384f86b7ba"
};

// Change this to the email of your Firebase admin user.
export const ADMIN_EMAIL = "admin@example.com";

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
