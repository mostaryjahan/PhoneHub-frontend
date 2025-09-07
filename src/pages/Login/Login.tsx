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


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
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

    const handleAdminClick =()=>{
        setValue("email","admin@gmail.com")
        setValue("password", '12345678')
    }

     const handleVendorClick =()=>{
        setValue("email", 'vendor@gmail.com')
        setValue("password","12345678")
    }
    const handleUserClick =()=>{
        setValue("email", 'user@gmail.com')
        setValue("password","12345678")
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader>
                    <CardTitle className="text-center text-2xl">Login</CardTitle>
                </CardHeader>
               <div className="flex justify-around mb-2 px-6">
                    <Button onClick={handleAdminClick} variant="outline">Admin</Button>
                    <Button onClick={handleVendorClick} variant="outline">Vendor</Button>
                    <Button onClick={handleUserClick} variant="outline">User</Button>
               </div>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input type="email" id="email" {...register("email", { required: true })} />
                            {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
                        </div>
                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input type="password" id="password" {...register("password", { required: true })} />
                            {errors.password && <span className="text-red-500 text-sm">Password is required</span>}
                        </div>
                        <Button type="submit" className="w-full bg-blue-600">Login</Button>
                    </form>
                    <p className="text-center text-sm mt-4">
                        New here? <Link className="text-blue-500" to="/register">Register</Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;