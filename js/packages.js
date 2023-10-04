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
                <div onclick="setProductID(${travel.id}), setCatID(${travel.catID})" 
                    class="travel-packs__travel-container col-12">
                    <div class="travel-packs__travel d-block d-md-flex col-12">

                        <div class="travel-packs__image-container col-12 col-md-4">
                            <img class="travel-packs__image col-12" src="${travel.image}">
                        </div>

                        <div class="travel-packs__info-container py-1 col-12 col-md-8">
                            <div class="px-3">
                                <h5 class="travel-packs__title">${travel.name}</h5>
                                <p class="travel-packs__date col-12">
                                    <i class="bi bi-geo-alt me-2"></i>${travel.citys}
                                </p>
                                <p class="travel-packs__date">
                                    <i class="bi bi-calendar-check me-2"></i>${travel.date}
                                </p>
                            </div>

                            <div class="d-flex px-3">
                                <div class="col-8">
                                    <p class="travel-packs__price">U$S ${travel.price}</p>
                                    <p class="travel-packs__priceType">${travel.priceType}</p>
                                </div>

                                <button class="travel-packs__button col-4">Detalles</button>
                            </div>
                        </div>

                    </div>
                    <hr class="m-auto mx-3">
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

    /* Obtener todos los checkbox con la clase 'filtro'*/
    const filterCheckboxes = document.querySelectorAll('.filtro');

    /* Convertir los checkbox en un array y filtrar aquellos que están marcados */
    const selectedFilters = Array.from(filterCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.name);

    /* Obtener todos los checkbox de filtro de transporte */
    const filterTransporteCheckboxes = document.querySelectorAll('.filtro-tipo');

    /* Convertir los checkbox en un array y filtrar aquellos que están marcados */
    const selectedTransporteFilters = Array.from(filterTransporteCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.name);

    /* Filtrar por rango de precios */
    const minPrice = parseFloat(document.getElementById("min-price").value) || 0;
    const maxPrice = parseFloat(document.getElementById("max-price").value) || Number.MAX_VALUE;

    /* Verificar si los valores son negativos y ajustarlos si es necesario */
    if (minPrice < 0) {
        minPriceInput.value = 0;
    }
    if (maxPrice < 0) {
        maxPriceInput.value = Number.MAX_VALUE;
    }

    /* Clonar los datos de viajes filtrados en una nueva variable para realizar filtrados adicionales */
    let filteredData = [...filteredTravels];

    /* Verificar si se han seleccionado filtros */
    if (selectedFilters.length > 0) {
        /* Filtrar los datos de viajes para mantener solo aquellos cuya región coincide con al menos un filtro seleccionado */
        filteredData = filteredData.filter((travel) => {
            return selectedFilters.some((filter) => travel.region === filter);
        });
    }

    /* Filtrar por tipo de transporte seleccionado */
    if (selectedTransporteFilters.length > 0) {
        filteredData = filteredData.filter((travel) => {
            return selectedTransporteFilters.includes(travel.type);
        });
    }

    /* Filtrar por rango de precios */
    filteredData = filteredData.filter((travel) => {
        const travelPrice = parseFloat(travel.price);
        return travelPrice >= minPrice && travelPrice <= maxPrice;
    });

    showTravels(filteredData);
}