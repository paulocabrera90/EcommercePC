const router = require('express').Router();
const { getAll } = require('../controllers/cartController');

router.get('/', getAll);

module.exports = router;