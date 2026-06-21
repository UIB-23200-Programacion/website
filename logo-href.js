// Redirige el logo del sidebar según el idioma de la página actual
document.addEventListener("DOMContentLoaded", function () {
  var logoLink = document.querySelector("a.sidebar-logo-link");
  if (logoLink) {
    var isCA = window.location.pathname.includes("/ca/");
    logoLink.href = isCA
      ? "https://estudis.uib.cat/estudis-de-grau/grau/matematiques/GMA3-P/23200/index.html"   // Logo en páginas catalanas → UIB en catalán
      : "https://estudis.uib.es/estudis-de-grau/grau/matematiques/GMA3-P/23200/index.html";   // Logo en páginas españolas → UIB en español
    logoLink.target = "_blank";
    logoLink.rel = "noopener noreferrer";
  }
});
