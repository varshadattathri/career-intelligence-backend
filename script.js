function saveUserData(key, value){

    localStorage.setItem(
        key,
        JSON.stringify(value)
    );
}

function getUserData(key){

    const data =
        localStorage.getItem(key);

    return data
        ? JSON.parse(data)
        : null;
}
function registerUser() {

    const u =
        document.getElementById("username").value;

    const p =
        document.getElementById("password").value;

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

    const u =
        document.getElementById("username").value;

    const p =
        document.getElementById("password").value;

    fetch("http://localhost:8080/login", {

        method: "POST",

        body: u + "###" + p

    })
    .then(r => r.text())
    .then(data => {

        if (data === "SUCCESS") {

            localStorage.setItem("user", u);

            window.location =
                "dashboard.html";

        } else {

            alert("Invalid login");
        }
    });
}

async function analyzeResume() {

    const jd =
        document.getElementById("jd").value;

    const resume =
        document.getElementById("resume").value;

    const loader =
        document.getElementById("loader");

    const result =
        document.getElementById("result");

    const loadingText =
        document.getElementById("loadingText");

    loader.classList.remove("hidden");
document.getElementById(
    "orbText"
).innerText =
"Analyzing Resume...";
    result.innerHTML = "";

    const messages = [

        "Initializing AI Engine...",

        "Scanning Resume Structure...",

        "Checking ATS Compatibility...",

        "Analyzing Technical Skills...",

        "Comparing Industry Standards...",

        "Generating AI Insights..."
    ];

    let index = 0;

    const interval = setInterval(() => {

        loadingText.innerText =
            messages[index];

        index =
            (index + 1) % messages.length;

    }, 1500);

    try {

        const response = await fetch(
            "http://localhost:8080/analyze",
            {

                method: "POST",

                body:
                "Spoorthi###"
                + jd +
                "###"
                + resume
            }
        );

        const data =
            await response.json();

        clearInterval(interval);

        loader.classList.add("hidden");
document.getElementById(
    "orbText"
).innerText =
"AI Analysis Complete";
        result.innerHTML = `

<div class="analytics-grid">

    <div class="analytics-card score-card">

        <canvas id="scoreChart"></canvas>

       <h2 class="big-score"
id="animatedScore">

    0%

</h2>

        <p>AI Resume Strength</p>

    </div>

    <div class="analytics-card">

        <h2>#${data.rank}</h2>

        <p>Global Candidate Rank</p>

        <div class="mini-bar">
            <div class="mini-fill"></div>
        </div>

        <br>

        <h3>AI Confidence</h3>

        <p>96% Match Confidence</p>

    </div>

</div>

<div class="analytics-card full-card">

    <h2>🚀 Missing Skills Analysis</h2>

    <div class="skill-container">

        ${data.missing.map(skill => `
            <div class="skill-box">
                ${skill}
            </div>
        `).join("")}

    </div>

</div>

<div class="analytics-card full-card">

    <h2>🧠 Career Personality</h2>

    <p class="personality">

        You are a
        <span>System Builder</span>

        with strong backend logic,
        problem-solving capability,
        and engineering mindset.

    </p>

</div>
<div class="analytics-card full-card">

    <h2>🧬 Resume DNA Analysis</h2>

    <div class="dna-grid">

        <div class="dna-item">

            <span>Technical Skills</span>

            <div class="dna-bar">
                <div class="dna-fill"
                style="width:92%">
                </div>
            </div>

        </div>

        <div class="dna-item">

            <span>Problem Solving</span>

            <div class="dna-bar">
                <div class="dna-fill"
                style="width:88%">
                </div>
            </div>

        </div>

        <div class="dna-item">

            <span>Leadership</span>

            <div class="dna-bar">
                <div class="dna-fill"
                style="width:70%">
                </div>
            </div>

        </div>

        <div class="dna-item">

            <span>Cloud Readiness</span>

            <div class="dna-bar">
                <div class="dna-fill"
                style="width:60%">
                </div>
            </div>

        </div>

    </div>

</div>

<div class="analytics-card full-card">

    <h2>🎯 AI Interview Questions</h2>

    <ul class="question-list">

        ${data.questions.map(q => `
            <li>${q}</li>
        `).join("")}

    </ul>

</div>

<div class="analytics-card full-card">

    <h2>📈 Career Growth Prediction</h2>

    <div class="timeline">

        <div class="timeline-step">
            2025 → Java Developer
        </div>

        <div class="timeline-step">
            2027 → Backend Engineer
        </div>

        <div class="timeline-step">
            2030 → Cloud Architect
        </div>

    </div>

</div>
`;

        const ctx =
            document.getElementById("scoreChart");

        let count = 0;

const scoreElement =
document.getElementById(
    "animatedScore"
);

const counter = setInterval(() => {

    if(count >= data.score){

        clearInterval(counter);

    }else{

        count++;

        scoreElement.innerText =
            count + "%";
    }

}, 20);
            new Chart(ctx, {

            type: "doughnut",

            data: {

                labels: [
                    "Score",
                    "Remaining"
                ],

                datasets: [{

                    data: [
                        data.score,
                        100 - data.score
                    ],

                    borderWidth: 0

                }]
            },

            options: {

                responsive: true,

                cutout: "75%",

                plugins: {

                    legend: {
                        display: false
                    }
                }
            }
        });

    } catch (error) {

        clearInterval(interval);

        loader.classList.add("hidden");

        console.error(error);

        alert("AI Engine Failed");
    }
}
const orbMessages = [

    "AI Assistant Active",

    "Career Intelligence Engine Online",

    "Scanning Industry Trends...",

    "Monitoring Resume Strength...",

    "AI Recommendation System Ready",

    "Tracking Skill Growth...",

    "Preparing Interview Insights...",

    "Future Career Prediction Enabled"
];

