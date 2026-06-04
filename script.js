// Comback AI — improved script.js

const NOTES_DB = {
  photosynthesis: {
    title: "Photosynthesis",
    summary:
      "Photosynthesis is the process by which green plants make their own food using sunlight, carbon dioxide, and water.",
    points: [
      "It happens mainly in the leaves.",
      "Chlorophyll absorbs sunlight.",
      "Carbon dioxide enters through stomata.",
      "Water is absorbed by roots.",
      "Glucose is made and oxygen is released."
    ],
    revision:
      "Sunlight + carbon dioxide + water → glucose + oxygen",
    mcqs: [
      "Which pigment traps sunlight? Chlorophyll",
      "What gas is released during photosynthesis? Oxygen",
      "Where does photosynthesis mostly happen? Leaves"
    ]
  },

  lifeprocesses: {
    title: "Life Processes",
    summary:
      "Life processes are the basic activities needed to keep living organisms alive, such as nutrition, respiration, transport, and excretion.",
    points: [
      "Nutrition gives energy and materials.",
      "Respiration releases energy.",
      "Transport moves substances inside the body.",
      "Excretion removes waste."
    ],
    revision:
      "Nutrition, respiration, transport, excretion",
    mcqs: [
      "Which process releases energy? Respiration",
      "Which process removes waste? Excretion",
      "Which process helps in movement of substances? Transport"
    ]
  },

  electricity: {
    title: "Electricity",
    summary:
      "Electricity is the study of electric charge, current, potential difference, resistance, and circuits.",
    points: [
      "Current flows through a closed circuit.",
      "Resistance opposes the flow of current.",
      "Ammeter measures current.",
      "Voltmeter measures potential difference."
    ],
    revision:
      "Current = Flow of charge",
    mcqs: [
      "Which instrument measures current? Ammeter",
      "Which instrument measures voltage? Voltmeter",
      "What does resistance do? Opposes current"
    ]
  },

  force: {
    title: "Force and Pressure",
    summary:
      "Force is a push or pull, and pressure is force acting on a unit area.",
    points: [
      "Force can change the speed or direction of motion.",
      "Pressure increases when area decreases.",
      "SI unit of force is newton.",
      "SI unit of pressure is pascal."
    ],
    revision:
      "Pressure = Force / Area",
    mcqs: [
      "SI unit of force? Newton",
      "SI unit of pressure? Pascal",
      "What happens when area decreases? Pressure increases"
    ]
  }
};

function normalizeTopic(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
}

function getTopicData(topic) {
  const key = normalizeTopic(topic);

  if (NOTES_DB[key]) return NOTES_DB[key];

  return {
    title: topic,
    summary:
      `Comback AI has created a quick CBSE-style revision sheet for "${topic}".`,
    points: [
      "Key idea learned in simple words.",
      "Important facts for quick revision.",
      "Use this as a starting point.",
      "You can later expand it with real AI."
    ],
    revision:
      `Quick revision for ${topic}`,
    mcqs: [
      "This topic is shown in short-notes mode.",
      "You can add more chapters later.",
      "CBSE notes can be expanded anytime."
    ]
  };
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function setLoadingMessage(message) {
  const result = document.getElementById("result");
  if (!result) return;
  result.innerHTML = `<div class="ai-status">${message}</div>`;
}

function createNoteCard(data) {
  const pointsHTML = data.points
    .map(point => `<li>${escapeHTML(point)}</li>`)
    .join("");

  const mcqHTML = data.mcqs
    .map((mcq, index) => `<p>${index + 1}. ${escapeHTML(mcq)}</p>`)
    .join("");

  return `
    <div class="note-card">
      <h2>${escapeHTML(data.title)}</h2>

      <div class="note-section">
        <h3>📖 Summary</h3>
        <p>${escapeHTML(data.summary)}</p>
      </div>

      <div class="note-section">
        <h3>⭐ Key Points</h3>
        <ul>${pointsHTML}</ul>
      </div>

      <div class="note-section">
        <h3>🧪 Quick Revision</h3>
        <p>${escapeHTML(data.revision)}</p>
      </div>

      <div class="note-section">
        <h3>❓ Mini MCQs</h3>
        ${mcqHTML}
      </div>

      <button class="copy-btn" onclick="copyNotes(this)">
        Copy Notes
      </button>
    </div>
  `;
}

function copyNotes(button) {
  const card = button.closest(".note-card");
  if (!card) return;

  const text = card.innerText.trim();

  navigator.clipboard.writeText(text)
    .then(() => {
      const old = button.textContent;
      button.textContent = "Copied!";
      setTimeout(() => {
        button.textContent = old;
      }, 1200);
    })
    .catch(() => {
      alert("Copy failed. Please copy manually.");
    });
}

async function generate() {
  const input = document.getElementById("topic");
  const result = document.getElementById("result");

  if (!input || !result) return;

  const topic = input.value.trim();

  if (!topic) {
    result.innerHTML = `<div class="ai-status">Enter a topic first.</div>`;
    input.focus();
    return;
  }

  const loadingSteps = [
    "🧠 Thinking...",
    "📚 Reading the topic...",
    "⚡ Creating short notes...",
    "✅ Finalizing output..."
  ];

  for (let i = 0; i < loadingSteps.length; i++) {
    setLoadingMessage(loadingSteps[i]);
    await sleep(650);
  }

  const data = getTopicData(topic);
  result.innerHTML = createNoteCard(data);

  const card = result.querySelector(".note-card");
  if (card) {
    card.style.opacity = "0";
    card.style.transform = "translateY(12px)";
    card.style.transition = "all 0.35s ease";
    requestAnimationFrame(() => {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    });
  }
}

function initCombackAI() {
  const input = document.getElementById("topic");
  const button = document.querySelector('button[onclick="generate()"]');

  if (button) {
    button.addEventListener("click", generate);
  }

  if (input) {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        generate();
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", initCombackAI);

// Keep generate() global so your existing onclick="generate()" still works.
window.generate = generate;
window.copyNotes = copyNotes;