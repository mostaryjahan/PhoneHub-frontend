import { Link, useNavigate } from "react-router-dom";
import { useForm, FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { Home } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [registerUser] = useRegisterMutation();

  const onSubmit = async (data: FieldValues) => {
    try {
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      }).unwrap();

      toast.success("Account created successfully");
      navigate("/login");
    } catch (err) {
      toast.error("Registration failed");
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decorative elements - matching the login page */}
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
          <CardTitle className="text-3xl font-bold text-gray-800">Create Account</CardTitle>
          <p className="text-gray-500 text-sm">Join us to start shopping</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</Label>
              <Input
                type="text"
                id="name"
                className="py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full name"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-red-500 text-xs">Name is required</span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
              <Input
                type="email"
                id="email"
                className="py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-500 text-xs">Email is required</span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
              <Input
                type="password"
                id="password"
                className="py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Create a password (min. 6 characters)"
                {...register("password", { required: true, minLength: 6 })}
              />
              {errors.password && (
                <span className="text-red-500 text-xs">
                  Password must be at least 6 characters
                </span>
              )}
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 py-2 text-white font-medium rounded-lg transition-all duration-300"
            >
              Create Account
            </Button>
          </form>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-background px-2 text-muted-foreground">
                Already have an account?
              </span>
            </div>
          </div>
          <div className="text-center">
            <Link 
              className="text-blue-600 font-medium hover:text-blue-800 transition-colors inline-flex items-center" 
              to="/login"
            >
              Sign in to your account
            </Link>
          </div>
        </CardContent>
      </Card>
      
      {/* Footer */}
      <p className="mt-8 text-xs text-gray-500 text-center max-w-md">
        By creating an account, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
};

export default Register;