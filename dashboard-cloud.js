console.log("Dashboard Cloud Loaded");
import { db }
from "./firebase-config.js";

import {
    collection,
    getDocs
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

async function loadAnalytics() {

    try {

        console.log("Reading Firestore...");

        const snapshot = await getDocs(
            collection(db, "resumeHistory")
        );

        console.log("Documents:", snapshot.size);

        let total = 0;
        let highest = 0;
        let sum = 0;

        snapshot.forEach((doc) => {

            console.log(doc.data());

            const data = doc.data();

            total++;

            sum += Number(data.score);

            if (Number(data.score) > highest) {
                highest = Number(data.score);
            }
        });

        const average =
            total > 0
            ? Math.round(sum / total)
            : 0;

        document.getElementById("cloudAnalytics").innerHTML = `
            <div class="analytics-grid">

                <div class="analytics-card">
                    <h2>${total}</h2>
                    <p>Total Resumes</p>
                </div>

                <div class="analytics-card">
                    <h2>${average}%</h2>
                    <p>Average Score</p>
                </div>

                <div class="analytics-card">
                    <h2>${highest}%</h2>
                    <p>Highest Score</p>
                </div>

            </div>
        `;

    }
    catch(error) {

        console.log("ERROR:", error);

    }
}

loadAnalytics();
