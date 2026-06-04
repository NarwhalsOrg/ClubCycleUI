import React, { useState, useEffect } from "react";
import { Plus, Search, MoreHorizontal, Shield, User as UserIcon } from "lucide-react";
import { toast } from "sonner";
import api from "../../lib/api";
import { useAuth } from "../contexts/AuthContext";
import { Card, Button, Input, Table, TableHeader, TableRow, TableHead, TableBody, TableCell, Avatar, Badge, Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../components/ui";

export function Members() {
  const { user: currentUser, isAdmin } = useAuth();
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMember, setNewMember] = useState({
    username: "",
    email: "",
    password: "",
    role: "USER"
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await api.get("/users/all");
      setMembers(response.data);
    } catch (error) {
      toast.error("Failed to load members");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      setLoading(true);
      await api.post(`/roles/assign?userId=${userId}&roleEnum=${newRole}`);
      toast.success("Role updated successfully");
      fetchMembers();
    } catch (error: any) {
      toast.error("Failed to update role", {
        description: error.response?.data?.message || "Something went wrong"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = async () => {
    if (!newMember.username || !newMember.email || !newMember.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      await api.post("/users/create", newMember);
      toast.success("Member added successfully");
      setIsAddDialogOpen(false);
      setNewMember({ username: "", email: "", password: "", role: "USER" });
      fetchMembers();
    } catch (error: any) {
      toast.error("Failed to add member", {
        description: error.response?.data?.message || "Something went wrong"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Member</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Username</label>
              <Input 
                placeholder="johndoe" 
                value={newMember.username}
                onChange={(e) => setNewMember({ ...newMember, username: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input 
                type="email" 
                placeholder="john@example.com" 
                value={newMember.email}
                onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <Input 
                type="password" 
                placeholder="••••••••" 
                value={newMember.password}
                onChange={(e) => setNewMember({ ...newMember, password: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Initial Role</label>
              <select 
                className="h-10 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-transparent dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={newMember.role}
                onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
              >
                <option value="USER">Member</option>
                <option value="CLUB_ADMIN">Club Admin</option>
                <option value="TEAM">Team Manager</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddMember} disabled={loading}>
              {loading ? "Creating..." : "Create Member"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Members Directory</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">View and manage all system users and their roles.</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Member
        </Button>
      </div>

      <div className="relative w-full sm:max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input 
          placeholder="Search members..." 
          className="pl-9" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Card>
        {loading ? (
          <p className="text-center py-10">Loading...</p>
        ) : members.length === 0 ? (
          <div className="p-12 text-center">
            <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">No data available</h3>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Roles</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar fallback={(member.username)[0]} className="h-8 w-8 text-xs" />
                      <div className="font-medium">{member.username}</div>
                    </div>
                  </TableCell>
                  <TableCell>{member.username}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {member.roles?.map((role: string) => (
                        <Badge key={role} variant="secondary" className="text-[10px]">{role}</Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {isAdmin && member.email !== currentUser?.email ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuLabel>Manage Role</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleRoleChange(member.id, "ADMIN")}>
                            <Shield className="mr-2 h-4 w-4 text-indigo-600" />
                            Make Admin
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleRoleChange(member.id, "CLUB_ADMIN")}>
                            <Shield className="mr-2 h-4 w-4 text-emerald-600" />
                            Make Club Admin
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleRoleChange(member.id, "TEAM")}>
                            <Shield className="mr-2 h-4 w-4 text-blue-600" />
                            Make Team Manager
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleRoleChange(member.id, "USER")}>
                            <UserIcon className="mr-2 h-4 w-4 text-slate-600" />
                            Make Member (Basic)
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      <Button variant="ghost" size="icon" disabled>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
}
