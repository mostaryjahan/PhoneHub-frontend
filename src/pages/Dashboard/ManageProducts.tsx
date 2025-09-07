/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import AddProductModal from "./AddProductModal";
import EditProductModal from "./EditProductModal";
import { useDeletePhoneMutation, useGetAllPhonesQuery } from "@/redux/features/phone/phoneManagementApi";

interface Car {
  _id: string;
  brand: string;
  category: string;
  price: number;
  quantity: number;
}

const ManageProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState<Car | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  const { data, isLoading } = useGetAllPhonesQuery({});
  const [deleteProduct] = useDeletePhoneMutation();
  const products: Car[] = data?.data || [];

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handleDelete = (productId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteProduct(productId).unwrap();
          if (response.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Product has been deleted.", "success");
          }
        } catch (error) {
          Swal.fire("Error!", "Failed to delete product.", "error");
        }
      }
    });
  };

  if (isLoading) {
    return <p>Loading....</p>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Products</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">#</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Quantity</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product, index) => (
              <tr key={product._id} className="border-t">
                <td className="p-2 border">
                  {indexOfFirstProduct + index + 1}
                </td>
                <td className="p-2 border">{product.brand}</td>
                <td className="p-2 border">{product.category}</td>
                <td className="p-2 border">${product.price}</td>
                <td className="p-2 border">{product.quantity}</td>
                <td className="p-2 border flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setIsEditModalOpen(true);
                    }}
                    className="text-blue-500"
                  >
                    <FaEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-red-500"
                  >
                    <FaTrash size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Modals */}
      {isAddModalOpen && (
        <AddProductModal
          onClose={() => setIsAddModalOpen(false)}
          isOpen={isAddModalOpen}
          onAdd={() => {
            setIsAddModalOpen(false);
            setCurrentPage(1); // Optional: Reset to first page on add
          }}
        />
      )}
      {isEditModalOpen && selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          isOpen={isEditModalOpen}
          onUpdate={() => {
            setIsEditModalOpen(false);
            setCurrentPage(1); // Optional: Reset to first page on edit
          }}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ManageProducts;
