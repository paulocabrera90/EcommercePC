const globalConstants = require('../const/globalConst');

const port = globalConstants.PORT;
const applicationName = globalConstants.APPLICATION_NAME;

async function getAll (req, res){
    try {

        const cart = []
        console.log(cart);
        res.render('cart/cart', {
            cart,
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