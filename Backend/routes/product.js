const express = require('express');
const router = express.Router();
const { getProducts, getProductById, createProduct } = require('../controllers/product');
const { protect, admin } = require('../middleware/auth');

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.get('/:id', getProductById);

module.exports = router;
