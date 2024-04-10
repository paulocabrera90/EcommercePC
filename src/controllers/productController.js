const axios = require('axios');
const globalConstants = require('../const/globalConst');
const translate = require('node-google-translate-skidz');
const URI_PRODUCTS = 'products';

const options = {
    from: 'en',
    to: 'es'
};

async function findAll() {
    try{
        const response = await axios.get(globalConstants.APIURL+URI_PRODUCTS);        
        
        return response.data;
        
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

module.exports= { findAll, findById }

