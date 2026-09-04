import React from 'react';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Container } from '@/components/common/Container';
import { GlowBadge } from '@/components/common/GlowBadge';
import { Button } from '@/components/common/Button';
import { ContactForm } from '@/components/forms/ContactForm';
import { mockServices } from '@/data/mockData';
import { Locale } from '@/types';
import { Link } from '@/i18n/routing';
import {
  Building2,
  Scale,
  ShieldAlert,
  Coins,
  Lightbulb,
  Landmark,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import { siteConfig } from '@/config/site';

const iconMap: Record<string, React.ReactNode> = {
  Building2: <Building2 className="w-8 h-8 text-red-600" />,
  Scale: <Scale className="w-8 h-8 text-red-600" />,
  ShieldAlert: <ShieldAlert className="w-8 h-8 text-red-600" />,
  Coins: <Coins className="w-8 h-8 text-red-600" />,
  Lightbulb: <Lightbulb className="w-8 h-8 text-red-600" />,
  Landmark: <Landmark className="w-8 h-8 text-red-600" />,
};

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
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const tServices = await getTranslations({ locale, namespace: 'servicesPage' });

  const service = mockServices.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const currentLocale = locale as Locale;

  return (
    <div className="pt-28 pb-20 bg-black min-h-screen">
      {/* Breadcrumb & Top Bar */}
      <section className="py-10 border-b border-zinc-900">
        <Container>
          <div className="flex items-center gap-3 text-xs text-zinc-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              {tNav('home')}
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-white transition-colors">
              {tNav('services')}
            </Link>
            <span>/</span>
            <span className="text-red-500 font-medium">
              {service.title[currentLocale]}
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-2xl bg-red-600/10 border border-red-600/30 flex items-center justify-center shrink-0">
                {iconMap[service.iconName] || <Scale className="w-8 h-8 text-red-600" />}
              </div>
              <div>
                <GlowBadge icon>{tServices('detail.badge')}</GlowBadge>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mt-2">
                  {service.title[currentLocale]}
                </h1>
              </div>
            </div>

            <Button href="/services" variant="outline" icon={<ArrowLeft className="w-4 h-4" />} iconPosition="left">
              {tCommon('allServices')}
            </Button>
          </div>
        </Container>
      </section>

      {/* Main Content Area */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
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
                      className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                      <span className="text-sm text-zinc-200">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guarantees Box */}
              <div className="p-8 rounded-2xl bg-red-600/10 border border-red-600/30 space-y-4">
                <div className="flex items-center gap-3 text-red-500 font-bold">
                  <ShieldCheck className="w-6 h-6 text-red-600" />
                  <h3 className="text-lg">{tServices('detail.guaranteeTitle')}</h3>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {tServices('detail.guaranteeDesc')}
                </p>
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
