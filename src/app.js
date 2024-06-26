const express = require('express')
const cors = require('cors');

const globalConstants = require('./const/globalConst')
const routerConfig = require('./routes/index.routes')
const { goIndex } = require('./controllers/indexController')
const join = globalConstants.JOIN;
const dirname = globalConstants.DIRNAME;

const configurationApi = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('public'));
    app.use(cors());

    app.set('views', join(dirname, 'views'));
    app.set('view engine', 'pug');
}

const configurationRoute = (app) => {
    app.use('/api',routerConfig.routes_init());
    app.use('/',routerConfig.routes_init());
}

function init ()  {
    const app = express();

    configurationApi(app);   
    configurationRoute(app);

    app.listen(globalConstants.PORT)
    console.log('Probando la api de ecommerce http://localhost:' + globalConstants.PORT)
   
}

init();