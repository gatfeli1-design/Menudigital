import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDq0WffTjW5ndFls3BsY0fpcZIdow4wPJ0",
  authDomain: "menudigitalapp-19772.firebaseapp.com",
  projectId: "menudigitalapp-19772",
  storageBucket: "menudigitalapp-19772.firebasestorage.app",
  messagingSenderId: "695735779716",
  appId: "1:695735779716:web:e5e5907781656990d51dd1"
};

export const db = initializeApp(firebaseConfig);
