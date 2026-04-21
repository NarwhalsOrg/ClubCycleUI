import React, { useState } from "react";
import { Download, Search, Check, AlertCircle } from "lucide-react";
import { Card, CardContent, Button, Input, Table, TableHeader, TableRow, TableHead, TableBody, TableCell, Badge } from "../components/ui";

export function Payments() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Payments</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Track membership dues and event ticket sales.</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Receipts
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm font-medium text-slate-500 uppercase">Total Collected</p>
            <p className="text-2xl font-bold mt-2">$0.00</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm font-medium text-slate-500 uppercase">Pending Dues</p>
            <p className="text-2xl font-bold mt-2 text-amber-600">$0.00</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm font-medium text-slate-500 uppercase">Transactions</p>
            <p className="text-2xl font-bold mt-2">0</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <div className="p-5 border-b flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/20">
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search transactions..." 
              className="pl-9" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <p className="text-center py-10">Loading...</p>
        ) : payments.length === 0 ? (
          <div className="p-12 text-center">
            <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">No data available</h3>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Member</TableHead>
                <TableHead>Event / Item</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((txn) => (
                <TableRow key={txn.id}>
                  <TableCell className="font-mono text-xs">{txn.id}</TableCell>
                  <TableCell className="font-medium">{txn.member}</TableCell>
                  <TableCell>{txn.event}</TableCell>
                  <TableCell className="font-medium">{txn.amount}</TableCell>
                  <TableCell>
                    <Badge variant={txn.status === "Paid" ? "success" : "default"}>
                      {txn.status === "Paid" ? <Check className="w-3 h-3 mr-1" /> : <AlertCircle className="w-3 h-3 mr-1" />}
                      {txn.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Details</Button>
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
