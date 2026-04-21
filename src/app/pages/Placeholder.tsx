import React from "react";
import { useLocation } from "react-router";
import { Wrench } from "lucide-react";
import { Card, CardContent } from "../components/ui";

export function PlaceholderPage() {
  const location = useLocation();
  const pageName = location.pathname.split('/')[1] || 'Page';
  const title = pageName.charAt(0).toUpperCase() + pageName.slice(1);

  return (
    <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
      <Card className="w-full max-w-md text-center shadow-sm">
        <CardContent className="p-12 flex flex-col items-center">
          <div className="h-20 w-20 rounded-full bg-indigo-50 flex items-center justify-center mb-6">
            <Wrench className="h-10 w-10 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-2">{title} Module</h2>
          <p className="text-slate-500 mb-8">
            This module is currently under active development. Check back soon for updates to the {title.toLowerCase()} features.
          </p>
          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
            Return to Dashboard &rarr;
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
