// controllers/categoryController.js
import * as Category from '../models/categoryModel.js';
import { createCategoryWithImages } from '../models/categoryModel.js';
import { deleteCategory } from '../models/categoryModel.js';
import { getCategoryById } from '../models/categoryModel.js';
import { updateCategory } from '../models/categoryModel.js';

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

    // Extract files from the request
    const images = req.files?.images || []; // multiple images
    const baseImage = req.files?.baseImage?.[0]; // single base image

    // Call the model function with correct parameters
    const category = await createCategoryWithImages({
      name,
      description,
      images,
      baseImage,
    });

    res.status(201).json({ category, message: 'Category created with images!' });
  } catch (err) {
    console.error('Error creating category:', err);
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

//update a category

export const handleUpdateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description } = req.body;
    const baseImage = req.files?.baseImage?.[0] || null;
    const newImages = req.files?.images || [];

    const updatedCategory = await updateCategory({
      id,
      name,
      description,
      baseImage,
      newImages,
    });

    res.status(200).json({ message: 'Category updated successfully', category: updatedCategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
