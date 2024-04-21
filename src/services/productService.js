const axios = require('axios');
const globalConstants = require('../const/globalConst');
const { saveProductsJSON, findProductsJSON } = require('../db/dbPersistence');

const URI_PRODUCTS = 'products';
const URI_CATEGORIES = '/categories';
const filePath = 'src/db/productos.json';

async function getProducts() {
    try { 
        var productsResponse = {};
        findProductsJSON(filePath, async (err, datos) => {
            if (err) {
                productsResponse = await axios.get(globalConstants.API_URL+URI_PRODUCTS);
                console.log('Error interno del servidor.', productsResponse);
            } else {
                // Si no hay errores, enviar los datos como respuesta
                console.log('Error interno del servidor.');
                productsResponse = datos;
            }
        });

        return productsResponse.data;

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