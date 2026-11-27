// ---------- Promo bar ----------
const promo = document.getElementById("promo");
const promoClose = document.getElementById("promoClose");
if (promo && promoClose) {
  promoClose.addEventListener("click", function () { promo.style.display = "none"; });
}

// ---------- Mobile menu ----------
const nav = document.getElementById("nav");
const menuBtn = document.getElementById("menuBtn");
const closeMenu = document.getElementById("closeMenu");
if (menuBtn) {
  menuBtn.addEventListener("click", function () { nav.classList.add("open"); });
  closeMenu.addEventListener("click", function () { nav.classList.remove("open"); });
  nav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () { nav.classList.remove("open"); });
  });
}

// ---------- Hero slider ----------
const slides = document.querySelectorAll(".slide");
if (slides.length) {
  let current = 0;
  function showSlide(i) {
    slides[current].classList.remove("active");
    current = (i + slides.length) % slides.length;
    slides[current].classList.add("active");
  }
  document.getElementById("next").addEventListener("click", function () { showSlide(current + 1); });
  document.getElementById("prev").addEventListener("click", function () { showSlide(current - 1); });
  setInterval(function () { showSlide(current + 1); }, 5000);
}

// ---------- Heart (wishlist) buttons ----------
document.querySelectorAll(".heart").forEach(function (h) {
  h.addEventListener("click", function () {
    h.classList.toggle("liked");
    h.innerHTML = h.classList.contains("liked") ? "&#9829;" : "&#9825;";
  });
});

// ---------- Newsletter ----------
const subscribeBtn = document.getElementById("subscribeBtn");
if (subscribeBtn) {
  subscribeBtn.addEventListener("click", function () {
    const input = document.querySelector(".newsletter input");
    if (input.value.trim() === "") { alert("Please enter your email."); return; }
    alert("Thanks for subscribing!");
    input.value = "";
  });
}

// ---------- Collections: search + filter ----------
const searchInput = document.getElementById("searchInput");
if (searchInput) {
  const products = document.querySelectorAll("#productGrid .product");
  const occasionBoxes = document.querySelectorAll(".f-occasion");
  const colorBoxes = document.querySelectorAll(".f-color");
  const noResults = document.getElementById("noResults");

  function checkedValues(boxes) {
    return Array.from(boxes).filter(function (b) { return b.checked; })
                            .map(function (b) { return b.value; });
  }

  function applyFilters() {
    const text = searchInput.value.toLowerCase().trim();
    const occasions = checkedValues(occasionBoxes);
    const colors = checkedValues(colorBoxes);
    let visible = 0;

    products.forEach(function (p) {
      const name = p.querySelector("h3").textContent.toLowerCase();
      const okText = name.includes(text);
      const okOccasion = occasions.length === 0 || occasions.includes(p.dataset.occasion);
      const okColor = colors.length === 0 || colors.includes(p.dataset.color);
      const show = okText && okOccasion && okColor;
      p.style.display = show ? "block" : "none";
      if (show) visible++;
    });
    noResults.style.display = visible === 0 ? "block" : "none";
  }

  searchInput.addEventListener("input", applyFilters);
  occasionBoxes.forEach(function (b) { b.addEventListener("change", applyFilters); });
  colorBoxes.forEach(function (b) { b.addEventListener("change", applyFilters); });
}

// ---------- Contact form ----------
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    document.getElementById("formMsg").textContent = "Thanks! Your message has been sent.";
    contactForm.reset();
  });
}
