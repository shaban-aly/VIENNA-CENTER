import {
  Atom,
  BookOpen,
  Calculator,
  Dna,
  FlaskConical,
  Languages,
  Sigma,
  Trophy,
  UsersRound,
} from "lucide-react";
import type {
  Announcement,
  AppNotification,
  Booking,
  ClassLeval,
  FaqItem,
  StudentProfile,
  Subject,
  Teacher,
  Testimonial,
} from "@/types/content";

export const subjects: Subject[] = [
  {
    id: "math",
    name: "الرياضيات",
    description: "تأسيس وحل تدريبات ومراجعات نهائية.",
    grades: ["الأول الثانوي", "الثاني الثانوي", "الثالث الثانوي"],
    icon: Calculator,
  },
  {
    id: "physics",
    name: "الفيزياء",
    description: "شرح مبسط للقوانين والمسائل.",
    grades: ["الثاني الثانوي", "الثالث الثانوي"],
    icon: Atom,
  },
  {
    id: "chemistry",
    name: "الكيمياء",
    description: "تجارب، معادلات، ومراجعة مستمرة.",
    grades: ["الأول الثانوي", "الثاني الثانوي", "الثالث الثانوي"],
    icon: FlaskConical,
  },
  {
    id: "biology",
    name: "الأحياء",
    description: "مناهج منظمة ورسومات توضيحية.",
    grades: ["الثاني الثانوي", "الثالث الثانوي"],
    icon: Dna,
  },
  {
    id: "arabic",
    name: "اللغة العربية",
    description: "نحو وبلاغة وقراءة بنظام متابعة.",
    grades: ["الإعدادي", "الثانوي"],
    icon: BookOpen,
  },
  {
    id: "english",
    name: "English",
    description: "Grammar, vocabulary, and exams.",
    grades: ["الإعدادي", "الثانوي"],
    icon: Languages,
  },
];

