import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// clients list
const clientsData = [
  { name: "Zia", project: "AI Club Lead / Website / Organizer" },
  { name: "Michael", project: "Raptor Who Code / Organizer" },
  { name: "Sahil Kharel", project: "Organizer" },
  { name: "Alla", project: "Faculty Advisor" },
  { name: "Dr. Webb", project: "Faculty Feedback" },
  { name: "Paul Thompson", project: "DLC Newsletter" },
  { name: "Daniel", project: "AI Track Judge" },
  { name: "Ashique Tanveer", project: "Judge" },
  { name: "Dr. Nestor Tiglao", project: "Judge / UMD Cyber" },
  { name: "igniteHub", project: "Swag Bags" },
  //{ name: "ElevenLabs", project: "Sponsor (Pending)" },
  //{ name: "Vercel", project: "Challenge Track Sponsor" },
  //{ name: "Supabase", project: "Challenge Track Sponsor" },
  //{ name: "GT Cyber", project: "Cybersecurity Sponsor" },
  //{ name: "AI Club", project: "GenAI Track Sponsor" },
  { name: "Digital Learning Center", project: "GenAI Co-Sponsor" },
  //{ name: "MLH", project: "Event Membership" },
];

// initialization
document.addEventListener("DOMContentLoaded", () => {
  generateClientsList();

  setTimeout(() => {
    ScrollTrigger.refresh();
    initClientsAnimation();
  }, 100);
});

// generate client rows from data
function generateClientsList() {
  const clientsList = document.querySelector(".clients-list");
  if (!clientsList) return;

  clientsData.forEach((client) => {
    const row = document.createElement("div");
    row.className = "client-row";

    const nameP = document.createElement("p");
    nameP.className = "type-mono";
    nameP.textContent = client.name;

    const projectP = document.createElement("p");
    projectP.className = "type-mono";
    projectP.textContent = client.project;

    row.appendChild(nameP);
    row.appendChild(projectP);
    clientsList.appendChild(row);
  });
}

// scroll animation - gap closes and opacity fades in
function initClientsAnimation() {
  const clientRows = document.querySelectorAll(".client-row");

  clientRows.forEach((row) => {
    const paragraphs = row.querySelectorAll("p");

    ScrollTrigger.create({
      trigger: row,
      start: "top 75%",
      end: "top 65%",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.set(row, { gap: `${25 - progress * 25}%` });
        paragraphs.forEach((p) => gsap.set(p, { opacity: progress }));
      },
    });
  });
}
