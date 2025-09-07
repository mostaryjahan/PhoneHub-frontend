import { Link, useNavigate } from "react-router-dom";
import { useForm, FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useRegisterMutation } from "@/redux/features/auth/authApi";

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
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Register</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-red-500 text-sm">Name is required</span>
              )}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">Email is required</span>
              )}
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                {...register("password", { required: true, minLength: 6 })}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  Password must be at least 6 characters
                </span>
              )}
            </div>
            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>
          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link className="text-blue-500" to="/login">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
