const axios = require('axios');
const globalConstants = require('../const/globalConst');
const { saveProductsJSON } = require('../db/dbPersistence');

const URI_PRODUCTS = 'products';
const URI_CATEGORIES = '/categories';
const filePath = 'src/db/productos.json';

async function getProducts() {
    try { 

        const productsResponse = await axios.get(globalConstants.API_URL+URI_PRODUCTS);

        await saveProductsJSON(productsResponse.data, filePath);
        console.log('JSON guardado correctamente. Service');

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