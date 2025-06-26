// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 🔐 Replace with your Firebase project's config
const firebaseConfig = {
  apiKey: "AIzaSyDaNe6DRHCrmbATCpUsTWKgmsYKe5R9Hgo",
  authDomain: "zookeeper-hub.firebaseapp.com",
  projectId: "zookeeper-hub",
  storageBucket: "zookeeper-hub.firebasestorage.app",
  messagingSenderId: "38614509876",
  appId: "1:38614509876:web:af7c95ae0aff1755841d61"
};


// 🚀 Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✨ Export Firebase modules
export const auth = getAuth(app);
export const db = getFirestore(app);
