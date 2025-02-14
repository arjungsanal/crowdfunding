import { useState } from "react";
import { supabase } from "../util/supabse";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";


export default function AuthComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const { toast } = useToast();

  // Explicitly type the `e` parameter
  const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true

    try {
      if (isSignUp) {
        // Sign up with email, password, and username
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username, // Add username to the user's metadata
            },
          },
        });

        if (error) throw error;
        toast({
          title: "Account Created",
          description: "Please check your email to confirm your account.",
        });
      } else {
        // Sign in with email and password
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        toast({
          title: "Logged In",
          description: "Welcome back!",
        });
      }
    } catch (error) {
      // Handle the error safely
      let errorMessage = "An unexpected error occurred.";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "object" && error !== null && "message" in error) {
        errorMessage = String(error.message);
      }

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle>{isSignUp ? "Create an Account" : "Sign In"}</CardTitle>
          <CardDescription>
            {isSignUp
              ? "Enter your details to create an account."
              : "Enter your email and password to sign in."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuth} className="space-y-4">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing In..." : isSignUp ? "Sign Up" : "Sign In"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            variant="link"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm"
            disabled={isLoading}
          >
            {isSignUp
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </Button>
        </CardFooter>
      </Card>

      <div className="text-sm text-gray-600 dark:text-gray-400 text-center mt-4">
            <p>Developed by FAS | ©2025</p>
          </div>
    </div>
  );
}