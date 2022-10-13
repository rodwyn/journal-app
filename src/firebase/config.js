// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcJugGpstu6frBOO08NAv1ri6794Rbt4I",
  authDomain: "react-project-71d77.firebaseapp.com",
  projectId: "react-project-71d77",
  storageBucket: "react-project-71d77.appspot.com",
  messagingSenderId: "840478921925",
  appId: "1:840478921925:web:eaf04594efe04347918cac"
};

// Initialize Firebase
export const FirebaseAPP = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseAPP);
export const FirebaseDB = getFirestore(FirebaseAPP);
