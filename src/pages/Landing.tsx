import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/Navbar";
import heroImage from "@/assets/hero-illustration.jpg";
import { 
  Ticket, 
  Zap, 
  Users, 
  BarChart3, 
  CheckCircle, 
  ArrowRight,
  Star,
  Shield,
  Clock
} from "lucide-react";

const features = [
  {
    icon: Ticket,
    title: "Smart Ticket Management",
    description: "Organize, prioritize, and track support tickets with intelligent automation."
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Respond to customer issues in record time with our streamlined interface."
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Enable seamless collaboration between support agents and teams."
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Get insights into your support performance with detailed reports."
  }
];

const benefits = [
  { icon: CheckCircle, text: "Reduce response time by 70%" },
  { icon: Shield, text: "Enterprise-grade security" },
  { icon: Clock, text: "24/7 customer support" },
  { icon: Star, text: "99.9% uptime guarantee" }
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge 
                variant="secondary" 
                className="bg-gradient-hero text-primary font-medium px-4 py-2"
              >
                ✨ Transform Your Support Experience
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Streamline Your{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Support Tickets
                </span>
              </h1>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                QuickDesk makes it simple to manage support requests, collaborate with your team, 
                and deliver exceptional customer service. Join thousands of teams who trust us.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button variant="hero" size="xl" className="w-full sm:w-auto">
                    Get Started Free
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="premium" size="xl" className="w-full sm:w-auto">
                    Sign In
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center space-x-6 pt-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <benefit.icon className="w-4 h-4 text-accent" />
                    <span className="text-sm text-muted-foreground">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-3xl opacity-20"></div>
              <img 
                src={heroImage} 
                alt="QuickDesk Dashboard"
                className="relative rounded-3xl shadow-glow w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gradient-hero">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything you need to{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                excel
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to streamline your support workflow and delight your customers.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-card hover:shadow-elegant transition-all duration-300 bg-gradient-card">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <Card className="border-0 bg-gradient-primary text-center p-12 shadow-glow">
            <CardContent className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Ready to transform your support?
              </h2>
              <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
                Join thousands of teams already using QuickDesk to deliver exceptional customer support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <Button 
                    variant="secondary" 
                    size="xl" 
                    className="bg-white text-primary hover:bg-white/90 w-full sm:w-auto"
                  >
                    Start Free Trial
                  </Button>
                </Link>
                <Link to="/login">
                  <Button 
                    variant="outline" 
                    size="xl" 
                    className="border-white text-white hover:bg-white/10 w-full sm:w-auto"
                  >
                    Sign In
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border bg-muted/30">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">
            © 2024 QuickDesk. Built with ❤️ for better customer support.
          </p>
        </div>
      </footer>
    </div>
  );
}