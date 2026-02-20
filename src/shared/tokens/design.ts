// Design Tokens - Cores
export const colors = {
  primary: {
    DEFAULT: "var(--color-primary)",
    light: "var(--color-primary-light)",
    dark: "var(--color-primary-dark)",
  },
  secondary: {
    DEFAULT: "var(--color-secondary)",
    light: "var(--color-secondary-light)",
    dark: "var(--color-secondary-dark)",
  },
  neutral: {
    50: "#FAFAFA",
    100: "#F5F5F5",
    200: "#E5E5E5",
    300: "#D4D4D4",
    400: "#A3A3A3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
  },
  white: "#FFFFFF",
  black: "#000000",
} as const

// Design Tokens - Espaçamento
export const spacing = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
  "2xl": "3rem",
  "3xl": "4rem",
  "4xl": "6rem",
} as const

// Design Tokens - Tipografia
export const typography = {
  fontFamily: {
    display: "var(--font-display)",
    sans: "var(--font-sans)",
  },
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
    "8xl": "6rem",
  },
  fontWeight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
  },
  lineHeight: {
    tight: "1.25",
    snug: "1.375",
    normal: "1.5",
    relaxed: "1.625",
    loose: "2",
  },
} as const

// Design Tokens - Bordas
export const borders = {
  radius: {
    none: "0",
    sm: "0.125rem",
    DEFAULT: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    "2xl": "1rem",
    "3xl": "1.5rem",
    full: "9999px",
  },
  width: {
    none: "0",
    DEFAULT: "1px",
    "2": "2px",
    "4": "4px",
    "8": "8px",
  },
} as const

// Design Tokens - Sombras
export const shadows = {
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
  none: "none",
} as const

// Design Tokens - Transições
export const transitions = {
  duration: {
    fast: "150ms",
    DEFAULT: "300ms",
    slow: "500ms",
  },
  easing: {
    DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
    in: "cubic-bezier(0.4, 0, 1, 1)",
    out: "cubic-bezier(0, 0, 0.2, 1)",
    inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
} as const

// Design Tokens - Breakpoints
export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const

// Gradient Tokens
export const gradients = {
  primary: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)",
  secondary: "linear-gradient(135deg, var(--color-secondary) 0%, var(--color-secondary-light) 100%)",
  text: "linear-gradient(to right, var(--color-primary), var(--color-secondary))",
} as const

export type ColorToken = keyof typeof colors
export type SpacingToken = keyof typeof spacing
export type FontSizeToken = keyof typeof typography.fontSize
export type FontWeightToken = keyof typeof typography.fontWeight
export type BorderRadiusToken = keyof typeof borders.radius
export type ShadowToken = keyof typeof shadows