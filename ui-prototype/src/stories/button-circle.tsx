import React from 'react';
import '../App.css';

export interface ButtonCircleProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const ButtonCircle: React.FC<ButtonCircleProps> = ({
  children,
  onClick,
  disabled = false,
  size = 'medium',
  ...props
}) => {
  const sizeClasses = {
    small: 'w-10 h-10 text-sm',
    medium: 'w-16 h-16 text-base',
    large: 'w-20 h-20 text-lg'
  };

  return (
    <button
      className={`button-circle ${sizeClasses[size]} text-white font-bold focus:outline-none flex items-center justify-center`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};