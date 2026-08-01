import { Quote, Star } from "lucide-react";
import { testimonials } from "@/data/mock";
import { Card, SectionHeader } from "@/components/ui";

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="scroll-mt-6">
      <SectionHeader title="آراء طلابنا" />
      <div className="grid gap-3 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <Card
            key={testimonial.id}
            className="relative flex h-52 flex-col justify-between overflow-hidden p-5"
          >
            <Quote
              className="absolute left-5 top-5 text-gold/15"
              size={44}
              fill="currentColor"
            />
            <div>
              <div className="flex gap-1 text-gold">
                {Array.from({ length: testimonial.rating }).map((_, index) => (
                  <Star key={index} size={17} fill="currentColor" />
                ))}
              </div>
              <p className="relative mt-4 line-clamp-3 text-sm leading-7 text-white">
                {testimonial.content}
              </p>
            </div>

            <div className="flex items-center gap-3 border-t border-border pt-4">
              <div className="flex size-10 items-center justify-center rounded-xl border border-gold/35 bg-black text-base font-black text-gold">
                {testimonial.studentName.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-black">{testimonial.studentName}</p>
                <p className="truncate text-xs text-muted">{testimonial.grade}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
