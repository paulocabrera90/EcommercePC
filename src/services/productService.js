const axios = require('axios');
const globalConstants = require('../const/globalConst');

const URI_PRODUCTS = 'products';
const URI_CATEGORIES = '/categories';

async function getProducts() {
    try { 

        const productsResponse = await axios.get(globalConstants.API_URL+URI_PRODUCTS);
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