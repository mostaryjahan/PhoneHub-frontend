import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useAddPhoneMutation } from "@/redux/features/phone/phoneManagementApi";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Smartphone, 
  PlusCircle, 
  ChevronDown, 
  ImageIcon,
  CheckCircle,
  XCircle 
} from "lucide-react";
import { useAppSelector } from "@/redux/features/hook";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useState } from "react";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddPhoneForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
  } = useForm();
  
  const [addPhoneMutation, { isLoading }] = useAddPhoneMutation();
  const user = useAppSelector(selectCurrentUser);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      // Set form value
      setValue("image", [file]);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setValue("image", []);
  };

  const onSubmit = async (data: any) => {
    try {
      if (!user) {
        toast.error("Please login to add a phone");
        return;
      }

      if (!selectedImage) {
        toast.error("Please select an image");
        return;
      }

      const imageFile = new FormData();
      imageFile.append("image", selectedImage);

      const res = await axios.post(image_hosting_api, imageFile, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        const inStockBoolean = data.inStock === true || data.inStock === "true";
        
        const phoneInfo = {
          brand: data.brand,
          model: data.model,
          year: Number(data.year),
          price: Number(data.price),
          quantity: Number(data.quantity),
          discount: Number(data.discount) || 0,
          inStock: inStockBoolean,
          category: data.category,
          description: data.description,
          image: res.data.data.display_url,
          addedBy: user.email,
          addedByName: user.name
        };

        const res1 = await addPhoneMutation(phoneInfo).unwrap();
        
        if (res1.success) {
          toast.success("Phone added successfully!");
          reset();
          setSelectedImage(null);
          setImagePreview(null);
        }
      }
    } catch (error: any) {
      console.log("Error adding phone:", error);
      
      if (error.data?.errorSources) {
        const errorMessages = error.data.errorSources.map((err: any) => err.message).join(', ');
        toast.error(`Validation error: ${errorMessages}`);
      } else if (error.status === 401) {
        toast.error("Unauthorized: Please check your login status");
      } else if (error.status === 403) {
        toast.error("Permission denied: Only admins can add phones");
      } else {
        toast.error("Failed to add phone. Please try again.");
      }
    }
  };

  if (user?.role !== "admin" && user?.role !== "vendor") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 py-8 px-4 flex items-center justify-center">
        <Card className="max-w-md mx-auto border-0 shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl text-red-600">Access Denied</CardTitle>
            <CardDescription className="text-lg">
              Only administrators can add new phones to the inventory.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-6">
              Please contact an administrator if you believe this is an error.
            </p>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <a href="/">Back to Home</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 py-8 px-4">
      <Card className="max-w-3xl mx-auto shadow-xl border-2 rounded-2xl overflow-hidden">
        <CardHeader className=" text-black py-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="p-2 bg-white/20 rounded-full">
              <Smartphone className="w-8 h-8" />
            </div>
            <CardTitle className="text-3xl font-bold">Add New Phone</CardTitle>
          </div>
         
        </CardHeader>
        
        <CardContent className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            {/* Brand & Model */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="brand" className=" font-semibold text-gray-700">
                  Brand*
                </Label>
                <div className="relative">
                  <select
                    {...register("brand", { required: "Brand is required" })}
                    className="w-full py-[5px] px-4 pr-10 bg-white border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer transition-colors"
                    defaultValue=""
                  >
                    <option value="" disabled>Select brand</option>
                    <option value="Apple">Apple</option>
                    <option value="Samsung">Samsung</option>
                    <option value="Xiaomi">Xiaomi</option>
                    <option value="Google">Google</option>
                    <option value="Motorola">Motorola</option>
                    <option value="OnePlus">OnePlus</option>
                    <option value="Nokia">Nokia</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                {errors.brand && (
                  <p className="text-red-500 text-sm mt-1">{errors.brand.message as string}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="model" className=" font-semibold text-gray-700">
                  Model*
                </Label>
                <Input
                  id="model"
                  type="text"
                  {...register("model", { required: "Model is required" })}
                  placeholder="e.g., iPhone 15 Pro, Galaxy S23"
                  className="py-4 px-4 text-base rounded-lg border-gray-300 focus:border-blue-500"
                />
                {errors.model && (
                  <p className="text-red-500 text-sm mt-1">{errors.model.message as string}</p>
                )}
              </div>
            </div>

            {/* Year & Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="year" className=" font-semibold text-gray-700">
                  Release Year*
                </Label>
                <Input
                  id="year"
                  type="number"
                  {...register("year", { 
                    required: "Year is required",
                    valueAsNumber: true,
                    min: {
                      value: 2000,
                      message: "Year must be 2000 or later"
                    },
                    max: {
                      value: new Date().getFullYear() + 1,
                      message: "Year cannot be in the future"
                    }
                  })}
                  placeholder="e.g., 2023"
                  className="py-3 text-base rounded-lg border-gray-300 focus:border-blue-500"
                />
                {errors.year && (
                  <p className="text-red-500 text-sm mt-1">{errors.year.message as string}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="price" className=" font-semibold text-gray-700">
                  Price ($)*
                </Label>
                <Input
                  id="price"
                  type="number"
                  {...register("price", { 
                    required: "Price is required",
                    valueAsNumber: true,
                    min: {
                      value: 0,
                      message: "Price must be positive"
                    }
                  })}
                  placeholder="e.g., 999"
                  className="py-3 text-base rounded-lg border-gray-300 focus:border-blue-500"
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">{errors.price.message as string}</p>
                )}
              </div>
            </div>

            {/* Category & Quantity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="category" className=" font-semibold text-gray-700">
                  Category*
                </Label>
                <div className="relative">
                  <select
                    {...register("category", { required: "Category is required" })}
                    className="w-full py-[5px] px-4 pr-10 bg-white border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer transition-colors"
                    defaultValue=""
                  >
                    <option value="" disabled>Select category</option>
                    <option value="Official">Official</option>
                    <option value="Unofficial">Unofficial</option>
                    <option value="Refurbished">Refurbished</option>
                    <option value="Used">Used</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">{errors.category.message as string}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="quantity" className=" font-semibold text-gray-700">
                  Quantity*
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  {...register("quantity", { 
                    required: "Quantity is required",
                    valueAsNumber: true,
                    min: {
                      value: 0,
                      message: "Quantity cannot be negative"
                    }
                  })}
                  placeholder="Available stock"
                  className="py-3 text-base rounded-lg border-gray-300 focus:border-blue-500"
                />
                {errors.quantity && (
                  <p className="text-red-500 text-sm mt-1">{errors.quantity.message as string}</p>
                )}
              </div>
            </div>

            {/* Image Upload with preview */}
            <div className="space-y-4">
              <Label htmlFor="image" className=" font-semibold text-gray-700">
                Phone Image*
              </Label>
              
              {imagePreview ? (
                <div className="border-2 border-dashed border-green-300 rounded-lg p-6 bg-green-50">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-4">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-32 h-32 object-contain rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <XCircle className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex items-center text-green-600 mb-2">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      <span className="font-medium">Image selected</span>
                    </div>
                    <p className="text-sm text-green-600">
                      Click the image to change selection
                    </p>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors bg-gray-50">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <Label
                    htmlFor="image"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <div className=" bg-blue-100 rounded-full flex items-center justify-center mb-2">
                      <ImageIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-semibold text-gray-700">
                        Click to upload image
                      </p>
                      <p className="text-sm text-gray-500">
                        PNG, JPG, JPEG up to 10MB
                      </p>
                    </div>
                    
                  </Label>
                </div>
              )}
              
              {errors.image && (
                <p className="text-red-500 text-sm mt-1">{errors.image.message as string}</p>
              )}
            </div>

            {/* Stock Status & Discount */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label className=" font-semibold text-gray-700">Stock Status*</Label>
                <div className="flex items-center space-x-3 px-6 py-[5px] border border-gray-300 rounded-lg bg-white">
                  <Controller
                    name="inStock"
                    control={control}
                    defaultValue={true}
                    rules={{ required: "Stock status is required" }}
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked === true);
                        }}
                        className="data-[state=checked]:bg-blue-600"
                      />
                    )}
                  />
                  <Label htmlFor="inStock" className="text-base cursor-pointer text-gray-700">
                    Currently in stock
                  </Label>
                </div>
                {errors.inStock && (
                  <p className="text-red-500 text-sm mt-1">{errors.inStock.message as string}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="discount" className=" font-semibold text-gray-700">
                  Discount (%)
                </Label>
                <Input
                  id="discount"
                  type="number"
                  {...register("discount", {
                    valueAsNumber: true,
                    min: {
                      value: 0,
                      message: "Discount cannot be negative"
                    },
                    max: {
                      value: 100,
                      message: "Discount cannot exceed 100%"
                    }
                  })}
                  placeholder="e.g., 15"
                  className="py-3 text-base rounded-lg border-gray-300 focus:border-blue-500"
                />
                {errors.discount && (
                  <p className="text-red-500 text-sm mt-1">{errors.discount.message as string}</p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className=" font-semibold text-gray-700">
                Description*
              </Label>
              <Textarea
                id="description"
                {...register("description", { required: "Description is required" })}
                placeholder="Describe the phone features, specifications, and key selling points..."
                className="min-h-32 text-base resize-vertical rounded-lg border-gray-300 focus:border-blue-500"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description.message as string}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="text-center pt-4">
              <Button 
                type="submit" 
                className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-8 py-4 font-medium   w-full md:w-64 rounded-lg shadow-lg"
                disabled={isLoading || !selectedImage}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Adding Phone...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <PlusCircle className="w-5 h-5 mr-2" />
                    Add Phone
                  </div>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddPhoneForm;