import {
    auth,
    db,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    collection,
    addDoc
}
from "./firebase-config.js";

window.registerUser = async function() {

    const email =
        document.getElementById("username").value;

    const password =
        document.getElementById("password").value;

    try {

        console.log("Email:", email);
        console.log("Password:", password);

        await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        await addDoc(
            collection(db, "users"),
            {
                email: email,
                createdAt: new Date().toISOString()
            }
        );

        alert("Registration Successful");

    } catch(error) {

        console.error(error);

        alert(error.message);
    }
};

window.loginUser = async function() {

    const email =
        document.getElementById("username").value;

    const password =
        document.getElementById("password").value;

    try {

        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        alert("Login Successful");

        window.location =
            "dashboard.html";

    } catch(error) {

        console.error(error);

        alert(error.message);
    }
};