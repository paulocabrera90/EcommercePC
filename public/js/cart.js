const CART = '/cart';
const btnCleanCart = document.getElementById('btnCleanCart');
const openCartButton = document.getElementById('openCart');

document.getElementById('openCart').addEventListener('click', function() {

    if (localStorage.getItem('productsForCart')) {
        openCartButton.disabled = true;
    } else {
        alert("Debe ingresar al menos un producto...");
        openCartButton.disabled = false;
        return
    }
   
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

btnCleanCart.addEventListener('click', function() {
    localStorage.clear();
    window.location.href = `${URI}${PRODUCTS}`;
});