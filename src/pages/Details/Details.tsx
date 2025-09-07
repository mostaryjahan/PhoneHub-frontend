import { useGetSinglePhoneQuery } from "@/redux/features/phone/phoneManagementApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useAppSelector } from "@/redux/features/hook";
import { useAddToCartMutation } from "@/redux/features/Cart/CartApi";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import {
  FaCamera,
  FaBatteryFull,
  FaMemory,
  FaShoppingCart,
  FaStar,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Details = () => {
  const { id } = useParams();
  const { data: phone, isLoading, error } = useGetSinglePhoneQuery(id);
  const [addToCartMutation] = useAddToCartMutation();
  const user = useAppSelector(selectCurrentUser);

  console.log("single phone info", phone);

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please log in to add items to your cart");
      return;
    }
    if (!phone?.data?._id) {
      toast.error("Product not found");
      return;
    }
    try {
      await addToCartMutation({
        email: user.email,
        productId: phone.data._id,
      }).unwrap();
      toast.success("Product added to cart");
    } catch (err: any) {
      console.error("Add to cart error:", err);
      toast.error("Cart is not save");
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-200 dark:bg-gray-700 h-96 rounded-xl animate-pulse"></div>
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6 animate-pulse"></div>
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mt-6 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-4 text-center py-12">
        <div className="text-red-500 text-5xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Error Loading Product
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Sorry, we couldn't load the product details. Please try again later.
        </p>
      </div>
    );
  }

  if (!phone?.data) {
    return (
      <div className="max-w-6xl mx-auto p-4 text-center py-12">
        <div className="text-gray-400 text-5xl mb-4">📱</div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Product Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          The phone you're looking for doesn't exist or may have been removed.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Phone Image Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="relative h-80 md:h-96 w-full">
            <img
              src={phone.data.image}
              alt={`${phone.data.brand} ${phone.data.model}`}
              className="w-full h-full object-contain transition-transform duration-500 hover:scale-105 bg-gray-100 p-8"
            />
            <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              {phone.data.year} Model
            </div>
            {phone.data.inStock ? (
              <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                In Stock ({phone.data.quantity})
              </div>
            ) : (
              <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                Out of Stock
              </div>
            )}
          </div>
        </div>

        {/* Phone Details Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                {phone.data.brand}{" "}
                <span className="text-blue-600">{phone.data.model}</span>
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                {phone.data.category}
              </p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
              ${phone.data.price.toLocaleString()}
              {phone.data.discount > 0 && (
                <span className="ml-2 line-through text-red-500">
                  ${(phone.data.price * (1 + phone.data.discount/100)).toLocaleString()}
                </span>
              )}
            </div>
          </div>

          {phone.data.discount > 0 && (
            <Badge className="mt-2 bg-red-500 text-white">
              Save {phone.data.discount}%
            </Badge>
          )}

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              Description
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {phone.data.description || "Premium smartphone with advanced features and cutting-edge technology."}
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
             
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Processor
                </p>
                <p className="font-medium">{phone.data.processor || "Octa-core"}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <FaMemory className="text-blue-600" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  RAM & Storage
                </p>
                <p className="font-medium">{phone.data.ram || "8GB"} / {phone.data.storage || "128GB"}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <FaCamera className="text-blue-600" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Camera
                </p>
                <p className="font-medium">{phone.data.camera || "48MP Triple Camera"}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <FaBatteryFull className="text-blue-600" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Battery
                </p>
                <p className="font-medium">{phone.data.battery || "5000mAh"}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition duration-300"
              disabled={!phone.data.inStock || !user}
            >
              <FaShoppingCart />
              <span>{!user ? "Login to Add to Cart" : "Add to Cart"}</span>
            </Button>
          </div>

          {/* Additional Features */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
              Key Features
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <FaStar className="text-yellow-400" />
                <span className="text-gray-600 dark:text-gray-300">
                  High-resolution display with vibrant colors
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <FaStar className="text-yellow-400" />
                <span className="text-gray-600 dark:text-gray-300">
                  Fast charging capability
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <FaStar className="text-yellow-400" />
                <span className="text-gray-600 dark:text-gray-300">
                  Advanced security features
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <FaStar className="text-yellow-400" />
                <span className="text-gray-600 dark:text-gray-300">
                  Latest operating system
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Specifications Table */}
      <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Full Specifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">General</h3>
            <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-500 dark:text-gray-400">Brand</span>
              <span className="font-medium">{phone.data.brand}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-500 dark:text-gray-400">Model</span>
              <span className="font-medium">{phone.data.model}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-500 dark:text-gray-400">Release Year</span>
              <span className="font-medium">{phone.data.year || "2023"}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-500 dark:text-gray-400">Category</span>
              <span className="font-medium">{phone.data.category}</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Technical</h3>
            <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-500 dark:text-gray-400">Operating System</span>
              <span className="font-medium">{phone.data.os || "Android 13"}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-500 dark:text-gray-400">Connectivity</span>
              <span className="font-medium">5G, Wi-Fi 6, Bluetooth 5.2</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-500 dark:text-gray-400">SIM Type</span>
              <span className="font-medium">Dual Nano-SIM</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-500 dark:text-gray-400">Weight</span>
              <span className="font-medium">189g</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;