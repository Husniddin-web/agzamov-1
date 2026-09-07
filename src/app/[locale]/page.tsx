import { setRequestLocale } from 'next-intl/server';
import { HeroSection } from '@/components/home/HeroSection';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { LicensesSection } from '@/components/home/LicensesSection';
import { TeamSection } from '@/components/home/TeamSection';
import { ServicesSection } from '@/components/home/ServicesSection';
import { PartnersMarquee } from '@/components/home/PartnersMarquee';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { NewsSection } from '@/components/home/NewsSection';
import { FaqSection } from '@/components/home/FaqSection';
import { ConsultationBanner } from '@/components/common/ConsultationBanner';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <WhyChooseUs />
      <TeamSection />
      <ServicesSection />
      <PartnersMarquee />
      <TestimonialsSection />
      <LicensesSection />
      <NewsSection />
      <FaqSection />
      <ConsultationBanner />
    </>
  );
}
