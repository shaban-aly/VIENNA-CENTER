import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
};

export function Input({ className = "", error = false, ...props }: InputProps) {
  return (
    <input
      className={`min-h-14 w-full rounded-[14px] border bg-card-secondary px-4 text-right text-sm text-white outline-none transition placeholder:text-muted focus:border-gold ${error ? "border-danger" : "border-border"} ${className}`}
      {...props}
    />
  );
}
