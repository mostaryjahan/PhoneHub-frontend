import { useState } from "react";
import { useUpdatePhoneMutation } from "@/redux/features/phone/phoneManagementApi";
import { toast } from "sonner";

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: any;
  onUpdate: () => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({ isOpen, onClose, product, onUpdate }) => {
  const [brand, setBrand] = useState(product.brand || "");
  const [model, setModel] = useState(product.model || "");
  const [year, setYear] = useState(product.year || new Date().getFullYear());
  const [price, setPrice] = useState(product.price || 0);
  const [category, setCategory] = useState(product.category || "");
  const [description, setDescription] = useState(product.description || "");
  const [image, setImage] = useState(product.image || "");
  const [quantity, setQuantity] = useState(product.quantity || 0);
  const [discount, setDiscount] = useState(product.discount || 0);
  
  const [updatePhone, { isLoading }] = useUpdatePhoneMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const phoneData = {
        brand,
        model,
        year,
        price,
        category,
        description,
        image,
        quantity,
        discount,
        inStock: quantity > 0
      };
      
      await updatePhone({ phoneId: product._id, phoneData }).unwrap();
      toast.success("Product updated successfully!");
      onUpdate();
      onClose();
    } catch (error) {
      toast.error("Failed to update product");
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Edit Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4 max-h-96 overflow-y-auto">
          <select
            className="w-full p-2 border rounded"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          >
            <option value="">Select Brand</option>
            <option value="Apple">Apple</option>
            <option value="Samsung">Samsung</option>
            <option value="Google">Google</option>
            <option value="OnePlus">OnePlus</option>
            <option value="Xiaomi">Xiaomi</option>
            <option value="Motorola">Motorola</option>
            <option value="Nokia">Nokia</option>
          </select>
          
          <input
            type="text"
            placeholder="Model"
            className="w-full p-2 border rounded"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
          />
          
          <input
            type="number"
            placeholder="Year"
            className="w-full p-2 border rounded"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            required
          />
          
          <input
            type="number"
            placeholder="Price"
            className="w-full p-2 border rounded"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />
          
          <select
            className="w-full p-2 border rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="Official">Official</option>
            <option value="Unofficial">Unofficial</option>
            <option value="Refurbished">Refurbished</option>
            <option value="Used">Used</option>
          </select>
          
          <textarea
            placeholder="Description"
            className="w-full p-2 border rounded h-20"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          
          <input
            type="url"
            placeholder="Image URL"
            className="w-full p-2 border rounded"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
          
          <input
            type="number"
            placeholder="Quantity"
            className="w-full p-2 border rounded"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
          />
          
          <input
            type="number"
            placeholder="Discount (%)"
            className="w-full p-2 border rounded"
            value={discount}
            min="0"
            max="100"
            onChange={(e) => setDiscount(Number(e.target.value))}
          />
          <div className="flex justify-end space-x-2">
            <button type="button" className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
