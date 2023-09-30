/* Controles para el carousel de productos relacionados */

// Brasil
  document.getElementById("prevbra").addEventListener("click", ()=>{
    document.getElementById("travels-container-bra").scrollLeft -= 1100;
  });
  document.getElementById("nextbra").addEventListener("click", ()=>{
    document.getElementById("travels-container-bra").scrollLeft += 1100;
  });

// Estados Unidos
  document.getElementById("prevusa").addEventListener("click", ()=>{
    document.getElementById("travels-container-usa").scrollLeft -= 1100;
  });
  document.getElementById("nextusa").addEventListener("click", ()=>{
    document.getElementById("travels-container-usa").scrollLeft += 1100;
  });

// Sudamerica
  document.getElementById("prevsud").addEventListener("click", ()=>{
    document.getElementById("travels-container-sud").scrollLeft -= 1100;
  });
  document.getElementById("nextsud").addEventListener("click", ()=>{
    document.getElementById("travels-container-sud").scrollLeft += 1100;
  });