let orbIndex = 0;

setInterval(() => {

    const orbText =
        document.getElementById("orbText");

    if(orbText){

        orbText.innerText =
            orbMessages[orbIndex];

        orbIndex =
            (orbIndex + 1)
            %
            orbMessages.length;
    }

}, 3000);
const interviewQuestions = [

    "Explain Java Collections Framework.",

    "What is Spring Boot?",

    "Difference between SQL and NoSQL?",

    "Explain REST API architecture.",

    "How does cloud deployment work?",

    "What are microservices?",

    "Explain polymorphism in Java."
];

let currentQuestion = 0;

function startInterview(){

    currentQuestion = 0;

    typeQuestion(
        interviewQuestions[currentQuestion]
    );

    updateConfidence();
}

function nextQuestion(){

    currentQuestion++;

    if(currentQuestion >= interviewQuestions.length){

       document.getElementById(
    "questionBox"
).innerText =
"🎉 Interview Completed Successfully";


// generate random interview score
const finalScore =
    Math.floor(
        Math.random() * 21
    ) + 80;


// save score to cloud
saveInterviewScore(finalScore);


// show score
alert(
    "Interview Score: "
    + finalScore
    + "% saved to cloud ☁️"
);

return;
    }

    typeQuestion(
        interviewQuestions[currentQuestion]
    );

    updateConfidence();
}

function typeQuestion(text){

    const box =
        document.getElementById(
            "questionBox"
        );

    box.innerText = "";

    let index = 0;

    const typing = setInterval(() => {

        if(index < text.length){

            box.innerText += text.charAt(index);

            index++;

        }else{

            clearInterval(typing);
        }

    }, 35);
}

function updateConfidence(){

    const confidence =
        Math.floor(
            Math.random() * 25
        ) + 70;

    document.getElementById(
        "confidenceFill"
    ).style.width =
    confidence + "%";

    document.getElementById(
        "confidenceText"
    ).innerText =
    "Confidence Level: "
    + confidence + "%";
}
function triggerUpload(){

    document.getElementById(
        "resumeFile"
    ).click();
}

