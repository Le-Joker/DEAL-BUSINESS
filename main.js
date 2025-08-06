const dashboard = document.getElementById("dashboard");
const sidebar = document.getElementById("sidebar");
const toggleTopBtn = document.getElementById("toggleSidebar");
const toggleBottomBtn = document.getElementById("toggleSidebarBottom");

let expanded = false;

function toggleSidebar() {
  expanded = !expanded;
  sidebar.classList.toggle("expanded", expanded);
  dashboard.classList.toggle("expanded", expanded);
  toggleTopBtn.classList.toggle("d-none", expanded);
  toggleBottomBtn.classList.toggle("d-none", !expanded);
}

toggleTopBtn.addEventListener("click", toggleSidebar);
toggleBottomBtn.addEventListener("click", toggleSidebar);
