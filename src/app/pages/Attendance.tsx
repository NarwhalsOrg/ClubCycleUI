import React, { useState } from "react";
import { Search, CheckCircle2, XCircle } from "lucide-react";
import { Card, Button, Input, Table, TableHeader, TableRow, TableHead, TableBody, TableCell, Avatar, Badge } from "../components/ui";

export function Attendance() {
  const [participants, setParticipants] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Attendance Tracking</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Scan QR codes or mark attendance manually.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export CSV</Button>
          <Button onClick={() => {}}>Mark Attendance</Button>
        </div>
      </div>

      <Card>
        <div className="p-5 border-b flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/20">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search participants..." 
              className="pl-9" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        {loading ? (
          <p className="text-center py-10">Loading...</p>
        ) : participants.length === 0 ? (
          <div className="p-12 text-center">
            <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">No data available</h3>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Participant</TableHead>
                <TableHead>Time Scanned</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {participants.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar fallback={p.name[0]} className="h-8 w-8 text-xs" />
                      <div>
                        <div className="font-medium text-sm">{p.name}</div>
                        <div className="text-xs text-slate-500">{p.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-slate-500">{p.time}</TableCell>
                  <TableCell>
                    {p.status === "Present" ? (
                      <Badge variant="success">
                        <CheckCircle2 className="w-3 h-3 mr-1" /> Present
                      </Badge>
                    ) : (
                      <Badge variant="outline">
                        <XCircle className="w-3 h-3 mr-1" /> Absent
                      </Badge>
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
