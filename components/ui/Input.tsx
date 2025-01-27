import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, helperText, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={props.id} 
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              {icon}
            </div>
          )}
          
          <input
            ref={ref}
            {...props}
            className={`
              block w-full rounded-md 
              ${icon ? 'pl-10' : 'pl-4'} 
              pr-4 py-2.5
              bg-zinc-800 
              border border-zinc-700 
              text-white 
              placeholder-gray-400
              shadow-sm 
              focus:border-orange-500 
              focus:ring-1 
              focus:ring-orange-500 
              transition-colors
              disabled:opacity-50
              disabled:cursor-not-allowed
              ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
              ${className}
            `}
          />
        </div>

        {(error || helperText) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1"
          >
            {error ? (
              <p className="text-sm text-red-500">{error}</p>
            ) : helperText ? (
              <p className="text-sm text-gray-400">{helperText}</p>
            ) : null}
          </motion.div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
