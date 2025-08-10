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