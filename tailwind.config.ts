
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				cyber: {
					DEFAULT: '#0070f3',
					dark: '#005cc5',
					light: '#3291ff',
					'super-light': '#d3e5ff'
				},
				success: {
					DEFAULT: '#10b981',
					light: '#d1fae5'
				},
				warning: {
					DEFAULT: '#f59e0b',
					light: '#fef3c7'
				},
				error: {
					DEFAULT: '#ef4444',
					light: '#fee2e2'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'fade-out': {
					'0%': { opacity: '1' },
					'100%': { opacity: '0' }
				},
				'slide-up': {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'slide-down': {
					'0%': { transform: 'translateY(-20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'slide-left': {
					'0%': { transform: 'translateX(20px)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				'slide-right': {
					'0%': { transform: 'translateX(-20px)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'scale-out': {
					'0%': { transform: 'scale(1)', opacity: '1' },
					'100%': { transform: 'scale(0.95)', opacity: '0' }
				},
				'pulse-slow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.7' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'spin-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'border-pulse': {
					'0%, 100%': { borderColor: 'rgba(0, 112, 243, 0.4)' },
					'50%': { borderColor: 'rgba(0, 112, 243, 1)' }
				},
				'glow': {
					'0%, 100%': { boxShadow: '0 0 5px rgba(0, 112, 243, 0.4), 0 0 10px rgba(0, 112, 243, 0.2)' },
					'50%': { boxShadow: '0 0 20px rgba(0, 112, 243, 0.6), 0 0 30px rgba(0, 112, 243, 0.4)' }
				},
				'bounce-subtle': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }
				},
				'shimmer': {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' }
				},
				'rotate-y': {
					'0%': { transform: 'rotateY(0deg)' },
					'100%': { transform: 'rotateY(360deg)' }
				},
				'wiggle': {
					'0%, 100%': { transform: 'rotate(-3deg)' },
					'50%': { transform: 'rotate(3deg)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out forwards',
				'fade-out': 'fade-out 0.5s ease-out forwards',
				'slide-up': 'slide-up 0.5s ease-out forwards',
				'slide-down': 'slide-down 0.5s ease-out forwards',
				'slide-left': 'slide-left 0.5s ease-out forwards',
				'slide-right': 'slide-right 0.5s ease-out forwards',
				'scale-in': 'scale-in 0.5s ease-out forwards',
				'scale-out': 'scale-out 0.5s ease-out forwards',
				'pulse-slow': 'pulse-slow 3s infinite ease-in-out',
				'float': 'float 5s infinite ease-in-out',
				'spin-slow': 'spin-slow 15s linear infinite',
				'border-pulse': 'border-pulse 2s infinite',
				'glow': 'glow 2s infinite',
				'bounce-subtle': 'bounce-subtle 2s infinite ease-in-out',
				'shimmer': 'shimmer 3s infinite linear',
				'rotate-y': 'rotate-y 3s infinite linear',
				'wiggle': 'wiggle 1s ease-in-out infinite'
			},
			fontFamily: {
				sans: ['Inter var', 'Inter', 'sans-serif'],
				mono: ['SF Mono', 'monospace']
			},
			backdropBlur: {
				xs: '2px',
			},
			backgroundImage: {
				'gradient-cyber': 'linear-gradient(to right, #0070f3, #00c3ff)',
				'gradient-cyber-dark': 'linear-gradient(to right, #005cc5, #0099cc)',
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-cyber-radial': 'radial-gradient(circle at top right, #0070f3, transparent 60%)',
				'gradient-dots': 'radial-gradient(circle, #0070f3 1px, transparent 1px)',
				'gradient-shimmer': 'linear-gradient(90deg, transparent, rgba(0,112,243,0.2), transparent)',
				'gradient-success': 'linear-gradient(to right, #10b981, #34d399)',
				'gradient-warning': 'linear-gradient(to right, #f59e0b, #fbbf24)',
				'gradient-error': 'linear-gradient(to right, #ef4444, #f87171)',
			},
			backgroundSize: {
				'dots-sm': '20px 20px',
				'dots-md': '30px 30px',
				'dots-lg': '40px 40px',
				'shimmer': '200% 100%',
			},
			boxShadow: {
				'neo': '8px 8px 16px #d1d9e6, -8px -8px 16px #f5f9ff',
				'neo-sm': '5px 5px 10px #d1d9e6, -5px -5px 10px #f5f9ff',
				'neo-inner': 'inset 5px 5px 10px #d1d9e6, inset -5px -5px 10px #f5f9ff',
				'glass': '0 8px 32px rgba(0, 0, 0, 0.1)',
				'glass-sm': '0 4px 16px rgba(0, 0, 0, 0.05)',
				'glass-highlight': '0 0 0 1px rgba(255, 255, 255, 0.2)',
				'button': '0 4px 14px rgba(0, 112, 243, 0.3)',
				'button-hover': '0 6px 20px rgba(0, 112, 243, 0.5)',
				'success': '0 4px 14px rgba(16, 185, 129, 0.3)',
				'warning': '0 4px 14px rgba(245, 158, 11, 0.3)',
				'error': '0 4px 14px rgba(239, 68, 68, 0.3)',
				'glow-blue': '0 0 15px rgba(0, 112, 243, 0.5)',
				'glow-green': '0 0 15px rgba(16, 185, 129, 0.5)',
				'glow-red': '0 0 15px rgba(239, 68, 68, 0.5)',
			},
			transitionDuration: {
				'2000': '2000ms',
				'3000': '3000ms',
			},
			transitionTimingFunction: {
				'gentle': 'cubic-bezier(0.4, 0, 0.2, 1)',
				'spring': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
