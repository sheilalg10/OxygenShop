const returnTop = document.getElementById("returnTop");
const slides = document.querySelectorAll(".slides img");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const dotsContainer = document.getElementById("dots-container");
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("closeBtn");
const form__modal = document.getElementById("form__modal");
const emailInput = document.getElementById("email");
const message = document.getElementById("message");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const select = document.getElementById("select");
const pricing__basic = document.getElementById("pricing__basic");
const pricing__prof = document.getElementById("pricing__prof");
const pricing__prem = document.getElementById("pricing__prem");
const form = document.getElementById("form");
const nameForm = document.getElementById("name");
const nameError = document.getElementById("nameError");
const emailForm = document.getElementById("emailForm");
const emailError = document.getElementById("emailError");
const form__checkbox = document.getElementById("form__checkbox");

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
    window.scrollTo({ top: 0, behavior: "smooth" });
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
  function isModalClosed() {
    return localStorage.getItem("modalClosed") === "true";
  }

  function showModal() {
    if (!isModalClosed()) {
      modal.classList.add("show");
      modal.style.display = "block";
    }
  }

  function closeModalFunction() {
    modal.classList.remove("show");
    modal.style.display = "none";
    localStorage.setItem("modalClosed", "true");
  }

  function handleScrollTrigger() {
    if (
      !isModalClosed() &&
      window.scrollY > document.body.scrollHeight * 0.25
    ) {
      showModal();
      window.removeEventListener("scroll", handleScrollTrigger);
    }
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    const email = emailInput.value.trim();

    if (emailRegex.test(email)) {
      message.style.display = "block";
      message.classList.add("success");
      message.textContent = "Thanks for subscribing!";
      setTimeout(closeModalFunction, 2000);
    } else {
      message.style.display = "block";
      message.classList.add("error");
      message.textContent = "Please enter a valid email address.";
    }
  }

  function addEventListeners() {
    closeBtn.addEventListener("click", closeModalFunction);
    modal.addEventListener("click", (event) => {
      if (event.target === modal) closeModalFunction();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeModalFunction();
    });
    form__modal.addEventListener("submit", handleFormSubmit);
    window.addEventListener("scroll", handleScrollTrigger);
  }

  if (isModalClosed()) {
    modal.style.display = "none";
    return;
  }

  setTimeout(showModal, 5000);

  addEventListeners();
});

// Select Price
document.addEventListener("DOMContentLoaded", async function () {
  let exchangeRates = {};

  fetch(
    "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json"
  )
    .then((res) => res.json())
    .then((json) => {
      exchangeRates = {
        gbp: json.usd.gbp,
        eur: json.usd.eur,
        usd: json.usd.usd,
      };
    })
    .catch((err) => {
      console.log(err);
    });

  select.addEventListener("change", function () {
    const selectCurrency = select.value;
    const symbol =
      selectCurrency === "eur" ? "€" : selectCurrency === "usd" ? "$" : "£";
    const price = {
      basic: 0,
      prof: 25,
      premium: 60,
    };
    pricing__basic.textContent =
      symbol + (price.basic * exchangeRates[selectCurrency]).toFixed(0);
    pricing__prof.textContent =
      symbol + (price.prof * exchangeRates[selectCurrency]).toFixed(0);
    pricing__prem.textContent =
      symbol + (price.premium * exchangeRates[selectCurrency]).toFixed(0);
  });
});

// Valid Form
form.addEventListener("submit", async function (event) {
  event.preventDefault();
  let isValid = true;

  // Validar nombre
  if (!/^\p{L}{2,100}$/u.test(nameForm.value)) {
    nameForm.classList.add("error");
    nameError.style.display = "inline";
    isValid = false;
  } else {
    nameForm.classList.remove("error");
    nameError.style.display = "none";
  }
  // Validar email
  if (!emailRegex.test(emailForm.value)) {
    emailForm.classList.add("error");
    emailError.style.display = "inline";
    isValid = false;
  } else {
    emailForm.classList.remove("error");
    emailError.style.display = "none";
  }
  // Validar checkbox
  if (!form__checkbox.checked) {
    form__checkbox.classList.add("errorCheckbox");
    isValid = false;
  } else {
    form__checkbox.classList.remove("errorCheckbox");
  }

  // Recoger datos
  if (isValid) {
    const formData = {
      nameForm: nameForm.value,
      emailForm: emailForm.value,
      form__checkbox: form__checkbox,
    };

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      console.log("Respuesta de la API:" + result);
      alert("Formulario enviado con éxito!");
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      alert("Hubo un error al enviar el formulario.");
    }
  }
});

// Menu hamburguesa
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  nav.classList.toggle("active");
});
