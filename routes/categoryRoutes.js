// routes/categoryRoutes.js
import express from 'express';
import * as categoryController from '../controllers/categoryController.js';
import upload from '../middlewares/uploadMiddleware.js';


const router = express.Router();

// Add category (Admin only)
router.post(
  '/addcategory',
  upload.fields([
    { name: 'images', maxCount: 10 },
    { name: 'baseImage', maxCount: 1 },
  ]),
  categoryController.createCategory
);

// Update a category (Admin only)
router.put(
  '/:id',
  upload.fields([
    { name: 'baseImage', maxCount: 1 },
    { name: 'images', maxCount: 5 },
  ]),
  categoryController.handleUpdateCategory
);

// Get all categories (Public)
router.get('/', categoryController.getCategories);

// Get category by ID (Public)
router.get('/:categoryId', categoryController.getCategoryByid);

// Delete a category (Admin only)
router.delete(
  '/:categoryId',
  categoryController.deleteCategoryController
);

export default router;
