const URI = 'http://localhost:'+ globalConstants.PORT +"/"+ globalConstants.APPLICATION_NAME;
const PRODUCTS = '/products';

function filtrarProductos(categoriaSeleccionada) {
    const url = `${URI}${PRODUCTS}/category?category=${categoriaSeleccionada}`;

    window.location.href = url;
    localStorage.setItem('category-clicked', categoriaSeleccionada);

    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al filtrar productos en el response: ' + response.statusText);
        }
        return response.json();
    })
    .catch(error => {
        console.error('Error al filtrar productos:', error);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const shortDescriptions = document.querySelectorAll(".short-description");

    shortDescriptions.forEach(function(shortDescription) {
        shortDescription.addEventListener("mouseover", function() {
            this.nextElementSibling.style.display = "block"; // Mostrar la descripción completa
        });

        shortDescription.addEventListener("mouseout", function() {
            this.nextElementSibling.style.display = "none"; // Ocultar la descripción completa
        });
    });
});