const globalConstants = require('../src/const/globalConst');
const URI = 'http://localhost:'+ globalConstants.PORT+"/"+ globalConstants.APPLICATION_NAME;
const PRODUCTS = '/products';
function filtrarProductos(categoriaSeleccionada) {
    fetch(URI+PRODUCTS, {
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
    })
    .catch(error => {
        console.error('Error al filtrar productos:', error);
    });
}