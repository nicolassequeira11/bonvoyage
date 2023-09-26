document.addEventListener("DOMContentLoaded", function () {
 
    let boton = document.querySelector(".nav-content-icon");
    let links = document.querySelector(".links-mobile");

    boton.addEventListener("click", ()=> {
        links.classList.toggle("links-mobile");
    });

});