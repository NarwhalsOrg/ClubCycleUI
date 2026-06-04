import React, { useState, useEffect } from "react";
import { Plus, Search, MoreHorizontal, Info } from "lucide-react";
import { toast } from "sonner";
import api from "../../lib/api";
import { Card, Button, Input, Table, TableHeader, TableRow, TableHead, TableBody, TableCell, Badge, Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, Textarea } from "../components/ui";

export function Clubs() {
  const [clubs, setClubs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newClub, setNewClub] = useState({
    name: "",
    description: ""
  });

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    try {
      setLoading(true);
      const response = await api.get("/clubs");
      setClubs(response.data);
    } catch (error) {
      toast.error("Failed to load clubs");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateClub = async () => {
    if (!newClub.name) {
      toast.error("Club name is required");
      return;
    }

    try {
      setLoading(true);
      await api.post("/clubs", newClub);
      toast.success("Club created successfully");
      setIsCreateModalOpen(false);
      setNewClub({ name: "", description: "" });
      fetchClubs();
    } catch (error: any) {
      toast.error("Failed to create club", {
        description: error.response?.data?.message || "Something went wrong"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredClubs = clubs.filter(club => 
    club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    club.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Club</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Club Name</label>
              <Input 
                placeholder="e.g. Coding Club" 
                value={newClub.name}
                onChange={(e) => setNewClub({ ...newClub, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea 
                placeholder="Tell us what this club is about..." 
                className="min-h-[100px]"
                value={newClub.description}
                onChange={(e) => setNewClub({ ...newClub, description: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateClub} disabled={loading}>
              {loading ? "Creating..." : "Create Club"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Clubs</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Manage student organizations and club activity.</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create New Club
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search clubs by name, description..." 
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Card>
        {loading && clubs.length === 0 ? (
          <p className="text-center py-10 text-slate-500">Loading clubs...</p>
        ) : filteredClubs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Info className="h-10 w-10 text-slate-300 mb-2" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1">No clubs found</h3>
            <p className="text-sm text-slate-500">Try adjusting your search or create a new club.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Club Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClubs.map((club) => (
                <TableRow key={club.id}>
                  <TableCell className="font-bold text-slate-900 dark:text-slate-100">{club.name}</TableCell>
                  <TableCell className="max-w-md truncate text-slate-500 dark:text-slate-400">
                    {club.description || "No description provided"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
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
