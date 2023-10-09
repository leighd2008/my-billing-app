// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBNOzBCh8A7cKKWYKtRDEwZ1oahG4abzTM",
  authDomain: "billing-app-f6e3b.firebaseapp.com",
  databaseURL: "https://billing-app-f6e3b.firebaseapp.com",
  projectId: "billing-app-f6e3b",
  // projectId: "billing-app-f6e3b",
  storageBucket: "billing-app-f6e3b.appspot.com",
  messagingSenderId: "254290603147",
  appId: "1:254290603147:web:5d0131bd27d10924fa388e",
  measurementId: "G-5RHQ4M11KB",
};

// console.log(firebaseConfig)

// export const firebaseConfig = {
//   apiKey: "AIzaSyCsgFCVGlBkPbD-UPSfzI2EuvtyiwqEJE8",
//   authDomain: "billing-app-dev-72491.firebaseapp.com",
//   databaseURL: "https://billing-app-dev-72491.firebaseapp.com",
//   projectId: "billing-app-dev-72491",
//   storageBucket: "billing-app-dev-72491.appspot.com",
//   messagingSenderId: "54627939904",
//   appId: "1:54627939904:web:46b8a169cd2279c128d1a5",
//   measurementId: "G-PDHTJNWJV7"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const signUp = createUserWithEmailAndPassword;
export const signIn = signInWithEmailAndPassword;
export const authListener = onAuthStateChanged;

