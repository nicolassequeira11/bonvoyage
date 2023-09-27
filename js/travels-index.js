document.addEventListener("DOMContentLoaded", ()=>{

const travelsContainerArg = document.getElementById("travels-container-arg");
const travelsContainerBra = document.getElementById("travels-container-bra");

const urlArg = "https://raw.githubusercontent.com/nicolassequeira11/bonvoyage/main/json/travelsArgentina.json";
const urlBra = "https://raw.githubusercontent.com/nicolassequeira11/bonvoyage/main/json/travelsBrasil.json";

  // FETCH ARGENTINA
  fetch(urlArg)
  .then((response) => response.json())
  .then((data) => {
    const travelsArgentina = data.destinations;
    showTravels(travelsArgentina, travelsContainerArg);
  })

  // FETCH BRASIL
  fetch(urlBra)
  .then((response) => response.json())
  .then((data) => {
    const travelsBrasil = data.destinations;
    showTravels(travelsBrasil, travelsContainerBra);
  })

  // FUNCIONES
  function showTravels(array, container) {
  
    if (array.length > 0) {
      array.forEach((travel) => {
        container.innerHTML += `
                  <div onclick="setProductID(${travel.id})" class="travel-index">
                      <div class="travel-index__container">
                          <img class="card-image travel-index__image" src="${travel.image}">
                          <h5 class="card-title travel-index__title">${travel.name}</h5>
                          <p class="card-description travel-index__date">${travel.date}</p>
                          <p class="card-cost travel-index__price">${travel.price}</p>
                          <p class="card-soldcount travel-index__priceType">${travel.priceType}</p>
                      </div>
                  </div>
                  `;
      });
    } else {
      // Alerta para cuando no se encuentran productos
      container.innerHTML = `<div class="alert-danger bg-danger alert-error-filter">No se encontraron productos</div>`;
    }
  }
});

/* Crear un localStorage para guardar el id de cada viaje y usarlo al clickear en el */
function setProductID(id) {
  localStorage.setItem("productID", id); // Crea el localStorage con la key "productID"
  window.location = "viaje.html"; // Redirige a product-info.html
}