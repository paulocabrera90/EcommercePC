const router = require('express').Router();

const { findAll, filterByCategory, findAllCategories } = require('../controllers/productController');

router.get('/', findAll);
router.get('/:category', filterByCategory); 

module.exports = router;