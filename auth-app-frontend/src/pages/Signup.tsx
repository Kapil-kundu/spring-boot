import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Github, Mail, Lock, User } from "lucide-react";
import React, { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import type RegisterData from "../models/RegisterData";
import { registerUser } from "../services/AuthService";
import { Link, useNavigate } from "react-router";
import OAuth2Buttons from "@/components/OAuth2Buttons";
export default function Signup() {

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  }); 

  const [loading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
   


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
      setData({
        name: "",
        email: "",
        password: "",
      }); 
      navigate("/login");
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

          {/* Special SIgn ups */}

          <OAuth2Buttons />

          {/* FOOTER TEXT */}
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <span className="text-primary cursor-pointer hover:underline">
                <Link to="/login">Sign in</Link>
            </span>
          </p>
        </form>
      </Card>
    </div>
  );
}
