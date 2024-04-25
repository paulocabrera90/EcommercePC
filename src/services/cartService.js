const globalConstants = require('../const/globalConst');
const { saveJSON, existJSON, readJSON } = require('../db/dbPersistence');
const traslate = require('../utils/traslate');
const currentDate = new Date().toISOString().split('T')[0];

async function createCarts(data) {
    console.log("Create carts");
    const filePath = 'src/db/carts.json';
    return existOrCreate(filePath, data);
}

async function createDataCart(dataCartRequest) {

    let dataFinalCart = [];

    dataCartRequest.forEach(product => {
        const productData = {
            productId: product.productId,
            productTitle: product.productTitle,
            productPrice: product.productPrice,
            productAmountFinal: product.productAmountFinal,
            productQuantity: product.productQuantity
        }
        dataFinalCart.push(productData);
    });   

    let totalQuantity = 0;
    let totalAmount = 0;
    dataFinalCart.forEach(product => {
        totalQuantity += product.productQuantity;
        totalAmount += product.productAmountFinal;
    });

    const cart = {
        cartId: Date.now(), // Generar un ID único para el carrito
        product: dataFinalCart,
        quantity: totalQuantity,
        amount: totalAmount.toFixed(2),
        date: currentDate
    };

    const finalDataCartArray = [cart]
    console.log("finalDataCartArray", finalDataCartArray);
    return finalDataCartArray;
}

async function existOrCreate(filePath, dataRequest) {
    try { 
        let response;
        let flagExistJSON = await existJSON(filePath);
        
        if (!flagExistJSON) {
            console.log("No existe el json. Se va a crear en la ruta: ", filePath);

            response = await saveJSON(dataRequest, filePath);

            console.log('JSON guardado correctamente. Service', JSON.stringify(response).substring(0,50));

        } else {

            console.log('Leyendo archivo products.json');
            const data = await readJSON(filePath);

            console.log('Datos del archivo JSON:', JSON.stringify(data).substring(0, 20));

            response = data;
        }
        return response;

    } catch (error) {
      throw "Error products service: " + error;
    }   
}

module.exports= { 
    createCarts,
    createDataCart
}