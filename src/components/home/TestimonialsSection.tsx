'use client';

import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Container } from '../common/Container';
import { Locale } from '@/types';
import { Quote } from 'lucide-react';

interface ReviewItem {
  id: string;
  badge: string;
  company: string;
  author: string;
  role: {
    uz: string;
    ru: string;
    en: string;
  };
  review: {
    uz: string;
    ru: string;
    en: string;
  };
  highlighted?: boolean;
}

const column1Reviews: ReviewItem[] = [
  {
    id: 'c1-1',
    badge: 'PRO',
    company: 'PROWEB',
    author: 'Javohir Toshmatov',
    role: {
      uz: "Ta'sischi",
      ru: 'Основатель',
      en: 'Founder',
    },
    review: {
      uz: 'Agzamov Legal jamoasiga professional huquqiy qo‘llab-quvvatlash va intellektual mulk himoyasi uchun katta minnatdorchilik bildiramiz.',
      ru: 'Выражаем огромную благодарность команде Agzamov Legal за профессиональную юридическую поддержку и защиту интеллектуальной собственности.',
      en: 'We express our deep gratitude to Agzamov Legal for professional legal support and intellectual property protection.',
    },
  },
  {
    id: 'c1-2',
    badge: 'TIM',
    company: 'TIMEKEEPER',
    author: 'Anvar Karimov',
    role: {
      uz: 'Bosh Direktor',
      ru: 'Генеральный директор',
      en: 'General Director',
    },
    review: {
      uz: 'Birinchi konsultatsiyadanoq haqiqiy ekspertlar qo‘liga tushganimni angladim. Bojxona va soliq masalasi tezda hal bo‘ldi.',
      ru: 'С первой консультации понял, что попал в руки настоящих экспертов. Таможенные и налоговые вопросы были решены оперативно.',
      en: 'From the first consultation, I knew I was in expert hands. Customs and tax issues were resolved swiftly.',
    },
  },
  {
    id: 'c1-3',
    badge: 'SRL',
    company: 'SILK ROAD LOGISTICS',
    author: 'Farrux Aliyev',
    role: {
      uz: 'Boshqaruv Raisi',
      ru: 'Председатель правления',
      en: 'Chairman',
    },
    review: {
      uz: 'Xalqaro arbitraj va yirik yuk tashish shartnomalaridagi barcha nizolarni sudgacha kelishuv orqali to‘liq foydamizga hal qildilar.',
      ru: 'Все споры по международному арбитражу и крупным логистическим контрактам разрешили в нашу пользу в досудебном порядке.',
      en: 'They resolved all international arbitration and logistics disputes in our favor prior to trial.',
    },
  },
];

const column2Reviews: ReviewItem[] = [
  {
    id: 'c2-1',
    badge: 'IT-',
    company: 'IT-CLOUD SCHOOL',
    author: 'Dilshod Ergashev',
    role: {
      uz: 'Boshqaruvchi',
      ru: 'Управляющий',
      en: 'Managing Partner',
    },
    review: {
      uz: 'Jamoangizga katta rahmat, yirik shartnomalarni tekshirish va sud oldi nizolarni hal qilishda siz shunchaki eng zo‘risiz!',
      ru: 'Огромное спасибо вашей команде, в аудите крупных контрактов и досудебном урегулировании вы просто лучшие!',
      en: 'Huge thanks to your team, you are simply the best in large contract audits and pre-trial dispute settlements!',
    },
  },
  {
    id: 'c2-2',
    badge: 'ORI',
    company: 'ORIENT HOLDING',
    author: 'Jamshid Aliyev',
    role: {
      uz: 'Korporativ Maslahatchi',
      ru: 'Корпоративный советник',
      en: 'Corporate Advisor',
    },
    review: {
      uz: 'Agzamov Legal tomonidan yuridik yordam — bu biznes xotirjamligining mustahkam kafolati. Doimo tayyor va qat’iyatli.',
      ru: 'Юридическая помощь от Agzamov Legal — это надежная гарантия спокойствия бизнеса. Всегда оперативны и решительны.',
      en: 'Legal assistance from Agzamov Legal is an ironclad guarantee of business peace of mind. Always prompt and resolute.',
    },
  },
  {
    id: 'c2-3',
    badge: 'APX',
    company: 'APEX TRADE INT',
    author: 'Dilnoza Rustamova',
    role: {
      uz: 'Ta’sischi',
      ru: 'Учредитель',
      en: 'Founder',
    },
    review: {
      uz: 'Oliy sudda korporativ ulushlar bo‘yicha nizoni 100% yutib berishdi. Ularning sud zalidagi mahorati eng yuqori darajada.',
      ru: 'Выиграли спор по корпоративным долям в Верховном суде на 100%. Их мастерство в суде достойно высшей оценки.',
      en: 'Won a corporate share dispute at the Supreme Court 100%. Their courtroom advocacy is top-tier.',
    },
  },
];

