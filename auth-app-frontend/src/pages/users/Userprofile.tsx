import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Calendar, User } from "lucide-react";
import { motion } from "framer-motion";
import useAuth from '@/auth/store';


function Userprofile() {

  const user = useAuth((state) => state.user);
  
     return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-semibold"
      >
        User Profile
      </motion.h1>

      {/* Profile Header */}
      <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-6">
          <img
            src={user?.image}
            alt="Profile"
            className="w-32 h-32 rounded-full border"
          />

          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl font-bold flex items-center gap-2 justify-center sm:justify-start">
              <User className="w-5 h-5" /> {user?.name}
            </h2>
            <p className="text-sm text-muted-foreground mt-1"></p>
            <div className="mt-4 flex gap-3 justify-center sm:justify-start">
              <Button size="sm">Edit Profile</Button>
              <Button size="sm" variant="outline">Change Photo</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-muted-foreground" /> {user?.email}
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-4 h-4 text-muted-foreground" /> 
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="w-4 h-4 text-muted-foreground" /> 
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="w-4 h-4 text-muted-foreground" /> 
            </div>
          </CardContent>
        </Card>

        {/* Dummy Extra Info */}
        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-lg font-semibold">Account Details</h3>
            <p className="text-sm text-muted-foreground">
              This section contains dummy account-related information for UI
              demonstration purposes.
            </p>
            <ul className="text-sm list-disc pl-4 text-muted-foreground">
              <li>Email verified</li>
              <li>Two-factor authentication disabled</li>
              <li>Last login: 2 days ago</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Userprofile;