# TMDB Watchlist App Design Guidelines

## Overview

This document outlines the design system for the TMDB Watchlist App. Our design approach focuses on creating an immersive, cinema-inspired dark theme that enhances the movie browsing experience while maintaining excellent readability and accessibility.

## 1. Theme

The application uses **exclusively dark theme** to create a cinematic atmosphere that:
- Mimics the darkened environment of movie theaters
- Reduces eye strain during extended browsing sessions
- Makes movie posters and imagery visually pop against the dark background
- Creates a premium, modern aesthetic

## 2. Color Palette

### Primary Colors

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| Primary | `#bb86fc` | Primary actions, highlights, active states |
| Primary Variant | `#3700b3` | Secondary actions, hover states |
| Secondary | `#03dac6` | Accent elements, success states |

### Background Colors

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| Background | `#121212` | Main application background |
| Surface | `#1e1e1e` | Card backgrounds, elevated surfaces |
| Surface Light | `#2d2d2d` | Modals, dialogs, higher elevation surfaces |

### Text Colors

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| Text Primary | `#ffffff` | Primary text, headings |
| Text Secondary | `#b3b3b3` | Secondary text, descriptions |
| Text Disabled | `#666666` | Disabled text elements |

### Status Colors

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| Error | `#cf6679` | Error states, destructive actions |
| Warning | `#ffb74d` | Warning indicators |
| Success | `#4caf50` | Success indicators, completion |
| Info | `#2196f3` | Informational elements |

## 3. Typography

We use the Roboto font family throughout the application, with clear hierarchies to enhance readability.

### Font Weights
- Light: 300
- Regular: 400
- Medium: 500
- Bold: 700

### Type Scale

| Element | Size | Weight | Line Height | Usage |
|---------|------|--------|-------------|-------|
| h1 | 2.5rem | Bold | 1.2 | Main page headers |
| h2 | 2rem | Bold | 1.2 | Section headers |
| h3 | 1.75rem | Medium | 1.3 | Card headers, movie titles |
| h4 | 1.5rem | Medium | 1.3 | Sub-sections |
| h5 | 1.25rem | Medium | 1.4 | Minor headings |
| h6 | 1rem | Medium | 1.4 | Small headings |
| Body 1 | 1rem | Regular | 1.5 | Main body text |
| Body 2 | 0.875rem | Regular | 1.5 | Secondary body text |
| Caption | 0.75rem | Regular | 1.5 | Captions, supplementary information |

## 4. Spacing & Layout

We use an 8px base unit for spacing to maintain consistency across the application.

### Spacing Scale
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- xxl: 48px

### Grid System
- Container max-width: 1200px
- 12-column grid system
- Default gutters: 24px
- Responsive breakpoints:
  - xs: 0px
  - sm: 600px
  - md: 960px
  - lg: 1280px
  - xl: 1920px

## 5. Component Guidelines

### Cards
- Movie cards should have consistent dimensions
- Surface color background (`#1e1e1e`)
- 8px rounded corners
- Subtle elevation shadows
- 16px internal padding
- Poster images should maintain consistent aspect ratio

### Buttons
- Primary actions: Filled buttons with primary color
- Secondary actions: Outlined buttons
- Text buttons for tertiary actions
- 8px rounded corners
- Consistent padding: 8px 16px

### Icons
- 24px standard size
- Use Material Icons for consistency
- Icon buttons should have appropriate hover states

### Lists
- 16px spacing between list items
- Subtle dividers where appropriate (`rgba(255, 255, 255, 0.12)`)

### Input Fields
- Outlined style for better visibility on dark backgrounds
- 16px padding
- Clear focus states with primary color
- Appropriate helper text for validation

## 6. Iconography

- Use Material Icons as the primary icon set
- Maintain consistent sizing:
  - Small: 16px
  - Default: 24px
  - Large: 32px
- Use icons sparingly and purposefully
- Ensure icons have sufficient contrast against backgrounds

## 7. Motion & Animations

- Subtle animations to enhance user experience
- Standard durations:
  - Short: 150ms
  - Standard: 250ms
  - Complex: 300ms
- Use easing functions: 
  - Standard: cubic-bezier(0.4, 0.0, 0.2, 1)
  - Deceleration: cubic-bezier(0.0, 0.0, 0.2, 1)
  - Acceleration: cubic-bezier(0.4, 0.0, 1, 1)

## 8. Accessibility

- Maintain minimum AA WCAG 2.1 compliance
- Ensure text contrast ratios:
  - Small text: minimum 4.5:1 against backgrounds
  - Large text: minimum 3:1 against backgrounds
- Provide visual indicators for focus states
- Ensure interactive elements have appropriate hover states
- Design with screen readers in mind

## 9. Implementation

### MUI Theme Configuration

The dark theme should be implemented using Material UI's theming system:

```typescript
import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#bb86fc',
      light: '#dbb5ff',
      dark: '#9a67ea',
      contrastText: '#000000',
    },
    secondary: {
      main: '#03dac6',
      light: '#84ffff',
      dark: '#00a896',
      contrastText: '#000000',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    error: {
      main: '#cf6679',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b3b3b3',
      disabled: '#666666',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    // Additional typography settings...
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
});
```

### Usage Guidelines

- Apply theme using the `ThemeProvider` from MUI
- Use semantic color variables rather than hardcoded values
- Maintain consistent spacing using the theme spacing function
- Utilize MUI's styling solutions (`sx` prop or `styled` API)

## 10. Movie-Specific Design Considerations

### Movie Cards
- Prioritize movie poster visibility
- Include essential information only (title, year, rating)
- Use hover effects to reveal additional actions

### Rating Visualization
- Use consistent visual treatment for TMDB ratings
- Consider color-coding (green for high, yellow for medium, red for low)

### Watch Status Indicators
- Clear visual distinction between "Watched" and "Watchlist" items
- Use recognizable icons (bookmark for watchlist, checkmark for watched)

### Movie Details View
- Hero layout with prominent backdrop image
- Clearly organized information hierarchy
- Prominent action buttons for adding to lists 