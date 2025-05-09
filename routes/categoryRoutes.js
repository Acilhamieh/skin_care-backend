// routes/categoryRoutes.js
import express from 'express';
import * as categoryController from '../controllers/categoryController.js';
import { createCategory } from '../controllers/categoryController.js';
import upload from '../middlewares/uploadMiddleware.js';
const router = express.Router();

//add category
router.post('/addcategory', upload.array('images'), createCategory);
//get all category
router.get('/', categoryController.getCategories);
export default router;
