// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVaX6k_imZqbOziqntTWeB3YmqZ1qlop0",
  authDomain: "fir-crud-restapi-9f6b9.firebaseapp.com",
  projectId: "fir-crud-restapi-9f6b9",
  storageBucket: "fir-crud-restapi-9f6b9.appspot.com",
  messagingSenderId: "507157217869",
  appId: "1:507157217869:web:a189e26d8dc25f904ed204"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);