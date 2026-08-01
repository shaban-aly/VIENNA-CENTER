import type { ReactNode } from "react";

type AuthFieldProps = {
  label: string;
  error?: string;
  children: ReactNode;
};

export function AuthField({ label, error, children }: AuthFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-bold text-muted">{label}</label>
      {children}
      {error ? <p className="text-xs font-bold text-danger">{error}</p> : null}
    </div>
  );
}
