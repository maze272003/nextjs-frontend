import { useState } from 'react';
import { createProduct } from '../lib/api'; // Import our new API function

// We receive a prop 'onProductCreated' from the parent (index.js)
// This is a function we will call after we successfully create a product.
export default function ProductForm({ onProductCreated }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    if (file) {
      formData.append('image', file);
    }

    try {
      await createProduct(formData); // Use the clean API function
      
      // Success!
      alert('Product created successfully!');
      
      // Clear the form
      setName('');
      setDescription('');
      setFile(null);
      e.target.reset();

      // Call the function from the parent to tell it to refetch products
      if (onProductCreated) {
        onProductCreated();
      }

    } catch (error) {
      console.error('Error creating product:', error.response?.data);
      setError('Failed to create product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg shadow-md bg-white">
      {error && <div className="text-red-500">{error}</div>}
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Product Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Product Image
        </label>
        <input
          id="image"
          type="file"
          onChange={handleFileChange}
          className="mt-1 block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-indigo-50 file:text-indigo-700
            hover:file:bg-indigo-100"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm
          hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
          disabled:bg-gray-400"
      >
        {loading ? 'Creating...' : 'Create Product'}
      </button>
    </form>
  );
}