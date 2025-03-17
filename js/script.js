const returnTop = document.getElementById("returnTop");

// Percentage Scroll
window.addEventListener("scroll", function () {
    let scrollTop = window.scrollY;
    let documentHeight = document.documentElement.scrollHeight - window.innerHeight;
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
    setTimeout(() =>{
        window.scrollTo({top: 0, behavior: "smooth"});
    }, 200);
})