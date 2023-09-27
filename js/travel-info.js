document.addEventListener("DOMContentLoaded", () => {

  const containerInfo = document.getElementById("travel-info");

  const id = localStorage.getItem("travelID")

  // FETCH ARGENTINA
  fetch("https://raw.githubusercontent.com/nicolassequeira11/bonvoyage/main/json/categories/101.json")
    .then((response) => response.json())
    .then((data) => {
      const travelInfo = data.destinations[id - 1];
      showTravelInfo(travelInfo);
    });


/* ---------- FUNCIONES ---------- */

/* Mostrar info del producto */
function showTravelInfo(array) {
  containerInfo.innerHTML = `
    <div class="col-12 m-auto travel-info">
    
    <div class="m-auto travel-info__img-container">
      <img class="col-12 travel-info__img" src="${array.imageBanner}">
      <h2 class="travel-info__title"><strong>${array.name}</strong></h2>
    </div>

        <div class="col-12 col-lg-5 m-auto container-product-info">
            
            <p class="card-description description-product-info">${array.description}</p>
            <p class="card-description category-product-info"><strong>Categoría</strong> <br> ${array.category}</p>
            <p class="card-soldcount soldCount-product-info"><strong>Cantidad de vendidos</strong> <br> ${array.soldCount}</p>
            <p class="card-cost cost-product-info"><strong>Precio</strong> <br> ${array.currency} ${array.cost}</p>
        </div>
    </div>
  `;
}

});
