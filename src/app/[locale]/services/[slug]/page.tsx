import React from 'react';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Container } from '@/components/common/Container';
import { PageHeader } from '@/components/common/PageHeader';
import { ContactForm } from '@/components/forms/ContactForm';
import { mockServices } from '@/data/mockData';
import { Locale } from '@/types';
import { CheckCircle2 } from 'lucide-react';
import { siteConfig } from '@/config/site';

interface ServiceDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const paths: { locale: string; slug: string }[] = [];
  const locales = ['uz', 'ru', 'en'];

  for (const locale of locales) {
    for (const s of mockServices) {
      paths.push({ locale, slug: s.slug });
    }
  }

  return paths;
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const tServices = await getTranslations({ locale, namespace: 'servicesPage' });

  const service = mockServices.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const currentLocale = locale as Locale;

  return (
    <div className="pb-20 bg-black min-h-screen">
      {/* 1. Page Header with Thematic Background (No Badge) */}
      <PageHeader
        title={service.title[currentLocale]}
        bgImage="/headers/header-services.jpg"
        breadcrumbs={[
          { label: tNav('home'), href: '/' },
          { label: tNav('services'), href: '/services' },
          { label: service.title[currentLocale] },
        ]}
      />

      {/* Main Content Area */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            {/* Left Content (8 cols) */}
            <div className="lg:col-span-8 space-y-10">
              {/* Detailed Description */}
              <div className="bento-card p-8 sm:p-10 space-y-6">
                <h2 className="text-2xl font-extrabold text-white">
                  {tServices('detail.overviewTitle')}
                </h2>
                <p className="text-base text-zinc-300 leading-relaxed">
                  {service.fullDesc[currentLocale]}
                </p>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {service.shortDesc[currentLocale]}
                </p>
              </div>

              {/* What We Provide / Key Services */}
              <div className="bento-card p-8 sm:p-10 space-y-6">
                <h2 className="text-2xl font-extrabold text-white">
                  {tServices('detail.solutionsTitle')}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {service.features[currentLocale].map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-none bg-zinc-900/70 border border-zinc-800 flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                      <span className="text-sm text-zinc-200">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar: Contact Form for This Service (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bento-card p-6 sm:p-8 border-red-600/40 sticky top-28 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {tServices('detail.consultTitle')}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    {tServices('detail.consultSubtitle')}
                  </p>
                </div>

                <ContactForm defaultService={service.slug} />

                <div className="pt-4 border-t border-zinc-800 text-center">
                  <p className="text-xs text-zinc-400">{tServices('detail.orCallDirect')}</p>
                  <a
                    href={`tel:${siteConfig.phoneClean}`}
                    className="block text-base font-extrabold text-red-500 hover:text-red-400 mt-1"
                  >
                    {siteConfig.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
