import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useAddPhoneMutation } from "@/redux/features/phone/phoneManagementApi";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Smartphone, Upload, PlusCircle } from "lucide-react";
import { useAppSelector } from "@/redux/features/hook";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddPhoneForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();
  const [addPhoneMutation, { isLoading }] = useAddPhoneMutation();
  const user = useAppSelector(selectCurrentUser);

  // Watch the inStock value to handle checkbox properly
  

  const onSubmit = async (data: any) => {
    try {
      if (!user) {
        toast.error("Please login to add a phone");
        return;
      }

      const imageFile = new FormData();
      imageFile.append("image", data.image[0]);

      const res = await axios.post(image_hosting_api, imageFile, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        // Convert inStock to boolean - handle both string "true"/"false" and actual boolean
        const inStockBoolean = data.inStock === true || data.inStock === "true";
        
        const phoneInfo = {
          brand: data.brand,
          model: data.model,
          year: Number(data.year),
          price: Number(data.price),
          quantity: Number(data.quantity),
          discount: Number(data.discount) || 0,
          inStock: inStockBoolean, // Ensure this is a boolean
          category: data.category,
          description: data.description,
          image: res.data.data.display_url,
          addedBy: user.email,
          addedByName: user.name
        };

        console.log("Submitting phone data:", phoneInfo);

        const res1 = await addPhoneMutation(phoneInfo).unwrap();
        
        if (res1.success) {
          toast.success("Phone added successfully!");
          reset();
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

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-center text-red-600">Access Denied</CardTitle>
            <CardDescription className="text-center">
              Only administrators can add new phones to the inventory.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-4">
              Please contact an administrator if you believe this is an error.
            </p>
            <Button asChild>
              <a href="/">Back to Home</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <Card className="max-w-4xl mx-auto shadow-lg border-0">
        <CardHeader className="bg-primary text-white rounded-t-lg">
          <div className="flex items-center justify-center space-x-3">
            <Smartphone className="w-8 h-8" />
            <CardTitle className="text-3xl">Add New Phone</CardTitle>
          </div>
          <CardDescription className="text-secondary">
            Fill in the details below to add a new phone to your inventory
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Brand & Model */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="brand" className="text-lg font-semibold">
                  Brand*
                </Label>
                <Controller
                  name="brand"
                  control={control}
                  rules={{ required: "Brand is required" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="h-12 text-base">
                        <SelectValue placeholder="Select brand" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Apple">Apple</SelectItem>
                        <SelectItem value="Samsung">Samsung</SelectItem>
                        <SelectItem value="Xiaomi">Xiaomi</SelectItem>
                        <SelectItem value="Google">Google</SelectItem>
                        <SelectItem value="Motorola">Motorola</SelectItem>
                        <SelectItem value="OnePlus">OnePlus</SelectItem>
                        <SelectItem value="Nokia">Nokia</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.brand && (
                  <p className="text-red-500 text-sm">{errors.brand.message as string}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="model" className="text-lg font-semibold">
                  Model*
                </Label>
                <Input
                  id="model"
                  type="text"
                  {...register("model", { required: "Model is required" })}
                  placeholder="e.g., iPhone 15 Pro, Galaxy S23"
                  className="h-12 text-base"
                />
                {errors.model && (
                  <p className="text-red-500 text-sm">{errors.model.message as string}</p>
                )}
              </div>
            </div>

            {/* Year & Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="year" className="text-lg font-semibold">
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
                  className="h-12 text-base"
                />
                {errors.year && (
                  <p className="text-red-500 text-sm">{errors.year.message as string}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="price" className="text-lg font-semibold">
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
                  className="h-12 text-base"
                />
                {errors.price && (
                  <p className="text-red-500 text-sm">{errors.price.message as string}</p>
                )}
              </div>
            </div>

            {/* Category & Quantity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-lg font-semibold">
                  Category*
                </Label>
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: "Category is required" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="h-12 text-base">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Official">Official</SelectItem>
                        <SelectItem value="Unofficial">Unofficial</SelectItem>
                        <SelectItem value="Refurbished">Refurbished</SelectItem>
                        <SelectItem value="Used">Used</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.category && (
                  <p className="text-red-500 text-sm">{errors.category.message as string}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="quantity" className="text-lg font-semibold">
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
                  className="h-12 text-base"
                />
                {errors.quantity && (
                  <p className="text-red-500 text-sm">{errors.quantity.message as string}</p>
                )}
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label htmlFor="image" className="text-lg font-semibold">
                Phone Image*
              </Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <Input
                  id="image"
                  type="file"
                  {...register("image", { required: "Image is required" })}
                  className="hidden"
                />
                <Label
                  htmlFor="image"
                  className="cursor-pointer bg-secondary text-primary px-4 py-2 rounded-md hover:bg-secondary/90 transition-colors"
                >
                  Choose Image
                </Label>
                <p className="text-sm text-gray-500 mt-2">
                  PNG, JPG, JPEG up to 10MB
                </p>
              </div>
              {errors.image && (
                <p className="text-red-500 text-sm">{errors.image.message as string}</p>
              )}
            </div>

            {/* Stock Status & Discount */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Label className="text-lg font-semibold">Stock Status*</Label>
                <div className="flex items-center space-x-3 p-4 border rounded-lg">
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
                      />
                    )}
                  />
                  <Label htmlFor="inStock" className="text-base cursor-pointer">
                    Currently in stock
                  </Label>
                </div>
                {errors.inStock && (
                  <p className="text-red-500 text-sm">{errors.inStock.message as string}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="discount" className="text-lg font-semibold">
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
                  className="h-12 text-base"
                />
                {errors.discount && (
                  <p className="text-red-500 text-sm">{errors.discount.message as string}</p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-lg font-semibold">
                Description*
              </Label>
              <Textarea
                id="description"
                {...register("description", { required: "Description is required" })}
                placeholder="Describe the phone features, specifications, and key selling points..."
                className="min-h-32 text-base resize-vertical"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description.message as string}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="text-center pt-4">
              <Button 
                type="submit" 
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg font-semibold h-14 w-full md:w-64"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Adding Phone...
                  </div>
                ) : (
                  <div className="flex items-center">
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