document.addEventListener("DOMContentLoaded", () => {

  const containerInfo = document.getElementById("travel-info");

  const travelID = localStorage.getItem("travelID");

  // FETCH ARGENTINA
  fetch("https://raw.githubusercontent.com/nicolassequeira11/bonvoyage/main/json/travels.json")
    .then((response) => response.json())
    .then((data) => {
      const traveldata = data;
      const travelInfo = traveldata.destinations.filter(travel => travel.id == travelID);
      showTravelInfo(travelInfo[0]);
    });


/* ---------- FUNCIONES ---------- */

/* Mostrar info del producto */
function showTravelInfo(array) {
  containerInfo.innerHTML = `
    <div class="col-12 m-auto travel-info">
    
      <div class="m-auto travel-info__img-container">
      
        <div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel">
          <div class="carousel-inner travel-info__img-container">
            <div class="carousel-item active" data-bs-interval="4000">
              <img src="${array.imageBanner[0]}" class="d-block w-100 travel-info__img" alt="...">
            </div>
            <div class="carousel-item" data-bs-interval="4000">
              <img src="${array.imageBanner[1]}" class="d-block w-100 travel-info__img" alt="...">
            </div>
          </div>
        </div>
        
        <div class="travel-info__title-container">
          <h2 class="travel-info__title"><strong>${array.name}</strong></h2>
          <a href="#travel-info-container">
            <i class="bi bi-arrow-down-circle-fill travel-info__icon-arrow" id="icon-arrow-down"></i>
          </a>
        </div>
      </div>

      <div class="d-flex col-12 d-flex flex-lg-row flex-column-reverse container-xl" id="travel-info-container">
        <div class="col-12 col-lg-8 travel-info__include-container">
          <p class="travel-info__include-title"><strong>Incluye:</strong></p>
          <p class="travel-info__include-items-container">${includes(array.includes)}</p>
          <p class="travel-info__include-title"><strong>Itinerario:</strong></p>
          <p class="travel-info__include-items-container">${includes(array.itinerary)}</p>
        </div>

        <div class="col-12 col-lg-3 travel-info__info-container">
          <h3 class="travel-info__info-title">${array.name}</h3>
          <h5 class="travel-info__info-days">${array.days}</h5>
          <p class="travel-info__info-date">${array.date}</p>
          <p class="travel-info__info-description">${array.description}</p>
          <p class="travel-info__info-price"><strong>${array.price}</strong></p>
          <p class="travel-info__info-priceType">${array.priceType}</p>
          <button class="travel-info__info-button">Consultar</button>
        </div>
      </div>

    </div>
  `;
}

/* Crear lista */
function includes(array){
  let container = "";

  for(let i=0; i<array.length; i++){
    container += `<p class="travel-info__include-items">`+ array[i] + `</p>`;
  }

  return container;
  }
});
