const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getProfile, updateProfile, updateCart } = require('../controllers/auth');
const { protect } = require('../middleware/auth');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.route('/profile').get(protect, getProfile).put(protect, updateProfile);
router.put('/cart', protect, updateCart);

module.exports = router;
