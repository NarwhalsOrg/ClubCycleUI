import React, { useState } from "react";
import { Award, Download, Search } from "lucide-react";
import { Card, Button, Input, Table, TableHeader, TableRow, TableHead, TableBody, TableCell, Avatar, Badge } from "../components/ui";

export function Certificates() {
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Certificates</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Issue and manage official event certificates.</p>
        </div>
        <Button onClick={() => {}}>
          <Award className="mr-2 h-4 w-4" />
          Issue Certificate
        </Button>
      </div>

      <Card>
        <div className="p-4 border-b flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/20">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search students..." 
              className="pl-9" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <p className="text-center py-10">Loading...</p>
        ) : certificates.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">No data available</h3>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {certificates.map((cert) => (
                <TableRow key={cert.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar fallback={cert.name[0]} className="h-8 w-8 text-xs" />
                      <div>
                        <div className="font-medium">{cert.name}</div>
                        <div className="text-xs text-slate-500">{cert.studentId}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{cert.event}</TableCell>
                  <TableCell>
                    <Badge variant={cert.status === "Issued" ? "success" : "default"}>
                      {cert.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4 text-slate-500" />
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
