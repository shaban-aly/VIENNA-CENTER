export const weekDays = [
  "السبت",
  "الأحد",
  "الاثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة",
];

export function weekDayLabel(dayOfWeek: number) {
  return weekDays[dayOfWeek] ?? "";
}

export function formatTimeArabic(time: string) {
  const [hourString, minuteString] = time.split(":");
  const hour = Number(hourString);
  const minutes = Number(minuteString);
  const suffix = hour >= 12 ? "مساء" : "صباحا";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  const minutesLabel =
    minutes > 0 ? `:${minutes.toString().padStart(2, "0")}` : "";

  return `${displayHour}${minutesLabel} ${suffix}`;
}

export function formatSchedule(dayOfWeek: number, startTime: string) {
  return `${weekDayLabel(dayOfWeek)} ${formatTimeArabic(startTime)}`;
}

export function normalizeArabicText(text: string) {
  return text
    .toLowerCase()
    .replace(/[\u064B-\u0652]/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/ة/g, "ه");
}

export function formatRelativeTime(iso: string) {
  const date = new Date(iso);
  const diffMs = Date.now() - date.getTime();
  const minutes = Math.floor(diffMs / 60000);

  if (minutes < 1) {
    return "الآن";
  }

  if (minutes < 60) {
    if (minutes === 1) return "منذ دقيقة";
    if (minutes === 2) return "منذ دقيقتين";
    if (minutes <= 10) return `منذ ${minutes} دقائق`;
    return `منذ ${minutes} دقيقة`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    if (hours === 1) return "منذ ساعة";
    if (hours === 2) return "منذ ساعتين";
    if (hours <= 10) return `منذ ${hours} ساعات`;
    return `منذ ${hours} ساعة`;
  }

  const days = Math.floor(hours / 24);

  if (days === 1) return "أمس";
  if (days === 2) return "منذ يومين";
  if (days <= 10) return `منذ ${days} أيام`;
  if (days <= 30) return `منذ ${days} يوم`;

  return new Intl.DateTimeFormat("ar-EG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
