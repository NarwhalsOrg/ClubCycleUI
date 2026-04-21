import React, { useState } from "react";
import { Bell } from "lucide-react";
import { Card, CardContent, Button, Badge } from "../components/ui";

export function Announcements() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Announcements</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Latest updates from university administration and club leaders.</p>
        </div>
        <Button onClick={() => {}}>
          <Bell className="mr-2 h-4 w-4" />
          Post Announcement
        </Button>
      </div>

      <div className="space-y-4">
        {loading ? (
          <p className="text-center py-10">Loading...</p>
        ) : announcements.length === 0 ? (
          <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed">
            <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">No data available</h3>
            <p className="text-slate-500 dark:text-slate-400 mt-2">There are no new updates or announcements at this time.</p>
          </Card>
        ) : (
          announcements.map((announcement) => (
            <Card key={announcement.id}>
              <CardContent className="p-5">
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge>{announcement.club}</Badge>
                      <span className="text-xs text-slate-500">{announcement.timestamp}</span>
                    </div>
                    <h3 className="text-lg font-semibold">{announcement.title}</h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm">{announcement.description}</p>
                    <div className="mt-4 pt-4 border-t text-sm font-medium">
                      {announcement.author} — {announcement.authorRole}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
