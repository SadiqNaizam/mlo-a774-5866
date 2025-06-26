import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Custom Components
import AppHeader from '@/components/layout/AppHeader';
import Footer from '@/components/layout/Footer';
import PasswordStrengthIndicator from '@/components/PasswordStrengthIndicator';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const SignUpPage: React.FC = () => {
  console.log('SignUpPage loaded');
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = (event: React.FormEvent) => {
    event.preventDefault();
    // Basic validation
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    console.log('Signing up with:', { email, password });
    // In a real app, you'd call an API here.
    // On success, navigate to the dashboard or login page.
    navigate('/dashboard'); // Navigate to dashboard on successful sign up
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card>
            <form onSubmit={handleSignUp}>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Create an Account</CardTitle>
                <CardDescription>
                  Enter your information to get started.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <PasswordStrengthIndicator password={password} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button type="submit" className="w-full">
                  Create Account
                </Button>
                <div className="text-center text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Link
                    to="/"
                    className="font-medium text-primary underline-offset-4 hover:underline"
                  >
                    Log in
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignUpPage;