import type { HTMLAttributes, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Card({ className = "", ...props }: CardProps) {
  return <div className={`rounded-lg border border-neutral-200 bg-white shadow-sm ${className}`} {...props} />;
}
