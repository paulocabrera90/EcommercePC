const express = require('express')

const localStorage = require
const globalConstants = require('./const/globalConst')
const routerConfig = require('./routes/index.routes')
const join = globalConstants.JOIN;
const dirname = globalConstants.DIRNAME;

const configurationApi= (app) => {
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(express.static('public'));

    app.set('views', join(dirname, 'views'));
    app.set('view engine', 'pug');
}

const configurationRoute= (app) => {
    app.use('/api',routerConfig.routes_init())
}

function init ()  {
    const app = express()

    configurationApi(app)    
    configurationRoute(app)

    app.listen(globalConstants.PORT)
    console.log('Probando la api de ecommerve http://localhost:' + globalConstants.PORT +"/" + globalConstants.APPLICATION_NAME + "/products")
   
}

init();