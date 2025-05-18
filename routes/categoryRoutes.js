// routes/categoryRoutes.js
import express from 'express';
import * as categoryController from '../controllers/categoryController.js';
import upload from '../middlewares/uploadMiddleware.js';
const router = express.Router();

//add category
router.post(
  '/addcategory',
  upload.fields([
    { name: 'images', maxCount: 10 },      // multiple images
    { name: 'baseImage', maxCount: 1 }     // single base image
  ]),
  categoryController.createCategory
);
//update a category
router.put(
  '/:id',
  upload.fields([
    { name: 'baseImage', maxCount: 1 },
    { name: 'images', maxCount: 5 },
  ]),
  categoryController.handleUpdateCategory
);
//get all category
router.get('/', categoryController.getCategories);
//delete a category
router.delete('/:categoryId',categoryController.deleteCategoryController);
//get category by id 
router.get('/:categoryId', categoryController.getCategoryByid);
export default router;
