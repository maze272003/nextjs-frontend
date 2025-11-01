import axios from 'axios';

// --- PRODUCTION & LOCAL URLs ---

// Ilagay dito ang domain ng Hostinger backend ninyo
const HOSTINGER_DOMAIN = 'https://azure-lapwing-178566.hostingersite.com';

const LOCAL_DOMAIN = 'http://127.0.0.1:8000';

// Tinitingnan natin kung ang code ay tumatakbo sa browser
const IS_BROWSER = typeof window !== 'undefined';

// Tinitingnan natin kung ang URL ay 'localhost'
const IS_LOCAL = IS_BROWSER && window.location.hostname === 'localhost';

// Dito kukunin ang mga images at videos
// Kung local, galing sa LOCAL_DOMAIN. Kung production, galing sa HOSTINGER_DOMAIN.
const APP_URL = IS_LOCAL ? LOCAL_DOMAIN : HOSTINGER_DOMAIN;

// Dito kukunin ang API data
// Kung local, galing sa LOCAL_DOMAIN/api. Kung production, galing sa HOSTINGER_DOMAIN/api.
const API_URL = IS_LOCAL ? `${LOCAL_DOMAIN}/api` : `${HOSTINGER_DOMAIN}/api`;
// ---------------------------------


// Create an Axios instance for all API calls
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Accept': 'application/json',
  }
});

// --- API Functions ---

export const getProducts = () => {
  return apiClient.get('/products');
};

export const createProduct = (formData) => {
  return apiClient.post('/products', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateProduct = (id, formData) => {
  formData.append('_method', 'PUT');
  return apiClient.post(`/products/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deleteProduct = (id) => {
  return apiClient.delete(`/products/${id}`);
};

// --- URL Helper Functions ---

export const getImageUrl = (imagePath) => {
  if (!imagePath) {
    return 'https://via.placeholder.com/300x200?text=No+Image';
  }
  
  // ⬇️ ITO ANG TAMANG PATH ⬇️
  // Ang 'imagePath' ay 'storage/products/images/image.jpg'
  // Kaya ang final URL ay: https://[domain]/storage/products/images/image.jpg
  return `${APP_URL}/${imagePath}`;
};

export const getVideoUrl = (videoPath) => {
  if (!videoPath) {
    return null;
  }
  // ⬇️ ITO ANG TAMANG PATH ⬇️
  // Ang 'videoPath' ay 'storage/products/videos/video.mp4'
  return `${APP_URL}/${videoPath}`;
};

export { apiClient };   