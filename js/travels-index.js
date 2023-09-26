document.addEventListener("DOMContentLoaded", ()=>{

const travelsContainer = document.getElementById("travels-container");

  // FETCH
  fetch("http://localhost:3000/travels")
  .then((response) => response.json())
  .then((data) => {
    const travels = data.destinations;
    showTravels(travels);

  })

  // FUNCIONES
  function showTravels(array) {
    let content = "";
  
    if (array.length > 0) {
      array.forEach((travel) => {
        content += `
                  <div onclick="setProductID(${travel.id})" class="cursor-active travel-index">
                      <div class="travel-index__container">
                          <img class="card-image travel-index__image" src="../media/images/${travel.image}">
                          <h5 class="card-title travel-index__title">${travel.name}</h5>
                          <p class="card-description travel-index__date">${travel.date}</p>
                          <p class="card-cost travel-index__price">${travel.price}</p>
                          <p class="card-soldcount travel-index__priceType">${travel.priceType}</p>
                      </div>
                  </div>
                  `;
        travelsContainer.innerHTML = content;
      });
    } else {
      // Alerta para cuando no se encuentran productos
      travelsContainer.innerHTML = `<div class="alert-danger bg-danger alert-error-filter">No se encontraron productos</div>`;
    }
  }
});