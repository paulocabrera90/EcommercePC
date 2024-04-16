const router = require('express').Router();

const { findAll, filterByCategory, findAllCategories } = require('../controllers/productController');

router.get('/', findAll);

router.post('/', filterByCategory); 

module.exports = router;