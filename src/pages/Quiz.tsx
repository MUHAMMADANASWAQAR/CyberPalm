
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import Button from '@/components/Button';
import PageTransition from '@/components/PageTransition';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, XCircle, Send, Scan, Camera, Loader2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface GestureData {
  letter: string;
  confidence: number;
  image: string;
}

const Quiz: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [isLoadingGesture, setIsLoadingGesture] = useState(false);
  const [currentGesture, setCurrentGesture] = useState<GestureData | null>(null);
  const [questionCount, setQuestionCount] = useState(1);
  const [isPolling, setIsPolling] = useState(false);
  const { toast } = useToast();
  
  // Fetch gesture data from backend
  const fetchGestureData = async () => {
    setIsLoadingGesture(true);
    
    try {
      // In a real app, replace with actual API endpoint
      // const response = await fetch('http://your-backend/api/gestures');
      // const data = await response.json();
      
      // Simulate API call delay and response
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock response from ML model via backend
      const mockGestures = [
        { letter: 'A', confidence: 0.95, image: 'https://placehold.co/300x300/0070f3/FFFFFF/png?text=A&font=montserrat' },
        { letter: 'B', confidence: 0.92, image: 'https://placehold.co/300x300/0070f3/FFFFFF/png?text=B&font=montserrat' },
        { letter: 'C', confidence: 0.98, image: 'https://placehold.co/300x300/0070f3/FFFFFF/png?text=C&font=montserrat' },
        { letter: 'D', confidence: 0.94, image: 'https://placehold.co/300x300/0070f3/FFFFFF/png?text=D&font=montserrat' },
        { letter: 'E', confidence: 0.91, image: 'https://placehold.co/300x300/0070f3/FFFFFF/png?text=E&font=montserrat' },
      ];
      
      const randomIndex = Math.floor(Math.random() * mockGestures.length);
      setCurrentGesture(mockGestures[randomIndex]);
    } catch (error) {
      console.error('Error fetching gesture data:', error);
      toast({
        title: "Connection Error",
        description: "Failed to connect to gesture recognition service",
        variant: "destructive"
      });
    } finally {
      setIsLoadingGesture(false);
    }
  };
  
  // Start continuous polling for gestures when quiz starts
  useEffect(() => {
    if (quizStarted && !isPolling) {
      setIsPolling(true);
      fetchGestureData();
      
      // Start polling only if not already doing so
      const interval = setInterval(() => {
        if (!isChecking && !isLoadingGesture && !feedback) {
          console.log("Polling for new gesture data...");
          // Uncomment for continuous polling in production
          // fetchGestureData();
        }
      }, 5000);
      
      return () => {
        clearInterval(interval);
        setIsPolling(false);
      };
    }
  }, [quizStarted, isChecking, isLoadingGesture, feedback]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userInput) {
      toast({
        title: "Input required",
        description: "Please enter your answer",
        variant: "destructive"
      });
      return;
    }
    
    setIsChecking(true);
    
    // Simulate API check with backend
    setTimeout(() => {
      const isCorrect = userInput.toUpperCase() === currentGesture?.letter;
      setFeedback(isCorrect ? 'correct' : 'incorrect');
      
      toast({
        title: isCorrect ? "Correct!" : "Incorrect",
        description: isCorrect ? "Great job!" : `The correct answer is ${currentGesture?.letter}`,
        variant: isCorrect ? "default" : "destructive"
      });
      
      setIsChecking(false);
      
      // Clear feedback after a delay and load next question
      setTimeout(() => {
        setFeedback(null);
        if (isCorrect) {
          setUserInput('');
          setQuestionCount(prev => prev + 1);
          fetchGestureData();
        }
      }, 2000);
    }, 1500);
  };
  
  const handleStartPractice = () => {
    setQuizStarted(true);
    toast({
      title: "Practice Mode",
      description: "Starting practice session. Get ready!",
      variant: "default"
    });
  };
  
  return (
    <Layout
      title="Sign Language Quiz"
      subtitle="Identify the sign and type the correct letter"
      showBackButton
      backTo="/main-menu"
      backgroundEffect="dots"
    >
      <div className="mt-8 flex flex-col items-center w-full">
        <div className="w-full max-w-2xl mx-auto px-4 sm:px-6">
          <PageTransition animationType="scale">
            <div className="flex justify-center mb-8">
              {!quizStarted ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="w-full"
                >
                  <Button 
                    onClick={handleStartPractice}
                    className="w-full max-w-xs mx-auto flex items-center justify-center animate-pulse"
                    icon={<Scan className="h-5 w-5" />}
                  >
                    Practice
                  </Button>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex flex-col sm:flex-row justify-between w-full gap-4"
                >
                  <div className="bg-white rounded-full px-4 py-2 shadow-lg border border-gray-100 animate-border-pulse">
                    <span className="text-sm font-semibold text-gray-600">
                      Question {questionCount}/10
                    </span>
                  </div>
                  <div className="bg-white rounded-full px-4 py-2 shadow-lg border border-gray-100">
                    <span className="text-sm font-semibold text-cyber">
                      Confidence: {currentGesture ? Math.round(currentGesture.confidence * 100) : 0}%
                    </span>
                  </div>
                </motion.div>
              )}
            </div>
          </PageTransition>
          
          {quizStarted && (
            <PageTransition animationType="fade" delay={200}>
              <div className="glass-panel p-4 sm:p-6 md:p-8 mb-8">
                <div className="flex flex-col items-center">
                  <div className="relative mb-6 w-full max-w-xs mx-auto">
                    <motion.div 
                      className="aspect-square relative overflow-hidden rounded-xl shadow-lg"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      {isLoadingGesture ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-cyber-super-light">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                          >
                            <Loader2 className="h-12 w-12 text-cyber" />
                          </motion.div>
                          <p className="absolute mt-16 text-sm font-medium text-gray-600">Processing gesture from backend...</p>
                        </div>
                      ) : (
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={currentGesture?.letter}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ type: "spring", damping: 20 }}
                            className="w-full h-full"
                          >
                            <img 
                              src={currentGesture?.image} 
                              alt="Sign language gesture" 
                              className="w-full h-full object-cover"
                            />
                            <motion.div 
                              className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full p-1.5"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Camera className="h-5 w-5 text-cyber" />
                            </motion.div>
                          </motion.div>
                        </AnimatePresence>
                      )}
                      
                      <AnimatePresence>
                        {feedback && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm ${
                              feedback === 'correct' ? 'bg-green-500 bg-opacity-20' : 'bg-red-500 bg-opacity-20'
                            }`}
                          >
                            {feedback === 'correct' ? (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                                transition={{ type: "spring", damping: 10, stiffness: 100 }}
                              >
                                <CheckCircle className="h-20 w-20 text-green-500" />
                              </motion.div>
                            ) : (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1, rotate: [0, 5, -5, 0] }}
                                transition={{ type: "spring", damping: 10, stiffness: 100 }}
                              >
                                <XCircle className="h-20 w-20 text-red-500" />
                              </motion.div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="w-full space-y-4">
                    <div>
                      <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Answer <span className="text-xs text-gray-500">(Gesture will come from backend)</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="answer"
                          name="answer"
                          className="input-cyber pr-12 text-center text-lg uppercase"
                          placeholder="Type letter here"
                          value={userInput}
                          onChange={(e) => setUserInput(e.target.value)}
                          maxLength={1}
                          disabled={isLoadingGesture || isChecking}
                        />
                        
                        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                          <kbd className="inline-flex items-center rounded border border-gray-200 px-2 font-sans text-xs text-gray-400">
                            Enter
                          </kbd>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-center">
                      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                        <Button
                          type="submit"
                          isLoading={isChecking}
                          disabled={isChecking || !userInput || isLoadingGesture}
                          icon={<Send className="h-5 w-5" />}
                          className="relative overflow-hidden transition-all duration-300 before:absolute before:inset-0 before:bg-white/20 before:translate-x-[-100%] hover:before:animate-shine"
                        >
                          Submit Answer
                        </Button>
                      </motion.div>
                    </div>
                  </form>
                </div>
              </div>
            </PageTransition>
          )}
          
          <PageTransition animationType="slide-up" delay={400}>
            <div className="mt-4">
              <div className="grid grid-cols-10 gap-1 sm:gap-2 mb-2">
                {/* Virtual keyboard - just for display */}
                {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((key) => (
                  <motion.div 
                    key={key}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <kbd 
                      className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 flex items-center justify-center rounded border border-gray-200 bg-white text-sm text-gray-500 shadow-sm transition-all"
                    >
                      {key}
                    </kbd>
                  </motion.div>
                ))}
              </div>
              <div className="grid grid-cols-9 gap-1 sm:gap-2 mb-2">
                {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map((key) => (
                  <motion.div 
                    key={key}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <kbd 
                      className={`h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 flex items-center justify-center rounded border 
                        ${key === currentGesture?.letter 
                          ? 'border-cyber bg-cyber/10 text-cyber font-bold animate-pulse-slow' 
                          : 'border-gray-200 bg-white text-gray-500'}
                        shadow-sm transition-all`}
                    >
                      {key}
                    </kbd>
                  </motion.div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1 sm:gap-2">
                {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map((key) => (
                  <motion.div 
                    key={key}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <kbd 
                      className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 flex items-center justify-center rounded border border-gray-200 bg-white text-sm text-gray-500 shadow-sm transition-all"
                    >
                      {key}
                    </kbd>
                  </motion.div>
                ))}
              </div>
            </div>
          </PageTransition>
        </div>
      </div>
    </Layout>
  );
};

export default Quiz;
