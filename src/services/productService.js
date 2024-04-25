const axios = require('axios');
const globalConstants = require('../const/globalConst');
const { saveJSON, existJSON, readJSON } = require('../db/dbPersistence');
const { addOfferFields } = require('../utils/productsUtils');
const traslate = require('../utils/traslate');

const URI_PRODUCTS = 'products';
const URI_CATEGORIES = '/categories';

async function existOrCreate(filePath, uri, flagProduct) {
    try { 
        let response;
        let flagExistJSON = await existJSON(filePath);
        
        if (!flagExistJSON) {
            console.log("No existe el json. Se va a crear en la ruta: ", filePath);
            response = await axios.get(globalConstants.API_URL+uri);

            if(flagProduct) { 
                console.log("Agregando ofertas a los productos; ",  JSON.stringify(response.data));
                response.data = await addOfferFields(response.data); 

                console.log('Response con las offertas agregadas', JSON.stringify(response.data).substring(0,50));
            } 

            response = await saveJSON(response.data, filePath);

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

async function getProducts() {
    console.log("Get products");
    const filePath = 'src/db/productos.json';
    return existOrCreate(filePath, URI_PRODUCTS, true);
}


async function getCategories() {
    console.log("Get categories");
    const filePath = 'src/db/categories.json';
    return existOrCreate(filePath, URI_PRODUCTS + URI_CATEGORIES, false);
}

async function findAllCategories() {    
    try{
        categoriesResponse = await getCategories();

        categoriesResponse = await traslate.translateCategories(categoriesResponse);
        return categoriesResponse;

    } catch (error) {
      throw error;
    }
}

module.exports= { 
    getProducts,
    getCategories,
    findAllCategories
}