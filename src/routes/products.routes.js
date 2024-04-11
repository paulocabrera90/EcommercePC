const router = require('express').Router()

const productController = require('../controllers/productController')

router.get('/', async (req, res) => {
    try {        
      const products = await productController.findAll();
      const categories = await productController.findAllCategories();

      res.render('products/products', { products , categories});

    } catch (error) {
        console.error("Error al obtener productos: ", error);
        res.status(500).send("Error al obtener productos");
    }
});

router.get('/:id', async (req, res) => {
  try {        
    const products = await productController.findById(id);     
    res.json(products)
  
  } catch (error) {
      console.error("Error al obtener productos: ", error);
      res.status(500).send("Error al obtener productos");
  }
});

module.exports = router;