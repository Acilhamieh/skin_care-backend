// routes/categoryRoutes.js
import express from 'express';
import * as categoryController from '../controllers/categoryController.js';
import upload from '../middlewares/uploadMiddleware.js';
const router = express.Router();

//add category
router.post('/addcategory', upload.array('images'), categoryController.createCategory);
//get all category
router.get('/', categoryController.getCategories);
//delete a category
router.delete('/:categoryId',categoryController.deleteCategoryController);
//get category by id 
router.get('/:categoryId', categoryController.getCategoryByid);
export default router;
