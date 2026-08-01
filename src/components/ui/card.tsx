import type { HTMLAttributes, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <div
      className={`rounded-[18px] border border-border bg-card p-5 transition hover:border-gold/50 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
