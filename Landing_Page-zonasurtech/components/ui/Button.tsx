'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  glow?: boolean;
}

export const Button = ({ 
  children, 
  className, 
  variant = 'primary', 
  size = 'md', 
  isLoading, 
  glow = false,
  ...props 
}: ButtonProps) => {
  
  const variants = {
    primary: "bg-emerald-600 text-white border-emerald-500/50 hover:bg-emerald-500",
    secondary: "bg-slate-800 text-white border-slate-700 hover:bg-slate-700",
    accent: "bg-blue-600 text-white border-blue-500/50 hover:bg-blue-500",
    outline: "bg-transparent border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10",
    ghost: "bg-transparent border-transparent text-slate-400 hover:text-white hover:bg-slate-800/50"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }} // Dynamics.js bounce physics
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-colors duration-200 border",
        "disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        glow && variant === 'primary' && "shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.6)]",
        glow && variant === 'accent' && "shadow-[0_0_20px_-5px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_-5px_rgba(37,99,235,0.6)]",
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
      
      {/* Internal shine effect */}
      <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
        <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-10 group-hover:animate-shine" />
      </div>
    </motion.button>
  );
};
