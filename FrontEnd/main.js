function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("show");
}

function openUserModal() {
  const email = localStorage.getItem("deal_current_user");
  const users = JSON.parse(localStorage.getItem("deal_business_users") || "{}");
  const user = users[email];

  document.getElementById("modalEmail").textContent = email;
  document.getElementById("modalColor").textContent =
    user?.color || "Non défini";
  new bootstrap.Modal(document.getElementById("userModal")).show();
}

function logout() {
  localStorage.removeItem("deal_current_user");
  window.location.href = "index.html";
}

function deleteAccount() {
  const confirmDelete = confirm(
    "⚠️ Es-tu sûr de vouloir supprimer ton compte ?"
  );
  if (!confirmDelete) return;

  const email = localStorage.getItem("deal_current_user");
  let users = JSON.parse(localStorage.getItem("deal_business_users") || "{}");

  delete users[email];
  localStorage.setItem("deal_business_users", JSON.stringify(users));
  localStorage.removeItem("deal_current_user");

  alert("Ton compte a été supprimé.");
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const email = localStorage.getItem("deal_current_user");
  const users = JSON.parse(localStorage.getItem("deal_business_users") || "{}");
  const user = users[email];

  if (email && user) {
    document.getElementById("userEmail").textContent = email;
    document.getElementById("userPhoto").style.background =
      user.color || "#ccc";
  } else {
    window.location.href = "index.html"; // Redirection si pas connecté
  }
});
