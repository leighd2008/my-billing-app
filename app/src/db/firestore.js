// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNOzBCh8A7cKKWYKtRDEwZ1oahG4abzTM",
  authDomain: "billing-app-f6e3b.firebaseapp.com",
  projectId: "billing-app-f6e3b",
  storageBucket: "billing-app-f6e3b.appspot.com",
  messagingSenderId: "254290603147",
  appId: "1:254290603147:web:5d0131bd27d10924fa388e",
  measurementId: "G-5RHQ4M11KB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)




// import firebase from 'firebase/app';
// import 'firebase/firestore';


// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.FIREBASE_DATABASE_URL,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
//   measurementId: process.env.FIREBASE_MEASUREMENT_ID
// };

// export const { Timestamp } = firebase.firestore;

// // Initialize Firebase
// export default firebase.initializeApp(firebaseConfig).firestore();
