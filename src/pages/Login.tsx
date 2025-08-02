import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Navbar } from "@/components/layout/Navbar";
import { Ticket, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
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
        title: "Welcome back!",
        description: "You have been successfully logged in.",
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
                <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Sign in to your QuickDesk account
                </CardDescription>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="transition-all duration-300 focus:shadow-card"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input 
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
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
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember" className="text-sm">
                      Remember me
                    </Label>
                  </div>
                  <Link 
                    to="/forgot-password"
                    className="text-sm text-primary hover:text-primary-glow transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link 
                    to="/register"
                    className="text-primary hover:text-primary-glow font-medium transition-colors"
                  >
                    Sign up
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