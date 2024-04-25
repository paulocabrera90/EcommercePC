const globalConstants = require('../const/globalConst');
const fs = require('fs');
const { saveCartJSON, existJSON, readJSON } = require('../db/dbPersistence');
const traslate = require('../utils/traslate');
const currentDate = new Date().toISOString().split('T')[0];

async function createCarts(data) {
    console.log("Create carts", data);
    const filePath = 'src/db/carts.json';
    return existOrCreate(filePath, data);
}

async function createDataCart(dataCartRequest) {
    console.log("Iniciando la creacion del archivo, con el CART");
    console.log("DataCartRequest",dataCartRequest);
    let dataFinalCart = [];

    dataCartRequest.forEach(product => {
        const productData = { 
            productId: product.productId,
            productTitle: product.productTitle,
            productPrice: product.productPrice,
            productAmountFinal: product.productAmountFinal,
            productQuantity: product.productQuantity
        }
        console.log("Creando el productData",productData);
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

    const finalDataCartArray = cart
    console.log("finalDataCartArray", JSON.stringify(finalDataCartArray));
    return JSON.stringify(finalDataCartArray);
}

async function existOrCreate(filePath, dataRequest) {
    try { 
        let response;
        let flagExistJSON = await existJSON(filePath);
        console.log('FilePath', filePath);
        console.log('DataRequest pre guardado', dataRequest);

        if (!flagExistJSON) {
            console.log("No existe el json. Se va a crear en la ruta: ", filePath);

            const arrayCart = [JSON.parse(dataRequest)];
            response = await saveCartJSON(JSON.stringify(arrayCart), filePath);

            console.log('JSON guardado correctamente. Service', JSON.stringify(response).substring(0,50));

        } else {
            const path = '../db/carts.json';
            console.log('Leyendo archivo carts.json');
            const existingData = await readJSON(filePath);
            console.log('---> Archivo leido es: ', existingData);
            console.log('---> Cart a insertar: ', dataRequest);
            
            const parseDataJson = JSON.parse(dataRequest);
            existingData.push(parseDataJson);

            console.log('---> Carts final: ',existingData);
            response = await saveCartJSON(JSON.stringify(existingData), filePath);
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