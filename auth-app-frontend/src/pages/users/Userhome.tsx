import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Activity, DollarSign, Bell } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import useAuth from "@/auth/store";
import { getCurrentUser } from "@/services/AuthService";
import type UserT from "@/models/User"
import toast from "react-hot-toast";

function Userhome() {

    const user = useAuth(state => state.user)
    const [user1, setUser1] = useState<UserT | null>(null)

    const getUserData = async() => {
      try {

          const user1 =  await getCurrentUser(user?.email);
          setUser1(user1);
          toast.success("You are able to access secured apis")


      } catch (error) {
          console.log(error)
          toast.error("error in getting data")
      }
    }


  return (
    <div className="p-6 space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-semibold"
      >
        Dashboard Overview
      </motion.h1>

      
      {/* Other Dummy Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-2">Recent Activity</h2>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>User John signed up</li>
              <li>Password changed successfully</li>
              <li>New login from Chrome</li>
              <li>Profile updated</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-2">System Status</h2>
            <p className="text-sm text-muted-foreground">
              All systems are running normally. This section is for dummy
              informational content on the dashboard home page.
            </p>
          </CardContent>
        </Card>

        <div className="text-center">
          
          <Button onClick={getUserData} className="rounded-2xl px-8 text-lg">Get Current User</Button>

          <p>{user1?.name}</p>
        </div>
      </div>
    </div>
  );
}

export default Userhome;