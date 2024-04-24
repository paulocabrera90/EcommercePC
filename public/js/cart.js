//const URI = 'http://localhost:'+ globalConstants.PORT +"/"+ globalConstants.APPLICATION_NAME;
const CART = '/cart';

document.getElementById('openCart').addEventListener('click', function() {
   
    const productsForCart = localStorage.getItem('productsForCart');
    console.log('Productos para el carrito:', productsForCart);
    const encodedData = encodeURIComponent(productsForCart);

    const url = `${URI}${CART}?products=${encodedData}`;
    console.log('URL', url);
    window.location.href = url;

    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al armar el carrito : ' + response.statusText);
        }
        return response.json();
    })
    .catch(error => {
        console.error('Error:', error);
    });
});