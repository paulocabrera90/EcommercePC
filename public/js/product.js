document.addEventListener('DOMContentLoaded', () => {
    const btnAgregarAlCarrito = document.querySelectorAll('.add-to-cart-button');
    const spinnerQuantity = document.querySelectorAll('.product-quantity-spinner');
    const btnCarrito = document.querySelectorAll('.cart-button');

    btnAgregarAlCarrito.forEach(btn => {
        console.log("Iniciando accion del boton añadir carrito");        

        btn.addEventListener('click', () => {
           
            const dataSetProduct =  btn.dataset.product;
            console.log("Product dataset", dataSetProduct);

            const productId = dataSetProduct.id;
            const productTitle = dataSetProduct.title;
            const productPrice = dataSetProduct.price;
            const productDescription = dataSetProduct.description;
            const productImg = dataSetProduct.image;

            const product = {
                productId,
                productTitle,
                productPrice,
                productImg,
                productDescription,
                productQuantity: 1
            };

            console.log("Product add car", product);

            let cartAdd = JSON.parse(localStorage.getItem('productsForCart')) || [];
            console.log("LocalStorage", cartAdd);

            cartAdd.push(product);
            console.log("cartAdd", cartAdd);         

            localStorage.setItem('productsForCart', JSON.stringify(cartAdd));
        });

    });
});