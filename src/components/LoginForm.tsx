
import React, { useState } from 'react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { User, KeyRound, Scan } from 'lucide-react';
import PageTransition from './PageTransition';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast({
        title: "Invalid input",
        description: "Please enter both username and password",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Success",
        description: "You've been logged in successfully",
      });
      navigate('/main-menu');
    }, 1500);
  };
  
  const handleFacialRecognition = () => {
    navigate('/facial-recognition');
  };
  
  return (
    <div className="w-full max-w-md mx-auto">
      <PageTransition animationType="scale" delay={300}>
        <form onSubmit={handleLogin} className="glass-panel p-8 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
               
                  className="input-cyber pl-10"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <KeyRound className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  
                  className="input-cyber pl-10"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <div className="pt-2">
            <Button
              type="submit"
              className="w-full justify-center"
              isLoading={isLoading}
            >
              Login & Run The Journey
            </Button>
          </div>
          
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-500 text-sm">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          
          <div>
            <Button
              type="button"
              variant="outline"
              className="w-full justify-center"
              icon={<Scan className="h-5 w-5" />}
              onClick={handleFacialRecognition}
            >
              Login With Facial Recognition
            </Button>
          </div>
        </form>
      </PageTransition>
      
      <PageTransition delay={500} animationType="fade">
        <p className="mt-6 text-center text-sm text-gray-500">
          Thanks to AI, start the facial recognition login! Note: Keep your hand static in an upright position if you already wore the glove.
        </p>
      </PageTransition>
    </div>
  );
};

export default LoginForm;