const resumeInput =
document.getElementById(
    "resumeFile"
);

if(resumeInput){

    resumeInput.addEventListener(
        "change",
        function(){

            const file =
                this.files[0];

            if(file){

                document.getElementById(
                    "filePreview"
                ).classList.remove(
                    "hidden"
                );

                document.getElementById(
                    "fileName"
                ).innerText =
                file.name;

                document.getElementById(
                    "orbText"
                ).innerText =
                "Resume Successfully Uploaded";
            }
        }
    );
}
function dragOver(event){

    event.preventDefault();

    document.getElementById(
        "uploadBox"
    ).classList.add(
        "drag-active"
    );
}

function dragLeave(event){

    event.preventDefault();

    document.getElementById(
        "uploadBox"
    ).classList.remove(
        "drag-active"
    );
}

function dropFile(event){

    event.preventDefault();

    const box =
        document.getElementById(
            "uploadBox"
        );

    box.classList.remove(
        "drag-active"
    );

    const file =
        event.dataTransfer.files[0];

    if(file){

        document.getElementById(
            "filePreview"
        ).classList.remove(
            "hidden"
        );

        document.getElementById(
            "fileName"
        ).innerText =
        file.name;

        document.getElementById(
            "orbText"
        ).innerText =
        "AI Resume Extraction Complete";
    }
}
function sendMessage(){

    const input =
        document.getElementById(
            "userInput"
        );

    const chat =
        document.getElementById(
            "chatMessages"
        );

    const text =
        input.value.trim();

    if(text === "") return;

    const userMessage =
    document.createElement("div");

    userMessage.className =
        "user-message";

    userMessage.innerText =
        text;

    chat.appendChild(userMessage);

    input.value = "";

    chat.scrollTop =
        chat.scrollHeight;

    const aiMessage =
    document.createElement("div");

    aiMessage.className =
        "ai-message";

    aiMessage.innerText =
        "AI is typing...";

    chat.appendChild(aiMessage);

    chat.scrollTop =
        chat.scrollHeight;

    setTimeout(() => {

        aiMessage.innerHTML =
        generateAIResponse(text);

        chat.scrollTop =
            chat.scrollHeight;

    }, 1200);
}

