import { useState, useEffect } from 'react';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';
import { getProducts } from '../lib/api'; // Import API function to get products

export default function Home() {
  // 1. 'products' state holds our list of products
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. This function fetches products from the API and updates our state
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getProducts();
      setProducts(response.data); // Set the products in state
    } catch (err) {
      setError('Failed to fetch products.');
    } finally {
      setLoading(false);
    }
  };

  // 3. 'useEffect' runs this function once when the page first loads
  useEffect(() => {
    fetchProducts();
  }, []); // The empty array [] means "run this only once"

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Product Management</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Column 1: The Form */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
            
            {/* We pass the 'fetchProducts' function as a prop.
              When the form succeeds, it will call this function
              to reload the product list!
            */}
            <ProductForm onProductCreated={fetchProducts} />
          </div>

          {/* Column 2: The List */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">Existing Products</h2>
            
            {loading && <p>Loading products...</p>}
            {error && <p className="text-red-500">{error}</p>}
            
            <ProductList products={products} />
          </div>

        </div>
      </div>
    </div>
  );
}