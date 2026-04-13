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

const createProduct = async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name || 'Sample name',
      brand: req.body.brand || 'Sample brand',
      description: req.body.description || 'Sample description',
      price: req.body.price || 0,
      discountedPrice: req.body.discountedPrice || null,
      rating: 0,
      numReviews: 0,
      isNewProduct: req.body.isNewProduct || false,
      stock: req.body.stock || 0,
      category: req.body.category || 'Sample category',
      images: req.body.images?.length ? req.body.images : ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80'],
      sizes: req.body.sizes?.length ? req.body.sizes : ['S', 'M', 'L', 'XL'],
      features: req.body.features || []
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProducts, getProductById, createProduct };
