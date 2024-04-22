const axios = require('axios');
const globalConstants = require('../const/globalConst');
const { saveProductsJSON, existProductsJSON, readProductsJSON } = require('../db/dbPersistence');

const URI_PRODUCTS = 'products';
const URI_CATEGORIES = '/categories';
const filePath = 'src/db/productos.json';

async function getProducts() {
    try { 
        let productsResponse;
        let flagExistProductsJson = await existProductsJSON(filePath);
        
        if (!flagExistProductsJson) {
            console.log("No existe el json");
            productsResponse = await axios.get(globalConstants.API_URL+URI_PRODUCTS);
            productsResponse = await saveProductsJSON(productsResponse.data, filePath);

            console.log('JSON guardado correctamente. Service', JSON.stringify(productsResponse).substring(0,50));

        } else {

            console.log('Leyendo archivo products.json');
            const data = await readProductsJSON(filePath);
            console.log('Datos del archivo JSON:', JSON.stringify(data).substring(0, 20));
            productsResponse = data;
        }
        return productsResponse;

    } catch (error) {
      throw "Error products service: " + error;
    }    
}


async function getCategories() {
    
    try {
        const categoriesResponse = await axios.get(globalConstants.API_URL+URI_PRODUCTS+URI_CATEGORIES); 
        return categoriesResponse.data;
    } catch (error) {
      throw  "Error categories service: " + error;
    }
}

module.exports= { 
    getProducts,
    getCategories
}