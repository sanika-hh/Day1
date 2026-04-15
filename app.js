function goTo(id){
  const el = document.getElementById(id);
  if(el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}
window.goTo = goTo;

document.getElementById("year").textContent = new Date().getFullYear();

// Common submitted message (no emoji typing)
function submittedMsg(){
  alert("Submitted Successfully \u2714");
}
window.submittedMsg = submittedMsg;

// ----------------------
// Syllabus subjects only
// ----------------------
const syllabusData = {
  "ALL SUBJECTS": [
    { unit: "FEE", topics: ["Basic Electrical concepts", "Current & Voltage", "Ohm’s Law"] },
    { unit: "IT SKILL", topics: ["Computer basics", "MS Office basics", "Internet basics"] },
    { unit: "MATHEMATICS", topics: ["Algebra", "Trigonometry", "Matrices"] },
    { unit: "PMS", topics: ["Algorithm basics", "Flowchart", "Logic & problem solving"] },
    { unit: "STATISTICS", topics: ["Mean/Median/Mode", "Probability basics", "Data interpretation"] }
  ]
};

const branchSelect = document.getElementById("branchSelect");
const syllabusBox = document.getElementById("syllabusBox");

Object.keys(syllabusData).forEach(key => {
  const opt = document.createElement("option");
  opt.value = key;
  opt.textContent = key;
  branchSelect.appendChild(opt);
});

function renderSyllabus(key){
  const units = syllabusData[key] || [];
  syllabusBox.innerHTML = units.map(u => `
    <div class="unit">
      <div class="unit-title">${u.unit}</div>
      <div class="muted">${u.topics.join(" • ")}</div>
    </div>
  `).join("");
}

branchSelect.addEventListener("change", () => renderSyllabus(branchSelect.value));
renderSyllabus(branchSelect.value || "ALL SUBJECTS");

// ----------------------
// Weekly Planner
// ----------------------
const genPlanBtn = document.getElementById("genPlanBtn");
const planOutput = document.getElementById("planOutput");

genPlanBtn.addEventListener("click", () => {
  const weeks = parseInt(document.getElementById("weeks").value, 10);
  const hours = parseInt(document.getElementById("hours").value, 10);

  const plan = [];
  for(let w = 1; w <= weeks; w++){
    const revisionDay = (w % 2 === 0) ? "Saturday" : "Sunday";
    const mockDay = (w % 2 === 0) ? "Sunday" : "Saturday";

    plan.push({
      week: w,
      daily: `${hours} hours/day`,
      focus: w <= Math.ceil(weeks*0.7) ? "Learn + Practice" : "Revision + More mocks",
      revisionDay,
      mockDay
    });
  }

  planOutput.innerHTML = plan.map(p => `
    <div class="planWeek">
      <div class="badge">Week ${p.week}</div>
      <div class="muted"><b>Daily:</b> ${p.daily}</div>
      <div class="muted"><b>Focus:</b> ${p.focus}</div>
      <div class="muted"><b>Revision Day:</b> ${p.revisionDay}</div>
      <div class="muted"><b>Mock Test Day:</b> ${p.mockDay}</div>
    </div>
  `).join("");
});

// ----------------------
// Mock Test (10 Q demo each)
// ----------------------
const quizBox = document.getElementById("quizBox");
const quizResult = document.getElementById("quizResult");

const quizDB = {
  mixed: [
    { q:"Ohm’s law formula is?", opts:["V=IR","P=VI","I=VR","R=IV"], ans:0 },
    { q:"MS Word is used for?", opts:["Document typing","Painting","Music","Games"], ans:0 },
    { q:"Mean is a measure of?", opts:["Central tendency","Voltage","Speed","Area"], ans:0 },
    { q:"sin(90°) = ?", opts:["1","0","-1","2"], ans:0 },
    { q:"Internet is used for?", opts:["Communication","Cooking","Driving","Washing"], ans:0 },
    { q:"Probability range is?", opts:["0 to 1","1 to 10","0 to 100","-1 to 1"], ans:0 },
    { q:"In JS print in console:", opts:["console.log()","print()","echo()","log.console()"], ans:0 },
    { q:"Triangle angles sum:", opts:["180°","360°","90°","270°"], ans:0 },
    { q:"Median is:", opts:["Middle value","Largest value","Smallest value","Random value"], ans:0 },
    { q:"IT Skill includes:", opts:["MS Office, Internet","Only Mechanics","Only Drawing","Only Sports"], ans:0 },
  ],
  fee: [
    { q:"Ohm’s law formula is?", opts:["V=IR","P=VI","I=VR","R=IV"], ans:0 },
    { q:"Unit of current?", opts:["Ampere","Volt","Ohm","Watt"], ans:0 },
    { q:"Unit of voltage?", opts:["Volt","Ampere","Ohm","Watt"], ans:0 },
    { q:"Unit of resistance?", opts:["Ohm","Volt","Ampere","Watt"], ans:0 },
    { q:"Power formula?", opts:["P=VI","P=IR","P=V/R","P=I/R"], ans:0 },
    { q:"Fuse is used for?", opts:["Protection","Decoration","Speed","Cooling"], ans:0 },
    { q:"Conductor example?", opts:["Copper","Rubber","Plastic","Wood"], ans:0 },
    { q:"Insulator example?", opts:["Rubber","Copper","Aluminium","Iron"], ans:0 },
    { q:"Series circuit current:", opts:["Same everywhere","Different","Zero","Infinite"], ans:0 },
    { q:"Parallel circuit voltage:", opts:["Same across branches","Different","Zero","Infinite"], ans:0 },
  ],
  it: [
    { q:"Shortcut to copy?", opts:["Ctrl + C","Ctrl + V","Ctrl + X","Ctrl + Z"], ans:0 },
    { q:"Shortcut to paste?", opts:["Ctrl + V","Ctrl + C","Ctrl + X","Ctrl + P"], ans:0 },
    { q:"Browser example:", opts:["Chrome","MS Paint","Calculator","Notepad"], ans:0 },
    { q:"Email is used to:", opts:["Send messages","Play games","Cook food","Wash clothes"], ans:0 },
    { q:"Internet is used for:", opts:["Communication","Cooking","Driving","Washing"], ans:0 },
    { q:"Folder is used to:", opts:["Store files","Cook","Drive","Print"], ans:0 },
    { q:"PowerPoint is used for:", opts:["Presentations","Music","Washing","Driving"], ans:0 },
    { q:"Search engine example:", opts:["Google","Paint","WordPad","Camera"], ans:0 },
    { q:"USB is used for:", opts:["Data transfer","Cooking","Drawing","Sports"], ans:0 },
    { q:"Windows is:", opts:["Operating System","Browser","Game","Virus"], ans:0 },
  ],
  math: [
    { q:"sin(90°) = ?", opts:["1","0","-1","2"], ans:0 },
    { q:"(a+b)² = ?", opts:["a²+2ab+b²","a²-b²","a²+b²","2a+2b"], ans:0 },
    { q:"Sum of angles in triangle?", opts:["180°","360°","90°","270°"], ans:0 },
    { q:"Square root of 49?", opts:["7","6","8","9"], ans:0 },
    { q:"π approx?", opts:["3.14","2.14","4.13","3.41"], ans:0 },
    { q:"Area of rectangle:", opts:["l×b","l+b","l-b","l/b"], ans:0 },
    { q:"Perimeter of square side a:", opts:["4a","a²","2a","a/4"], ans:0 },
    { q:"If x=2, x²=?", opts:["4","2","8","16"], ans:0 },
    { q:"1/2 + 1/2 = ?", opts:["1","2","0","1/4"], ans:0 },
    { q:"Log base 10 of 100=?", opts:["2","1","10","0"], ans:0 },
  ],
  pms: [
    { q:"Algorithm is:", opts:["Step-by-step solution","A song","A game","A machine"], ans:0 },
    { q:"Flowchart is:", opts:["Diagram of steps","A book","A motor","A battery"], ans:0 },
    { q:"If-else is used for:", opts:["Decision making","Painting","Cooking","Sports"], ans:0 },
    { q:"Loop is used for:", opts:["Repeated work","Single work","No work","Random"], ans:0 },
    { q:"Bug means:", opts:["Error","Success","Speed","Voltage"], ans:0 },
    { q:"Debugging means:", opts:["Fixing errors","Adding errors","Cooking","Driving"], ans:0 },
    { q:"Input means:", opts:["Data given","Result","Motor","Cable"], ans:0 },
    { q:"Output means:", opts:["Result","Cable","Battery","Switch"], ans:0 },
    { q:"Logic means:", opts:["Correct reasoning","Noise","Heat","Color"], ans:0 },
    { q:"Program is:", opts:["Set of instructions","A movie","A song","A game"], ans:0 },
  ],
  stats: [
    { q:"Mean is:", opts:["Average","Middle value","Largest value","Smallest value"], ans:0 },
    { q:"Median is:", opts:["Middle value","Average","Largest value","Smallest value"], ans:0 },
    { q:"Mode is:", opts:["Most frequent","Average","Middle value","None"], ans:0 },
    { q:"Probability range:", opts:["0 to 1","1 to 10","0 to 100","-1 to 1"], ans:0 },
    { q:"Bar chart used for:", opts:["Comparisons","Cooking","Voltage","Welding"], ans:0 },
    { q:"Pie chart shows:", opts:["Parts of whole","Speed","Resistance","Heat"], ans:0 },
    { q:"Sample is:", opts:["Part of population","Whole population","A machine","A motor"], ans:0 },
    { q:"Variance measures:", opts:["Spread","Color","Heat","Voltage"], ans:0 },
    { q:"Standard deviation relates to:", opts:["Spread","Speed","Current","Area"], ans:0 },
    { q:"Data interpretation means:", opts:["Understanding data","Cooking","Driving","Painting"], ans:0 },
  ]
};

let currentQuiz = [];

function loadQuiz(subject){
  currentQuiz = quizDB[subject] || quizDB.mixed;

  quizResult.style.display = "none";
  quizResult.innerHTML = "";

  quizBox.innerHTML = currentQuiz.map((item, idx) => {
    const options = item.opts.map((op, i) => `
      <label class="opt">
        <input type="radio" name="q${idx}" value="${i}">
        <span>${op}</span>
      </label>
    `).join("");

    return `
      <div class="q">
        <div class="q-title">${idx+1}. ${item.q}</div>
        ${options}
      </div>
    `;
  }).join("");
}

document.getElementById("loadQuizBtn").addEventListener("click", () => {
  const subject = document.getElementById("subjectSelect").value;
  loadQuiz(subject);
});
loadQuiz("mixed");

document.getElementById("submitQuizBtn").addEventListener("click", () => {
  let score = 0;
  const review = [];

  currentQuiz.forEach((item, idx) => {
    const picked = document.querySelector(`input[name="q${idx}"]:checked`);
    const val = picked ? parseInt(picked.value, 10) : -1;

    const correct = item.ans;
    const ok = val === correct;
    if(ok) score++;

    review.push({
      q: item.q,
      your: val >= 0 ? item.opts[val] : "Not answered",
      right: item.opts[correct],
      ok
    });
  });

  quizResult.style.display = "block";
  quizResult.innerHTML = `
    <div style="font-weight:900; font-size:18px; margin-bottom:8px;">
      Your Score: ${score} / ${currentQuiz.length}
    </div>
    ${review.map(r => `
      <div style="margin:10px 0; padding:10px; border-radius:12px; background:#fff; border:1px solid rgba(11,21,51,.10);">
        <div style="font-weight:900; margin-bottom:6px;">${r.q}</div>
        <div class="muted"><b>Your Answer:</b> ${r.your}</div>
        <div class="muted"><b>Correct:</b> ${r.right}</div>
        <div style="font-weight:900; color:${r.ok ? '#0b7a2a' : '#b00020'};">
          ${r.ok ? 'Correct ✔' : 'Wrong ✖'}
        </div>
      </div>
    `).join("")}
  `;
});

document.getElementById("resetQuizBtn").addEventListener("click", () => {
  const subject = document.getElementById("subjectSelect").value;
  loadQuiz(subject);
});

// ----------------------
// Free class form -> Submitted Successfully ✔
// ----------------------
document.getElementById("freeForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = document.getElementById("freeMsg");
  msg.innerHTML = "<span style='color:#0b7a2a;'>Submitted Successfully &#10004;</span>";
  e.target.reset();
});

// ----------------------
// Contact form -> Submitted Successfully ✔
// ----------------------
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = document.getElementById("contactMsg");
  msg.innerHTML = "<span style='color:#0b7a2a;'>Submitted Successfully &#10004;</span>";
  e.target.reset();
});
