import React from "react";
import { Mail, Briefcase, MapPin, Calendar } from "lucide-react";
import { Card, CardContent, Button, Avatar } from "../components/ui";
import { useAuth } from "../contexts/AuthContext";

export function Profile() {
  const { user } = useAuth();
  const userRole = user?.roles?.[0] || "Member";

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="h-32 w-32 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border-4 border-white shadow-sm overflow-hidden">
          <Avatar className="h-full w-full" fallback={user?.username?.[0]?.toUpperCase() || "U"} />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">{user?.username || 'User'}</h1>
          <p className="text-slate-500 font-medium">{userRole}</p>
          <div className="flex gap-2 mt-4 justify-center sm:justify-start">
            <Button variant="outline">Edit Profile</Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2">Information</h3>
            <div className="flex items-center text-sm text-slate-600">
              <Mail className="h-4 w-4 mr-3" />
              {user?.email || 'N/A'}
            </div>
            <div className="flex items-center text-sm text-slate-600">
              <Briefcase className="h-4 w-4 mr-3" />
              {userRole}
            </div>
            <div className="flex items-center text-sm text-slate-600">
              <MapPin className="h-4 w-4 mr-3" />
              Campus Location
            </div>
            <div className="flex items-center text-sm text-slate-600">
              <Calendar className="h-4 w-4 mr-3" />
              Member Since 2026
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg border-b pb-2">Clubs & Activity</h3>
            <p className="text-sm text-slate-500 mt-4 italic text-center">No activity to display.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
