
import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    isLoading = false, 
    icon, 
    iconPosition = 'left', 
    children, 
    disabled, 
    ...props 
  }, ref) => {
    const variantClasses = {
      primary: 'cyber-button',
      outline: 'cyber-button-outline',
      ghost: 'text-cyber hover:bg-cyber/5 px-4 py-2 rounded-lg transition-colors'
    };
    
    const sizeClasses = {
      sm: 'text-sm px-3 py-1.5 rounded-md',
      md: '',
      lg: 'text-lg px-8 py-4 rounded-xl'
    };
    
    return (
      <button
        ref={ref}
        className={cn(
          variantClasses[variant],
          sizeClasses[size],
          'relative flex items-center justify-center gap-2 font-medium transition-all',
          isLoading && 'cursor-not-allowed opacity-70',
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="loader">
              <div></div>
              <div></div>
            </span>
          </span>
        )}
        
        <span className={cn('flex items-center gap-2', isLoading && 'invisible')}>
          {icon && iconPosition === 'left' && <span>{icon}</span>}
          {children}
          {icon && iconPosition === 'right' && <span>{icon}</span>}
        </span>
        
        {variant === 'primary' && !disabled && !isLoading && (
          <span className="absolute inset-0 rounded-lg opacity-0 transition-opacity duration-500 hover:opacity-100 overflow-hidden">
            <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyber to-cyber-light animate-pulse-slow"></span>
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
