// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// export const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASE_URL,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   // projectId: "billing-app-f6e3b",
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
//   measurementId: process.env.REACT_APP_MEASUREMENT_ID,
// };

export const firebaseConfig = {
  apiKey: "AIzaSyCsgFCVGlBkPbD-UPSfzI2EuvtyiwqEJE8",
  authDomain: "billing-app-dev-72491.firebaseapp.com",
  databaseURL: "https://billing-app-dev-72491.firebaseapp.com",
  projectId: "billing-app-dev-72491",
  storageBucket: "billing-app-dev-72491.appspot.com",
  messagingSenderId: "54627939904",
  appId: "1:54627939904:web:46b8a169cd2279c128d1a5",
  measurementId: "G-PDHTJNWJV7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const signUp = createUserWithEmailAndPassword;
export const signIn = signInWithEmailAndPassword;
export const authListener = onAuthStateChanged;

