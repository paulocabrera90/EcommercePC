const axios = require('axios');
const globalConstants = require('../const/globalConst');
const traslate = require('../utils/traslate');
const { getProducts, getCategories } = require('../services/productService');

let productsResponse;
let categoriesResponse;

async function findAll(req, res) {
    try{
        productsResponse = await getProducts();
        categoriesResponse = await getCategories();
        productsResponse = await traslate.translateAllProducts(productsResponse);
     
       return res.render('products/products', { productsResponse , categoriesResponse});

    } catch (error) {
        console.error("Error al obtener productos: ", error);
        res.status(500).send("Error al obtener productos");
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

async function filterByCategory(req, res) {
    try{
        console.log("filter: ", req.params.category)

        productsResponse = productsResponse.filter(
            product => product.category === req.params.category
        );
        
        return res.render('products/products', { productsResponse , categoriesResponse});
    } catch (error) {
        console.error("Error al obtener productos con filtro de categoria: ", error);
        res.status(500).send("Error al obtener productos con filtro de categoria");
    }
}

module.exports= { 
    findAll, 
    findById,
    findAllCategories,
    filterByCategory
}

