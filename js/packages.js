const packagesContainer = document.getElementById("packages");
const packagesFilter = document.getElementById("packages-filter");

// Variable para almacenar los viajes filtrados
let filteredTravels = [];

document.addEventListener("DOMContentLoaded", ()=>{

  // FETCH PAQUETES
  fetch("https://raw.githubusercontent.com/nicolassequeira11/bonvoyage/main/json/travels.json")
  .then((response) => response.json())
  .then((data) => {
    const travels = data.destinations;
    // Almacenar todos los viajes en filteredTravels inicialmente
    filteredTravels = travels;
    showTravels(filteredTravels);

    document.getElementById("filter-all").addEventListener("click", ()=>{
      showTravels(filteredTravels);
    });

    document.getElementById("filter-usa").addEventListener("click", () => {
      filterByRegion(filteredTravels, "Estados Unidos");
    });

    document.getElementById("filter-sud").addEventListener("click", () => {
      filterByRegion(filteredTravels, "sudamerica");
    });

  })

});

// FUNCIONES

/* Mostrar viajes */
function showTravels(array) {
  let content = "";

  if (array.length > 0) {
    array.forEach((travel) => {
      content += `
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
      packagesContainer.innerHTML = content;
     });
  } else {
    // Alerta para cuando no se encuentran productos
    packagesContainer.innerHTML = `<div class="alert-danger bg-danger alert-error-filter">No se encontraron productos</div>`;
  }
}

/* Crear un localStorage para guardar el id de cada viaje */
function setProductID(id) {
  localStorage.setItem("travelID", id); // Crea el localStorage con la key "travelID"
  window.location = "travel-info.html"; // Redirige a product-info.html
}


// FILTROS

/* Filtro por región */
function filterByRegion(array, region) {
  const filteredTravels = array.filter((travel) => travel.region === region);
  showTravels(filteredTravels);
}