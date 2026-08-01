import type { ReactNode, SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  children: ReactNode;
  error?: boolean;
};

export function Select({ children, className = "", error = false, ...props }: SelectProps) {
  return (
    <select
      className={`min-h-14 w-full rounded-[14px] border bg-card-secondary px-4 text-right text-sm text-white outline-none transition focus:border-gold ${error ? "border-danger" : "border-border"} ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}
