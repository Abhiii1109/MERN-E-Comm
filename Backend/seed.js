require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const mockProducts = Array.from({ length: 8 }, (_, i) => ({
  name: ['Oversized Graphic Tee', 'Slim Fit Chinos', 'Floral Maxi Dress', 'Classic Denim Jacket', 'Cargo Joggers', 'Cropped Hoodie', 'Pleated Midi Skirt', 'Linen Blend Shirt'][i],
  brand: ['LUXE Originals', 'Urban Edge', 'LUXE Women', 'Denim Co.', 'Street Style', 'LUXE Active', 'LUXE Women', 'LUXE Men'][i],
  description: 'Premium quality clothing item from our newest collection. Designed for comfort and style, perfect for everyday wear. Made with sustainable materials.',
  price: [1499, 2499, 3499, 3999, 1999, 2299, 2799, 1899][i],
  discountedPrice: [799, 1499, 1999, 2499, 999, null, 1699, 1199][i],
  rating: [4.5, 4.3, 4.8, 4.7, 4.2, 4.6, 4.4, 4.1][i],
  numReviews: [2840, 612, 5210, 1890, 439, 3120, 892, 340][i],
  isNewProduct: i < 2,
  stock: i === 5 ? 0 : 10,
  category: ['men', 'men', 'women', 'men', 'men', 'women', 'women', 'men'][i],
  images: [
    [`https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80`],
    [`https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&q=80`],
    [`https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80`],
    [`https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80`],
    [`https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=400&q=80`],
    [`https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&q=80`],
    [`https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&q=80`],
    [`https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80`],
  ][i],
  sizes: ['S', 'M', 'L', 'XL'],
  features: ['Premium Quality', 'True to Size', 'Machine Washable']
}));

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for Seeding');

    // Delete existing products to avoid duplicates
    await Product.deleteMany();
    console.log('Cleared existing products');

    // Insert mock products
    await Product.insertMany(mockProducts);
    console.log('Products seeded successfully');

    process.exit();
  } catch (error) {
    console.error('Error with seed data: ', error);
    process.exit(1);
  }
};

seedDatabase();
