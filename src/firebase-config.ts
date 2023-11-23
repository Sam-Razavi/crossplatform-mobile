// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByVv7MPZDgyymHnGoCv0iaSkvMTZZXZYI",
  authDomain: "iths-crossplatform-6b9d8.firebaseapp.com",
  projectId: "iths-crossplatform-6b9d8",
  storageBucket: "iths-crossplatform-6b9d8.appspot.com",
  messagingSenderId: "160731187181",
  appId: "1:160731187181:web:7479e9c5d6e076b48389e4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore()
