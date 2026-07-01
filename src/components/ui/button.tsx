import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm";
  children: ReactNode;
};

export function Button({ className = "", variant = "default", size = "default", ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center rounded-lg font-semibold transition-all disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    default: "bg-[hsl(var(--primary))] text-white hover:bg-[hsl(var(--primary-dark))]",
    outline: "border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-50",
    ghost: "bg-transparent text-neutral-700 hover:bg-neutral-100",
  };
  const sizes = {
    default: "px-4 py-2",
    sm: "px-3 py-1.5 text-sm",
  };

  return <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props} />;
}
