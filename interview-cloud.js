// Firebase imports
import { db } from "./firebase-config.js";

import {
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
console.log("Interview cloud file loaded");

// Function to save score in cloud
async function saveInterviewScore(score){

    console.log("Function started");

    try{

        const user = localStorage.getItem("user");

        console.log("User =", user);
console.log("Trying Firestore write...");

       console.log("Before addDoc");

const result = await addDoc(
            collection(db, "interviewScores"),
            {
                email: user,
                score: score,
                date: new Date().toLocaleString()
            }
        );

        console.log("Firestore write success");

        alert("Saved successfully");

    }catch(error){

        console.log("Firestore error =", error);

        alert("ERROR: " + error.message);
    }
}

// Make function available globally
window.saveInterviewScore =
    saveInterviewScore;
    