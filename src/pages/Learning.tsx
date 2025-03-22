
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import Button from '@/components/Button';
import PageTransition from '@/components/PageTransition';
import { useToast } from '@/hooks/use-toast';
import { RefreshCw, Shuffle, Camera, ChevronRight, ChevronLeft } from 'lucide-react';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const Learning: React.FC = () => {
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [isMatching, setIsMatching] = useState(false);
  const [randomMode, setRandomMode] = useState(false);
  const [matchFeedback, setMatchFeedback] = useState<'success' | 'error' | null>(null);
  const { toast } = useToast();
  
  const currentLetter = ALPHABET[currentLetterIndex];
  
  useEffect(() => {
    // Reset match feedback when changing letter
    setMatchFeedback(null);
  }, [currentLetterIndex]);
  
  const handleNextLetter = () => {
    if (randomMode) {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * ALPHABET.length);
      } while (newIndex === currentLetterIndex);
      setCurrentLetterIndex(newIndex);
    } else {
      setCurrentLetterIndex((prev) => (prev + 1) % ALPHABET.length);
    }
  };
  
  const handlePrevLetter = () => {
    if (randomMode) {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * ALPHABET.length);
      } while (newIndex === currentLetterIndex);
      setCurrentLetterIndex(newIndex);
    } else {
      setCurrentLetterIndex((prev) => (prev - 1 + ALPHABET.length) % ALPHABET.length);
    }
  };
  
  const toggleRandomMode = () => {
    setRandomMode((prev) => !prev);
    toast({
      title: randomMode ? "Sequential Mode" : "Random Mode",
      description: randomMode ? "Letters will be shown in alphabetical order" : "Letters will be shown in random order"
    });
  };
  
  const handleMatch = () => {
    setIsMatching(true);
    
    // Simulate matching process
    setTimeout(() => {
      // Randomly decide match for demo purposes
      const isSuccess = Math.random() > 0.3;
      
      setMatchFeedback(isSuccess ? 'success' : 'error');
      
      toast({
        title: isSuccess ? "Great Match!" : "Try Again",
        description: isSuccess ? "Your gesture matches the letter perfectly!" : "Adjust your hand position and try again",
        variant: isSuccess ? "default" : "destructive"
      });
      
      if (isSuccess) {
        // Wait a bit before moving to next letter
        setTimeout(() => {
          handleNextLetter();
          setMatchFeedback(null);
        }, 1500);
      }
      
      setIsMatching(false);
    }, 2000);
  };
  
  return (
    <Layout
      title="Sign Language Learning"
      subtitle="Learn the alphabet with interactive gesture matching"
      showBackButton
      backTo="/main-menu"
      backgroundEffect="dots"
      className="bg-gradient-to-br from-cyber-super-light via-background to-background"
    >
      <div className="mt-6 w-full max-w-6xl mx-auto">
        <PageTransition animationType="fade">
          <div className="flex flex-wrap justify-between items-center mb-6 gap-3">
            <Button
              variant="outline"
              icon={<Shuffle className="h-5 w-5 animate-pulse-slow" />}
              onClick={toggleRandomMode}
              className="border-cyber hover:border-cyber hover:bg-cyber/10"
            >
              {randomMode ? "Sequential Mode" : "Random Mode"}
            </Button>
            
            <div className="flex space-x-2">
              <Button
                variant="outline"
                icon={<RefreshCw className="h-5 w-5 group-hover:animate-spin-slow" />}
                onClick={() => setCurrentLetterIndex(0)}
                className="group border-cyber hover:border-cyber hover:bg-cyber/10"
              >
                Reset
              </Button>
            </div>
          </div>
        </PageTransition>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left panel - Alphabet display */}
          <PageTransition animationType="slide-right" delay={200}>
            <div className="glass-panel p-6 h-full border-cyber/20 shadow-[0_10px_20px_-5px_rgba(0,112,243,0.2)]">
              <h3 className="text-lg font-semibold mb-4 bg-gradient-cyber-dark bg-clip-text text-transparent">Reference Sign</h3>
              
              <div className="flex justify-center mb-6">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-cyber rounded-lg blur-md opacity-75 group-hover:opacity-100 transition duration-1000"></div>
                  <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-lg shadow-lg bg-white/90 backdrop-blur-sm">
                    <img 
                      src={`https://placehold.co/400x400/0070f3/FFFFFF/png?text=${currentLetter}&font=montserrat`} 
                      alt={`Sign for letter ${currentLetter}`}
                      className="w-full h-full object-cover animate-float"
                    />
                  </div>
                  
                  <div className="absolute top-4 left-4">
                    <div className="bg-black/30 backdrop-blur-sm rounded-lg px-4 py-2 text-white font-bold text-lg animate-pulse-slow">
                      Letter {currentLetter}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center space-x-4">
                <Button
                  variant="outline"
                  icon={<ChevronLeft className="h-5 w-5" />}
                  onClick={handlePrevLetter}
                  className="border-cyber hover:border-cyber hover:bg-cyber/10 transition-all duration-300 hover:scale-105"
                >
                  Previous
                </Button>
                
                <Button
                  variant="primary"
                  icon={<ChevronRight className="h-5 w-5" />}
                  onClick={handleNextLetter}
                  className="transition-all duration-300 hover:scale-105 shadow-button"
                >
                  Next
                </Button>
              </div>
              
              <div className="mt-6">
                <div className="bg-gradient-to-br from-cyber-super-light to-white/80 backdrop-blur-sm rounded-lg py-3 px-4 shadow-neo-sm">
                  <h4 className="font-medium text-sm text-gray-700 mb-1">Alphabet Progress</h4>
                  <div className="flex flex-wrap gap-2">
                    {ALPHABET.map((letter, index) => (
                      <PageTransition 
                        key={letter} 
                        animationType="scale" 
                        delay={index * 50}
                        className="h-8 w-8"
                      >
                        <div
                          className={`h-8 w-8 flex items-center justify-center rounded-md text-sm font-medium transition-all hover:scale-110 ${
                            index === currentLetterIndex
                              ? 'bg-gradient-cyber text-white shadow-button animate-pulse-slow'
                              : 'bg-white text-gray-700 shadow-sm hover:shadow-md hover:text-cyber'
                          }`}
                        >
                          {letter}
                        </div>
                      </PageTransition>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </PageTransition>
          
          {/* Right panel - User gesture display */}
          <PageTransition animationType="slide-left" delay={300}>
            <div className="glass-panel p-6 h-full border-cyber/20 shadow-[0_10px_20px_-5px_rgba(0,112,243,0.2)]">
              <h3 className="text-lg font-semibold mb-4 bg-gradient-cyber-dark bg-clip-text text-transparent">Your Gesture</h3>
              
              <div className="flex justify-center mb-6">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-cyber rounded-lg blur-md opacity-75 group-hover:opacity-100 transition duration-1000"></div>
                  <div className={`relative aspect-square w-full max-w-sm overflow-hidden rounded-lg shadow-lg bg-gradient-to-br from-gray-800 to-gray-900 ${
                    matchFeedback === 'success' ? 'ring-4 ring-green-500 animate-border-pulse border-green-500' :
                    matchFeedback === 'error' ? 'ring-4 ring-red-500 animate-border-pulse border-red-500' : ''
                  }`}>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                      <Camera className="h-16 w-16 mb-4 opacity-70 animate-pulse-slow" />
                      <p className="text-lg">Camera feed will appear here</p>
                      <p className="text-sm opacity-70 mt-2">Position your hand in frame</p>
                    </div>
                    
                    {isMatching && (
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                        <div className="loader">
                          <div></div>
                          <div></div>
                        </div>
                      </div>
                    )}
                    
                    {matchFeedback && (
                      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
                        {matchFeedback === 'success' ? (
                          <div className="text-green-500 animate-scale-in flex flex-col items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 animate-pulse-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                            <p className="text-white text-lg font-medium mt-4 animate-float">Perfect Match!</p>
                          </div>
                        ) : (
                          <div className="text-red-500 animate-scale-in flex flex-col items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 animate-pulse-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <p className="text-white text-lg font-medium mt-4 animate-float">Try Again</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="absolute top-4 left-4">
                    <div className="bg-black/30 backdrop-blur-sm rounded-lg px-4 py-2 text-white font-bold text-lg animate-pulse-slow">
                      Your Sign
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <Button
                  icon={<Camera className="h-5 w-5" />}
                  onClick={handleMatch}
                  isLoading={isMatching}
                  disabled={isMatching || matchFeedback === 'success'}
                  className="shadow-button transition-all duration-300 hover:scale-105 disabled:hover:scale-100"
                >
                  {isMatching ? "Matching..." : "Match Gesture"}
                </Button>
              </div>
              
              <div className="mt-6">
                <div className="bg-gradient-to-br from-cyber-super-light to-white/80 backdrop-blur-sm rounded-lg py-3 px-4 shadow-neo-sm">
                  <h4 className="font-medium text-sm text-gray-700 mb-2">Gesture Tips</h4>
                  <PageTransition animationType="slide-left" staggerChildren staggerDelay={100}>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      <li className="transition-all duration-300 hover:translate-x-1 hover:text-cyber">Match the shown alphabet with your glove gesture.</li>
                      <li className="transition-all duration-300 hover:translate-x-1 hover:text-cyber">Ensure your glove's sensors are properly fitted and responsive.</li>
                      <li className="transition-all duration-300 hover:translate-x-1 hover:text-cyber">Keep your hand steady for accurate detection.</li>
                      <li className="transition-all duration-300 hover:translate-x-1 hover:text-cyber">If correct, the next letter will appear automatically.</li>
                      <li className="transition-all duration-300 hover:translate-x-1 hover:text-cyber">If incorrect, a "Try Again" message will pop up.</li>
                    </ul>
                  </PageTransition>
                </div>
              </div>
            </div>
          </PageTransition>
        </div>
      </div>
    </Layout>
  );
};

export default Learning;
