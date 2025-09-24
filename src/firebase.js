// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIrVBdPAN5h103gR50agPrOw4FFt3Hr_E",
  authDomain: "boliexpress-f8282.firebaseapp.com",
  projectId: "boliexpress-f8282",
  storageBucket: "boliexpress-f8282.firebasestorage.app",
  messagingSenderId: "179060383372",
  appId: "1:179060383372:web:54d5ffdb066e5bcd4d65a9",
  measurementId: "G-YR1YSKYY8Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);