import { CalendarDays } from "lucide-react";
import { terms } from "@/data/terms";

export function TermsContent() {
  return (
    <div className="space-y-4">
      <div className="rounded-[18px] border border-border bg-card p-5">
        <div className="flex items-center gap-2 text-sm font-bold text-gold">
          <CalendarDays size={17} />
          آخر تحديث: {terms.lastUpdated}
        </div>
        <p className="mt-3 text-sm leading-7 text-muted">{terms.intro}</p>
      </div>

      {terms.sections.map((section, index) => (
        <article
          key={section.id}
          className="rounded-[18px] border border-border bg-card p-5"
        >
          <h2 className="flex items-center gap-3 text-base font-black text-white md:text-lg">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-gold/25 bg-gold/10 text-sm font-black text-gold">
              {index + 1}
            </span>
            {section.title}
          </h2>

          <div className="mt-4 space-y-3">
            {section.paragraphs.map((paragraph, paragraphIndex) => (
              <p
                key={paragraphIndex}
                className="text-sm leading-7 text-muted"
              >
                {paragraph}
              </p>
            ))}

            {section.list && (
              <ul className="space-y-2 pt-1">
                {section.list.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="flex gap-2 text-sm leading-7 text-muted"
                  >
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
