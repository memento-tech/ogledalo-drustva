// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAnalytics,
  setAnalyticsCollectionEnabled,
} from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZsewnZF_NU0qaqqr9d_3h54ZbDr2db2I",
  authDomain: "ogledalo-drustva.firebaseapp.com",
  projectId: "ogledalo-drustva",
  storageBucket: "ogledalo-drustva.firebasestorage.app",
  messagingSenderId: "919422701194",
  appId: "1:919422701194:web:37558267f2b2083d87e773",
  measurementId: "G-CN2YH6JZGW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { analytics };
