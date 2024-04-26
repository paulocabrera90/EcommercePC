const CART = '/cart';
const btnCleanCart = document.getElementById('btnCleanCart');
const openCartButton = document.getElementById('openCart');
const btnBuyCart = document.getElementById('btnBuyCart');

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
        console.log('GET cart correctamente:', response.json());
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


const btnDeleteProduct = document.querySelectorAll('.product-cart-card-delte-button');
btnDeleteProduct.forEach(button => {
        button.addEventListener('click', function() {
            
            const productsForCart = JSON.parse(localStorage.getItem('productsForCart'));
            const productCard = button.closest('.product-cart-card');
            const productCardId = parseInt(productCard.dataset.productId, 10);
            const productIndex = productsForCart.findIndex(product => product.productId === productCardId);        
                
            if (productIndex !== -1) {
                productsForCart.splice(productIndex, 1);

                localStorage.setItem('productsForCart', JSON.stringify(productsForCart));
            }

            productCard.remove();

            const encodedData = encodeURIComponent(localStorage.getItem('productsForCart'));

            const url = `${URI}${CART}?products=${encodedData}`;
            window.location.href = url;
        });
    
});

btnBuyCart.addEventListener('click', () => {
    const responseCart = JSON.parse(localStorage.getItem('productsForCart'));
    window.location.href = `${URI}${PRODUCTS}`;

    fetch(`${URI}${CART}`+'/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(responseCart)
    }).then(response => {
        if (!response.ok) {
            throw new Error('Error al completar la compra: ' + response.statusText);
        }
        localStorage.clear();
        alert('Compra completada con éxito1');
        return response.json();
    })
    .then(data => {
        console.log('Datos devueltos por el servidor:', data);
        alert('Compra completada con éxito2');
        
    })
    .catch(error => {
        console.error('Error al completar la compra:', error);
        alert('Se produjo un error al completar la compra');
    });
    // .then(response => {
    //     if (!response.ok) {
    //         throw new Error('Error al completar la compra: ' + response.statusText);
    //     }
    //     localStorage.clear();
    //     alert('Compra completada con éxito');
    //     return response.json();
    // })
    // .catch(error => {
    //     console.error('Error al completar la compra:', error);
    //     alert('Se produjo un error al completar la compra');
    // });
});