// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// for packaging
// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.FIREBASE_DATABASE_URL,
//   // projectId: process.env.FIREBASE_PROJECT_ID,
//   projectId: "billing-app-f6e3b",
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
//   measurementId: process.env.FIREBASE_MEASUREMENT_ID,
// };

//  for development

const firebaseConfig = {
  apiKey: "AIzaSyCsgFCVGlBkPbD-UPSfzI2EuvtyiwqEJE8",
  authDomain: "billing-app-dev-72491.firebaseapp.com",
  projectId: "billing-app-dev-72491",
  storageBucket: "billing-app-dev-72491.appspot.com",
  messagingSenderId: "54627939904",
  appId: "1:54627939904:web:46b8a169cd2279c128d1a5",
  measurementId: "G-PDHTJNWJV7"
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

