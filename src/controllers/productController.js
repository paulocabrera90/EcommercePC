const axios = require('axios')
const globalConstants = require('../const/globalConst')
const translate = require('node-google-translate-skidz');

const options = {
    // Idioma origen
    from: 'en',
    // Idioma destino
    to: 'es'
};
async function list() {
    try{
        const response = await axios.get(globalConstants.APIURL+'products')        
        return response.data;
    } catch (error) {
      throw error;
    }
}
module.exports= { list }

