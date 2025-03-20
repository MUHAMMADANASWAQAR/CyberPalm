
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PageTransition from './PageTransition';
import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
  backTo?: string;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  backgroundEffect?: 'gradient' | 'dots' | 'none';
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title,
  subtitle,
  showBackButton = false,
  backTo = '/',
  className,
  headerClassName,
  contentClassName,
  backgroundEffect = 'gradient'
}) => {
  const location = useLocation();
  
  const getBackgroundClasses = () => {
    switch (backgroundEffect) {
      case 'gradient':
        return 'bg-gradient-cyber-radial';
      case 'dots':
        return 'bg-gradient-dots bg-dots-lg';
      case 'none':
      default:
        return '';
    }
  };
  
  return (
    <div className={cn(
      'min-h-screen w-full overflow-hidden bg-background',
      getBackgroundClasses(),
      className
    )}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 min-h-screen flex flex-col">
        <header className={cn("pt-6 md:pt-12", headerClassName)}>
          {showBackButton && (
            <PageTransition animationType="slide-left">
              <Link 
                to={backTo} 
                className="inline-flex items-center text-cyber hover:text-cyber-dark transition-colors mb-4"
              >
                <ChevronLeft className="h-5 w-5 mr-1" />
                <span>Back</span>
              </Link>
            </PageTransition>
          )}
          
          {title && (
            <PageTransition animationType="slide-down">
              <h1 className="cyber-title">{title}</h1>
            </PageTransition>
          )}
          
          {subtitle && (
            <PageTransition delay={200} animationType="slide-down">
              <p className="cyber-subtitle">{subtitle}</p>
            </PageTransition>
          )}
        </header>
        
        <main className={cn("flex-1 py-6", contentClassName)}>
          {children}
        </main>
        
        <footer className="py-4 text-center text-sm text-gray-500">
          <PageTransition delay={300} animationType="fade">
            <p>CYBER PALM &copy; {new Date().getFullYear()}</p>
          </PageTransition>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
