"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const variants = {
  primary: "bg-brand text-brand-bg hover:opacity-90 shadow-lg shadow-brand/20",
  secondary:
    "bg-brand-surface text-brand-text hover:bg-brand-surface-light border border-brand-border",
  outline:
    "bg-transparent border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-brand-bg",
  ghost: "bg-transparent text-brand-text hover:bg-brand-surface/50",
  danger:
    "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20",
  white: "bg-white text-brand-bg hover:bg-gray-100",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-4 text-base",
  icon: "p-2 aspect-square",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  fullWidth,
  children,
  onClick,
  type = "button",
  disabled,
  ...props
}) {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      )}
      {...props}>
      {children}
    </motion.button>
  );
}
