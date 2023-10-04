document.addEventListener("DOMContentLoaded", ()=>{

const travelsContainerBra = document.getElementById("travels-container-bra");
const travelsContainerUsa = document.getElementById("travels-container-usa");
const travelsContainerSud = document.getElementById("travels-container-sud");

  // FETCH SUDAMERICA
  fetch("https://raw.githubusercontent.com/nicolassequeira11/bonvoyage/main/json/travels.json")
  .then((response) => response.json())
  .then((data) => {
    const travels = data;
    const travelsSud = travels.destinations.filter(travel => travel.region === "Sudamerica" && travel.country !== "Brasil");
    travelsSud.reverse()
    showTravels(travelsSud, travelsContainerSud);
  })

  // FETCH BRASIL
  fetch("https://raw.githubusercontent.com/nicolassequeira11/bonvoyage/main/json/travels.json")
  .then((response) => response.json())
  .then((data) => {
    const travels = data;
    const travelsBra = travels.destinations.filter(travel => travel.country === "Brasil");
    showTravels(travelsBra, travelsContainerBra);
  })

  // FETCH ESTADOS UNIDOS
  fetch("https://raw.githubusercontent.com/nicolassequeira11/bonvoyage/main/json/travels.json")
  .then((response) => response.json())
  .then((data) => {
    const travels = data;
    const travelsUsa = travels.destinations.filter(travel => travel.country === "Estados Unidos");
    showTravels(travelsUsa, travelsContainerUsa);
  })

});

// FUNCIONES

/* Mostrar viajes */
function showTravels(array, container) {

  if (array.length > 0) {
    array.forEach((travel) => {
       container.innerHTML += `
                <div onclick="setProductID(${travel.id}), setCatID(${travel.catID})" class="travel-index">
                    <div class="travel-index__container">
                        <img class="travel-index__image" src="${travel.image}">
                        <h5 class="travel-index__title">${travel.name}</h5>
                        <p class="travel-index__date">${travel.date}</p>
                        <p class="travel-index__price">U$S ${travel.price}</p>
                        <p class="travel-index__priceType">${travel.priceType}</p>
                    </div>
                </div>
                `;
     });
  } else {
    // Alerta para cuando no se encuentran productos
    container.innerHTML = `<div class="alert-danger bg-danger alert-error-filter">No se encontraron productos</div>`;
  }
}

/* Crear un localStorage para guardar el id de cada viaje */
function setProductID(id) {
  localStorage.setItem("travelID", id); // Crea el localStorage con la key "travelID"
  window.location = "travel-info.html"; // Redirige a product-info.html
}