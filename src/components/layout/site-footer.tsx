import Image from "next/image";
import Link from "next/link";
import { MapPin, MessageCircle, Phone } from "lucide-react";

const footerLinks = [
  { href: "/subjects", label: "المواد" },
  { href: "/teachers", label: "المدرسون" },
  { href: "/booking", label: "الحجز" },
  { href: "/#contact", label: "تواصل معنا" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border pb-24 pt-6 lg:pb-6">
      <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo-vienna.png"
                alt="Vienna Center"
                width={58}
                height={58}
                className="size-12 object-contain"
              />
              <div>
                <p className="text-base font-black text-gold">VIENNA CENTER</p>
                <p className="text-xs font-bold text-muted">
                  سنتر فيينا التعليمي
                </p>
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm leading-7 text-muted">
              تجربة تعليمية منظمة للطلاب، مع حجز واضح ومتابعة مستمرة للمواد
              والمدرسين.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-black text-gold">روابط سريعة</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex min-h-10 items-center justify-center rounded-xl border border-border bg-card px-4 text-sm font-bold text-muted transition hover:border-gold/50 hover:text-gold"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black text-gold">بيانات التواصل</h3>
            <div className="mt-3 space-y-2 text-sm font-bold text-muted">
              <p className="flex items-center gap-2">
                <Phone size={17} className="text-gold" />
                012 345 678 90
              </p>
              <p className="flex items-center gap-2">
                <MessageCircle size={17} className="text-gold" />
                واتساب مباشر للحجز والاستفسار
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={17} className="text-gold" />
                السويس - الغريب - الكورنيش القديم - امام منتجع الوتر واي
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 border-t border-border pt-4 text-xs font-bold text-muted md:flex-row md:items-center md:justify-between">
          <p>© 2026 Vienna Center. جميع الحقوق محفوظة.</p>
          <p>
            تم التطوير بواسطة{" "}
            <a
              href="https://shabanaly.vercel.app/"
              target="_blank"
              className="text-gold"
            >
              Shaban Aly
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
