const URI = 'http://localhost:'+ globalConstants.PORT +"/"+ globalConstants.APPLICATION_NAME;
const PRODUCTS = '/products';

function filtrarProductos(categoriaSeleccionada) {
    fetch(URI + PRODUCTS + "/category", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            category: categoriaSeleccionada
        })
    })
    .then(response => {
         // Verificar si la respuesta fue exitosa
         if (!response.ok) {
            throw new Error('Error al filtrar productos en el response: ' + response.statusText);
        }
        // Leer el cuerpo de la respuesta como JSON y retornarla
        return response.json();
    })
    .then(data => {
        updatePageWithData(data);
    })
    .catch(error => {
        console.error('Error al filtrar productos:', error);
    });

    
}

function updatePageWithData(data) {

    console.log("response data ", data);
    productsResponse = data.productsResponse;
    renderProducts(productsResponse);
}

function renderProducts(products) {
    const productContainer = document.querySelector('.product-container');
    productContainer.innerHTML = ''; // Limpiar el contenedor de productos antes de renderizar los nuevos productos

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        const productCardContainer = document.createElement('div');
        productCardContainer.classList.add('product-card-container');

        const productImage = document.createElement('img');
        productImage.src = product.image;
        productImage.alt = product.title;
        productImage.classList.add('product-card-container-image');

        const productInfo = document.createElement('div');
        productInfo.classList.add('product-card-container-info');

        const productTitle = document.createElement('h2');
        productTitle.textContent = product.title;
        productTitle.classList.add('product-title');

        const productPrice = document.createElement('p');
        productPrice.textContent = 'Precio: ' + product.price;
        productPrice.classList.add('product-price');

        const productDescription = document.createElement('p');
        productDescription.textContent = 'Descripción: ' + product.description;
        productDescription.classList.add('product-description');

        const productCategory = document.createElement('p');
        productCategory.textContent = 'Categoría: ' + product.category;
        productCategory.classList.add('product-category');

        const productRating = document.createElement('p');
        productRating.textContent = 'Rating: ' + product.rating.rate + ' (' + product.rating.count + ' ratings)';
        productRating.classList.add('product-rating');

        const addToCartButton = document.createElement('button');
        addToCartButton.textContent = 'Agregar al carrito';
        addToCartButton.classList.add('add-to-cart-button');

        const productQuantitySpinner = document.createElement('div');
        productQuantitySpinner.classList.add('product-quantity-spinner');

        productCardContainer.appendChild(productImage);
        productCardContainer.appendChild(productInfo);
        productInfo.appendChild(productTitle);
        productInfo.appendChild(productPrice);
        productInfo.appendChild(productDescription);
        productInfo.appendChild(productCategory);
        productInfo.appendChild(productRating);
        productInfo.appendChild(addToCartButton);
        productInfo.appendChild(productQuantitySpinner);

        productCard.appendChild(productCardContainer);
        productContainer.appendChild(productCard);
    });
}
