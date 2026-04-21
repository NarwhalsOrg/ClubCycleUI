import React, { useState, useEffect } from "react";
import { Users, ShieldCheck, Server, Database, CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent, Badge } from "../components/ui";
import api from "../../lib/api";
import { useAuth } from "../contexts/AuthContext";

export function Dashboard() {
  const { user } = useAuth();
  const [health, setHealth] = useState<string | null>(null);
  const [stats, setStats] = useState({
    userCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const healthRes = await api.get("/");
        setHealth(healthRes.data);

        if (user?.roles?.includes('ADMIN')) {
          const usersRes = await api.get("/users/all");
          setStats({
            userCount: usersRes.data.length,
          });
        }
      } catch (error) {
        setHealth("Backend connection failed");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  const isHealthy = health?.includes("OK");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Welcome, {user?.username}!</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">System overview and statistics.</p>
        </div>
        <Badge variant={isHealthy ? "secondary" : "destructive"} className="px-3 py-1">
          {isHealthy ? <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-500" /> : <XCircle className="w-3 h-3 mr-1" />}
          System: {isHealthy ? "Online" : "Offline"}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Total Users</p>
              <p className="text-2xl font-bold">{loading ? "..." : stats.userCount}</p>
            </div>
            <Users className="h-6 w-6 text-indigo-600" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Your Role</p>
              <p className="text-lg font-bold">{user?.roles?.[0] || 'Member'}</p>
            </div>
            <ShieldCheck className="h-6 w-6 text-emerald-600" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Server Status</p>
              <p className="text-sm font-bold text-emerald-600">Operational</p>
            </div>
            <Server className="h-6 w-6 text-blue-600" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Database</p>
              <p className="text-sm font-bold text-emerald-600">Connected</p>
            </div>
            <Database className="h-6 w-6 text-purple-600" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">System Health Output</h3>
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border text-xs font-mono">
            {loading ? "Loading..." : (health || "No data available")}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
