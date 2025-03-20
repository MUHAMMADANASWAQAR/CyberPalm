
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import Button from '@/components/Button';
import PageTransition from '@/components/PageTransition';
import { BookOpen, CheckSquare, Keyboard } from 'lucide-react';

const MainMenu: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Layout
      title="CYBER PALM"
      subtitle="Select your learning experience"
      backgroundEffect="gradient"
    >
      <div className="mt-8 md:mt-16 flex flex-col items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-6xl">
          <PageTransition animationType="slide-left" delay={200}>
            <div 
              className="cyber-card flex flex-col items-center justify-center p-8 md:p-10 text-center cursor-pointer h-full"
              onClick={() => navigate('/quiz')}
            >
              <div className="rounded-full bg-cyber-super-light p-4 mb-6 animate-pulse-slow">
                <CheckSquare className="h-10 w-10 text-cyber" />
              </div>
              <h3 className="text-xl font-bold mb-2">Start Quiz</h3>
              <p className="text-gray-600 mb-6">Test your sign language knowledge with interactive quizzes</p>
              <Button
                variant="primary"
                onClick={() => navigate('/quiz')}
                className="mt-auto"
              >
                Start Quiz
              </Button>
            </div>
          </PageTransition>
          
          <PageTransition animationType="slide-up" delay={300}>
            <div 
              className="cyber-card flex flex-col items-center justify-center p-8 md:p-10 text-center cursor-pointer h-full"
              onClick={() => navigate('/learning')}
            >
              <div className="rounded-full bg-cyber-super-light p-4 mb-6 animate-float">
                <BookOpen className="h-10 w-10 text-cyber" />
              </div>
              <h3 className="text-xl font-bold mb-2">Start Learning</h3>
              <p className="text-gray-600 mb-6">Learn sign language alphabet with interactive tutorials</p>
              <Button
                variant="primary"
                onClick={() => navigate('/learning')}
                className="mt-auto"
              >
                Start Learning
              </Button>
            </div>
          </PageTransition>
          
          <PageTransition animationType="slide-right" delay={400}>
            <div 
              className="cyber-card flex flex-col items-center justify-center p-8 md:p-10 text-center cursor-pointer h-full"
              onClick={() => navigate('/keyboard-practice')}
            >
              <div className="rounded-full bg-cyber-super-light p-4 mb-6 animate-glow">
                <Keyboard className="h-10 w-10 text-cyber" />
              </div>
              <h3 className="text-xl font-bold mb-2">Keyboard Practice</h3>
              <p className="text-gray-600 mb-6">Practice your sign language skills using keyboard inputs</p>
              <Button
                variant="primary"
                onClick={() => navigate('/keyboard-practice')}
                className="mt-auto"
              >
                Start Practice
              </Button>
            </div>
          </PageTransition>
        </div>
        
        <PageTransition animationType="fade" delay={500}>
          <div className="mt-12 md:mt-16 text-center">
            <p className="text-sm text-gray-600">
              Your learning progress is saved automatically
            </p>
          </div>
        </PageTransition>
      </div>
    </Layout>
  );
};

export default MainMenu;
