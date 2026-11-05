import { db } from '../config/db.js';

// @desc    Create a new luxury order
// @route   POST /api/orders
export const createOrder = async (req, res, next) => {
  try {
    const { customer, items, pricing, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot place order with an empty shopping bag.'
      });
    }

    if (!customer || !customer.firstName || !customer.email || !customer.address) {
      return res.status(400).json({
        success: false,
        message: 'Incomplete delivery and contact information.'
      });
    }

    const orderId = 'CB-' + Math.floor(1000 + Math.random() * 9000) + '-LUX';

    const newOrder = {
      id: orderId,
      customer,
      items,
      pricing: pricing || {
        subtotal: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
        discount: 0,
        shipping: 0,
        grandTotal: items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      },
      paymentMethod: (paymentMethod || 'CARD').toUpperCase(),
      status: 'Processing in Atelier',
      createdAt: new Date().toISOString()
    };

    const saved = await db.orders.create(newOrder);

    res.status(201).json({
      success: true,
      message: 'Luxury acquisition confirmed.',
      data: saved
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
export const getOrderById = async (req, res, next) => {
  try {
    const order = await db.orders.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order reference not found'
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all orders (Admin / Client overview)
// @route   GET /api/orders
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await db.orders.read();
    res.json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    next(error);
  }
};

