// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import getAuth
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDYd4zX5aOxJIWWsfEDigd8AdSZPOcU6g",
  authDomain: "planningapp-ba9e7.firebaseapp.com",
  projectId: "planningapp-ba9e7",
  storageBucket: "planningapp-ba9e7.firebasestorage.app",
  messagingSenderId: "1017299015624",
  appId: "1:1017299015624:web:135824e959192187ae52fd",
  measurementId: "G-8MRL2G4QDM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Use getAuth
export const db = getFirestore(app);