const column3Reviews: ReviewItem[] = [
  {
    id: 'c3-1',
    badge: 'FIN',
    company: 'FINPAY GLOBAL',
    author: 'Elena Kim',
    role: {
      uz: 'Hammuassis',
      ru: 'Сооснователь',
      en: 'Co-founder',
    },
    review: {
      uz: 'Fintech litsenziyalari va xorijiy investorlar bilan investitsiya bitimlarini mukammal darajada rasmiylashtirib berishdi.',
      ru: 'Безупречно оформили финтех-лицензии и инвестиционные соглашения с зарубежными инвесторами.',
      en: 'Flawlessly structured our fintech licensing and venture deals with foreign investors.',
    },
  },
  {
    id: 'c3-2',
    badge: 'TEC',
    company: 'TECHNOBUILD GROUP',
    author: 'Jasur Mirzayev',
    role: {
      uz: 'Moliyaviy Direktor',
      ru: 'Финансовый директор',
      en: 'CFO',
    },
    review: {
      uz: 'Qurilish ob’ektlariga oid murakkab kadastr va yer huquqi masalalarini qonuniy va qisqa muddatda ijobiy yopdilar.',
      ru: 'Оперативно и законно решили сложнейшие вопросы кадастра и земельного права по строительным объектам.',
      en: 'Promptly and lawfully resolved complex cadastre and land title issues for our construction projects.',
    },
  },
  {
    id: 'c3-3',
    badge: 'AGR',
    company: 'AGRO INVEST UZ',
    author: 'Sardor Qodirov',
    role: {
      uz: 'Bosh Yurist',
      ru: 'Главный юрист',
      en: 'Chief Legal Officer',
    },
    review: {
      uz: 'Katta miqdordagi debitorlik qarzlarini undirish bo‘yicha ko‘rsatilgan yordam kutilganidan ham samaraliroq bo‘ldi.',
      ru: 'Помощь во взыскании крупной дебиторской задолженности превзошла все наши ожидания по эффективности.',
      en: 'Their recovery of substantial accounts receivable exceeded all our expectations in speed and efficiency.',
    },
  },
];

interface ReviewCardProps {
  item: ReviewItem;
  locale: Locale;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ item, locale }) => (
  <div className="p-5 sm:p-7 rounded-none text-left space-y-4 sm:space-y-5 transition-all duration-300 relative bg-[#0c0d12]/95 border border-zinc-800/80 hover:border-red-600/60 hover:shadow-xl hover:shadow-red-950/20 group">
    {/* Quote Icon */}
    <div className="w-8 h-8 rounded-none bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 group-hover:border-red-600/30 transition-colors">
      <Quote className="w-3.5 h-3.5 fill-zinc-400 text-zinc-400 group-hover:fill-red-500 group-hover:text-red-500 transition-colors" />
    </div>

    {/* Review Text */}
    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
      {item.review[locale]}
    </p>

    {/* Author & Company Info */}
    <div className="flex items-center gap-3 pt-3 border-t border-zinc-800/80">
      <div className="w-8 h-8 rounded-none bg-black border border-zinc-700/80 flex items-center justify-center text-[10px] font-black tracking-wider text-white shrink-0 group-hover:border-red-600/40 transition-colors">
        {item.badge}
      </div>
      <div className="overflow-hidden">
        <h4 className="text-xs sm:text-sm font-extrabold text-white tracking-wider uppercase truncate group-hover:text-zinc-200 transition-colors">
          {item.company}
        </h4>
        <p className="text-[11px] text-zinc-400 truncate mt-0.5">
          {item.author}, {item.role[locale]}
        </p>
      </div>
    </div>
  </div>
);

export const TestimonialsSection: React.FC = () => {
  const t = useTranslations('testimonials');
  const locale = useLocale() as Locale;

  // Duplicate columns for seamless infinite marquee loop
  const col1 = [...column1Reviews, ...column1Reviews];
  const col2 = [...column2Reviews, ...column2Reviews];
  const col3 = [...column3Reviews, ...column3Reviews];

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-[#06080e] border-t border-zinc-900 relative overflow-hidden text-zinc-300">
      {/* Enhanced Technical Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />
      
      {/* Subtle Deep Ambient Color Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-red-600/10 blur-[180px] pointer-events-none" />
      <div className="absolute inset-0 bg-radial from-transparent via-[#06080e]/40 to-[#06080e] pointer-events-none" />

      <Container className="relative z-10 space-y-8 sm:space-y-10">
        
        {/* Section Header (Centered) */}
        <div data-aos="fade-up" className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.25em] text-red-500 block">
            {t('tag')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase leading-[1.1]">
            {t('title')}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* 3 Sliding Columns Container with seamless edge blending */}
        <div className="relative h-[500px] sm:h-[620px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0%,black_8%,black_92%,transparent_100%)]">
          {/* Columns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full items-start">
            
            {/* Column 1: Moves UP */}
            <div className="h-full overflow-hidden">
              <div className="animate-marquee-up space-y-6">
                {col1.map((item, idx) => (
                  <ReviewCard key={`c1-${idx}`} item={item} locale={locale} />
                ))}
              </div>
            </div>

            {/* Column 2: Moves DOWN */}
            <div className="h-full overflow-hidden">
              <div className="animate-marquee-down space-y-6">
                {col2.map((item, idx) => (
                  <ReviewCard key={`c2-${idx}`} item={item} locale={locale} />
                ))}
              </div>
            </div>

            {/* Column 3: Moves UP (Hidden on small screens, shown on lg) */}
            <div className="hidden lg:block h-full overflow-hidden">
              <div className="animate-marquee-up space-y-6">
                {col3.map((item, idx) => (
                  <ReviewCard key={`c3-${idx}`} item={item} locale={locale} />
                ))}
              </div>
            </div>

          </div>
        </div>

      </Container>
    </section>
  );
};
