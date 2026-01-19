import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Github, Mail, Lock, User } from "lucide-react";
import React, { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import type RegisterData from "@/models/RegisterData"; 
import { registerUser } from "@/services/AuthService";
export default function Signup() {

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  }); 

  const [loading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);


  //text input, email password , number, textarea
  // this function handles input changes for all fields
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    //console.log(event.target.name, event.target.value);
    setData((value) => ({
      ...value,
      [event.target.name]: event.target.value,
    }));
  };


  // handle form submission
  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(data);

    // validations

    if(data.name.trim() === "") {
      toast.error("Name is required");
      return;
    }

    if(data.email.trim() === "") {
      toast.error("Email is required");
      return;
    }

    if(data.password.trim() === "") {
      toast.error("Password is required");
      return;
    }

    //form submit for registration
    try {
      const result = await registerUser(data);
      console.log(result);
      toast.success("Registration successful! Please login.");
    } catch (error: any) {
      console.error( error);
      toast.error("Error in registering the user");
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/40 to-background px-4">
      <Card className="w-full max-w-md border-border bg-card/80 backdrop-blur-xl shadow-xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold tracking-tight">
            Create your account
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Get started with secure, modern authentication
          </p>
        </CardHeader>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          {/* NAME */}
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                className="pl-10"
                name="name"
                value={data.name}
                onChange={handleInputChange}
              />
            </div>
          </div>

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
                name="email"
                value={data.email}
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
                name="password"
                value={data.password}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* SIGN UP BUTTON */}
          <Button className="w-full">Create Account</Button>

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

          {/* SOCIAL SIGNUP */}
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="gap-2">
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M21.35 11.1h-9.18v2.93h5.27c-.23 1.25-.91 2.31-1.93 3.02v2.5h3.12c1.82-1.67 2.72-4.13 2.72-6.99 0-.65-.07-1.28-.2-1.88z" />
                <path d="M12.17 21c2.61 0 4.8-.86 6.4-2.33l-3.12-2.5c-.87.58-1.98.92-3.28.92-2.52 0-4.66-1.7-5.42-3.99H3.52v2.51C5.1 18.98 8.4 21 12.17 21z" />
                <path d="M6.75 13.1a5.86 5.86 0 0 1 0-3.7V6.89H3.52a9.99 9.99 0 0 0 0 8.22l3.23-2.01z" />
                <path d="M12.17 5.83c1.42 0 2.69.49 3.69 1.45l2.77-2.77C16.96 2.7 14.78 2 12.17 2 8.4 2 5.1 4.02 3.52 6.89l3.23 2.51c.76-2.29 2.9-3.57 5.42-3.57z" />
              </svg>
              Google
            </Button>

            <Button variant="outline" className="gap-2">
              <Github className="h-4 w-4" />
              GitHub
            </Button>
          </div>

          {/* FOOTER TEXT */}
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <span className="text-primary cursor-pointer hover:underline">
              Sign in
            </span>
          </p>
        </form>
      </Card>
    </div>
  );
}
