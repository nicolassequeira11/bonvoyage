/* Controles para el carousel de productos relacionados */

// Sudamerica
document.getElementById("prevsud").addEventListener("click", () => {
  document.getElementById("travels-container-sud").scrollLeft -= 1100;
});
document.getElementById("nextsud").addEventListener("click", () => {
  document.getElementById("travels-container-sud").scrollLeft += 1100;
});

// Asia
document.getElementById("prevasia").addEventListener("click", () => {
  document.getElementById("travels-container-asia").scrollLeft -= 1100;
});
document.getElementById("nextasia").addEventListener("click", () => {
  document.getElementById("travels-container-asia").scrollLeft += 1100;
});

// Brasil
document.getElementById("prevbra").addEventListener("click", () => {
  document.getElementById("travels-container-bra").scrollLeft -= 1100;
});
document.getElementById("nextbra").addEventListener("click", () => {
  document.getElementById("travels-container-bra").scrollLeft += 1100;
});

// Estados Unidos
document.getElementById("prevusa").addEventListener("click", () => {
  document.getElementById("travels-container-usa").scrollLeft -= 1100;
});
document.getElementById("nextusa").addEventListener("click", () => {
  document.getElementById("travels-container-usa").scrollLeft += 1100;
});
