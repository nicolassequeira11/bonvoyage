let filteredTravels = []; // Almacenar los viajes filtrados

/* --- FETCH PAQUETES --- */
document.addEventListener("DOMContentLoaded", () => {
  fetch(
    "https://raw.githubusercontent.com/nicolassequeira11/APIS/main/travels.json"
  )
    .then((response) => response.json())
    .then((data) => {
      const travels = data.destinations;
      filteredTravels = travels; // Almacenar todos los viajes en filteredTravels inicialmente
      showTravels(filteredTravels); // Mostrar viajes
      travelsCount(filteredTravels); // Contador inicial de paquete
      btnFilterPrice(filteredTravels); // Filtro inicial precio

      selectAllCheckboxes(selectAllCheckbox, ".filtro"); // Checkbox "todos" en Destino
      selectAllCheckboxes(selectAllCheckboxType, ".filtro-tipo"); // Checkbox "todos" en Transporte

      /* Aplicar applyFilters en todos los checkbox al seleccionarlos */
      packagesFilter.addEventListener("change", () => {
        applyFilters();
      });
    });
});

// Mostrar viajes
function showTravels(array) {
  let content = "";

  if (array.length > 0) {
    array.forEach((travel) => {
      content += `
        <div onclick="setTravelInfo(${travel.id}, '${travel.region}', '${travel.name}');" 
          class="travel-packs__travel-container col-12">
            <div class="travel-packs__travel d-block d-md-flex col-12">

            <div class="travel-packs__image-container col-12 col-md-5">
              <img class="travel-packs__image col-12" src="${travel.image}">
            </div>

            <div class="travel-packs__info-container col-12 col-md-7">
              <div class="travel-packs__data-container col-12">
                <h5 class="travel-packs__title">${travel.name}</h5>
                  <p class="travel-packs__date col-12">
                    <i class="bi bi-globe-americas me-2"></i>${travel.country}
                  </p>
                  <p class="travel-packs__date col-12">
                    <i class="bi bi-geo-alt me-2"></i>${travel.citys}
                  </p>
                  <p class="travel-packs__date">
                    <i class="bi bi-calendar-check me-2"></i>${travel.date}
                  </p>
              </div>

              <div class="travel-packs__data-container d-flex">
                <div class="col-8">
                  <p class="travel-packs__price">U$S ${travel.price}</p>
                  <p class="travel-packs__priceType">${travel.priceType}</p>
              </div>

              <div class="col-4 d-flex">
                <button class="travel-packs__button">Detalles</button>
              </div>
            </div>
          </div>

          </div>
        </div>
        <hr class="m-auto">
            `;
    });
  } else {
    // Alerta para cuando no se encuentran productos
    content = `<div class="mx-auto mt-4 text-center">No se encontraron paquetes de viaje</div>`;
  }
  packagesContainer.innerHTML = content;
}

// Crear localStorage con la información del viaje
function setTravelInfo(id, travelRegion, travelName) {
  localStorage.setItem("travelID", id);
  localStorage.setItem("travelRegion", travelRegion);
  localStorage.setItem("travelName", travelName);
  window.location = "travel-info.html";
}

// Contador de paquetes
function travelsCount(array) {
  let contador = array.length;
  packagesSearch.textContent = `Paquetes de viaje: ${contador}`;
}


/* --- FILTROS --- */

// Función principal, se encarga de aplicar todos los filtros
function applyFilters() {
  const selectedFilters = getSelectedFilters(".filtro");
  const selectedTransporteFilters = getSelectedFilters(".filtro-tipo");

  // Obtener el valor del filtro de precio mínimo
  const minPrice = getFilterValue("min-price", 0);

  // Obtener el valor del filtro de precio máximo
  const maxPrice = getFilterValue("max-price", Number.MAX_VALUE);

  // Clonar los datos de viajes filtrados en una nueva variable
  let filteredData = [...filteredTravels];

  // Aplicar los filtros
  filteredData = filterByRegion(filteredData, selectedFilters);
  filteredData = filterByType(filteredData, selectedTransporteFilters);
  filteredData = filterByPriceRange(filteredData, minPrice, maxPrice);
  btnFilterPrice(filteredData);

  // Muestra los datos filtrados en la interfaz
  displayFilteredData(filteredData);
}

// Obtiene los filtros seleccionados y los devuelve en un array
function getSelectedFilters(checkboxClass) {
  return Array.from(document.querySelectorAll(checkboxClass))
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.name);
}

// Obtiene el valor de un filtro (como el precio) y proporciona un valor predeterminado si no se especifica
function getFilterValue(id, defaultValue) {
  const value = parseFloat(document.getElementById(id).value);
  return isNaN(value) ? defaultValue : value;
}

// Filtra los datos por región si se han seleccionado filtros de región
function filterByRegion(data, selectedFilters) {
  return selectedFilters.length > 0
    ? data.filter((travel) => selectedFilters.some((filter) => travel.region.includes(filter)))
    : data;
}

// Filtra los datos por tipo de transporte si se han seleccionado filtros de tipo de transporte
function filterByType(data, selectedTransporteFilters) {
  return selectedTransporteFilters.length > 0
    ? data.filter((travel) => selectedTransporteFilters.includes(travel.type))
    : data;
}

// Filtra los datos por rango de precios especificado
function filterByPriceRange(data, minPrice, maxPrice) {
  return data.filter((travel) => {
    const travelPrice = parseFloat(travel.price);
    return travelPrice >= minPrice && travelPrice <= maxPrice;
  });
}

// Muestra los datos filtrados en la interfaz y actualiza el contador de paquetes
function displayFilteredData(filteredData) {
  travelsCount(filteredData);
  showTravels(filteredData);
}

// Seleccionar todos los checkboxes
function selectAllCheckboxes(btnCheckbox, checkboxClass){
  btnCheckbox.addEventListener("change", () => {
    const filterCheckboxes = document.querySelectorAll(checkboxClass);

    // Marcar o desmarcar todos los filtros según el estado del "Select All" checkbox
    filterCheckboxes.forEach((checkbox) => {
      checkbox.checked = btnCheckbox.checked;
    });

    applyFilters(); // Aplicar filtros cuando se marque o desmarque el checkbox "todos"
  });
}

// Filtrar precio ascendente
function filterPriceAscendente(array, arrayShow) {
  array.sort((a, b) => {
    return a.price - b.price;
  });
  showTravels(arrayShow);
}

// Filtrar precio descendente
function filterPriceDescendente(array, arrayShow) {
  array.sort((a, b) => {
    return b.price - a.price;
  });
  showTravels(arrayShow);
}

// Asociar eventos a botones de filtro de precio
function btnFilterPrice(filteredData) {

  asc.addEventListener("click", () => {
    filterPriceAscendente(filteredData, filteredData);
  });

  desc.addEventListener("click", () => {
    filterPriceDescendente(filteredData, filteredData);
  });
}

/* --- VARIABLES PARA ELEMENTOS DEL DOM --- */
const packagesContainer = document.getElementById("packages-container"); // Contenedor de los paquetes
const packagesFilter = document.getElementById("packages-filter"); // Contenedor filtros de paquetes
const asc = document.getElementById("price-ascendente"); // Boton filtro precio ascendente
const desc = document.getElementById("price-descendente"); // Boton filtro precio descendente
const packagesSearch = document.getElementById("packages-search"); // Contenedor para el contador de paquetes

const selectAllCheckbox = document.getElementById("filterAll"); // Checkbox "todos" de Destino
const selectAllCheckboxType = document.getElementById("filterAllTransporte"); // Checkbox "todos" de Transporte
