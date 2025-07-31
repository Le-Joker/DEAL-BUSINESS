//Canvas Particle Animation
const canvas = document.getElementById("background-canvas");
const ctx = canvas.getContext("2d");
let w, h;
let particles = [];

function resize() {
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.width = w;
  canvas.height = h;
}

class Particle {
  constructor() {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.radius = 1 + Math.random() * 2;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.alpha = 0.3 + Math.random() * 0.5;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(158, 234, 249, ${this.alpha})`;
    ctx.fill();
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > w) this.vx *= -1;
    if (this.y < 0 || this.y > h) this.vy *= -1;
  }
}

function initParticles(count = 100) {
  particles = [];
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, w, h);
  particles.forEach((p) => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
  resize();
  initParticles(100);
});

resize();
initParticles(100);
animate();

//Live typing
const text = "Bienvenue sur D€@L BUSINESS Online Market";
const textElement = document.getElementById("text");

// Injecter chaque lettre avec span
text.split("").forEach((letter, i) => {
  const span = document.createElement("span");
  span.textContent = letter === " " ? "\u00A0" : letter;
  span.classList.add("letter");
  span.style.animationDelay = `${i * 50}ms`; // délai progressif
  textElement.appendChild(span);
});

// Fade in du slogan après toute l'animation
const slogan = document.getElementById("slogan");
const totalDuration = text.length * 50 + 500;
setTimeout(() => {
  slogan.style.opacity = 1;
}, totalDuration);

// Comportement du formulaire de connexion/inscription
const authForm = document.getElementById("authForm");
const authSubmit = document.getElementById("authSubmit");
const openAuth = document.getElementById("openAuth");
const authOverlay = document.getElementById("authOverlay");
const authP = document.querySelector(".authP");
const colorPicker = document.getElementById("colorPicker");
const switchToSignup = document.getElementById("switchToSignup");
const authTitle = document.getElementById("authTitle");
const authName = document.getElementById("authName");
const authEmail = document.getElementById("authEmail");
const authPassword = document.getElementById("authPassword");
const toggleMode = document.getElementById("toggleAuthMode");
const divName = document.getElementById("Name");
const numberInput = document.getElementById("Number");

let isSignup = false;

// Alterner entre Connexion / Inscription
function toggleAuthMode() {
  isSignup = !isSignup;
  authTitle.textContent = isSignup ? "Creer un nouveau compte" : "Connectez-vous à votre compte";
  authP.textContent = isSignup ? "Entrez vos informations pour créer un compte." : "Entrez vos identifiants pour accéder à votre tableau de bord.";
  authSubmit.textContent = isSignup ? "S'inscrire" : "Connexion";
  colorPicker.classList.toggle("d-none", !isSignup);
  toggleMode.innerHTML = isSignup
    ? `Vous avez déjà un compte ? <a href="#" id="in">Se connecter</a>`
    : `Vous n'avez pas encore de compte ? <a href="#" id="up">S'inscrire</a>`;
  switchToSignup.textContent = isSignup ? "Se connecter" : "S'inscrire";
  divName.classList.toggle("d-none", !isSignup);
  numberInput.classList.toggle("d-none", !isSignup);
  authPassword.style.width = !isSignup ? "460px" : "100%";
  authPassword.style.transition = "none";
  clearAlert();
}

// Ouvrir le formulaire
openAuth?.addEventListener("click", () => {
  authOverlay.classList.remove("d-none");
});

// Bascule inscription/connexion
switchToSignup.addEventListener("click", (e) => {
  e.preventDefault();
  toggleAuthMode();
});

toggleMode.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.tagName === "A") toggleAuthMode();
});

// ❌ Fermer formulaire si clic en dehors
authOverlay.addEventListener("click", (e) => {
  if (e.target === authOverlay) {
    authOverlay.classList.add("d-none");
    clearAlert();
  }
});

// ✅ Validation du formulaire
authForm.addEventListener("submit", (e) => {
  e.preventDefault();
});