import express from 'express';
import {
  getProducts,
  getProductById,
  getCategories,
  getRelatedProducts
} from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/meta/categories', getCategories);
router.get('/:id', getProductById);
router.get('/:id/related', getRelatedProducts);

export default router;

