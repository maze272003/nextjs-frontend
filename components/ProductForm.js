import { useState } from 'react';
import { createProduct } from '../lib/api'; 

export default function ProductForm({ onProductCreated }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  
  // UI States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    // Optional: Check size immediately on client side (50MB = 52428800 bytes)
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > 55 * 1024 * 1024) {
      alert("File is too big! Please upload less than 50MB.");
      e.target.value = ""; // Reset input
      setFile(null);
      return;
    }
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    
    if (file) {
      // Determine if it's an image or video key based on file type
      // Or just send everything as 'image' if your backend logic handles it,
      // but strictly adhering to your controller logic:
      if (file.type.startsWith('video/')) {
          formData.append('video', file);
      } else {
          formData.append('image', file);
      }
    }

    try {
      await createProduct(formData);
      
      // Success Cleanup
      alert('Product created successfully!');
      setName('');
      setDescription('');
      setFile(null);
      e.target.reset(); // Reset file input UI

      if (onProductCreated) {
        onProductCreated();
      }

    } catch (err) {
      console.error('Upload Error:', err);
      if (err.response && err.response.data && err.response.data.errors) {
        // Show specific Laravel validation error
        setError(JSON.stringify(err.response.data.errors));
      } else if (err.code === 'ECONNABORTED') {
        setError('Upload timed out. Your internet might be too slow for this file size.');
      } else {
        setError('Failed to create product. Server might be rejecting the file size.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg shadow-md bg-white">
      {error && <div className="p-2 bg-red-100 text-red-600 text-sm rounded">{error}</div>}
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Product Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Upload Image or Video (Max 50MB)
        </label>
        <input
          type="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full px-4 py-2 text-white font-semibold rounded-md shadow-sm 
          ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
      >
        {loading ? 'Uploading (Please wait)...' : 'Create Product'}
      </button>
    </form>
  );
}
