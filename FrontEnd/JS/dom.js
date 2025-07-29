// option de connexion et d'inscription

const signInForm = document.querySelector("#signInModal form");
const signUpForm = document.querySelector("#signUpModal form");
const USERS_KEY = "deal_business_users";

// Charger les utilisateurs
function loadUsers() {
  const usersJSON = localStorage.getItem(USERS_KEY);
  return usersJSON ? JSON.parse(usersJSON) : {};
}

// Sauvegarder
function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Stocker utilisateur connecté
function setCurrentUser(email) {
  localStorage.setItem("currentUser", email);
}

// Récupérer utilisateur connecté
function getCurrentUser() {
  return localStorage.getItem("currentUser");
}

// Déconnexion
function logoutUser() {
  localStorage.removeItem("currentUser");
  window.location.reload();
}

// Mise à jour interface
function updateInterface() {
  const userEmail = getCurrentUser();
  const authButtons = document.getElementById("authButtons");
  const userSpace = document.getElementById("userSpace");
  const userInitial = document.getElementById("userInitial");

  if (userEmail) {
    authButtons.classList.add("d-none");
    userSpace.classList.remove("d-none");
    userInitial.textContent = userEmail.charAt(0).toUpperCase();
  } else {
    authButtons.classList.remove("d-none");
    userSpace.classList.add("d-none");
  }
}

// Inscription
signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = signUpForm.signupEmail.value.trim().toLowerCase();
  const password = signUpForm.signupPassword.value.trim();

  if (!email || !password) {
    alert("Remplis tous les champs !");
    return;
  }

  let users = loadUsers();
  if (users[email]) {
    alert("Utilisateur déjà existant, connecte-toi !");
    return;
  }

  users[email] = { password };
  saveUsers(users);

  alert("Inscription réussie ! Tu peux maintenant te connecter.");
  signUpForm.reset();

  const signUpModal = bootstrap.Modal.getInstance(
    document.getElementById("signUpModal")
  );
  signUpModal.hide();
  const signInModal = new bootstrap.Modal(
    document.getElementById("signInModal")
  );
  signInModal.show();
});

// Connexion
signInForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = signInForm.loginEmail.value.trim().toLowerCase();
  const password = signInForm.loginPassword.value.trim();

  if (!email || !password) {
    alert("Remplis tous les champs !");
    return;
  }

  let users = loadUsers();
  if (!users[email]) {
    alert("Utilisateur non trouvé, inscris-toi !");
    return;
  }

  if (users[email].password !== password) {
    alert("Mot de passe incorrect !");
    return;
  }

  setCurrentUser(email);
  alert(`Bienvenue ${email} ! Tu es connecté.`);
  signInForm.reset();

  const signInModal = bootstrap.Modal.getInstance(
    document.getElementById("signInModal")
  );
  signInModal.hide();

  // Rediriger vers la boutique
  window.location.href = "boutique.html";
});

// Bouton "Explorer la boutique"
const exploreBtn = document.getElementById("exploreBtn");
if (exploreBtn) {
  exploreBtn.addEventListener("click", (e) => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      e.preventDefault();
      const signInModal = new bootstrap.Modal(
        document.getElementById("signInModal")
      );
      signInModal.show();
    } else {
      window.location.href = "boutique.html";
    }
  });
}

// Déconnexion
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", logoutUser);
}

// Initialisation
document.addEventListener("DOMContentLoaded", updateInterface);