const returnTop = document.getElementById("returnTop");
const slides = document.querySelectorAll(".slides img");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const dotsContainer = document.getElementById("dots-container");

// Percentage Scroll
window.addEventListener("scroll", function () {
  let scrollTop = window.scrollY;
  let documentHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  let scrollPercent = (scrollTop / documentHeight) * 100;

  document.getElementById("progressBar").style.width = scrollPercent + "%";

  // Mostrar botón cuando se baja más de 100px
  if (scrollTop > 100) {
    returnTop.style.display = "block";
  } else {
    returnTop.style.display = "none";
  }
});

// Boton "Retunr to the top"
returnTop.addEventListener("click", function () {
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 200);
});

// Slider
document.addEventListener("DOMContentLoaded", () => {
  let index = 0;

  slides.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => seleccionarSlide(i));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".dot");

  function mostrarSlide(n) {
    slides.forEach((img) => img.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    slides[n].classList.add("active");
    dots[n].classList.add("active");
  }

  function moverSlide(n) {
    index += n;
    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;
    mostrarSlide(index);
  }

  function seleccionarSlide(n) {
    index = n;
    mostrarSlide(index);
  }

  prevBtn.addEventListener("click", () => moverSlide(-1));
  nextBtn.addEventListener("click", () => moverSlide(1));

  setInterval(() => moverSlide(1), 3000);

  mostrarSlide(index);
});
