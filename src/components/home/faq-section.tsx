"use client";

import { ChevronDown, CircleHelp } from "lucide-react";
import { SectionHeader } from "@/components/ui";
import { faqs } from "@/data/mock";
import { useFaqAccordion } from "@/hooks/home/use-faq-accordion";

export function FaqSection() {
  const { openId, toggleItem } = useFaqAccordion();

  return (
    <section id="faq" className="scroll-mt-6">
      <SectionHeader title="الأسئلة الشائعة" />

      <div className="space-y-3">
        {faqs.map((item) => {
          const isOpen = openId === item.id;

          return (
            <div
              key={item.id}
              className={`overflow-hidden rounded-[18px] border bg-card transition ${
                isOpen ? "border-gold/40" : "border-border"
              }`}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${item.id}`}
                className="flex min-h-16 w-full items-center gap-3 px-4 py-3.5 text-right transition hover:bg-card-secondary"
                onClick={() => toggleItem(item.id)}
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-gold/25 bg-gold/10">
                  <CircleHelp
                    className="text-gold"
                    size={20}
                    strokeWidth={1.8}
                  />
                </div>
                <span className="flex-1 text-sm font-black text-white md:text-base">
                  {item.question}
                </span>
                <ChevronDown
                  className={`shrink-0 text-gold transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  size={20}
                />
              </button>

              <div
                id={`faq-panel-${item.id}`}
                className={`grid transition-[grid-template-rows] duration-300 ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="pr-[4.25rem] pb-5 pl-4 text-sm leading-7 text-muted">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
