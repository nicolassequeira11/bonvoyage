/* Controles para el carousel de productos relacionados */

// Argentina
  document.getElementById("prevarg").addEventListener("click", ()=>{
    document.getElementById("travels-container-arg").scrollLeft -= 1100;
  });
  document.getElementById("nextarg").addEventListener("click", ()=>{
    document.getElementById("travels-container-arg").scrollLeft += 1100;
  });

// Brasil
  document.getElementById("prevbra").addEventListener("click", ()=>{
    document.getElementById("travels-container-bra").scrollLeft -= 1100;
  });
  document.getElementById("nextbra").addEventListener("click", ()=>{
    document.getElementById("travels-container-bra").scrollLeft += 1100;
  });

