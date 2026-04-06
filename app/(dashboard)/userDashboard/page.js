import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, FileText, TrendingUp, Zap } from "lucide-react";
import Link from "next/link";

export default function UserDashboard() {
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, Scholar</h1>
          <p className="text-muted-foreground">Here’s how your exam prep is looking today.</p>
        </div>
        <Link href="/dashboard/analyze">
          <Button className="rounded-full px-6 shadow-lg bg-black hover:bg-zinc-800">
            <Zap className="mr-2 h-4 w-4 fill-current" />
            Analyze New Paper
          </Button>
        </Link>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm border-zinc-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium uppercase tracking-wider text-zinc-500">Papers Graded</CardTitle>
            <FileText className="h-4 w-4 text-zinc-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-zinc-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium uppercase tracking-wider text-zinc-500">Avg. Accuracy</CardTitle>
            <Brain className="h-4 w-4 text-zinc-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">76%</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-zinc-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium uppercase tracking-wider text-zinc-500">Study Streak</CardTitle>
            <TrendingUp className="h-4 w-4 text-zinc-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5 Days</div>
          </CardContent>
        </Card>
        {/* Placeholder for "Credits" - our revenue model */}
        <Card className="shadow-sm border-zinc-200 bg-zinc-50/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium uppercase tracking-wider text-zinc-500">Credits Left</CardTitle>
            <Zap className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Layout */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 shadow-sm">
          <CardHeader>
            <CardTitle>Recent Analysis</CardTitle>
            <CardDescription>Your last 5 papers and their AI insights.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center border-2 border-dashed rounded-lg text-muted-foreground">
              {/* Future: Map through latest from Neon Metadata */}
              No papers analyzed yet.
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3 shadow-sm">
          <CardHeader>
            <CardTitle>Top Weaknesses</CardTitle>
            <CardDescription>AI-identified topics needing focus.</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-red-50 text-red-600 rounded-lg font-bold text-xs">HIGH</div>
                  <p className="text-sm font-medium">Calculus: Chain Rule</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-orange-50 text-orange-600 rounded-lg font-bold text-xs">MED</div>
                  <p className="text-sm font-medium">Organic Chemistry: Bonding</p>
                </div>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
