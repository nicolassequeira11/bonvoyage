document.addEventListener("DOMContentLoaded", () => {

  const containerInfo = document.getElementById("travel-info");

  const id = localStorage.getItem("travelID")

  // FETCH ARGENTINA
  fetch("https://raw.githubusercontent.com/nicolassequeira11/bonvoyage/main/json/101.json")
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
      <div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="${array.imageBanner[0]}" class="d-block w-100" alt="Bariloche">
          </div>
          <div class="carousel-item">
            <img src="${array.imageBanner[1]}" class="d-block w-100" alt="Bariloche">
          </div>
          <div class="carousel-item">
            <img src="${array.imageBanner[2]}" class="d-block w-100" alt="Bariloche">
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
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
