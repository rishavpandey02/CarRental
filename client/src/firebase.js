// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-carrental.firebaseapp.com",
  projectId: "mern-carrental",
  storageBucket: "mern-carrental.appspot.com",
  messagingSenderId: "9587305293",
  appId: "1:9587305293:web:5a257b69f4459b3426a504"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);