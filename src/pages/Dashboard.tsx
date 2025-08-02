import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navbar } from "@/components/layout/Navbar";
import { 
  Plus, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  XCircle,
  TrendingUp,
  Ticket,
  MessageSquare
} from "lucide-react";

// Mock data
const mockTickets = [
  {
    id: "T-001",
    subject: "Login issue with mobile app",
    status: "open",
    priority: "high",
    category: "Technical",
    assignee: "Sarah Johnson",
    createdAt: "2024-01-15T10:30:00Z",
    lastUpdate: "2024-01-15T14:22:00Z",
    messages: 3
  },
  {
    id: "T-002",
    subject: "Billing question about subscription",
    status: "in-progress",
    priority: "medium",
    category: "Billing",
    assignee: "Mike Chen",
    createdAt: "2024-01-14T09:15:00Z",
    lastUpdate: "2024-01-15T11:45:00Z",
    messages: 5
  },
  {
    id: "T-003",
    subject: "Feature request for dashboard",
    status: "resolved",
    priority: "low",
    category: "Feature Request",
    assignee: "Alex Rodriguez",
    createdAt: "2024-01-12T16:20:00Z",
    lastUpdate: "2024-01-14T13:30:00Z",
    messages: 8
  }
];

const mockUser = {
  name: "John Doe",
  email: "john@company.com",
  role: "user" as const,
  avatar: undefined
};

const stats = [
  {
    title: "Total Tickets",
    value: "23",
    change: "+12%",
    trend: "up" as const,
    icon: Ticket
  },
  {
    title: "Open Tickets",
    value: "8",
    change: "-3%",
    trend: "down" as const,
    icon: Clock
  },
  {
    title: "Resolved Today",
    value: "5",
    change: "+25%",
    trend: "up" as const,
    icon: CheckCircle
  },
  {
    title: "Avg Response Time",
    value: "2.4h",
    change: "-15%",
    trend: "up" as const,
    icon: TrendingUp
  }
];

function getStatusBadge(status: string) {
  const variants: Record<string, { variant: any; icon: any; color: string }> = {
    open: { variant: "destructive", icon: AlertCircle, color: "text-destructive" },
    "in-progress": { variant: "default", icon: Clock, color: "text-primary" },
    resolved: { variant: "secondary", icon: CheckCircle, color: "text-accent" },
    closed: { variant: "outline", icon: XCircle, color: "text-muted-foreground" }
  };
  
  const config = variants[status] || variants.open;
  const Icon = config.icon;
  
  return (
    <Badge variant={config.variant} className="flex items-center gap-1">
      <Icon className="w-3 h-3" />
      {status.replace("-", " ")}
    </Badge>
  );
}

function getPriorityBadge(priority: string) {
  const colors: Record<string, string> = {
    high: "bg-destructive/10 text-destructive",
    medium: "bg-primary/10 text-primary",
    low: "bg-muted-foreground/10 text-muted-foreground"
  };
  
  return (
    <Badge variant="outline" className={colors[priority] || colors.medium}>
      {priority}
    </Badge>
  );
}

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredTickets = mockTickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={mockUser} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your support tickets and track progress
            </p>
          </div>
          <Link to="/tickets/new">
            <Button variant="hero" className="mt-4 md:mt-0">
              <Plus className="w-4 h-4 mr-2" />
              Create Ticket
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-card hover:shadow-elegant transition-all duration-300 bg-gradient-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className={`text-sm flex items-center gap-1 mt-1 ${
                      stat.trend === 'up' ? 'text-accent' : 'text-muted-foreground'
                    }`}>
                      <TrendingUp className="w-3 h-3" />
                      {stat.change}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tickets Section */}
        <Card className="border-0 shadow-card bg-gradient-card">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-xl">My Tickets</CardTitle>
                <CardDescription>
                  Track and manage your support requests
                </CardDescription>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search tickets..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full sm:w-64"
                  />
                </div>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Ticket ID</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Assignee</TableHead>
                    <TableHead>Last Update</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTickets.map((ticket) => (
                    <TableRow key={ticket.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-medium">
                        <Link 
                          to={`/tickets/${ticket.id}`}
                          className="text-primary hover:text-primary-glow transition-colors"
                        >
                          {ticket.id}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{ticket.subject}</span>
                          {ticket.messages > 0 && (
                            <Badge variant="outline" className="text-xs">
                              <MessageSquare className="w-3 h-3 mr-1" />
                              {ticket.messages}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                      <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{ticket.category}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {ticket.assignee}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(ticket.lastUpdate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Link to={`/tickets/${ticket.id}`}>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {filteredTickets.length === 0 && (
              <div className="text-center py-12">
                <Ticket className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No tickets found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery || statusFilter !== "all" 
                    ? "Try adjusting your search or filters"
                    : "Get started by creating your first support ticket"
                  }
                </p>
                <Link to="/tickets/new">
                  <Button variant="default">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Ticket
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}