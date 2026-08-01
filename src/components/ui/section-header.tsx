import Link from "next/link";

type SectionHeaderProps = {
  title: string;
  action?: string;
  actionHref?: string;
};

export function SectionHeader({ title, action, actionHref }: SectionHeaderProps) {
  return (
    <div className="mb-4 flex items-center justify-between gap-4">
      <span className="h-px flex-1 bg-border" />
      <h2 className="text-lg font-bold text-gold">{title}</h2>
      <div className="flex flex-1 justify-end">
        {action && actionHref ? (
          <Link
            href={actionHref}
            className="text-sm font-semibold text-gold transition hover:text-gold-light"
          >
            {action}
          </Link>
        ) : null}
        {action && !actionHref ? (
          <span className="text-sm font-semibold text-gold">{action}</span>
        ) : null}
      </div>
    </div>
  );
}
