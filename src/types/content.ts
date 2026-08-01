import type { LucideIcon } from "lucide-react";

export type Subject = {
  id: string;
  name: string;
  description: string;
  grades: string[];
  icon: LucideIcon;
};

export type TeacherSchedule = {
  id: string;
  dayOfWeek: number;
  startTime: string;
};

export type Teacher = {
  id: string;
  name: string;
  bio: string;
  experienceYears: number;
  qualifications: string[];
  subjectIds: string[];
  schedules: TeacherSchedule[];
  imageUrl?: string;
};

export type Announcement = {
  id: string;
  title: string;
  body: string;
  date: string;
  tag: string;
  type: "booking" | "schedule" | "offer" | "notice";
  ctaLabel: string;
};

export type Testimonial = {
  id: string;
  studentName: string;
  grade: string;
  content: string;
  rating: number;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type StudentProfile = {
  id: string;
  name: string;
  grade: string;
  phone: string;
  avatarUrl?: string;
  bookingStatus: string;
};

export type AppNotification = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  readAt: string | null;
  type: "booking" | "schedule" | "announcement" | "message";
  link?: string;
};
export type ClassLeval = {
  id: string;
  title: string;
};

export type BookingStatus = "pending" | "confirmed" | "cancelled";

export type Booking = {
  id: string;
  subject: string;
  teacherName: string;
  schedule: string;
  date: string;
  status: BookingStatus;
};

export type TermsSection = {
  id: string;
  title: string;
  paragraphs: string[];
  list?: string[];
};

export type TermsContent = {
  lastUpdated: string;
  intro: string;
  sections: TermsSection[];
};
