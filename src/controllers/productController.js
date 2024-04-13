const axios = require('axios');
const globalConstants = require('../const/globalConst');
const traslate = require('../utils/traslate');
const URI_PRODUCTS = 'products';
const URI_CATEGORIES = 'categories';
//const productsResponse = {};

async function findAll() {
    try{
        const productsResponse = await axios.get(globalConstants.APIURL+URI_PRODUCTS);
        const products = await traslate.translateAllProducts(productsResponse.data);
     
        return products;

    } catch (error) {
      throw error;
    }
}

async function findById(id) {
    try{
        const response = await axios.get(globalConstants.APIURL+URI_PRODUCTS+'/'+id);        
        return response.data;
    } catch (error) {
      throw error;
    }
}

async function findAllCategories() {
    
    try{
        const response = await axios.get(globalConstants.APIURL+URI_PRODUCTS+'/'+URI_CATEGORIES); 
        const categories = await traslate.translateCategories(response.data);
        return categories;
    } catch (error) {
      throw error;
    }
}

async function filterByCategory(categoryRequest) {
    const language = 'en';
    try{
        console.log("CATEGORIA NO TRADUCIDA", categoryRequest);
        const category = await traslate.translateText(categoryRequest, language);
        console.log("CATEGORIA TRADUCIDA", category);
        return category;
    } catch (error) {
      throw error;
    }
}

module.exports= { 
    findAll, 
    findById,
    findAllCategories,
    filterByCategory
}

