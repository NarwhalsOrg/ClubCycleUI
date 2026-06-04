import React, { useState, useEffect } from "react";
import { Plus, Search, MoreHorizontal, Info } from "lucide-react";
import { toast } from "sonner";
import api from "../../lib/api";
import { Card, Button, Input, Table, TableHeader, TableRow, TableHead, TableBody, TableCell, Badge, Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, Textarea } from "../components/ui";

export function Events() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    location: "",
    eventDate: "", // YYYY-MM-DD
    startTime: "", // HH:mm:ss
    endTime: "",   // HH:mm:ss
    capacity: 1,
    status: "PLANNED", // Default status
    club: "" // Optional: to be selected from clubs list
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await api.get("/events");
      setEvents(response.data);
    } catch (error) {
      toast.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = async () => {
    if (!newEvent.title || !newEvent.location || !newEvent.eventDate || !newEvent.startTime || !newEvent.endTime || !newEvent.capacity) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      await api.post("/events", newEvent);
      toast.success("Event scheduled successfully");
      setIsCreateModalOpen(false);
      setNewEvent({
        title: "",
        description: "",
        location: "",
        eventDate: "",
        startTime: "",
        endTime: "",
        capacity: 1,
        status: "PLANNED",
        club: ""
      });
      fetchEvents();
    } catch (error: any) {
      toast.error("Failed to schedule event", {
        description: error.response?.data?.message || "Something went wrong"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule New Event</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Event Title</label>
              <Input 
                placeholder="e.g. Annual Tech Conference" 
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea 
                placeholder="Briefly describe the event..." 
                className="min-h-[100px]"
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Input 
                placeholder="e.g. Main Auditorium" 
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Input 
                  type="date" 
                  value={newEvent.eventDate}
                  onChange={(e) => setNewEvent({ ...newEvent, eventDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Capacity</label>
                <Input 
                  type="number" 
                  min="1"
                  value={newEvent.capacity}
                  onChange={(e) => setNewEvent({ ...newEvent, capacity: parseInt(e.target.value) || 1 })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Start Time</label>
                <Input 
                  type="time" 
                  step="1" // Enables seconds input for HH:mm:ss format
                  value={newEvent.startTime}
                  onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value + ":00" })} // Append seconds
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">End Time</label>
                <Input 
                  type="time" 
                  step="1" // Enables seconds input for HH:mm:ss format
                  value={newEvent.endTime}
                  onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value + ":00" })} // Append seconds
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateEvent} disabled={loading}>
              {loading ? "Scheduling..." : "Schedule Event"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Events</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Manage all upcoming and past events.</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Schedule New Event
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search events by title, location..." 
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Card>
        {loading && events.length === 0 ? (
          <p className="text-center py-10 text-slate-500">Loading events...</p>
        ) : filteredEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Info className="h-10 w-10 text-slate-300 mb-2" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1">No events found</h3>
            <p className="text-sm text-slate-500">Try adjusting your search or schedule a new event.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event Title</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-bold text-slate-900 dark:text-slate-100">{event.title}</TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>{event.eventDate}</TableCell>
                  <TableCell>{`${event.startTime} - ${event.endTime}`}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        event.status === "PLANNED" ? "info" : 
                        event.status === "COMPLETED" ? "success" : 
                        "default"
                      }
                    >
                      {event.status}
                    </Badge>
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
