import useAuth from "@/auth/store";
import OAuth2Buttons from "@/components/OAuth2Buttons";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import type LoginData from "@/models/LoginData";
import { loginUser } from "@/services/AuthService";
import { set } from "date-fns";
import { Github, Mail, Lock, Chrome, CheckCircle2Icon } from "lucide-react";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router";
export default function Login() {
  const [loginData, setLoginData] = useState<LoginData> ({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const navigate = useNavigate();
  const login = useAuth((state )=> state.login);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = async(event: FormEvent) => {
    event.preventDefault();
    

    //validations
    if(loginData.email.trim() === "") {
      toast.error("Email is required");
      return;
    }
    if(loginData.password.trim() === "") {
      toast.error("Password is required");
      return;
    }

    // console.log(event.target);
    // console.log(loginData);
    
    //server call for login
    try {
      setLoading(true);
      // const userInfo = await loginUser(loginData);


      //login function : useAuth
      
      await login(loginData);

      // console.log(userInfo);


      toast.success("Login successful");
      navigate("/dashboard");

      // save the current user logged in information in local storage

      
    } catch (error:any) {
      console.error("Login failed:", error);
      setError(error);
      toast.error("Login failed. Please check your credentials.");
      if(error?.status === 400) {
        setError(error)
      } else {
          setError(error)

      } 
    } finally {
        setLoading(false);
      }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/40 to-background px-4">
      <Card className="w-full max-w-md border-border bg-card/80 backdrop-blur-xl shadow-xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold tracking-tight">
            Welcome Back
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Sign in to continue to your secure dashboard
          </p>
        </CardHeader>

        {/* Error section*/}

       {
        error && (
          <div className="mt-6">
            <Alert variant={"destructive"}>
              <CheckCircle2Icon />
                <AlertTitle>{
                  error?.response? error.response.data?.message: error.message
                }</AlertTitle>
              
            </Alert>

          </div>
       )}


        <form onSubmit={handleFormSubmit} className="space-y-6">
          {/* EMAIL */}
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="pl-10"
                name = "email"
                value={loginData.email}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="pl-10"
                name = "password"
                value={loginData.password}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* LOGIN BUTTON */}
          <Button disabled={loading} className="w-full cursor-pointer">
            {loading ? <><Spinner />Please wait...</> : "Login"}
           
          </Button>

          {/* DIVIDER */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

        <OAuth2Buttons />
          

          {/* FOOTER TEXT */}
          <p className="text-center text-sm text-muted-foreground">
            Don’t have an account?{' '}
            <span className="text-primary cursor-pointer hover:underline">
                <Link to="/signup">Sign up</Link>
        
            </span>
          </p>
        </form>
      </Card>
    </div>
  );
}
