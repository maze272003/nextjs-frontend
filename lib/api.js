import axios from 'axios';

// The base URL of your Laravel API
const API_URL = 'https://founder-skins-introducing-brick.trycloudflare.com/api';

/**
 * Creates an Axios instance with default headers.
 * This isn't strictly necessary but is good practice.
 */
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Accept': 'application/json',
  }
});

/**
 * Fetches all products.
 * Corresponds to: GET /api/products
 */
export const getProducts = () => {
  return apiClient.get('/products');
};

/**
 * Fetches a single product by its ID.
 * Corresponds to: GET /api/products/{id}
 */
export const getProductById = (id) => {
  return apiClient.get(`/products/${id}`);
};

/**
 * Creates a new product.
 * Corresponds to: POST /api/products
 * @param {FormData} formData - The FormData object containing name, description, and image file.
 */
export const createProduct = (formData) => {
  return apiClient.post('/products', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

/**
 * Updates an existing product.
 * Corresponds to: POST /api/products/{id} (with _method: 'PUT')
 * * @param {number} id - The ID of the product to update.
 * @param {FormData} formData - Must contain the product data AND a _method field:
 * formData.append('_method', 'PUT');
 */
export const updateProduct = (id, formData) => {
  // We use POST to send FormData, but tell Laravel it's a PUT request.
  // This is how Laravel handles file uploads in an update.
  return apiClient.post(`/products/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

/**
 * Deletes a product by its ID.
 * Corresponds to: DELETE /api/products/{id}
 */
export const deleteProduct = (id) => {
  return apiClient.delete(`/products/${id}`);
};

/**
 * Helper function to get the full URL for an image.
 * @param {string} imagePath - The relative path from Laravel (e.g., "products/image.png")
 */
export const getImageUrl = (imagePath) => {
  return `https://founder-skins-introducing-brick.trycloudflare.com/storage/${imagePath}`;
};