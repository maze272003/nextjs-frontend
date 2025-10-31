import { getImageUrl } from '../lib/api'; // Import our image URL helper

export default function ProductList({ products }) {
  if (products.length === 0) {
    return <p className="text-gray-500">No products found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="border rounded-lg shadow-md bg-white overflow-hidden">
          
          <img
            // Use the helper to build the correct URL
            src={getImageUrl(product.image_path)}
            alt={product.name}
            className="w-full h-48 object-cover"
          />

          <div className="p-4">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600 mt-2">{product.description}</p>
          </div>

        </div>
      ))}
    </div>
  );
}