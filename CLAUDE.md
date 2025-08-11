# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React UI component library prototype built with Storybook for component development and testing. The project uses modern tools including Vite, TypeScript, TailwindCSS v4, and Vitest for testing.

## Development Commands

```bash
# Start Storybook development server (primary development environment)
npm run storybook

# Start Vite development server for the main app
npm run dev

# Build the application
npm run build

# Run linting
npm run lint

# Build Storybook for production
npm run build-storybook

# Preview production build
npm run preview
```

## Architecture

### Component Structure
- **Location**: `src/stories/` - All UI components are stored here
- **Naming**: Components use PascalCase (e.g., `ButtonSquare`, `ButtonCircle`)
- **Files**: Each component has:
  - Component file: `component-name.tsx` 
  - Story file: `ComponentName.stories.ts`

### Styling System
- **Framework**: TailwindCSS v4 with Vite plugin integration
- **Custom Styles**: Defined in `src/App.css` using Tailwind's `@apply` directive
- **Button Components**: Use custom CSS classes (`.button-square`, `.button-circle`) with:
  - 3D shadow effects using box-shadow
  - Active state animations (translate-y and shadow changes)
  - Disabled state styling (opacity + cursor changes)

### Component Patterns
- All components export TypeScript interfaces for props
- Components support standard React props via spread operator (`...props`)
- Disabled state handling includes both visual styling and interaction prevention
- Button components use consistent patterns:
  ```typescript
  export interface ComponentProps {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    // component-specific props
  }
  ```

### Storybook Configuration
- **Port**: 6006 (default)
- **Features**: 
  - Addon-docs for documentation
  - A11y addon for accessibility testing
  - Vitest addon for component testing
  - Onboarding addon
- **Story Structure**: Uses CSF (Component Story Format) 3.0
- **Testing**: Integrated with Vitest and Playwright for browser testing

### Build & Testing Stack
- **Build Tool**: Vite with React plugin
- **TypeScript**: Strict configuration with project references
- **Testing**: Vitest with browser testing via Playwright
- **Linting**: ESLint with TypeScript and React plugins
- **UI Components**: Radix UI primitives (@radix-ui/react-slot, @radix-ui/react-primitive)

## Component Development Workflow

1. Create component in `src/stories/[component-name].tsx`
2. Create corresponding story file `src/stories/ComponentName.stories.ts`
3. Add custom styles to `src/App.css` if needed (follow existing patterns)
4. Use Storybook for development and testing (`npm run storybook`)
5. Components are primarily developed and showcased through Storybook, not the main app

## Important Notes

- The main React app (`src/App.tsx`) is minimal - development focuses on Storybook
- Custom CSS classes in `App.css` use TailwindCSS utilities with `@apply`
- Button animations use translate and box-shadow transitions
- Disabled state styling prevents animations and changes visual appearance
- All components should support disabled state properly

## Reference Implementation: Button Component

Current working Button component with color picker and proper disabled state handling:

```typescript
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

  const isLightColor = (hexColor: string) => {
    const rgb = hexToRgb(hexColor);
    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    return brightness > 128;
  };

  const getTextColor = () => {
    if (textColor) return textColorClasses[textColor];
    if (color) return isLightColor(color) ? 'text-black' : 'text-white';
    if (variant === 'circle') return 'text-gray-700';
    return 'text-white';
  };

  // ... other helper functions for sizes, fonts, etc.

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
```

**Key Features:**
- **Color Picker Integration**: Accepts any hex color via `color?: string` prop
- **Dynamic Color Generation**: Automatically generates darker borders (20%) and shadows (30%) from main color
- **Intelligent Text Color**: Automatically chooses black or white text based on color brightness
- **Proper Shadow Handling**: Uses `custom-color-button` CSS class with `active:shadow-none` and `disabled:active:shadow-[original]`
- **Unified Disabled State**: Tailwind's `disabled:` directive prevents animation bugs
- **Responsive Design**: Viewport units with min/max constraints for all variants
- **3 Variants**: circle, pill, square with proper sizing and styling
- **Storybook Integration**: Color picker control for easy experimentation