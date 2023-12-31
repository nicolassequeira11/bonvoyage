document.addEventListener("DOMContentLoaded", () => {
  const travelsContainerBra = document.getElementById("travels-container-bra");
  const travelsContainerUsa = document.getElementById("travels-container-usa");
  const travelsContainerSud = document.getElementById("travels-container-sud");
  const travelsContainerAsia = document.getElementById("travels-container-asia");

  // FETCH SUDAMERICA
  fetch(
    "https://raw.githubusercontent.com/nicolassequeira11/APIS/main/travels.json"
  )
    .then((response) => response.json())
    .then((data) => {
      const travels = data;
      const travelsSud = travels.destinations.filter(
        (travel) =>
          travel.region === "Sudamerica" && travel.country !== "Brasil"
      );
      travelsSud.reverse();
      showTravels(travelsSud, travelsContainerSud);
    });

  // FETCH ASIA
  fetch(
    "https://raw.githubusercontent.com/nicolassequeira11/APIS/main/travels.json"
  )
    .then((response) => response.json())
    .then((data) => {
      const travels = data;
      const travelsAsia = travels.destinations.filter(
        (travel) => travel.region === "Asia"
      );
      showTravels(travelsAsia, travelsContainerAsia);
    });

  // FETCH BRASIL
  fetch(
    "https://raw.githubusercontent.com/nicolassequeira11/APIS/main/travels.json"
  )
    .then((response) => response.json())
    .then((data) => {
      const travels = data;
      const travelsBra = travels.destinations.filter(
        (travel) => travel.country === "Brasil"
      );
      showTravels(travelsBra, travelsContainerBra);
    });

  // FETCH ESTADOS UNIDOS
  fetch(
    "https://raw.githubusercontent.com/nicolassequeira11/APIS/main/travels.json"
  )
    .then((response) => response.json())
    .then((data) => {
      const travels = data;
      const travelsUsa = travels.destinations.filter(
        (travel) => travel.country === "Estados Unidos"
      );
      showTravels(travelsUsa, travelsContainerUsa);
    });
});

// FUNCIONES

/* Crear un localStorage para guardar el id de cada paquete de viaje` */
function setTravelInfo(id, travelRegion, travelName) {
  // Establecer valores en localStorage
  localStorage.setItem("travelID", id);
  localStorage.setItem("travelRegion", travelRegion);
  localStorage.setItem("travelName", travelName);
  // Redirigir a travel-info
  window.location = "travel-info.html";
}

/* Mostrar viajes */
function showTravels(array, container) {
  if (array.length > 0) {
    array.forEach((travel) => {
      container.innerHTML += `
                <div onclick="setTravelInfo(${travel.id}, '${travel.region}', '${travel.name}');" 
                    class="travel-index">
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

// SEARCH
document.addEventListener("DOMContentLoaded", () => {
  const inputSearch = document.getElementById("input-search");
  const resultsDiv = document.getElementById("results");

  // Función para realizar la búsqueda
  function search() {
    const searchTerm = inputSearch.value.toLowerCase();

    // Hacer una solicitud a la API de tus paquetes de viaje
    fetch(
      "https://raw.githubusercontent.com/nicolassequeira11/APIS/main/travels.json"
    )
      .then((response) => response.json())
      .then((data) => {
        // Filtrar los paquetes de viaje en función del término de búsqueda
        const filteredElementos = data.destinations.filter((travel) => {
          return (
            travel.name.toLowerCase().includes(searchTerm) ||
            travel.region.toLowerCase().includes(searchTerm) ||
            travel.citys.toLowerCase().includes(searchTerm) ||
            travel.country.toLowerCase().includes(searchTerm)
          );
        });

        // Limpiar el contenido actual del div de resultados
        resultsDiv.innerHTML = "";

        // Comprobar si el campo de búsqueda está vacío
        if (searchTerm.trim() === "") {
          // Si el campo está vacío, ocultar el div de resultados
          resultsDiv.style.display = "none";
        } else {
          // Si hay texto en el campo de búsqueda, mostrar el div de resultados
          resultsDiv.style.display = "block";

          // Comprobar si hay coincidencias
          if (filteredElementos.length === 0) {
            // Si no hay coincidencias, mostrar un mensaje
            resultsDiv.innerHTML = `<p class="mx-auto text-center my-3">No se encontraron resultados.</p>`;
          } else {
            // Si hay coincidencias, mostrar los resultados en el contenedor
            displayResults(filteredElementos);
          }
        }
      })
      .catch((error) => {
        resultsDiv.innerHTML = "Error al obtener los datos.";
      });
  }

  // Función para mostrar los resultados en el contenedor
  function displayResults(results) {
    results.forEach((result) => {
      resultsDiv.innerHTML += `
      <div onclick="setTravelInfo(${result.id}, '${result.region}', '${result.name}');"
        class="banner__search-results-container p-3">
          <h5 class="banner__search-results-title mx-0">
            <i class="bi bi-geo-alt text-danger me-2"></i>${result.name}, ${result.country}
          </h5>
      </div>
      <hr class="my-auto opacity-25">
      `;
    });
  }

  // Evento para escuchar cambios en el campo de entrada
  inputSearch.addEventListener("input", search);
});
