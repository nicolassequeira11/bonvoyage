document.addEventListener("DOMContentLoaded", () => {

  const containerInfo = document.getElementById("travel-info");
  const containerRelated = document.getElementById("travels-related");

  const travelID = localStorage.getItem("travelID");
  const travelRegion = localStorage.getItem("travelRegion");
  const travelName = localStorage.getItem("travelName");

  // FETCH ARGENTINA
  fetch("https://raw.githubusercontent.com/nicolassequeira11/APIS/main/travels.json")
    .then((response) => response.json())
    .then((data) => {
      const traveldata = data;
      const travelInfo = traveldata.destinations.filter(travel => 
        travel.id == travelID);
        
      showTravelInfo(travelInfo[0]);
  });

  // FETCH RELACIONADOS
  fetch(
    "https://raw.githubusercontent.com/nicolassequeira11/APIS/main/travels.json"
  )
    .then((response) => response.json())
    .then((data) => {
      const travels = data;
      const travelRel = travels.destinations.filter((travel) => 
        travel.region === travelRegion && travel.name !== travelName);
        
      showTravels(travelRel, containerRelated);
  });

  // Relacionados
  document.getElementById("prevrel").addEventListener("click", ()=>{
    document.getElementById("travels-related").scrollLeft -= 1100;
  });
  document.getElementById("nextrel").addEventListener("click", ()=>{
    document.getElementById("travels-related").scrollLeft += 1100;
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
          <div class="d-flex flex-wrap text-center col-12">
            <p class="col-12 col-sm-4 p-3 travel-info__btn-info" id="btnInfo">
              <i class="bi bi-file-text me-2"></i>Información
            </p>
            <p class="col-12 col-sm-4 p-3 travel-info__btn-galeria" id="btnGaleria">
              <i class="bi bi-camera me-2"></i>Galería
            </p>
            <p class="col-12 col-sm-4 p-3 travel-info__btn-opinion" id="btnOpinion">
              <i class="bi bi-people me-2"></i>Opiniones
            </p>
          </div>

          <div id="info" class="travel-info__include-info d-none m-2">
            <p class="travel-info__include-title"><strong>Incluye:</strong></p>
            <p class="travel-info__include-items-container">${includes(array.includes)}</p>
            <p class="travel-info__include-title"><strong>Itinerario:</strong></p>
            <p class="travel-info__include-items-container">${includesItinerary(array.itinerary)}</p>
          </div>

          <div id="galeria" class="d-none travel-info__gallery-container my-2">
            ${includesGallery(array.gallery)}
          </div>

          <div id="opinion" class="d-none mx-3 mx-md-5 my-2 justify-content-center">
            
            <div class="border-bottom mt-2 mt-md-3">
              <div class="d-flex mb-2">
                <div class="col-3 col-md-2">
                  <img src="../media/perfil.jpg" class="col-10 rounded-circle">
                </div>
                <div class="mt-2">
                  <h3 class="m-auto">Nicolás</h3>
                  <p class="m-auto">24 de Octubre del 2023 a las 23:28</p>
                  <p class="mt-3">¡Hermoso destino, 100% recomendado!</p>
                </div>
              </div>
            </div>

            <div class="mt-4 mt-md-5">
              <h5>Comparte tu experiencia aquí</h5>
              <div class="input-group my-2">
                <textarea class="form-control pb-5" placeholder="Describe tu experiencia en ${array.name}"></textarea>
              </div>
              <div class="input-group my-2">
                <input class="form-control" type="text" placeholder="Tu nombre">
              </div>
              <div class="input-group my-2">
                <input class="form-control" type="email" placeholder="Tu email">
              </div>
              <div class="my-2">
                <button class="btn btnRed text-white" type="submit">Enviar comentario</button>
              </div>
            </div>

          </div>

        </div>

        <div class="col-12 col-lg-3 travel-info__info-container">
          <h3 class="travel-info__info-title">${array.name}</h3>
          <h5 class="travel-info__info-days">${array.days}</h5>
          <p class="travel-info__info-date">${array.date}</p>
          <p class="travel-info__info-description">${array.description}</p>
          <p class="travel-info__info-price"><strong>U$S ${array.price}</strong></p>
          <p class="travel-info__info-priceType">${array.priceType}</p>
          <button class="btnRed">Consultar</button>
        </div>
      </div>

    </div>
  `;

  const btnInfo = document.getElementById("btnInfo");
  const btnGaleria = document.getElementById("btnGaleria");
  const btnOpinion = document.getElementById("btnOpinion");
  const info = document.getElementById("info");
  const galeria = document.getElementById("galeria");
  const opinion = document.getElementById("opinion");

  info.classList.remove("d-none");
  btnInfo.classList.add("travel-info__btnInfo")

  btnInfo.addEventListener("click", () => {
    info.classList.remove("d-none");
    galeria.classList.add("d-none");
    opinion.classList.add("d-none");

    btnInfo.classList.add("travel-info__btnInfo");
    btnGaleria.classList.remove("travel-info__btnInfo");
    btnOpinion.classList.remove("travel-info__btnInfo");
  });

  btnGaleria.addEventListener("click", () => {
    info.classList.add("d-none");
    galeria.classList.remove("d-none");
    opinion.classList.add("d-none");

    btnGaleria.classList.add("travel-info__btnInfo");
    btnInfo.classList.remove("travel-info__btnInfo");
    btnOpinion.classList.remove("travel-info__btnInfo");
  });

  btnOpinion.addEventListener("click", () => {
    info.classList.add("d-none");
    galeria.classList.add("d-none");
    opinion.classList.remove("d-none");

    btnOpinion.classList.add("travel-info__btnInfo");
    btnInfo.classList.remove("travel-info__btnInfo");
    btnGaleria.classList.remove("travel-info__btnInfo");
  });

}

  /* Crear lista */
  function includes(array){
    let container = "";

    for(let i=0; i<array.length; i++){
      container += `<li class="travel-info__gla">`+ array[i] + `</li>`;
    }

    return container;
  }

  /* Crear lista */
  function includesItinerary(array){
    let container = "";

    for(let i=0; i<array.length; i++){
      container += `<p class="travel-info__include-items ps-2 pe-4">`+ array[i] + `</p>`;
    }

    return container;
  }

  /* Crear lista de imagénes */
  function includesGallery(array){
    let container = "";

    for(let i=0; i<array.length; i++){
      container += `
        <div class="col-12 d-flex">
          <img src="${array[i]}" class="travel-info__gallery-img col-12" />
        </div>`;
    }

    return container;
  }

});





