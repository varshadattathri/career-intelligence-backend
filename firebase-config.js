// Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    getFirestore,
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyA80HaHq8rrI4dQ0KVCd2GRVVx0c3sst7g",
  authDomain: "career-intelligence-plat-2b9c4.firebaseapp.com",
  projectId: "career-intelligence-plat-2b9c4",
  storageBucket: "career-intelligence-plat-2b9c4.firebasestorage.app",
  messagingSenderId: "16480714557",
  appId: "1:16480714557:web:d1cb5f2a20dc745d254f54"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    collection,
    addDoc
};