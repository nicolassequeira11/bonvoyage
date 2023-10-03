// Variables para elementos del DOM
const packagesContainer = document.getElementById("packages");
const packagesFilter = document.getElementById("packages-filter");

// Variable para almacenar los viajes filtrados
let filteredTravels = [];

document.addEventListener("DOMContentLoaded", () => {

    // FETCH PAQUETES
    fetch("https://raw.githubusercontent.com/nicolassequeira11/bonvoyage/main/json/travels.json")
        .then((response) => response.json())
        .then((data) => {
            const travels = data.destinations;
            // Almacenar todos los viajes en filteredTravels inicialmente
            filteredTravels = travels;
            showTravels(filteredTravels);

            packagesFilter.addEventListener("change", () => {
                applyFilters();
            });
        });

});

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
        });
    } else {
        // Alerta para cuando no se encuentran productos
        content = `<div class="alert-danger m-auto alert-error-filter">No se encontraron paquetes de viaje.</div>`;
    }
    packagesContainer.innerHTML = content;
}

/* Crear un localStorage para guardar el id de cada viaje */
function setProductID(id) {
    localStorage.setItem("travelID", id); // Crea el localStorage con la key "travelID"
    window.location = "travel-info.html"; // Redirige a product-info.html
}

// FILTROS

function applyFilters() {

    // Obtener todos los checkbox con la clase 'filtro'
    const filterCheckboxes = document.querySelectorAll('.filtro');

    // Convertir los checkbox en un array y filtrar aquellos que están marcados
    const selectedFilters = Array.from(filterCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.name);

    // Clonar los datos de viajes filtrados en una nueva variable para realizar filtrados adicionales
    let filteredData = [...filteredTravels];

    // Verificar si se han seleccionado filtros
    if (selectedFilters.length > 0) {
        // Filtrar los datos de viajes para mantener solo aquellos cuya región coincide con al menos un filtro seleccionado
        filteredData = filteredData.filter((travel) => {
            return selectedFilters.some((filter) => travel.region === filter);
        });
    }
    showTravels(filteredData);
}