// Later data flow:
// teachers table: id, name, bio, experience_years, qualifications (text[]),
// image_url, is_active, sort_order.
// teacher_subjects join table: teacher_id, subject_id.
// teacher_schedules table: id, teacher_id, day_of_week (0 = السبت), start_time.
export const teachers: Teacher[] = [
  {
    id: "mohamed-younis",
    name: "أ / محمد يونس",
    bio: "مدرس رياضيات بخبرة قوية في تبسيط المسائل وبناء خطة متابعة أسبوعية.",
    experienceYears: 10,
    qualifications: [
      "بكالوريوس العلوم الرياضية",
      "خبرة 10 سنوات في تدريس المرحلة الثانوية",
    ],
    subjectIds: ["math"],
    schedules: [
      { id: "mohamed-younis-sat", dayOfWeek: 0, startTime: "18:00" },
      { id: "mohamed-younis-mon", dayOfWeek: 2, startTime: "17:00" },
      { id: "mohamed-younis-thu", dayOfWeek: 5, startTime: "19:00" },
    ],
    imageUrl:
      "https://images.unsplash.com/flagged/photo-1574110906643-8311b0ce29d3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGVhY2hlcnN8ZW58MHwxfDB8fHwy",
  },
  {
    id: "sherif-khaled",
    name: "أ / شريف خالد",
    bio: "شرح تطبيقي للقوانين مع تدريب مستمر على أفكار الامتحانات.",
    experienceYears: 8,
    qualifications: ["بكالوريوس الفيزياء", "ماجستير في تعليم العلوم"],
    subjectIds: ["physics"],
    schedules: [
      { id: "sherif-khaled-sun", dayOfWeek: 1, startTime: "19:00" },
      { id: "sherif-khaled-wed", dayOfWeek: 4, startTime: "18:00" },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1574281570877-bd815ebb50a4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRlYWNoZXJzfGVufDB8MXwwfHx8Mg%3D%3D",
  },
  {
    id: "ahmed-sahrawy",
    name: "أ / أحمد الصحراوي",
    bio: "مراجعات منظمة ومتابعة واجبات وحل نماذج دورية.",
    experienceYears: 9,
    qualifications: [
      "بكالوريوس العلوم الكيميائية",
      "خبرة في تدريب الطلاب على نماذج الامتحانات",
    ],
    subjectIds: ["chemistry"],
    schedules: [
      { id: "ahmed-sahrawy-sat", dayOfWeek: 0, startTime: "16:00" },
      { id: "ahmed-sahrawy-tue", dayOfWeek: 3, startTime: "18:30" },
      { id: "ahmed-sahrawy-thu", dayOfWeek: 5, startTime: "17:00" },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1570338652597-a6a2b7bcaf1b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fHRlYWNoZXJzfGVufDB8MXwwfHx8Mg%3D%3D",
  },
  {
    id: "abdelrahim-mahmoud",
    name: "أ / عبد الرحيم محمود",
    bio: "تأسيس لغوي وتدريبات امتحانية بطريقة واضحة ومتدرجة.",
    experienceYears: 7,
    qualifications: [
      "بكالوريوس اللغة الإنجليزية",
      "دبلوم تدريس اللغة الإنجليزية",
    ],
    subjectIds: ["english"],
    schedules: [
      { id: "abdelrahim-mahmoud-mon", dayOfWeek: 2, startTime: "19:00" },
      { id: "abdelrahim-mahmoud-wed", dayOfWeek: 4, startTime: "19:00" },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1724654814378-108c93f5fa54?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHRlYWNoZXJzfGVufDB8MXwwfHx8Mg%3D%3D",
  },
  {
    id: "abdelrahim-mohamed",
    name: "أ / عبد الرحيم محمد",
    bio: "تأسيس لغوي وتدريبات امتحانية بطريقة واضحة ومتدرجة.",
    experienceYears: 7,
    qualifications: [
      "بكالوريوس اللغة الإنجليزية",
      "دبلوم تدريس اللغة الإنجليزية",
    ],
    subjectIds: ["english"],
    schedules: [
      { id: "abdelrahim-mohamed-mon", dayOfWeek: 2, startTime: "19:00" },
      { id: "abdelrahim-mohamed-wed", dayOfWeek: 4, startTime: "19:00" },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1724654814378-108c93f5fa54?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHRlYWNoZXJzfGVufDB8MXwwfHx8Mg%3D%3D",
  },
];

export const features = [
  {
    label: "مدرسين متخصصين",
    description: "اختيار مدرسين بخبرة قوية في كل مادة.",
    icon: UsersRound,
  },
  {
    label: "متابعة مستمرة",
    description: "متابعة مستوى الطالب خطوة بخطوة.",
    icon: Trophy,
  },
  {
    label: "شرح مبسط وسهل",
    description: "شرح منظم يركز على الفهم والتطبيق.",
    icon: BookOpen,
  },
  {
    label: "نتائج مضمونة",
    description: "خطة واضحة للمراجعة قبل الامتحانات.",
    icon: Sigma,
  },
];

export const announcements: Announcement[] = [
  {
    id: "open-booking",
    title: "تم فتح باب الحجز للعام الدراسي 2026 / 2027",
    body: "احجز مكانك الآن قبل اكتمال الأعداد.",
    date: "20 مايو 2026",
    tag: "جديد",
    type: "booking",
    ctaLabel: "احجز الآن",
  },
  {
    id: "schedule-update",
    title: "تحديث مواعيد الجداول",
    body: "تم تحديث جداول المواد لجميع الصفوف.",
    date: "18 مايو 2026",
    tag: "جداول",
    type: "schedule",
    ctaLabel: "عرض التفاصيل",
  },
  {
    id: "early-discount",
    title: "خصم خاص للحجز المبكر",
    body: "خصم محدود للطلاب المسجلين قبل بداية العام الدراسي.",
    date: "15 مايو 2026",
    tag: "عرض",
    type: "offer",
    ctaLabel: "اعرف المزيد",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "student-1",
    studentName: "محمد أحمد",
    grade: "الصف الثالث الثانوي",
    content: "أفضل سنتر في السويس. شرح ممتاز والمدرسين على أعلى مستوى.",
    rating: 5,
  },
  {
    id: "student-2",
    studentName: "أحمد علي",
    grade: "الصف الثاني الثانوي",
    content: "المتابعة منظمة والمواعيد واضحة، وده ساعدني أراجع أول بأول.",
    rating: 5,
  },
  {
    id: "student-3",
    studentName: "سارة محمود",
    grade: "الصف الأول الثانوي",
    content: "طريقة الشرح بسيطة وفي اهتمام كبير بحل الأسئلة بعد كل حصة.",
    rating: 5,
  },
];

// Later data flow:
// Supabase Auth user.id -> student_profiles table -> currentStudent.
// Expected columns: id, full_name, grade, phone, avatar_url, booking_status.
export const currentStudent: StudentProfile = {
  id: "student_mock_1",
  name: "أحمد محمد",
  grade: "الصف الثالث الثانوي",
  phone: "01012345678",
  avatarUrl: "",
  bookingStatus: "حجز قيد المراجعة",
};

// Later data flow:
// Supabase Auth user.id -> notification_recipients + notifications tables.
// notifications: id, title, body, type, audience, created_at.
// notification_recipients: user_id, notification_id, read_at.
// isUnread = read_at is null. time label = relative to created_at.
export const notifications: AppNotification[] = [
  {
    id: "notification_1",
    title: "طلب الحجز قيد المراجعة",
    body: "تم استلام طلبك وسيتم الرد عليك قريباً.",
    createdAt: "2026-08-01T10:15:00+02:00",
    readAt: null,
    type: "booking",
    link: "/mybooking",
  },
  {
    id: "notification_2",
    title: "تم تحديث جدول الفيزياء",
    body: "موعد حصة الفيزياء القادم أصبح الأربعاء 6:00 مساء.",
    createdAt: "2026-08-01T09:00:00+02:00",
    readAt: null,
    type: "schedule",
    link: "/teachers",
  },
  {
    id: "notification_3",
    title: "إعلان جديد",
    body: "تم فتح باب الحجز للعام الدراسي 2026 / 2027.",
    createdAt: "2026-07-31T14:00:00+02:00",
    readAt: "2026-07-31T15:30:00+02:00",
    type: "announcement",
    link: "/#announcements",
  },
];

export const classLeval: ClassLeval[] = [
  { id: "class_1", title: "الأول الثانوي" },
  { id: "class_2", title: "الثاني الثانوي" },
  { id: "class_3", title: "الثالث الثانوي" },
];

// Later data flow:
// faqs table: id, question, answer, is_active, sort_order.
export const faqs: FaqItem[] = [
  {
    id: "faq_1",
    question: "كيف أقوم بحجز درس؟",
    answer:
      "من صفحة «احجز درس» اختر المادة والمدرس والموعد المناسب ثم أكّد الحجز، وسيتم مراجعة طلبك والتواصل معك لتأكيد الموعد.",
  },
  {
    id: "faq_2",
    question: "هل يمكنني تغيير موعد الحجز بعد تأكيده؟",
    answer:
      "نعم، تواصل مع إدارة السنتر لتعديل الموعد حسب توفر الجداول، وسيتم إشعارك بأي تغيير في الحجز.",
  },
  {
    id: "faq_3",
    question: "ما هي طرق الدفع المتاحة؟",
    answer:
      "يتم الدفع في مقر السنتر، مع إمكانية الاتفاق على خطة أقساط مناسبة للعام الدراسي.",
  },
  {
    id: "faq_4",
    question: "هل يوجد نظام متابعة لمستوى الطالب؟",
    answer:
      "نعم، يوجد نظام متابعة دورية مع مراجعات واختبارات دورية لقياس مستوى الطالب أولاً بأول.",
  },
  {
    id: "faq_6",
    question: "كيف أتواصل مع إدارة السنتر؟",
    answer:
      "من قسم «تواصل معنا» في الصفحة الرئيسية أو عبر أرقام الهواتف المعلنة في مقر السنتر.",
  },
];

// Later data flow:
// Supabase Auth user.id -> bookings table -> student bookings.
// Expected columns: id, user_id, subject, teacher_name, schedule, date, status.
export const bookings: Booking[] = [
  {
    id: "booking_1",
    subject: "الرياضيات",
    teacherName: "أ / محمد يونس",
    schedule: "السبت 6:00 مساء",
    date: "3 أغسطس 2026",
    status: "pending",
  },
  {
    id: "booking_2",
    subject: "الفيزياء",
    teacherName: "أ / شريف خالد",
    schedule: "الأربعاء 6:00 مساء",
    date: "6 أغسطس 2026",
    status: "confirmed",
  },
  {
    id: "booking_3",
    subject: "الكيمياء",
    teacherName: "أ / أحمد الصحراوي",
    schedule: "الثلاثاء 6:30 مساء",
    date: "11 أغسطس 2026",
    status: "cancelled",
  },
];
