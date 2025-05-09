// models/categoryModel.js
import sql from '../config/db.js';
import supabase from '../config/supabaseClient.js';
export const getAllCategories = async () => {
    return await sql`
      SELECT 
        c.*,
        COALESCE(
          json_agg(
            json_build_object(
              'id', f.id,
              'fileUrl', f.fileUrl,
              'type', f.type,
              'createdAt', f.createdAt,
              'updatedAt', f.updatedAt
            )
          ) FILTER (WHERE f.id IS NOT NULL),
          '[]'
        ) AS images
      FROM categories c
      LEFT JOIN files f ON f.categoryId = c.id
      GROUP BY c.id
      ORDER BY c.createdAt DESC
    `;
  };

//add a category with images 

export const createCategoryWithImages = async ({ name, description, images }) => {
    return await sql.begin(async sql => {
      const [category] = await sql`
        INSERT INTO categories (name, description)
        VALUES (${name}, ${description})
        RETURNING *;
      `;
  
      if (images && images.length > 0) {
        for (const image of images) {
          // image = multer file object { buffer, originalname, mimetype }
          const { data, error } = await supabase.storage
            .from('category-images')
            .upload(`categories/${Date.now()}_${image.originalname}`, image.buffer, {
              contentType: image.mimetype
            });
  
          if (error) {
            throw new Error(`Failed to upload image: ${error.message}`);
          }
  
          const imageUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/category-images/${data.path}`;
  
          await sql`
            INSERT INTO files (categoryId, fileUrl, type)
            VALUES (${category.id}, ${imageUrl}, 'image');
          `;
        }
      }
  
      return category;
    });
  };
// delete a category 
export const deleteCategory = async (categoryId) => {
    return await sql.begin(async sql => {
      // First, delete the associated images
      await sql`
        DELETE FROM files
        WHERE categoryId = ${categoryId};
      `;
  
      // Then, delete the category itself
      const result = await sql`
        DELETE FROM categories
        WHERE id = ${categoryId}
        RETURNING *;
      `;
  
      if (result.length === 0) {
        throw new Error('Category not found');
      }
  
      return { success: true, message: 'Category and associated images deleted successfully' };
    });
  };
  // get category by id 
  export const getCategoryById = async (id) => {
    return await sql`
      SELECT 
        c.*,
        COALESCE(
          json_agg(
            json_build_object(
              'id', f.id,
              'fileUrl', f.fileUrl,
              'type', f.type,
              'createdAt', f.createdAt,
              'updatedAt', f.updatedAt
            )
          ) FILTER (WHERE f.id IS NOT NULL),
          '[]'
        ) AS images
      FROM categories c
      LEFT JOIN files f ON f.categoryId = c.id
      WHERE c.id = ${id}  -- Here we filter by category ID
      GROUP BY c.id
      ORDER BY c.createdAt DESC
    `;
  };