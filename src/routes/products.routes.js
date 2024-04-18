const router = require('express').Router();

const { findAll, filterByCategory } = require('../controllers/productController');

router.get('/', findAll);

router.post('/category', filterByCategory); 

module.exports = router;