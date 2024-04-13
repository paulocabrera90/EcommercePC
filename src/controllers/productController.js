const axios = require('axios');
const globalConstants = require('../const/globalConst');
const traslate = require('../utils/traslate');
const { getProducts, getCategories } = require('../services/productService');

let productsResponse;
let categoriesResponse;

async function findAll() {
    try{
        productsResponse = await getProducts();
        categoriesResponse = await getCategories();
        const products = await traslate.translateAllProducts(productsResponse);
     
        return products;

    } catch (error) {
      throw error;
    }
}

async function findById(id) {
    try{              
        return id;
    } catch (error) {
      throw error;
    }
}

async function findAllCategories() {
    
    try{
        const categories = await traslate.translateCategories(categoriesResponse);
        return categories;

    } catch (error) {
      throw error;
    }
}

async function filterByCategory(categoryRequest) {
    try{
        productsResponse = await getProducts();
        console.log("Category filter", categoryRequest);
        console.log("PRODUCTS filter", productsResponse);
        const filteredProducts = productsResponse.filter(
            product => product.category === categoryRequest
        );
        console.log("CfilteredProducts", filteredProducts);
        return filteredProducts;
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

