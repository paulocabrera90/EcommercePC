const express = require('express')
const globalConstants = require('./const/globalConst')
const routerConfig = require('./routes/index.routes')
const router = require('./routes/products.routes');

const configurationApi= (app) => {
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
}

const configurationRoute= (app) => {
    app.use('/api',routerConfig.routes_init())
}

async function init ()  {
    const app = express()

    configurationApi(app)    
    configurationRoute(app)

    app.listen(globalConstants.PORT)
    console.log('Probando la api de ecommerve ' + globalConstants.PORT)
   
}

init();