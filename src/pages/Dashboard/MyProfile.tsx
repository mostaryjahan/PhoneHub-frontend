import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState, useRef, useEffect } from "react";
import {
  Loader2,
  User,
  Mail,
  MapPin,
  Shield,
  Camera,
  Calendar,
  CheckCircle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAppSelector } from "@/redux/features/hook";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import {
  useGetSingleUserQuery,
  useUpdateProfileMutation,
  useUpdateUserProfilePhotoMutation,
} from "@/redux/features/User/userManagementApi";
import { imageUpload } from "@/utils/imageUpload";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  status: z.string().min(1, "Status is required"),
  shippingAddress: z.string().min(10, "Address must be at least 10 characters"),
  photo: z.string().optional(),
});

type UserFormData = z.infer<typeof userSchema>;

export const UserProfilePage = () => {
  const userInfo = useAppSelector(selectCurrentUser);
  const email = userInfo?.email;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: userData, isLoading: isFetching, refetch } = useGetSingleUserQuery(
    email,
    {
      skip: !email,
    }
  );

  const user = userData?.data;
  const [previewImage, setPreviewImage] = useState<string | null>(user?.photo);
  const [updateUserProfile, { isLoading: isUpdatingProfile }] =
    useUpdateProfileMutation();
  const [updateUserPhoto, { isLoading: isUpdatingPhoto }] =
    useUpdateUserProfilePhotoMutation();

  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    mode: "onBlur",
    defaultValues: {
      name: user?.name || "",
      photo: user?.photo || "",
      status: user?.status || "",
      shippingAddress: user?.shippingAddress || "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name,
        photo: user.photo,
        status: user.status,
        shippingAddress: user.shippingAddress,
      });
      setPreviewImage(user.photo);
    }
  }, [user, form]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.includes("image"))
      return toast.error("Please upload an image file");
    if (file.size > 5 * 1024 * 1024) return toast.error("Max file size is 5MB");

    try {
      const image_data = await imageUpload(file);
      if (image_data.success) {
        const imageUrl = image_data.data.display_url;
        
        // Update photo using the specific photo mutation
        const res = await updateUserPhoto({
          id: user?._id,
          userData: { photo: imageUrl },
        }).unwrap();

        if (res.success) {
          form.setValue("photo", imageUrl);
          setPreviewImage(imageUrl);
          toast.success("Profile photo updated successfully!");
          refetch();
        }
      } else toast.error("Image upload failed");
    } catch (error: any) {
      toast.error(error?.data?.message || "Image upload error");
    }
  };

  const onSubmit: SubmitHandler<UserFormData> = async (data) => {
    try {
      if (user?._id) {
        const res = await updateUserProfile({
          id: user._id,
          userData: data,
        }).unwrap();

        if (res.success) {
          toast.success(res.message)
          refetch();
        };
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Update failed");
    }
  };

  if (isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-gray-500">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            My Profile
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Manage your personal information, security settings, and account
            preferences
          </p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 bg-accent/10 ">
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-accent data-[state=active]:text-white"
            >
              Profile Information
            </TabsTrigger>
            <TabsTrigger
              value="account"
              className="data-[state=active]:bg-accent data-[state=active]:text-white"
            >
              Account Details
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Profile Card */}
              <Card className="lg:col-span-1 border-0 shadow-lg rounded-2xl overflow-hidden">
                <div className="h-24 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                <CardHeader className="text-center pb-6 relative -mt-16">
                  <div className="relative inline-block mx-auto">
                    <Avatar className="w-32 h-32 mx-auto border-4 border-white shadow-lg">
                      <AvatarImage src={previewImage || ""} alt={user?.name} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white text-4xl">
                        {user?.name?.[0]?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <label
                      htmlFor="file-upload"
                      className="absolute bottom-2 right-2 bg-white text-primary p-2 rounded-full cursor-pointer hover:bg-gray-100 transition-colors shadow-md border"
                    >
                      {isUpdatingPhoto ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Camera className="w-4 h-4" />
                      )}
                      <input
                        id="file-upload"
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                      />
                    </label>
                  </div>
                  <CardTitle className="text-xl mt-4 text-gray-800">
                    {user?.name || "User"}
                  </CardTitle>
                  <CardDescription className="flex flex-col items-center space-y-2">
                    <Badge
                      variant="outline"
                      className="capitalize bg-blue-50 text-blue-700 border-blue-200"
                    >
                      {user?.role}
                    </Badge>
                    <span className="text-sm text-gray-500 flex items-center">
                      <Mail className="w-4 h-4 mr-1" /> {user?.email}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="border-t pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-full">
                          <Shield className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="text-sm font-medium">
                          Account Security
                        </span>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        Protected
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-full">
                          <CheckCircle className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="text-sm font-medium">
                          Email Verified
                        </span>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        Verified
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Form Section */}
              <Card className="lg:col-span-2 border-0 shadow-lg rounded-2xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl text-gray-800">
                    Personal Information
                  </CardTitle>
                  <CardDescription>
                    Update your personal details and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center text-gray-700">
                                <User className="w-4 h-4 mr-2 text-blue-500" />
                                Full Name*
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Enter your full name"
                                  className="rounded-lg"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="status"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700">
                                Account Status*
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value || ""}
                              >
                                <FormControl>
                                  <SelectTrigger className="rounded-lg">
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem
                                    value="active"
                                    className="flex items-center"
                                  >
                                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                                    Active
                                  </SelectItem>
                                  <SelectItem
                                    value="inactive"
                                    className="flex items-center"
                                  >
                                    <div className="w-2 h-2 rounded-full bg-gray-500 mr-2"></div>
                                    Inactive
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="shippingAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center text-gray-700">
                              <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                              Shipping Address*
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                placeholder="Enter your complete shipping address"
                                className="min-h-[120px] resize-vertical rounded-lg"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex justify-end space-x-4 pt-4 border-t">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => form.reset()}
                          disabled={isUpdatingProfile}
                          className="rounded-lg"
                        >
                          Reset
                        </Button>
                        <Button
                          type="submit"
                          disabled={isUpdatingProfile}
                          className="min-w-[120px] rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                        >
                          {isUpdatingProfile ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Updating...
                            </>
                          ) : (
                            "Update Profile"
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="account">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Account Details Card */}
              <Card className="border-0 shadow-lg rounded-2xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl text-gray-800">
                    Account Information
                  </CardTitle>
                  <CardDescription>
                    Your account details and membership
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <Mail className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Email Address
                        </p>
                        <p className="text-lg font-semibold text-gray-800">
                          {user?.email || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <Shield className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Account Role
                        </p>
                        <Badge
                          variant="outline"
                          className="text-lg capitalize bg-blue-50 text-blue-700 border-blue-200 mt-1"
                        >
                          {user?.role}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <Calendar className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Member Since
                        </p>
                        <p className="text-lg font-semibold text-gray-800">
                          {new Date().toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <CheckCircle className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Account Status
                        </p>
                        <Badge
                          variant={
                            user?.status === "active" ? "default" : "secondary"
                          }
                          className="text-lg capitalize mt-1 bg-green-100 text-green-800 hover:bg-green-100"
                        >
                          {user?.status || "N/A"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Account Progress Card */}
              <Card className="border-0 shadow-lg rounded-2xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl text-gray-800">
                    Profile Completion
                  </CardTitle>
                  <CardDescription>
                    Your profile is 85% complete
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Progress value={85} className="h-2" />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        Personal Information
                      </span>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        Profile Photo
                      </span>
                      {previewImage ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <span className="text-xs text-amber-500">Pending</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        Shipping Address
                      </span>
                      {user?.shippingAddress ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <span className="text-xs text-amber-500">
                          Incomplete
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        Account Verification
                      </span>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Security Tips
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 mr-2"></div>
                        <span>Use a strong, unique password</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 mr-2"></div>
                        <span>Enable two-factor authentication</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 mr-2"></div>
                        <span>Update your information regularly</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfilePage;
