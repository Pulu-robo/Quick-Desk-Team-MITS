import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navbar } from "@/components/layout/Navbar";
import { Ticket, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Welcome to QuickDesk!",
        description: "Your account has been created successfully.",
      });
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      
      <div className="pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-md">
          <Card className="border-0 shadow-elegant bg-gradient-card">
            <CardHeader className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto shadow-glow">
                <Ticket className="w-8 h-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">Create your account</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Get started with QuickDesk today
                </CardDescription>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      id="firstName"
                      placeholder="John"
                      className="transition-all duration-300 focus:shadow-card"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName"
                      placeholder="Doe"
                      className="transition-all duration-300 focus:shadow-card"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email"
                    type="email"
                    placeholder="john@company.com"
                    className="transition-all duration-300 focus:shadow-card"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select>
                    <SelectTrigger className="transition-all duration-300 focus:shadow-card">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">End User</SelectItem>
                      <SelectItem value="agent">Support Agent</SelectItem>
                      <SelectItem value="admin">Administrator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input 
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      className="pr-10 transition-all duration-300 focus:shadow-card"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" required />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the{" "}
                    <Link to="/terms" className="text-primary hover:text-primary-glow">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-primary hover:text-primary-glow">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link 
                    to="/login"
                    className="text-primary hover:text-primary-glow font-medium transition-colors"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}