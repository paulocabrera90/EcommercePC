const globalConstants = require('../const/globalConst');

const port = globalConstants.PORT;
const applicationName = globalConstants.APPLICATION_NAME;

async function getAll (req, res){
    try {
        console.log("Inicio de carga del carrito...");
        const encodedProductsForCart = req.query.products;
        const productsForCart = decodeURIComponent(encodedProductsForCart);
        console.log("ProductsForCart-> ", productsForCart);
        
        let cartResponse = [];

        res.render('cart/cart', {
            productsResponse: productsForCart,
            cartProducts: cartResponse,
            port,
            applicationName
        });

    } catch (error) {
        console.error("/GET Error al obtener carrito: ", error);
        res.status(500).send("Error al obtener carrito");
    }
}

module.exports= { 
    getAll
}