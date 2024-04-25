const router = require('express').Router();
const { getAll, createCart} = require('../controllers/cartController');

router.get('/', getAll);
router.post('/create', createCart)

module.exports = router;