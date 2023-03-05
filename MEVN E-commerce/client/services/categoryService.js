import http from '../api/axios'
// Create a new category
export const createCategory = async (name) => {
  try {
    const response = await http.post(`${API_URL}/categories`, { name });
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error('Failed to create category');
  }
};

// Get all categories
export const getAllCategories = async () => {
  try {
    const response = await http.get(`${API_URL}/categories`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error('Failed to get categories');
  }
};

// Get a specific category by ID
export const getCategoryById = async (categoryId) => {
  try {
    const response = await http.get(`${API_URL}/categories/${categoryId}`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error('Failed to get category');
  }
};

// Update a category by ID
export const updateCategory = async (categoryId, name) => {
  try {
    const response = await http.patch(`${API_URL}/categories/${categoryId}`, { name });
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error('Failed to update category');
  }
};

// Delete a category by ID
export const deleteCategory = async (categoryId) => {
  try {
    const response = await http.delete(`${API_URL}/categories/${categoryId}`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error('Failed to delete category');
  }
};
