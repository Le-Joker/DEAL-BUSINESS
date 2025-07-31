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
// Base d'utilisateurs simulée
const USERS_KEY = "users";
const SESSION_KEY = "currentUser";

const authForm = document.getElementById("authForm");
const authSubmit = document.getElementById("authSubmit");
const openAuth = document.getElementById("openAuth");
const authOverlay = document.getElementById("authOverlay");
const colorPicker = document.getElementById("colorPicker");
const switchToSignup = document.getElementById("switchToSignup");
const authTitle = document.getElementById("authTitle");
const toggleMode = document.getElementById("toggleAuthMode");
const alertBox = document.getElementById("authAlert");

let isSignup = false;

// 🔁 Alterner connexion / inscription
function toggleAuthMode() {
  isSignup = !isSignup;
  authTitle.textContent = isSignup ? "Inscription" : "Connexion";
  authSubmit.textContent = isSignup ? "S'inscrire" : "Connexion";
  colorPicker.classList.toggle("d-none", !isSignup);
  toggleMode.innerHTML = isSignup
    ? `Vous avez déjà un compte ? <a href="#">Se connecter</a>`
    : `Vous n'avez pas encore de compte ? <a href="#">S'inscrire</a>`;
  switchToSignup.textContent = isSignup ? "Se connecter" : "S'inscrire";
  clearAlert();
}

// 👁️ Ouvrir le formulaire
openAuth?.addEventListener("click", () => {
  authOverlay.classList.remove("d-none");
});

// 🔁 Liens de bascule
switchToSignup.addEventListener("click", (e) => {
  e.preventDefault();
  toggleAuthMode();
});
toggleMode.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.tagName === "A") toggleAuthMode();
});

// ❌ Fermer formulaire
authOverlay.addEventListener("click", (e) => {
  if (e.target === authOverlay) {
    authOverlay.classList.add("d-none");
    clearAlert();
  }
});

// ✅ Validation formulaire
authForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = authForm.email.value.trim();
  const password = authForm.password.value.trim();
  const color = authForm.color?.value || "#9eeaf9";

  if (!email || !password) {
    showAlert("Veuillez remplir tous les champs.");
    return;
  }

  let users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];

  if (isSignup) {
    if (users.find((u) => u.email === email)) {
      showAlert("📧 Cet email est déjà utilisé.");
      return;
    }

    users.push({ email, password, color });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    localStorage.setItem(SESSION_KEY, email);
    window.location.href = "boutique.html";
  } else {
    const user = users.find((u) => u.email === email);

    if (!user) {
      showAlert(
        "👤 Aucun compte trouvé avec cet email. Veuillez vous inscrire."
      );
      return;
    }

    if (user.password !== password) {
      showAlert("❌ Mot de passe incorrect.");
      return;
    }

    localStorage.setItem(SESSION_KEY, user.email);
    window.location.href = "boutique.html";
  }
});

// 🔔 Alertes Bootstrap
function showAlert(message) {
  if (!alertBox) return;
  alertBox.innerHTML = `
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fermer"></button>
    </div>
  `;
}

function clearAlert() {
  if (alertBox) alertBox.innerHTML = "";
}
