// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-4f0f6.firebaseapp.com",
  projectId: "mern-blog-4f0f6",
  storageBucket: "mern-blog-4f0f6.firebasestorage.app",
  messagingSenderId: "484519330242",
  appId: "1:484519330242:web:55261d783e3e518b05d65b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);