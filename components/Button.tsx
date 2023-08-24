import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ children, className, disabled, type = "button", ...props }, ref) => {
    return (
      <button
        type={type}
        disabled={disabled}
        className={twMerge(
          `w-full
           font-bold
           rounded-full
           bg-green-500
           border 
           border-transparent 
           p-3 
           disabled:cursor-not-allowed
           text-black 
           disabled:opacity-50 
           hover:bg-green-600 
           hover:opacity-80  
           transition`,
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
