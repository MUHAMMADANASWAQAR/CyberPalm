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
  const [currentGesture, setCurrentGesture] = useState<GestureData | null>(null);
  const [questionCount, setQuestionCount] = useState(1);
  const [isPolling, setIsPolling] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const { toast } = useToast();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (quizStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      toast({
        title: "Time's up!",
        description: "Your 5-minute practice session has ended.",
        variant: "default",
      });
      setQuizStarted(false);
    }
    return () => clearInterval(timer);
  }, [quizStarted, timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Fetch gesture data from frontend
  const fetchGestureData = async () => {
    // Mock response from ML model via frontend
    const mockGestures = [
      { letter: 'A', confidence: 0.95, image: 'https://placehold.co/300x300/0070f3/FFFFFF/png?text=A&font=montserrat' },
      { letter: 'B', confidence: 0.92, image: 'https://placehold.co/300x300/0070f3/FFFFFF/png?text=B&font=montserrat' },
      { letter: 'C', confidence: 0.98, image: 'https://placehold.co/300x300/0070f3/FFFFFF/png?text=C&font=montserrat' },
      { letter: 'D', confidence: 0.94, image: 'https://placehold.co/300x300/0070f3/FFFFFF/png?text=D&font=montserrat' },
      { letter: 'E', confidence: 0.91, image: 'https://placehold.co/300x300/0070f3/FFFFFF/png?text=E&font=montserrat' },
    ];

    const randomIndex = Math.floor(Math.random() * mockGestures.length);
    setCurrentGesture(mockGestures[randomIndex]);
  };

  // Start continuous polling for gestures when quiz starts
  useEffect(() => {
    if (quizStarted && !isPolling) {
      setIsPolling(true);
      fetchGestureData();

      // Start polling only if not already doing so
      const interval = setInterval(() => {
        if (!isChecking && !feedback) {
          console.log("Polling for new gesture data...");
          fetchGestureData();
        }
      }, 10000);

      return () => {
        clearInterval(interval);
        setIsPolling(false);
      };
    }
  }, [quizStarted, isChecking, feedback]);

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
    setTimeLeft(300); // Reset timer to 5 minutes
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
      className="bg-gradient-to-br from-cyber-super-light via-background to-background"
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
                      Time left: {formatTime(timeLeft)}
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
                        Your Answer
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="answer"
                          name="answer"
                          className="input-cyber pr-12 text-center text-lg uppercase"
                          placeholder="Make a gesture to view"
                          value={userInput}
                          onChange={(e) => setUserInput(e.target.value)}
                          maxLength={1}
                          disabled={isChecking}
                          style={{ fontSize: '1rem', padding: '1rem' }}
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
                          disabled={isChecking || !userInput}
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
        </div>
      </div>
    </Layout>
  );
};

export default Quiz;