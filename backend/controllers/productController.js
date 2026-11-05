import { db } from '../config/db.js';

// @desc    Get all products with filtering & sorting
// @route   GET /api/products
export const getProducts = async (req, res, next) => {
  try {
    let products = await db.products.read();
    const { category, search, maxPrice, minRating, sort, limit } = req.query;

    // Category Filter
    if (category && category !== 'All') {
      products = products.filter(
        (p) =>
          p.category.toLowerCase() === category.toLowerCase() ||
          p.categorySlug.toLowerCase() === category.toLowerCase()
      );
    }

    // Search Filter
    if (search) {
      const q = search.toLowerCase().trim();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Max Price
    if (maxPrice) {
      const price = parseFloat(maxPrice);
      products = products.filter((p) => p.price <= price);
    }

    // Rating
    if (minRating) {
      const rating = parseFloat(minRating);
      products = products.filter((p) => p.rating >= rating);
    }

    // Sorting
    switch (sort) {
      case 'price-low':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        products.sort((a, b) => b.rating - a.rating);
        break;
      case 'bestseller':
        products.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        break;
      case 'newest':
        products.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default: // featured
        products.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    if (limit) {
      products = products.slice(0, parseInt(limit, 10));
    }

    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
export const getProductById = async (req, res, next) => {
  try {
    const product = await db.products.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Cosmetic creation not found'
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get categories with counts
// @route   GET /api/products/meta/categories
export const getCategories = async (req, res, next) => {
  try {
    const products = await db.products.read();
    const categoriesMap = {};

    products.forEach((p) => {
      categoriesMap[p.category] = (categoriesMap[p.category] || 0) + 1;
    });

    const categories = [
      { name: 'All', count: products.length },
      ...Object.keys(categoriesMap).map((cat) => ({
        name: cat,
        count: categoriesMap[cat]
      }))
    ];

    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get related products
// @route   GET /api/products/:id/related
export const getRelatedProducts = async (req, res, next) => {
  try {
    const current = await db.products.findById(req.params.id);
    const all = await db.products.read();

    const related = all
      .filter((p) => p.id !== req.params.id && (!current || p.category === current.category))
      .slice(0, 4);

    res.json({
      success: true,
      data: related
    });
  } catch (error) {
    next(error);
  }
};

