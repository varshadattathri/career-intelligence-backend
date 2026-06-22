import { db }
from "./firebase-config.js";

import {
    collection,
    addDoc
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

window.saveResume = async function(fileName){

    try{

        await addDoc(
            collection(
                db,
                "resumeHistory"
            ),
            {
                fileName: fileName,
                score: 85,
                rank: "Top 12%",
                date:
                new Date()
                .toLocaleDateString()
            }
        );

        alert(
            "Resume saved to cloud."
        );

    }
    catch(error){

        console.log(error);

        alert(
            error.message
        );
    }
}