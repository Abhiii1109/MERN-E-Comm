const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  discountedPrice: { type: Number },
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  isNewProduct: { type: Boolean, default: false },
  stock: { type: Number, required: true, default: 0 },
  category: { type: String, required: true },
  images: [{ type: String }],
  sizes: [{ type: String }],
  features: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
