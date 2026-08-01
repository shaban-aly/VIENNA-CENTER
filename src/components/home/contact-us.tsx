"use client";

import { MapPin, MessageCircle, Phone, Send, Share2 } from "lucide-react";
import { Button, SectionHeader } from "@/components/ui";
import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
  YouTubeIcon,
} from "@/components/ui/social-icons";
import { useContactForm } from "@/hooks/home/use-contact-form";

const contactCards = [
  {
    title: "راسلنا على واتساب",
    value: "010 110 156 04",
    hint: "اضغط للتواصل معنا مباشرة",
    href: "https://wa.me/201011015604?text=مرحباً، أرغب في الاستفسار عن سنتر فيينا التعليمي.",
    icon: MessageCircle,
    accent: "text-gold",
    box: "border-gold/25 bg-gold/10",
  },
  {
    title: "موقعنا",
    value: "السويس - الغريب - الكورنيش القديم - امام منتجع الوتر واي",
    hint: "اضغط لعرض الموقع على الخريطة",
    href: "https://maps.app.goo.gl/g7wtX8xgY74veGqY8",
    icon: MapPin,
    accent: "text-gold",
    box: "border-gold/25 bg-gold/10",
  },
  {
    title: "اتصل بنا",
    value: "010 110 156 04",
    hint: "متاح من 4 م إلى 9 م يوميا",
    href: "tel:01011015604",
    icon: Phone,
    accent: "text-gold",
    box: "border-gold/25 bg-gold/10",
  },
];

const socialLinks = [
  {
    label: "فيسبوك",
    href: "https://www.facebook.com/centervienna",
    Icon: FacebookIcon,
  },
  {
    label: "انستجرام",
    href: "https://www.instagram.com/centervienna",
    Icon: InstagramIcon,
  },
  {
    label: "تيك توك",
    href: "https://www.tiktok.com/@centervienna",
    Icon: TikTokIcon,
  },
  {
    label: "يوتيوب",
    href: "https://www.youtube.com/@centervienna",
    Icon: YouTubeIcon,
  },
];

export function ContactUs() {
  const { form, sending, sent, updateField, handleSubmit, resetSentState } =
    useContactForm();

  return (
    <section id="contact" className="scroll-mt-6 pb-2">
      <SectionHeader title="تواصل معنا" />

      <div className="grid gap-3 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-1">
          {contactCards.map((card) => {
            const Icon = card.icon;

            return (
              <a
                key={card.title}
                href={card.href}
                target={card.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  card.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="group flex min-h-24 items-center gap-4 rounded-[18px] border border-border bg-card p-4 transition hover:border-gold/50"
              >
                <div
                  className={`flex size-12 shrink-0 items-center justify-center rounded-2xl border transition group-hover:scale-105 ${card.box}`}
                >
                  <Icon className={card.accent} size={25} strokeWidth={1.8} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-black text-white">{card.title}</p>
                  <p
                    className="mt-1 text-sm font-semibold text-muted"
                    dir="auto"
                  >
                    {card.value}
                  </p>
                  <p className="mt-1 line-clamp-1 text-xs text-muted/80">
                    {card.hint}
                  </p>
                </div>
              </a>
            );
          })}

          <div className="flex min-h-24 flex-col justify-center gap-3 rounded-[18px] border border-border bg-card p-4 transition hover:border-gold/50">
            <div className="flex items-center gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-gold/25 bg-gold/10">
                <Share2 className="text-gold" size={25} strokeWidth={1.8} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-black text-white">تابعنا على السوشيال ميديا</p>
                <p className="mt-1 text-xs text-muted/80">
                  فيس بوك، انستجرام، تيك توك، يوتيوب
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 ps-16">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="flex size-11 items-center justify-center rounded-xl border border-gold/25 bg-gold/10 text-gold transition hover:scale-105 hover:bg-gold/20"
                >
                  <Icon size={19} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-[22px] border border-border bg-card p-5">
          {sent ? (
            <div className="flex min-h-72 flex-col items-center justify-center text-center">
              <div className="mb-5 flex size-18 items-center justify-center rounded-3xl border border-gold/25 bg-gold/10">
                <Send className="text-gold" size={34} />
              </div>
              <h3 className="text-2xl font-black">تم إرسال رسالتك</h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                وصلتنا بياناتك، وسيتم التواصل معك في أقرب وقت.
              </p>
              <button
                type="button"
                className="mt-6 font-bold text-gold transition hover:text-gold-light"
                onClick={resetSentState}
              >
                إرسال رسالة أخرى
              </button>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-sm font-bold text-white/85">الاسم</label>
                <input
                  required
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  placeholder="اكتب اسمك"
                  className="min-h-13 w-full rounded-2xl border border-border bg-black/45 px-4 text-right text-sm text-white outline-none transition placeholder:text-muted/60 focus:border-gold"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-white/85">
                  رقم الهاتف
                </label>
                <input
                  required
                  dir="ltr"
                  inputMode="tel"
                  value={form.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  placeholder="01xxxxxxxxx"
                  className="min-h-13 w-full rounded-2xl border border-border bg-black/45 px-4 text-left text-sm text-white outline-none transition placeholder:text-muted/60 focus:border-gold"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-white/85">
                  رسالتك
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(event) =>
                    updateField("message", event.target.value)
                  }
                  placeholder="اكتب استفسارك هنا"
                  className="w-full resize-none rounded-2xl border border-border bg-black/45 px-4 py-3 text-right text-sm text-white outline-none transition placeholder:text-muted/60 focus:border-gold"
                />
              </div>

              <Button type="submit" disabled={sending} className="w-full">
                <Send size={20} />
                {sending ? "جاري الإرسال..." : "إرسال الرسالة"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
