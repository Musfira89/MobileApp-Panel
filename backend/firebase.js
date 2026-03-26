import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDDYd4zX5aOxJIWWsfEDigd8AdSZPOcU6g",
  authDomain: "planningapp-ba9e7.firebaseapp.com",
  projectId: "planningapp-ba9e7",
  storageBucket: "planningapp-ba9e7.firebasestorage.app",
  messagingSenderId: "1017299015624",
  appId: "1:1017299015624:web:135824e959192187ae52fd",
};

console.log("Testing with hardcoded Project ID:", firebaseConfig.projectId);

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);