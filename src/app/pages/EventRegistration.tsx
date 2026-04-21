import React, { useState } from "react";
import { Search, Ticket } from "lucide-react";
import { Card, Button, Input, Table, TableHeader, TableRow, TableHead, TableBody, TableCell, Badge } from "../components/ui";

export function EventRegistration() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Event Registration</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Discover and register for upcoming university events.</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input placeholder="Search events by name, club..." className="pl-9" />
        </div>
      </div>

      <Card>
        {loading ? (
          <p className="text-center py-10">Loading...</p>
        ) : events.length === 0 ? (
          <div className="p-12 text-center">
            <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">No data available</h3>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>Club</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.title}</TableCell>
                  <TableCell>{event.club}</TableCell>
                  <TableCell className="text-sm">
                    {event.date} • {event.time}
                  </TableCell>
                  <TableCell className="text-sm">
                    {event.attendees}/{event.capacity}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm">
                      <Ticket className="mr-2 h-4 w-4" />
                      Register
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
