import { AnnouncementsSection } from "@/components/home/announcements-section";
import { FeaturesSection } from "@/components/home/features-section";
import { Hero } from "@/components/home/hero";
import { SubjectsSection } from "@/components/home/subjects-section";
import { TeachersPreviewSection } from "@/components/home/teachers-preview-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { ContactUs } from "@/components/home/contact-us";

export default function Home() {
  return (
    <>
      <Hero />

      <div className="space-y-8 px-5 lg:mx-auto lg:w-full lg:max-w-7xl lg:px-8">
        <AnnouncementsSection />
        <SubjectsSection />
        <TeachersPreviewSection />
        <FeaturesSection />
        <TestimonialsSection />
        <ContactUs />
      </div>
    </>
  );
}
