document.addEventListener("DOMContentLoaded", function () {
 
    let boton = document.querySelector(".nav-content-icon");
    let links = document.querySelector(".links-mobile");

    boton.addEventListener("click", ()=> {
        links.classList.toggle("links-mobile");
    });

});

/* CAMBIO DE ESTILO DEL HEADER AL SCROLLEAR */

const header = document.querySelector('header');
const logo = document.getElementById("logo-nav");
const navbar = document.getElementById("navbar");
const navLink = document.querySelectorAll(".nav-link");
const navIcon = document.querySelector(".nav-icon");

function handleStickyHeader() {
  const scrollPosition = window.scrollY;

  if (scrollPosition === 0) {
    header.classList.remove('sticky');
    logo.setAttribute("src", "logo.png");
    navbar.style.backgroundColor = "#f8f9fa";
    navLink.forEach(link => {link.style.color = "#dc3545";});
    navIcon.style.color = "#dc3545";
    
  } else {
    header.classList.add('sticky');
    logo.setAttribute("src", "logo-white.png");
    navbar.style.backgroundColor = "#dc3545";
    navLink.forEach(link => {link.style.color = "#f8f9fa";});
    navIcon.style.color = "#f8f9fa";
  }
}

window.addEventListener('scroll', handleStickyHeader);