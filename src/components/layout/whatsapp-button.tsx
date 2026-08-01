import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";

const WHATSAPP_NUMBER = "201011015604";

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "مرحباً، أرغب في الاستفسار عن سنتر فيينا التعليمي.",
)}`;

export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل معنا عبر واتساب"
      className="fixed bottom-24 left-4 z-40 flex size-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.35)] transition hover:scale-105 hover:bg-[#1EBE5D] lg:bottom-6 lg:left-6 lg:size-14"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366]/50 animate-ping" />
      <WhatsAppIcon size={24} className="lg:size-7" />
    </a>
  );
}
