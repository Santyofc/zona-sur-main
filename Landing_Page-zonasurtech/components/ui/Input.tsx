'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  error?: string;
}

export const Input = ({ label, icon, error, className, id, ...props }: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const inputId = id || `input-${label.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className={cn("relative group mb-5", className)}>
      <motion.div 
        animate={isFocused ? { scale: 1.02 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={cn(
          "relative flex items-center bg-slate-900/40 border rounded-xl transition-all duration-300 overflow-hidden backdrop-blur-sm",
          error ? "border-red-500/50" : isFocused ? "border-blue-500/80 shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)]" : "border-slate-700 group-hover:border-slate-600"
        )}
      >
        {icon && (
          <div className={cn(
            "pl-4 text-slate-500 transition-colors duration-300",
            isFocused && "text-blue-400"
          )}>
            {icon}
          </div>
        )}
        
        <div className="relative flex-1 h-14">
          <input
            id={inputId}
            className={cn(
              "absolute inset-0 w-full h-full bg-transparent px-4 pt-4 pb-1 text-slate-200 outline-none placeholder:opacity-0",
              !icon && "pl-4",
              "autofill:bg-slate-900/0"
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={(e) => {
              setIsFocused(false);
              setHasValue(!!e.target.value);
            }}
            onChange={(e) => {
              setHasValue(!!e.target.value);
              props.onChange?.(e);
            }}
            {...props}
          />
          <label
            htmlFor={inputId}
            className={cn(
              "absolute left-4 transition-all duration-300 pointer-events-none text-slate-500 font-medium",
              (isFocused || hasValue) ? "top-2 text-[10px] text-blue-400 uppercase tracking-wider" : "top-4 text-sm"
            )}
          >
            {label}
          </label>
        </div>

        {/* Tech Glow Line */}
        <motion.div 
          initial={{ width: "0%" }}
          animate={{ width: isFocused ? "100%" : "0%" }}
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
        />
      </motion.div>
      
      <AnimatePresence>
        {error && (
          <motion.span 
            initial={{ opacity: 0, y: -5, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="text-[10px] text-red-400 mt-1 ml-1 flex items-center gap-1 font-medium"
          >
            <span className="w-1 h-1 rounded-full bg-red-500 inline-block"/>
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};
