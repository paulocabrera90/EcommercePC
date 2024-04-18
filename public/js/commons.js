const URI = 'http://localhost:'+ globalConstants.PORT +"/"+ globalConstants.APPLICATION_NAME;
const PRODUCTS = '/products';

/*function filtrarProductos(categoriaSeleccionada) { //PSOT
    fetch(URI+PRODUCTS+"/category", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            category: categoriaSeleccionada
        })
    })
    .then(response => {
        // Manejar la respuesta según sea necesario
        console.log("response", response);
        //window.location.href = URI+PRODUCTS+"/category";
    })
    .catch(error => {
        console.error('Error al filtrar productos:', error);
    });

    
} */

function filtrarProductos(categoriaSeleccionada) {
    const url = `${URI}${PRODUCTS}/category?category=${categoriaSeleccionada}`;

    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al filtrar productos en el response: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log("response", data);
        window.location.href = `${URI}${PRODUCTS}`;
        renderProducts(data);
    })
    .catch(error => {
        console.error('Error al filtrar productos:', error);
    });
}

function renderProducts(data) {
    console.log("response renderProducts", data);
}