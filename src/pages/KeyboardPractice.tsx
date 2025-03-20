
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import PageTransition from '@/components/PageTransition';
import Button from '@/components/Button';
import { useToast } from '@/hooks/use-toast';
import { Keyboard, Key, ArrowRight, CheckCircle, XCircle } from 'lucide-react';

const KeyboardPractice: React.FC = () => {
  const [currentLetter, setCurrentLetter] = useState('A');
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const { toast } = useToast();
  
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  
  const handleKeyDown = (e: KeyboardEvent) => {
    const key = e.key.toUpperCase();
    if (alphabet.includes(key)) {
      setUserInput(key);
      checkAnswer(key);
    }
  };
  
  const checkAnswer = (input: string) => {
    const correct = input === currentLetter;
    setIsCorrect(correct);
    setShowResult(true);
    
    setTimeout(() => {
      setShowResult(false);
      if (correct) {
        setScore(prev => prev + 1);
        const nextIndex = Math.floor(Math.random() * alphabet.length);
        setCurrentLetter(alphabet[nextIndex]);
        toast({
          title: "Correct!",
          description: "Great job! Moving to next letter.",
        });
      } else {
        toast({
          title: "Incorrect",
          description: `The correct answer is ${currentLetter}`,
          variant: "destructive",
        });
      }
      setUserInput('');
    }, 1500);
  };
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentLetter]);
  
  return (
    <Layout
      title="Keyboard Practice"
      subtitle="Press the key that matches the shown sign language gesture"
      showBackButton
      backTo="/main-menu"
      backgroundEffect="dots"
    >
      <div className="mt-8 flex flex-col items-center">
        <PageTransition animationType="fade">
          <div className="glass-panel p-8 md:p-10 w-full max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="text-6xl md:text-8xl font-bold text-cyber animate-float">{currentLetter}</div>
              <p className="mt-4 text-gray-600">Press this key on your keyboard</p>
            </div>
            
            <div className="relative h-40 mb-8 border-2 border-cyber/30 rounded-xl flex items-center justify-center bg-white/50 backdrop-blur-sm">
              {showResult ? (
                <div className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm
                  ${isCorrect ? 'bg-green-500 bg-opacity-20' : 'bg-red-500 bg-opacity-20'} animate-fade-in`}>
                  {isCorrect ? (
                    <CheckCircle className="h-20 w-20 text-green-500 animate-scale-in" />
                  ) : (
                    <XCircle className="h-20 w-20 text-red-500 animate-scale-in" />
                  )}
                </div>
              ) : (
                <div className="text-8xl font-bold text-gray-300">{userInput || '?'}</div>
              )}
            </div>
            
            <div className="text-center">
              <p className="text-lg font-medium">Score: <span className="text-cyber">{score}</span></p>
            </div>
          </div>
        </PageTransition>
        
        <PageTransition animationType="slide-up" delay={300}>
          <div className="mt-12 w-full max-w-3xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2">
              {alphabet.map((letter, index) => (
                <div 
                  key={letter}
                  className={`h-12 w-12 md:h-14 md:w-14 rounded-lg flex items-center justify-center font-medium border-2
                    ${letter === userInput 
                      ? 'bg-cyber text-white border-cyber animate-pulse' 
                      : 'bg-white text-gray-700 border-gray-200'}
                    transition-all duration-300 transform hover:scale-110`}
                >
                  {letter}
                </div>
              ))}
            </div>
          </div>
        </PageTransition>
      </div>
    </Layout>
  );
};

export default KeyboardPractice;
