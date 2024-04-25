document.addEventListener('DOMContentLoaded', () => {
    const btnAgregarAlCarrito = document.querySelectorAll('.add-to-cart-button');
    const spinnerQuantity = document.querySelectorAll('.product-quantity-spinner-counter');
    const btnCartCount = document.querySelector('.count-circle');

    let cantidadProductos;
    countBtnCart(btnCartCount);

    spinnerQuantity.forEach(spinner => {
        spinner.addEventListener('change', () => {
            console.log("Valor spinner", parseInt(spinner.value));
            cantidadProductos = parseInt(spinner.value);
            if (cantidadProductos > 10) {
                alert("La cantidad máxima de un mismo producto es 10");
                cantidadProductos = spinner.value = 1;
            }
        });
    });

    btnAgregarAlCarrito.forEach(btn => {
        console.log("Iniciando accion del boton añadir carrito");        

        btn.addEventListener('click', () => {
           
            const dataSetProduct =  JSON.parse(btn.dataset.product);
            console.log("Product dataset", dataSetProduct);

            const productId = dataSetProduct.id;
            const productTitle = dataSetProduct.title;
            const productPrice = dataSetProduct.price;
            const productDescription = dataSetProduct.description;
            const productAmountOff = dataSetProduct.amountOff;
            const productAmountFinal = dataSetProduct.amountFinal;
            const productImg = dataSetProduct.image;
            const productOffer = dataSetProduct.offer;

            const product = {
                productId,
                productTitle,
                productPrice,
                productImg,
                productDescription,
                productAmountOff,
                productAmountFinal,
                productOffer,
                productQuantity: cantidadProductos || 1
            };

            console.log("Product add car", product);

            let cartAdd = JSON.parse(localStorage.getItem('productsForCart')) || [];

            const existProduct = cartAdd.findIndex(item => item.productId === productId);
            if (existProduct !== -1) {
                cartAdd[existProduct].productQuantity += cantidadProductos;
            } else {
                cartAdd.push(product);
            } 

            localStorage.setItem('productsForCart', JSON.stringify(cartAdd));
            countBtnCart(btnCartCount);
            spinnerQuantity.forEach(spinner => { 
                spinner.value = 1;
            });
            
        });

    });
});

function countBtnCart(btnCartCount) {
    let cartAdd = JSON.parse(localStorage.getItem('productsForCart')) || [];

    const totalQuantity = cartAdd.reduce((acc, curr) => acc + curr.productQuantity, 0);
    console.log("Cantidad para el carrito", totalQuantity);
    btnCartCount.textContent = totalQuantity;    

}

