// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore,collection} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoURfQl-ionG72nPFZc2PqU0-88nO2xsM",
  authDomain: "filmyverse-a64db.firebaseapp.com",
  projectId: "filmyverse-a64db",
  storageBucket: "filmyverse-a64db.appspot.com",
  messagingSenderId: "782003699763",
  appId: "1:782003699763:web:0a6c35117f814829052346"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const moviesRef = collection(db,"movies")
export const reviewsRef = collection(db,"reviews")
export const userRef = collection(db,"user")

export default app;