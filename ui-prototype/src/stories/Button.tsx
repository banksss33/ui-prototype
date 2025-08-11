import React from 'react';

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'circle' | 'pill' | 'square';
  size?: 'small' | 'medium' | 'large';
  color?: string;
  fontSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';
  textColor?: 'white' | 'black' | 'gray';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  variant = 'square',
  size = 'medium',
  color,
  fontSize,
  textColor,
  ...props
}) => {
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  const darkenColor = (hex: string, percent: number) => {
    const rgb = hexToRgb(hex);
    const factor = 1 - (percent / 100);
    return `rgb(${Math.round(rgb.r * factor)}, ${Math.round(rgb.g * factor)}, ${Math.round(rgb.b * factor)})`;
  };

  const addAlpha = (hex: string, alpha: number) => {
    const rgb = hexToRgb(hex);
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
  };

  const generateColorStyle = (hexColor: string) => {
    const borderColor = darkenColor(hexColor, 20);
    const shadowColor = darkenColor(hexColor, 30);
    const shadowColorAlpha = addAlpha(darkenColor(hexColor, 30), 0.5);
    
    return {
      backgroundColor: hexColor,
      borderColor: borderColor,
      borderWidth: '1px',
      borderStyle: 'solid',
      boxShadow: `0 10px 0 0 ${shadowColor}, 0 15px 0 0 ${shadowColorAlpha}`,
      '--disabled-active-shadow': `0 10px 0 0 ${shadowColor}, 0 15px 0 0 ${shadowColorAlpha}`
    } as React.CSSProperties & { '--disabled-active-shadow': string };
  };

  const fontSizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm', 
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl'
  };

  const textColorClasses = {
    white: 'text-white',
    black: 'text-black',
    gray: 'text-gray-700',
  };

  const getSizeClasses = () => {
    const sizeVariants = {
      circle: {
        small: 'w-[8vw] h-[8vw] min-w-10 min-h-10 max-w-16 max-h-16',
        medium: 'w-[12vw] h-[12vw] min-w-16 min-h-16 max-w-20 max-h-20',
        large: 'w-[16vw] h-[16vw] min-w-20 min-h-20 max-w-24 max-h-24',
      },
      pill: {
        small: 'px-6 py-2 min-h-8',
        medium: 'px-8 py-3 min-h-10',
        large: 'px-10 py-4 min-h-12',
      },
      square: {
        small: 'w-[25vw] h-[8vh] min-w-32 min-h-10 max-w-40 max-h-12',
        medium: 'w-[35vw] h-[10vh] min-w-40 min-h-12 max-w-48 max-h-16',
        large: 'w-[45vw] h-[12vh] min-w-48 min-h-16 max-w-56 max-h-20'
      }
    };
    
    return sizeVariants[variant][size];
  };

  const getRoundedClasses = () => {
    switch (variant) {
      case 'circle':
        return 'rounded-full flex items-center justify-center';
      case 'pill':
        return 'rounded-full';
      case 'square':
        return 'rounded-lg';
      default:
        return 'rounded-lg';
    }
  };

  const isLightColor = (hexColor: string) => {
    const rgb = hexToRgb(hexColor);
    // Calculate perceived brightness using formula
    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    return brightness > 128;
  };

  const getTextColor = () => {
    if (textColor) return textColorClasses[textColor];
    
    if (color) {
      return isLightColor(color) ? 'text-black' : 'text-white';
    }
    
    // Default text colors by variant
    if (variant === 'circle') return 'text-gray-700';
    return 'text-white';
  };

  const getFontSize = () => {
    if (fontSize) return fontSizeClasses[fontSize];
    
    const defaultSizes = {
      small: 'text-sm',
      medium: 'text-base', 
      large: 'text-lg'
    };
    return defaultSizes[size];
  };
  

  const getDefaultStyles = () => {
    if (color) return '';
    
    // Default styles by variant
    switch (variant) {
      case 'circle':
        return 'bg-gray-100 border border-gray-200 shadow-[0_10px_0_0_#d1d5db,0_15px_0_0_#d1d5db4a] active:shadow-none disabled:active:shadow-[0_10px_0_0_#d1d5db,0_15px_0_0_#d1d5db4a]';
      case 'pill':
        return 'bg-blue-500 border border-blue-600 shadow-[0_10px_0_0_#2563eb,0_15px_0_0_#2563eb80] active:shadow-none disabled:active:shadow-[0_10px_0_0_#2563eb,0_15px_0_0_#2563eb80]';
      case 'square':
      default:
        return 'bg-blue-500 border border-blue-600 shadow-[0_10px_0_0_#2563eb,0_15px_0_0_#2563eb80] active:shadow-none disabled:active:shadow-[0_10px_0_0_#2563eb,0_15px_0_0_#2563eb80]';
    }
  };

  const defaultClasses = getDefaultStyles();
  const colorStyles = color ? generateColorStyle(color) : null;
  
  const baseClasses = `cursor-pointer select-none transition-all duration-150 font-bold focus:outline-none active:translate-y-2 active:border-b-[0px] disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0 disabled:active:translate-y-0`;
  const colorClass = color ? 'custom-color-button' : '';
  const allClasses = `${baseClasses} ${!color ? defaultClasses : colorClass} ${getSizeClasses()} ${getRoundedClasses()} ${getTextColor()} ${getFontSize()}`;
  
  return (
    <button
      className={allClasses}
      style={colorStyles || undefined}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};