function generateAIResponse(text){

    text = text.toLowerCase();

    if(text.includes("java")){

        return `
        Java remains one of the most
        in-demand backend technologies
        globally 🚀
        `;
    }

    if(text.includes("cloud")){

        return `
        Cloud computing is exploding
        globally ☁<br><br>

        Recommended:
        AWS + Docker + Kubernetes
        `;
    }

    if(text.includes("interview")){

        return `
        Focus on:
        <br><br>

        • DSA<br>
        • Projects<br>
        • Communication<br>
        • System Design
        `;
    }

    if(text.includes("skills")){

        return `
        Trending skills in 2025:
        <br><br>

        • AI/ML<br>
        • Cloud Computing<br>
        • DevOps<br>
        • Cybersecurity
        `;
    }

    return `
    Based on AI analysis,
    continuous learning and
    strong projects are your
    biggest career accelerators 🚀
    `;
}
window.addEventListener(
    "load",
    () => {

    gsap.from(

        ".analytics-card, .achievement-card, .heat-card, .upload-box, .interview-card, .chat-container, .world-map-card",

        {

            opacity:0,

            y:40,

            duration:1,

            stagger:0.15,

            ease:"power3.out"
        }
    );

    gsap.from(

        ".sidebar a",

        {

            opacity:0,

            x:-40,

            duration:0.8,

            stagger:0.08,

            ease:"power3.out"
        }
    );

});
function uploadResume(){

    const fileInput =
        document.getElementById(
            "resumeFile"
        );

    const file =
        fileInput.files[0];

    if(!file){

        alert(
            "Please upload resume"
        );

        return;
    }

    const fakeAnalysis = {

        fileName:
            file.name,

        score:85,

        rank:"Top 12%",

        missingSkills:[
            "AWS",
            "Docker",
            "Microservices"
        ],

        role:
            "Java Developer"
    };

    localStorage.setItem(
        "resumeData",
        JSON.stringify(fakeAnalysis)
    );

    alert(
        "Resume analyzed successfully 🚀"
    );

    window.location =
        "dashboard.html";
}
window.addEventListener(
    "load",
    () => {

    const dashboard =
        document.getElementById(
            "dashboardData"
        );

    if(!dashboard) return;

    const data =
        getUserData(
            "resumeData"
        );

    if(!data){

        dashboard.innerHTML = `

        <p>
        No resume analyzed yet.
        </p>

        `;

        return;
    }

    dashboard.innerHTML = `

    <div class="analytics-grid">

        <div class="analytics-card">

            <h2>
                ${data.score}%
            </h2>

            <p>
                Resume Score
            </p>

        </div>

        <div class="analytics-card">

            <h2>
                ${data.rank}
            </h2>

            <p>
                Global Rank
            </p>

        </div>

    </div>

    <br>

    <h3>
        Missing Skills
    </h3>

    <div class="skill-container">

        ${data.missingSkills.map(
            skill => `

            <div class="skill-box">
                ${skill}
            </div>

            `
        ).join("")}

    </div>
    `;
});
function uploadResume(){

    const file =
    document.getElementById(
        "resumeFile"
    ).files[0];

    if(!file){

        alert(
            "Please upload resume"
        );

        return;
    }

    const result =
    document.getElementById(
        "analysisResult"
    );

    result.innerHTML = `

    <div class="analytics-card full-card">

        <h2>
            🚀 AI Resume Intelligence
        </h2>

        <div class="analytics-grid">

            <div class="analytics-card">

                <h2>
                    85%
                </h2>

                <p>
                    Resume Score
                </p>

            </div>

            <div class="analytics-card">

                <h2>
                    Top 12%
                </h2>

                <p>
                    Global Rank
                </p>

            </div>

        </div>

        <br>

        <h3>
            Missing Skills
        </h3>

        <div class="skill-container">

            <div class="skill-box">
                AWS
            </div>

            <div class="skill-box">
                Docker
            </div>

            <div class="skill-box">
                Microservices
            </div>

        </div>

    </div>
    `;
    localStorage.setItem(
    "resumeAnalysis",

    JSON.stringify({

        score:92,

        rank:15,

        skills:8

    })
);
}
function loadDashboard(){

    const dashboard =
    document.getElementById(
        "dashboardResult"
    );

    if(!dashboard) return;

    const data =
    JSON.parse(
        localStorage.getItem(
            "resumeAnalysis"
        )
    );

    if(!data){

        dashboard.innerHTML = `

        <div class="analytics-card full-card">

            <h2>
                🚀 No Resume Uploaded
            </h2>

            <p>
                Upload resume to begin
                AI analysis.
            </p>

        </div>

        `;

        return;
    }

    dashboard.innerHTML = `

    <div class="analytics-card full-card">

        <h2>
            🚀 AI-Powered Resume Intelligence
        </h2>

        <div class="analytics-grid">

            <div class="analytics-card">

                <h2>
                    ${data.score}%
                </h2>

                <p>
                    ATS Match Score
                </p>

            </div>

            <div class="analytics-card">

                <h2>
                    Top ${data.rank}%
                </h2>

                <p>
                    Candidate Ranking
                </p>

            </div>

            <div class="analytics-card">

                <h2>
                    ${data.skills}
                </h2>

                <p>
                    Skills Matched
                </p>

            </div>

        </div>

    </div>

    `;
}
loadDashboard();