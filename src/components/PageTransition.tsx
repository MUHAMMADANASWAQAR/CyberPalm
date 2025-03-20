
import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
  animationType?: 
    'fade' | 
    'slide-up' | 
    'slide-down' | 
    'slide-left' | 
    'slide-right' | 
    'scale' | 
    'bounce' | 
    'rotate' | 
    'flip' | 
    'reveal' | 
    'glitch' | 
    'ripple' |
    'blur' |
    'swing' |
    'float';
  delay?: number;
  duration?: number;
  cascade?: boolean;
  stagger?: boolean;
  staggerChildren?: boolean;
  staggerDelay?: number;
  ease?: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'spring';
}

const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  className,
  animationType = 'fade',
  delay = 0,
  duration = 500,
  cascade = false,
  stagger = false,
  staggerChildren = false,
  staggerDelay = 100,
  ease = 'ease-out'
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  const getAnimationClass = () => {
    if (!isVisible) {
      // Initial invisible state classes
      switch (animationType) {
        case 'fade':
          return 'opacity-0';
        case 'slide-up':
          return 'opacity-0 translate-y-10';
        case 'slide-down':
          return 'opacity-0 -translate-y-10';
        case 'slide-left':
          return 'opacity-0 translate-x-10';
        case 'slide-right':
          return 'opacity-0 -translate-x-10';
        case 'scale':
          return 'opacity-0 scale-95';
        case 'bounce':
          return 'opacity-0 scale-95';
        case 'rotate':
          return 'opacity-0 rotate-180';
        case 'flip':
          return 'opacity-0 rotateX-90';
        case 'reveal':
          return 'opacity-0 clip-path-inset-full';
        case 'glitch':
          return 'opacity-0 glitch-hidden';
        case 'ripple':
          return 'opacity-0 scale-0';
        case 'blur':
          return 'opacity-0 blur-xl';
        case 'swing':
          return 'opacity-0 rotate-12';
        case 'float':
          return 'opacity-0 translate-y-4';
        default:
          return 'opacity-0';
      }
    }
    
    // When visible, return the animation class
    switch (animationType) {
      case 'fade':
        return 'animate-fade-in';
      case 'slide-up':
        return 'animate-slide-up';
      case 'slide-down':
        return 'animate-slide-down';
      case 'slide-left':
        return 'animate-slide-left';
      case 'slide-right':
        return 'animate-slide-right';
      case 'scale':
        return 'animate-scale-in';
      case 'bounce':
        return 'animate-bounce';
      case 'rotate':
        return 'animate-spin-slow';
      case 'flip':
        return 'animate-flip';
      case 'reveal':
        return 'animate-reveal';
      case 'glitch':
        return 'animate-glitch';
      case 'ripple':
        return 'animate-ripple';
      case 'blur':
        return 'animate-unblur';
      case 'swing':
        return 'animate-swing';
      case 'float':
        return 'animate-float';
      default:
        return 'animate-fade-in';
    }
  };
  
  const getDurationClass = () => {
    switch (duration) {
      case 200: return 'duration-200';
      case 300: return 'duration-300';
      case 500: return 'duration-500';
      case 700: return 'duration-700';
      case 1000: return 'duration-1000';
      case 2000: return 'duration-2000';
      case 3000: return 'duration-3000';
      default: return 'duration-500';
    }
  };
  
  const getEaseClass = () => {
    switch (ease) {
      case 'linear': return 'ease-linear';
      case 'ease': return 'ease';
      case 'ease-in': return 'ease-in';
      case 'ease-out': return 'ease-out';
      case 'ease-in-out': return 'ease-in-out';
      case 'spring': return 'ease-spring';
      default: return 'ease-out';
    }
  };
  
  // Apply cascade effect to children if requested
  const childrenWithCascade = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child) || !staggerChildren) return child;
    
    return React.cloneElement(child, {
      ...child.props,
      className: cn(
        child.props.className,
        isVisible ? getAnimationClass() : 'opacity-0',
        getDurationClass(),
        getEaseClass(),
        'transition-all',
        'will-change-transform',
        'will-change-opacity'
      ),
      style: {
        ...child.props.style,
        transitionDelay: `${delay + (index * staggerDelay)}ms`,
      },
    });
  });
  
  return (
    <div
      ref={nodeRef}
      className={cn(
        'transition-all will-change-transform will-change-opacity',
        getDurationClass(),
        getEaseClass(),
        cascade || stagger ? '' : getAnimationClass(),
        className
      )}
      style={stagger ? { 
        transitionDelay: `${delay}ms`,
        animationDelay: `${delay}ms` 
      } : {}}
    >
      {staggerChildren ? childrenWithCascade : children}
    </div>
  );
};

export const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="page-transition-container overflow-hidden">
      {children}
    </div>
  );
};

/**
 * A component wrapper that adds entrance animation to any component
 */
export const AnimateEntrance: React.FC<PageTransitionProps> = (props) => {
  return (
    <PageTransition {...props}>
      {props.children}
    </PageTransition>
  );
};

/**
 * Applies animation to each individual child with staggered timing
 */
export const AnimateStagger: React.FC<PageTransitionProps & { 
  as?: React.ElementType,
  items: React.ReactNode[]
}> = ({ 
  as: Component = 'div', 
  items, 
  staggerDelay = 100, 
  animationType = 'fade',
  ...rest 
}) => {
  return (
    <Component className="contents">
      {items.map((item, index) => (
        <PageTransition
          key={index}
          animationType={animationType}
          delay={index * staggerDelay}
          {...rest}
        >
          {item}
        </PageTransition>
      ))}
    </Component>
  );
};

export default PageTransition;
