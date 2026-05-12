function registerUser() {

    const u = document.getElementById("username").value;
    const p = document.getElementById("password").value;

    fetch("http://localhost:8080/register", {

        method: "POST",

        body: u + "###" + p

    })
    .then(r => r.text())
    .then(data => {
        alert(data);
    });
}

function loginUser() {

    const u = document.getElementById("username").value;
    const p = document.getElementById("password").value;

    fetch("http://localhost:8080/login", {

        method: "POST",

        body: u + "###" + p

    })
    .then(r => r.text())
    .then(data => {

        if (data === "SUCCESS") {

            localStorage.setItem("user", u);

            window.location = "dashboard.html";

        } else {

            alert("Invalid login");
        }
    });
}

function analyzeResume() {

    const jd = document.getElementById("jd").value;

    const resume = document.getElementById("resume").value;

    const user = localStorage.getItem("user");

    fetch("http://localhost:8080/analyze", {

        method: "POST",

        body: user + "###" + jd + "###" + resume

    })
    .then(r => r.json())
    .then(data => {

        document.getElementById("globalRank")
            .innerText = data.rank;

        document.getElementById("result")
            .innerHTML = `
                <h3>Match: ${data.score}%</h3>
                <p>${data.explanation}</p>
            `;

        localStorage.setItem(
            "missing",
            JSON.stringify(data.missing)
        );

        localStorage.setItem(
            "questions",
            JSON.stringify(data.questions)
        );
    });
}

window.onload = function() {

    const qDiv = document.getElementById("questions");

    if (qDiv) {

        const qs =
            JSON.parse(localStorage.getItem("questions"));

        qs.forEach(q => {
            qDiv.innerHTML += `<p>• ${q}</p>`;
        });
    }

    const lDiv = document.getElementById("learning");

    if (lDiv) {

        const miss =
            JSON.parse(localStorage.getItem("missing"));

        const links = {

            java:
            "https://www.youtube.com/watch?v=eIrMbAQSU34",

            sql:
            "https://www.youtube.com/watch?v=HXV3zeQKqGY",

            aws:
            "https://aws.amazon.com/training/",

            spring:
            "https://www.youtube.com/watch?v=vtPkZShrvXQ"
        };

        miss.forEach(skill => {

            const s = skill.toLowerCase();

            if (links[s]) {

                lDiv.innerHTML += `
                    <p>
                        ${skill}
                        <br>
                        <a href="${links[s]}"
                           target="_blank">
                           Learn Here
                        </a>
                    </p>
                `;
            }
        });
    }
}