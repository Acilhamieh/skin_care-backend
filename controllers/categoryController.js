// controllers/categoryController.js
import * as Category from '../models/categoryModel.js';
import { createCategoryWithImages } from '../models/categoryModel.js';

export const getCategories = async (req, res) => {
    try {
      const categories = await Category.getAllCategories();
  
      const formattedCategories = categories.map(cat => ({
        ...cat,
        images: typeof cat.images === 'string' ? JSON.parse(cat.images) : cat.images
      }));
  
      res.json(formattedCategories);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // add a category
  
  export const createCategory = async (req, res) => {
    try {
      const { name, description } = req.body;
      const images = req.files; // coming from multer
  
      const category = await createCategoryWithImages({ name, description, images });
  
      res.status(201).json({ category, message: 'Category created with images!' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
