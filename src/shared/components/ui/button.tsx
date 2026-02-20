import { forwardRef } from "react"
import { cn } from "@/shared/utils/cn"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "default" | "lg"
  asChild?: boolean
}

const variantClasses: Record<string, string> = {
  primary: "bg-primary text-white hover:bg-primary-light hover:shadow-lg hover:shadow-primary/20",
  secondary: "secondary-gradient text-white hover:shadow-lg hover:shadow-secondary/20",
  outline: "border border-primary text-primary hover:bg-primary hover:text-white",
  ghost: "hover:bg-primary/10 hover:text-primary",
}

const sizeClasses: Record<string, string> = {
  sm: "px-6 py-2.5 text-sm",
  default: "px-8 py-4",
  lg: "px-10 py-5",
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", asChild = false, children, ...props }, ref) => {
    const classes = cn(
      "inline-flex items-center justify-center rounded-full font-bold transition-all focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none",
      variantClasses[variant],
      sizeClasses[size],
      className
    )

    if (asChild) {
      return (
        <span className={classes} ref={ref as React.Ref<HTMLSpanElement>} {...props}>
          {children}
        </span>
      )
    }

    return (
      <button className={classes} ref={ref} {...props}>
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"