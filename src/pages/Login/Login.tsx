import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/features/hook";
import { verifyToken } from "@/utils/verifyToken";
import { Label } from "@radix-ui/react-label";
import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Home } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user, token: res.data.accessToken }));
      toast.success("Login Successfully");
      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const handleAdminClick = () => {
    setValue("email", "admin@gmail.com");
    setValue("password", "12345678");
  };

  const handleVendorClick = () => {
    setValue("email", "vendor@gmail.com");
    setValue("password", "12345678");
  };
  const handleUserClick = () => {
    setValue("email", "user@gmail.com");
    setValue("password", "12345678");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-r from-blue-500/10 to-indigo-500/10"></div>
    

      {/* Home link */}
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors z-10"
      >
        <Home size={20} className="mr-2" />
        <span>Back to Home</span>
      </Link>

      <Card className="w-full max-w-md shadow-xl rounded-xl border-0 backdrop-blur-sm bg-white/90 relative z-1">
        <CardHeader className="text-center space-y-2 pb-4">
          <CardTitle className="text-3xl font-bold text-gray-800">
            Welcome Back
          </CardTitle>
          <p className="text-gray-500 text-sm">
            Sign in to your account to continue
          </p>
        </CardHeader>

        <div className="flex justify-around mb-4 px-6">
          <Button
            onClick={handleAdminClick}
            variant="outline"
            className="text-xs py-1 px-2 border-blue-300 text-blue-600 hover:bg-blue-50"
          >
            Admin
          </Button>
          <Button
            onClick={handleVendorClick}
            variant="outline"
            className="text-xs py-1 px-2 border-purple-300 text-purple-600 hover:bg-purple-50"
          >
            Vendor
          </Button>
          <Button
            onClick={handleUserClick}
            variant="outline"
            className="text-xs py-1 px-2 border-green-300 text-green-600 hover:bg-green-50"
          >
            User
          </Button>
        </div>

        <CardContent className="pt-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </Label>
              <Input
                type="email"
                id="email"
                className="py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-500 text-xs">Email is required</span>
              )}
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </Label>
              <Input
                type="password"
                id="password"
                className="py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-red-500 text-xs">
                  Password is required
                </span>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 py-2 text-white font-medium rounded-lg transition-all duration-300"
            >
              Sign In
            </Button>
          </form>
          <p className="text-center text-sm mt-6 text-gray-600">
            New here?{" "}
            <Link
              className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
              to="/register"
            >
              Create an account
            </Link>
          </p>
        </CardContent>
      </Card>

      {/* Footer */}
      <p className="mt-8 text-xs text-gray-500 text-center max-w-md">
        By signing in, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
};

export default Login;
