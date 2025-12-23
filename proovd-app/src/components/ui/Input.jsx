"use client";

import { cn } from "@/lib/utils";

export function Input({
  className,
  label,
  error,
  type = "text",
  id,
  fullWidth = true,
  ...props
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", fullWidth && "w-full")}>
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-brand-text/80 pl-1">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        className={cn(
          "bg-brand-bg border border-brand-surface-light/30 rounded-xl px-4 py-3 text-brand-text placeholder-brand-text-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-all duration-200",
          error && "border-red-500 focus:ring-red-500/50",
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-red-500 pl-1">{error}</span>}
    </div>
  );
}
