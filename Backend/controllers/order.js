const Order = require('../models/Order');

const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, totalAmount } = req.body;

    if (items && items.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    const order = new Order({
      user: req.user._id,
      items,
      shippingAddress,
      paymentMethod,
      totalAmount,
    });

    const savedOrder = await order.save();
    res.status(201).json({ order: savedOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createOrder, getMyOrders };
