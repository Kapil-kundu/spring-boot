import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil, Save, X } from "lucide-react";
import useAuth from "@/auth/store";
import { motion } from "framer-motion";
import type User from "@/models/User";
import { NavLink } from "react-router";

function Userprofile() {

  // user from auth store (zustand / context)
  const user = useAuth((state) => state.user) as User | null;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<User | null>(null);

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  if (!user || !formData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Loading profile...
      </div>
    );
  }

  const handleChange = (key: keyof User, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSave = async () => {
    // TODO: call update profile API here
    // await updateProfile(formData)

    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-muted flex justify-center p-6">
      <Card className="w-full max-w-xl rounded-2xl shadow-md">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.image} />
            <AvatarFallback>{user.name?.charAt(0) ?? "U"}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-2xl">My Profile</CardTitle>
            <p className="text-sm text-muted-foreground">View and edit your personal information</p>
          </div>
          {!isEditing && (
            <Button size="icon" variant="outline" onClick={() => setIsEditing(true)}>
              <Pencil className="h-4 w-4" />
            </Button>
          )}
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Name */}
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              value={formData.name ?? ""}
              disabled={!isEditing}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label>Email</Label>
            <Input value={user.email} disabled />
          </div>

          {/* Provider */}
          <div className="space-y-2">
            <Label>Login Provider</Label>
            <Input value={user.provider} disabled />
          </div>

          {/* Enabled */}
          <div className="flex items-center justify-between">
            <Label>Account Enabled</Label>
            <Switch
              checked={formData.enabled}
              disabled={!isEditing}
              onCheckedChange={(val) => handleChange("enabled", val)}
            />
          </div>

          {/* Meta info */}
          <div className="text-xs text-muted-foreground space-y-1">
            <p>User ID: {user.id}</p>
            <p>Created At: {user.createAt}</p>
            <p>Last Updated: {user.updatedAt}</p>
          </div>

          {/* Actions */}
          {isEditing && (
            <div className="flex gap-3 pt-4">
              <Button className="flex-1" onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" /> Save
              </Button>
              <Button variant="outline" className="flex-1" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" /> Cancel
              </Button>
            </div>
          )}
        </CardContent>
        <div className =" flex justify-center p-4 pt-0">
          <Button >
            <NavLink className="flex items-center justify-center h-16" to="/dashboard">Save</NavLink>
          </Button>
        </div>
      </Card>
    </div>
  );
  
    
}

export default Userprofile;