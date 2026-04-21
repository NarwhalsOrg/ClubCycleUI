import React, { useState, useEffect } from "react";
import { User, Lock, Moon, Sun, Save } from "lucide-react";
import { Card, CardContent, Button, Input } from "../components/ui";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import api from "../../lib/api";
import { toast } from "sonner";

export function Settings() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const { theme, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        username: user.username,
        email: user.email,
      }));
    }
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;
    
    setLoading(true);
    try {
      await api.put(`/users/${user.id}`, formData);
      toast.success("Profile updated successfully");
      window.location.reload(); 
    } catch (error: any) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Settings</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Manage your account and preferences.</p>
      </div>

      <div className="flex gap-4 border-b pb-2">
        {['profile', 'security', 'theme'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium capitalize ${activeTab === tab ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-slate-500'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {activeTab === 'profile' && (
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-lg">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Username</label>
                  <Input value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <Input value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} type="email" required />
                </div>
                <div className="space-y-2 pt-4 border-t">
                  <label className="text-sm font-medium">Confirm Password to Save</label>
                  <Input type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required />
                </div>
                <Button type="submit" disabled={loading}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {activeTab === 'security' && (
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4 max-w-lg">
                <h3 className="text-lg font-medium">Security Settings</h3>
                <p className="text-sm text-slate-500">Manage your password and account security here.</p>
                <Button variant="outline">Update Password</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'theme' && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Appearance</h3>
              <div className="flex items-center gap-4">
                <Button variant={theme === 'light' ? 'default' : 'outline'} onClick={() => theme !== 'light' && toggleTheme()}>
                  <Sun className="h-4 w-4 mr-2" /> Light
                </Button>
                <Button variant={theme === 'dark' ? 'default' : 'outline'} onClick={() => theme !== 'dark' && toggleTheme()}>
                  <Moon className="h-4 w-4 mr-2" /> Dark
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
