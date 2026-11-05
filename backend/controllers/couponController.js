import { db } from '../config/db.js';

// @desc    Apply and validate coupon
// @route   POST /api/coupons/apply
export const applyCoupon = async (req, res, next) => {
  try {
    const { code, subtotal } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a coupon privilege code.'
      });
    }

    const cleanCode = code.trim().toUpperCase();
    const coupons = await db.coupons.read();
    const coupon = coupons.find((c) => c.code === cleanCode);

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: 'Invalid privilege code. Valid codes include BLOSSOM20 or CHERRY10.'
      });
    }

    const orderSubtotal = parseFloat(subtotal) || 0;

    if (coupon.minOrder && orderSubtotal < coupon.minOrder) {
      return res.status(400).json({
        success: false,
        message: `This coupon requires a minimum acquisition of ₹${coupon.minOrder}.`
      });
    }

    let discount = 0;
    if (coupon.type === 'percent') {
      discount = Math.round((orderSubtotal * coupon.value) / 100);
    } else if (coupon.type === 'fixed') {
      discount = coupon.value;
    }

    discount = Math.min(discount, orderSubtotal);

    res.json({
      success: true,
      message: `Privilege code ${cleanCode} verified.`,
      data: {
        code: coupon.code,
        type: coupon.type,
        value: coupon.value,
        discount,
        description: coupon.description
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all public coupon offers
// @route   GET /api/coupons
export const getCoupons = async (req, res, next) => {
  try {
    const coupons = await db.coupons.read();
    res.json({
      success: true,
      data: coupons
    });
  } catch (error) {
    next(error);
  }
};

