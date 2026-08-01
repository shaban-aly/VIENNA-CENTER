export function AuthDivider() {
  return (
    <div className="flex items-center gap-3" role="separator">
      <span className="h-px flex-1 bg-border" />
      <span className="text-xs font-bold text-muted">أو</span>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}
