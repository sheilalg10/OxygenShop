const returnTop = document.getElementById("returnTop");
const slides = document.querySelectorAll(".slides img");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const dotsContainer = document.getElementById("dots-container");
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("closeBtn");
const form__modal = document.getElementById("form__modal");
const email = document.getElementById("email");
const message = document.getElementById("message");

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

// Modal
document.addEventListener("DOMContentLoaded", function () {
  let hasClosed = localStorage.getItem("modalClosed");

  function showModal() {
    if (!hasClosed) {
      modal.classList.add("show");
    }
  }

  setTimeout(showModal, 5000);

  window.addEventListener("scroll", function () {
    if (
      !hasClosed &&
      this.window.scrollY > this.document.body.scrollHeight * 0.25
    ) {
      showModal();
    }
  });

  closeBtn.addEventListener("click", function () {
    modal.classList.remove("show");
  });

  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.classList.remove("show");
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key == "Escape") {
      modal.classList.remove("show");
    }
  });

  form__modal.addEventListener("submit", function (event) {
    let validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    event.preventDefault();
    if (validEmail.test(email.value.trim())) {
      message.style.display = "block";
      message.classList.add("success");
      message.textContent = "Thanks for subscribing!"
      setTimeout(() => {
        modal.classList.remove("show");
        localStorage.setItem("modalClosed", true);
      }, 2000);
    } else {
      message.style.display = "block";
      message.classList.add("error");
      message.textContent = "Subscription failure!"
    }
  });
});
