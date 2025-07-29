// === Constantes clés de stockage ===
const USERS_KEY = "deal_business_users";
const CURRENT_USER_KEY = "deal_current_user";

// === Sélecteurs DOM ===
const signInForm = document.querySelector("#signInModal form");
const signUpForm = document.querySelector("#signUpModal form");
const signInBtn = document.querySelector('[data-bs-target="#signInModal"]');
const signUpBtn = document.querySelector('[data-bs-target="#signUpModal"]');
const exploreBtn = document.querySelector('a.btn[href="#"]');

// === Fonctions utilitaires de stockage ===
function loadUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || {};
}
function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}
function setCurrentUser(email) {
  localStorage.setItem(CURRENT_USER_KEY, email);
}
function getCurrentUser() {
  return localStorage.getItem(CURRENT_USER_KEY);
}

// === Gérer affichage selon état de connexion ===
function updateUIOnAuth() {
  const email = getCurrentUser();
  if (email) {
    signInBtn?.classList.add("d-none");
    signUpBtn?.classList.add("d-none");

    exploreBtn.textContent = "Accéder à la boutique";
    exploreBtn.removeAttribute("data-bs-toggle");
    exploreBtn.removeAttribute("data-bs-target");
    exploreBtn.setAttribute("href", "boutique.html");
  }
}

// === Inscription ===
signUpForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = signUpForm.signupEmail.value.trim().toLowerCase();
  const password = signUpForm.signupPassword.value.trim();
  const color = signUpForm.userColor?.value || "#0d6efd"; // fallback par défaut

  if (!email || !password || !color) {
    alert("Remplis tous les champs !");
    return;
  }

  const users = loadUsers();
  if (users[email]) {
    alert("Utilisateur déjà existant.");
    return;
  }

  users[email] = { password, color };
  saveUsers(users);
  setCurrentUser(email);

  alert("Inscription réussie !");
  signUpForm.reset();

  bootstrap.Modal.getInstance(document.getElementById("signUpModal"))?.hide();
  new bootstrap.Modal(document.getElementById("signInModal")).show();
});

// === Connexion ===
signInForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = signInForm.loginEmail.value.trim().toLowerCase();
  const password = signInForm.loginPassword.value.trim();

  const users = loadUsers();
  if (!users[email]) return alert("Utilisateur non trouvé !");
  if (users[email].password !== password)
    return alert("Mot de passe incorrect !");

  setCurrentUser(email);
  alert("Connexion réussie !");
  signInForm.reset();

  bootstrap.Modal.getInstance(document.getElementById("signInModal"))?.hide();
  window.location.href = "boutique.html";
});

// === Initialisation au chargement ===
document.addEventListener("DOMContentLoaded", updateUIOnAuth);
