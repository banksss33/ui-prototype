import React from 'react';
import '../App.css';

export interface ButtonSquareProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export const ButtonSquare: React.FC<ButtonSquareProps> = ({
  children,
  onClick,
  disabled = false,
  ...props
}) => {
  return (
    <button
      className="button-square"
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};