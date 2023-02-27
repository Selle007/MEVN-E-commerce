import { createCategory, getAllCategories } from '../services/categoryService';

describe('Category API', () => {
  let createdCategory;

  test('creates a new category', async () => {
    const categoryName = 'Test Category';
    const response = await createCategory(categoryName);
    expect(response.name).toBe(categoryName);
    expect(response._id).toBeDefined();
    createdCategory = response;
  });

  test('retrieves all categories', async () => {
    const response = await getAllCategories();
    expect(Array.isArray(response)).toBe(true);
    expect(response.some(category => category._id === createdCategory._id)).toBe(true);
  });
});
