document.addEventListener("DOMContentLoaded", () => {

  const containerInfo = document.getElementById("travel-info");

  const travelID = localStorage.getItem("travelID");

  // FETCH ARGENTINA
  fetch("https://raw.githubusercontent.com/nicolassequeira11/bonvoyage/main/json/travels.json")
    .then((response) => response.json())
    .then((data) => {
      const traveldata = data;
      const travelInfo = traveldata.destinations.filter(travel => travel.id == travelID);
      console.log(travelInfo)
      showTravelInfo(travelInfo[0]);
    });


/* ---------- FUNCIONES ---------- */

/* Mostrar info del producto */
function showTravelInfo(array) {
  containerInfo.innerHTML = `
    <div class="col-12 m-auto travel-info">
    
      <div class="m-auto travel-info__img-container">
        <img class="col-12 travel-info__img" src="${array.imageBanner}">
        <div class="travel-info__title-container">
          <h2 class="travel-info__title"><strong>${array.name}</strong></h2>
        </div>
      </div>

      <div class="d-flex container">
        <div class="col-12 col-lg-8 travel-info__include-container">
          <p class="travel-info__include-title"><strong>Incluye:</strong></p>
          <p class="travel-info__include-items-container">${includes(array.includes)}</p>
          <p class="travel-info__include-title"><strong>Tours:</strong></p>
          <p class="travel-info__include-items-container">${includes(array.tours)}</p>
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
    container += `<li class="travel-info__include-items">`+ array[i] + `</li>`;
  }

  return container;
  }
});
