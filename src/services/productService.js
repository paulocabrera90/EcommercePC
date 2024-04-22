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

        console.log("flagExistProductsJson", flagExistProductsJson);
        if (!flagExistProductsJson) {
            console.log("No existe el json");
                productsResponse = await axios.get(globalConstants.API_URL+URI_PRODUCTS);

                saveProductsJSON(productsResponse.data, filePath)
                    .then(data => productsResponse = data)
                    .catch(e => console.log("Error: ", e));

                console.log('JSON guardado correctamente. Service');

        } else {

                console.log('Leyendo archivo products.json');
               readProductsJSON(filePath, (err, data) => {
                    if (err) {
                      console.error('Error al leer el archivo products.json:', err);
                      return;
                    }

                    console.log('Datos del archivo JSON:', JSON.stringify(data).substring(0,20));
                    productsResponse = data;

                    return productsResponse;
                });
        }
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