const CART = '/cart';

document.getElementById('openCart').addEventListener('click', function() {
   
    const productsForCart = localStorage.getItem('productsForCart');
    console.log('Productos para el carrito:', productsForCart);
    const encodedData = encodeURIComponent(productsForCart);

    const url = `${URI}${CART}?products=${encodedData}`;
    window.location.href = url;

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
   
});