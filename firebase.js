import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCjvQfecDkhAmEOITaa_A3uWClpbtwWt_E",
  authDomain: "boolingapp.firebaseapp.com",
  projectId: "boolingapp",
  storageBucket: "boolingapp.firebasestorage.app",
  messagingSenderId: "933194371173",
  appId: "1:933194371173:web:53d76fc45a94445b8af68c",
  measurementId: "G-HK3KGMR17B"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const userID = auth.currentUser


