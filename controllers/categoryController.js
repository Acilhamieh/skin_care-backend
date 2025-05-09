// controllers/categoryController.js
import * as Category from '../models/categoryModel.js';
import { createCategoryWithImages } from '../models/categoryModel.js';
import { deleteCategory } from '../models/categoryModel.js';
import { getCategoryById } from '../models/categoryModel.js';

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
  // delete a category with its images 
export const deleteCategoryController = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const response = await deleteCategory(categoryId);
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
//get category by id 

export const getCategoryByid = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const category = await getCategoryById(categoryId);

    if (category.length === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(category[0]); // Return the first (and only) result
  } catch (error) {
    console.error('Error fetching category by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
