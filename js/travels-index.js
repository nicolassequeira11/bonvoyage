document.addEventListener("DOMContentLoaded", ()=>{

const travelsContainerArg = document.getElementById("travels-container-arg");
const travelsContainerBra = document.getElementById("travels-container-bra");

  // FETCH ARGENTINA
  fetch("https://raw.githubusercontent.com/nicolassequeira11/bonvoyage/main/json/categories/101.json")
  .then((response) => response.json())
  .then((data) => {
    const travelsArgentina = data;
    showTravels(travelsArgentina.destinations, travelsContainerArg);
  })

  // FETCH BRASIL
  fetch("https://raw.githubusercontent.com/nicolassequeira11/bonvoyage/main/json/categories/102.json")
  .then((response) => response.json())
  .then((data) => {
    const travelsBrasil = data;
    showTravels(travelsBrasil.destinations, travelsContainerBra);
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

/* Crear localStorage para guardar el catID de cada viaje */
function setCatID(catID){
  localStorage.setItem("catID", catID);
}