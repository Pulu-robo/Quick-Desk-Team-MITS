import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Navbar } from "@/components/layout/Navbar";
import { 
  ArrowLeft,
  Clock, 
  CheckCircle, 
  AlertCircle, 
  XCircle,
  User,
  Send,
  Paperclip
} from "lucide-react";

// Mock data - replace with actual data fetching
const mockTickets = [
  {
    id: "T-001",
    subject: "Login issue with mobile app",
    description: "I'm having trouble logging into the mobile app. When I enter my credentials, it shows an error message saying 'Invalid credentials' even though I'm using the correct username and password. This started happening after the latest app update. I've tried resetting my password but the issue persists.",
    status: "open",
    priority: "high",
    category: "Technical",
    assignee: "Sarah Johnson",
    createdAt: "2024-01-15T10:30:00Z",
    lastUpdate: "2024-01-15T14:22:00Z",
    messages: [
      {
        id: 1,
        author: "John Doe",
        role: "user",
        content: "I'm having trouble logging into the mobile app. When I enter my credentials, it shows an error message saying 'Invalid credentials' even though I'm using the correct username and password.",
        timestamp: "2024-01-15T10:30:00Z"
      },
      {
        id: 2,
        author: "Sarah Johnson",
        role: "agent",
        content: "Hi John, I'm sorry to hear you're experiencing login issues. Let me help you troubleshoot this. Can you tell me which version of the app you're using and what device you're on?",
        timestamp: "2024-01-15T11:15:00Z"
      },
      {
        id: 3,
        author: "John Doe",
        role: "user",
        content: "I'm using version 2.1.4 on iPhone 13 with iOS 17.2. The issue started right after I updated the app yesterday.",
        timestamp: "2024-01-15T14:22:00Z"
      }
    ]
  },
  {
    id: "T-002",
    subject: "Billing question about subscription",
    description: "I need clarification about my subscription billing. I was charged twice this month and I'm not sure why. Can someone review my account and explain the charges?",
    status: "in-progress",
    priority: "medium",
    category: "Billing",
    assignee: "Mike Chen",
    createdAt: "2024-01-14T09:15:00Z",
    lastUpdate: "2024-01-15T11:45:00Z",
    messages: [
      {
        id: 1,
        author: "Jane Smith",
        role: "user",
        content: "I need clarification about my subscription billing. I was charged twice this month and I'm not sure why.",
        timestamp: "2024-01-14T09:15:00Z"
      }
    ]
  },
  {
    id: "T-003",
    subject: "Feature request for dashboard",
    description: "It would be great to have a dark mode toggle in the dashboard. Many users prefer dark themes, especially when working in low-light environments.",
    status: "resolved",
    priority: "low",
    category: "Feature Request",
    assignee: "Alex Rodriguez",
    createdAt: "2024-01-12T16:20:00Z",
    lastUpdate: "2024-01-14T13:30:00Z",
    messages: [
      {
        id: 1,
        author: "Mike Wilson",
        role: "user",
        content: "It would be great to have a dark mode toggle in the dashboard. Many users prefer dark themes, especially when working in low-light environments.",
        timestamp: "2024-01-12T16:20:00Z"
      }
    ]
  }
];

const mockUser = {
  name: "John Doe",
  email: "john@company.com",
  role: "user" as const,
  avatar: undefined
};

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

export default function TicketDetail() {
  const { id } = useParams<{ id: string }>();
  const [replyMessage, setReplyMessage] = useState("");
  
  // Find the ticket by ID
  const ticket = mockTickets.find(t => t.id === id);
  
  if (!ticket) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar user={mockUser} />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Ticket Not Found</h1>
            <p className="text-muted-foreground mb-4">The ticket you're looking for doesn't exist.</p>
            <Link to="/dashboard">
              <Button variant="default">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSendReply = () => {
    if (replyMessage.trim()) {
      // Here you would typically send the reply to your backend
      console.log("Sending reply:", replyMessage);
      setReplyMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={mockUser} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{ticket.subject}</h1>
            <p className="text-muted-foreground">Ticket #{ticket.id}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Ticket Details */}
            <Card className="border-0 shadow-card bg-gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Ticket Details
                  <div className="flex gap-2">
                    {getStatusBadge(ticket.status)}
                    {getPriorityBadge(ticket.priority)}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Description</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {ticket.description}
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Category:</span>
                      <Badge variant="outline" className="ml-2">{ticket.category}</Badge>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Assignee:</span>
                      <span className="ml-2">{ticket.assignee}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Created:</span>
                      <span className="ml-2">{new Date(ticket.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Last Update:</span>
                      <span className="ml-2">{new Date(ticket.lastUpdate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Conversation */}
            <Card className="border-0 shadow-card bg-gradient-card">
              <CardHeader>
                <CardTitle>Conversation</CardTitle>
                <CardDescription>
                  Follow the conversation thread for this ticket
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ticket.messages.map((message, index) => (
                    <div key={message.id} className="flex gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs">
                          {message.author.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{message.author}</span>
                          <Badge variant="outline" className="text-xs">
                            {message.role === 'user' ? <User className="w-3 h-3 mr-1" /> : '🎧'}
                            {message.role}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(message.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="bg-muted/30 rounded-lg p-3 text-sm">
                          {message.content}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Reply Section */}
                <div className="mt-6 pt-4 border-t border-border">
                  <div className="space-y-3">
                    <Textarea
                      placeholder="Type your reply..."
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      className="resize-none"
                      rows={3}
                    />
                    <div className="flex justify-between items-center">
                      <Button variant="ghost" size="sm">
                        <Paperclip className="w-4 h-4 mr-2" />
                        Attach File
                      </Button>
                      <Button 
                        onClick={handleSendReply}
                        disabled={!replyMessage.trim()}
                        variant="default"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Send Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-0 shadow-card bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Clock className="w-4 h-4 mr-2" />
                  Update Status
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <User className="w-4 h-4 mr-2" />
                  Reassign Ticket
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Change Priority
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-lg">Ticket Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  {getStatusBadge(ticket.status)}
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Priority:</span>
                  {getPriorityBadge(ticket.priority)}
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <Badge variant="outline">{ticket.category}</Badge>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Assignee:</span>
                  <span>{ticket.assignee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Messages:</span>
                  <span>{ticket.messages.length}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}