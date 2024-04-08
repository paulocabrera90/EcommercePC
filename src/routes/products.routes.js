const router = require('express').Router()

const productController = require('../controllers/productController')

router.get('/', async (req, res) => {
    try {        
      const products = await productController.list();     
      res.json(products)
    
    } catch (error) {
        console.error("Error al obtener productos: ", error);
        res.status(500).send("Error al obtener productos");
    }
});

module.exports = router;