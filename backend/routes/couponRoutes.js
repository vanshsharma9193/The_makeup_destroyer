import express from 'express';
import { applyCoupon, getCoupons } from '../controllers/couponController.js';

const router = express.Router();

router.post('/apply', applyCoupon);
router.get('/', getCoupons);

export default router;

