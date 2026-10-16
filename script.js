// Navbar: transparente y sin borde al top; al hacer scroll (o al abrir el
// menú en móvil) recibe .bg-light. La transición está en style.css.
// En páginas sin .hero (producto.html) el nav va siempre sólido.
const navbar = document.querySelector(".navbar");
const navMenu = document.getElementById("mainNav");
const hasHero = document.querySelector(".hero") !== null;

function updateNavbar() {
  const solid =
    !hasHero || window.scrollY > 0 || navMenu.classList.contains("show");
  navbar.classList.toggle("bg-light", solid);
}

window.addEventListener("scroll", updateNavbar, { passive: true });
navMenu.addEventListener("show.bs.collapse", () =>
  navbar.classList.add("bg-light"),
);
navMenu.addEventListener("hidden.bs.collapse", updateNavbar);
updateNavbar();

// Galería de producto: marca la miniatura de la foto que se está mostrando
const gallery = document.getElementById("productGallery");
if (gallery) {
  const thumbs = document.querySelectorAll(".product-thumbs [data-bs-slide-to]");
  gallery.addEventListener("slide.bs.carousel", (e) => {
    thumbs.forEach((thumb, i) => {
      thumb.classList.toggle("active", i === e.to);
      thumb.toggleAttribute("aria-current", i === e.to);
    });
  });
}

// Selector de cantidad: los botones − y + suben o bajan el campo (min="1")
document.querySelectorAll("[data-qty]").forEach((button) => {
  button.addEventListener("click", () => {
    const input = button.parentElement.querySelector("input");
    if (button.dataset.qty === "up") input.stepUp();
    else input.stepDown();
  });
});

// Selector de variantes: muestra el color elegido junto a "Color:"
const variantLabel = document.querySelector("[data-variant-label]");
if (variantLabel) {
  document.querySelectorAll('input[name="color"]').forEach((input) => {
    input.addEventListener("change", () => {
      variantLabel.textContent = input.value;
    });
  });
}

// Compartir: menú nativo del celular; en escritorio copia el enlace
const shareButton = document.querySelector("[data-share]");
if (shareButton) {
  shareButton.addEventListener("click", async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: document.title, url: location.href });
      } catch {
        // El usuario cerró el menú de compartir
      }
      return;
    }
    await navigator.clipboard.writeText(location.href);
    shareButton.querySelector("span").textContent = "Vínculo copiado";
  });
}
