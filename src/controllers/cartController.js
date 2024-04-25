const globalConstants = require('../const/globalConst');

const port = globalConstants.PORT;
const applicationName = globalConstants.APPLICATION_NAME;

async function getAll (req, res){
    try {
        console.log("Inicio de carga del carrito...");
        const encodedProductsForCart = req.query.products;
        
        let productCartResponse =  JSON.parse(encodedProductsForCart);

        console.log("productCartResponse-> ", productCartResponse);

        res.render('cart/cart', {
            productsResponse: productCartResponse,
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