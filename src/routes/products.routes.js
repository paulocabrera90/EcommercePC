const router = require('express').Router();

const productController = require('../controllers/productController');

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

router.get('/id/:id', async (req, res) => {
  try {        
    const products = await productController.findById(req.params.id);     
    res.json(products)
  
  } catch (error) {
      console.error("Error al obtener productos: ", error);
      res.status(500).send("Error al obtener productos");
  }
});

router.get('/:category', async (req, res) => {
  try {
    console.log("ENTRO ROUTER", req.params.category);
    const filteredProducts = await productController.filterByCategory(req.params.category);
    const categories = await productController.findAllCategories();

    res.render('products/products', { filteredProducts , categories});
  
  } catch (error) {
      console.error("Error al obtener productos: ", error);
      res.status(500).send("Error al obtener productos");
  }
});

module.exports = router;