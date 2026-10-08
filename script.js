const el = id => document.getElementById(id);
const zone = "Europe/Paris";

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: zone,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23"
});

function tick() {
  const now = new Date();

  const p = Object.fromEntries(
    formatter.formatToParts(now)
      .filter(x => x.type !== "literal")
      .map(x => [x.type, x.value])
  );

  const h = Number(p.hour);
  const m = Number(p.minute);
  const s = Number(p.second);

  el("citron-hm").textContent = p.hour + ":" + p.minute;
  el("citron-sec").textContent = p.second;

  el("citron-date").textContent =
    new Intl.DateTimeFormat("fr-FR", {
      timeZone: zone,
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(now);

  el("citron-greeting").textContent =
    h < 6 ? "La nuit porte conseil. 🌙" :
    h < 12 ? "Bonjour, rayon de soleil ! ☀️" :
    h < 18 ? "Un bel après-midi à toi. 🍋" :
    "Douce soirée, esprit léger. ✨";

  const pct = (h * 3600 + m * 60 + s) / 864;

  el("citron-fill").style.width = pct + "%";
  el("citron-percent").textContent = Math.floor(pct) + " %";
}

tick();
setInterval(tick, 1000);

let sunny = false;
let clicks = 0;

el("citron-mood").addEventListener("click", () => {
  sunny = !sunny;

  el("citron-shell").classList.toggle("sunny", sunny);
  el("citron-mood").textContent =
    sunny ? "🌼 Mood douceur" : "☀️ Mood citron";

  el("citron-secret").textContent =
    sunny ? "Un peu de soleil, même les jours nuageux." : "";
});

const messages = [
  "Pssst… tu as trouvé le citron secret. 👀",
  "Petit rappel : tu fais déjà beaucoup. 💛",
  "La vie te donne des citrons ? Fais-en de belles idées. 🍋",
  "Tu viens de débloquer le niveau citron ultime ! ✨"
];

el("citron-lemon").addEventListener("click", () => {
  clicks++;

  el("citron-secret").textContent =
    messages[Math.min(Math.floor((clicks - 1) / 3), 3)];

  const shell = el("citron-shell");

  for (let i = 0; i < 9; i++) {
    const sp = document.createElement("span");

    sp.className = "spark";
    sp.textContent = ["✨", "🍋", "💛", "✦"][i % 4];

    sp.style.left = (65 + Math.random() * 25) + "%";
    sp.style.top = (72 + Math.random() * 15) + "%";
    sp.style.setProperty(
      "--dx",
      (Math.random() * 180 - 90) + "px"
    );

    shell.appendChild(sp);
    setTimeout(() => sp.remove(), 1150);
  }
});