const Product = require('../models/Product');

const getProducts = async (req, res) => {
  try {
    const { category, search, sort, featured, limit } = req.query;
    
    let query = {};
    if (category && category !== 'new') query.category = category;
    if (category === 'new') query.isNewProduct = true;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } }
      ];
    }
    
    let productsQuery = Product.find(query);
    
    // Quick featured mock
    if (featured === 'true') {
      productsQuery = productsQuery.limit(limit ? parseInt(limit) : 8);
    }

    if (sort === 'price-asc') productsQuery = productsQuery.sort({ price: 1 });
    else if (sort === 'price-desc') productsQuery = productsQuery.sort({ price: -1 });
    else if (sort === 'rating') productsQuery = productsQuery.sort({ rating: -1 });
    else productsQuery = productsQuery.sort({ createdAt: -1 }); // newest

    const products = await productsQuery;
    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProducts, getProductById };
