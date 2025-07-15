// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAbnGgdlQLE-z43EZhFukWfR6a7xjtJ8M",
  authDomain: "mock-mate-2a85a.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: "mock-mate-2a85a.firebasestorage.app",
  messagingSenderId: "995236316500",
  appId: "1:995236316500:web:68c0d34d7c9fdaa5e4b4c1",
  measurementId: "G-FLH955ETZK"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);