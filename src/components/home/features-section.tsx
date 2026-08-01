import { features } from "@/data/mock";
import { Card, SectionHeader } from "@/components/ui";

export function FeaturesSection() {
  return (
    <section id="features" className="scroll-mt-6">
      <SectionHeader title="مميزات سنتر فيينا" />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <Card
              key={feature.label}
              className="group flex h-34 flex-col justify-between overflow-hidden p-3 md:h-36"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl border border-gold/25 bg-gold/10 transition group-hover:scale-105">
                  <Icon className="text-gold" size={24} strokeWidth={1.7} />
                </div>
                <span className="text-xs font-black text-gold">فيينا</span>
              </div>
              <div>
                <h3 className="text-base font-black leading-6 text-white">
                  {feature.label}
                </h3>
                <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted">
                  {feature.description}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
