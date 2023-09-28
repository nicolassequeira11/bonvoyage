document.addEventListener("DOMContentLoaded", ()=>{

const travelsContainerArg = document.getElementById("travels-container-arg");
const travelsContainerBra = document.getElementById("travels-container-bra");
const travelsContainerUsa = document.getElementById("travels-container-usa");
const travelsContainerSud = document.getElementById("travels-container-sud");

  // FETCH ARGENTINA
  fetch("https://raw.githubusercontent.com/nicolassequeira11/bonvoyage/main/json/travels.json")
  .then((response) => response.json())
  .then((data) => {
    const travels = data;
    const travelsArg = travels.destinations.filter(travel => travel.pais === "Argentina");
    showTravels(travelsArg, travelsContainerArg);
  })

  // FETCH BRASIL
  fetch("https://raw.githubusercontent.com/nicolassequeira11/bonvoyage/main/json/travels.json")
  .then((response) => response.json())
  .then((data) => {
    const travels = data;
    const travelsBra = travels.destinations.filter(travel => travel.pais === "Brasil");
    showTravels(travelsBra, travelsContainerBra);
  })

  // FETCH ESTADOS UNIDOS
  fetch("https://raw.githubusercontent.com/nicolassequeira11/bonvoyage/main/json/travels.json")
  .then((response) => response.json())
  .then((data) => {
    const travels = data;
    const travelsUsa = travels.destinations.filter(travel => travel.pais === "Estados Unidos");
    showTravels(travelsUsa, travelsContainerUsa);
  })

  // FETCH SUDAMERICA
  fetch("https://raw.githubusercontent.com/nicolassequeira11/bonvoyage/main/json/travels.json")
  .then((response) => response.json())
  .then((data) => {
    const travels = data;
    const travelsSud = travels.destinations.filter(travel => travel.pais === "Sudamerica");
    showTravels(travelsSud, travelsContainerSud);
  })

  // FUNCIONES
  function showTravels(array, container) {
  
    if (array.length > 0) {
      array.forEach((travel) => {
        container.innerHTML += `
                  <div onclick="setProductID(${travel.id}), setCatID(${travel.catID})" class="travel-index">
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

/* Crear un localStorage para guardar el id de cada viaje */
function setProductID(id) {
  localStorage.setItem("travelID", id); // Crea el localStorage con la key "travelID"
  window.location = "travel-info.html"; // Redirige a product-info.html
}