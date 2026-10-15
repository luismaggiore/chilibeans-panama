// Navbar: transparente y sin borde al top; al hacer scroll (o al abrir el
// menú en móvil) recibe .bg-light. La transición está en style.css.
const navbar = document.querySelector(".navbar");
const navMenu = document.getElementById("mainNav");

function updateNavbar() {
  const solid = window.scrollY > 0 || navMenu.classList.contains("show");
  navbar.classList.toggle("bg-light", solid);
}

window.addEventListener("scroll", updateNavbar, { passive: true });
navMenu.addEventListener("show.bs.collapse", () =>
  navbar.classList.add("bg-light"),
);
navMenu.addEventListener("hidden.bs.collapse", updateNavbar);
updateNavbar();
