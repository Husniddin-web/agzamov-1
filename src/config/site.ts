export const siteConfig = {
  name: 'AGZAMOV LEGAL GROUP',
  domain: 'https://agzamovlegal.uz',
  phone: '+998 95 133 15 15',
  phoneClean: '+998951331515',
  emergencyPhone: '+998 95 133 15 15',
  emergencyPhoneClean: '+998951331515',
  email: 'info@agzamovlegal.uz',
  address: {
    uz: "Toshkent sh., Mirobod tumani, Amir Temur shoh ko'chasi, 107B",
    ru: 'г. Ташкент, Мирабадский р-н, пр. Амира Темура, 107B',
    en: '107B Amir Temur Avenue, Mirabad District, Tashkent, Uzbekistan',
  },
  workingHours: {
    uz: 'Dush - Juma: 09:00 - 18:00',
    ru: 'Пн - Пт: 09:00 - 18:00',
    en: 'Mon - Fri: 09:00 - 18:00',
  },
  social: {
    telegram: 'https://t.me/s/miralisherhimoya',
    instagram: 'https://www.instagram.com/agzamov.law?igsi=MWp3Y2gzb3pxZ3A3MA==',
    facebook: 'https://facebook.com/agzamovlegal',
    linkedin: 'https://linkedin.com/company/agzamovlegal',
  },
  stats: {
    experienceYears: 12,
    successfulCases: 540,
    corporatePartners: 65,
    winRatePercent: 98,
  },
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.8663806938974!2d69.2796!3d41.3111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDE4JzQwLjAiTiA2OcKwMTYnNDYuNiJF!5e0!3m2!1suz!2suz!4v1620000000000!5m2!1suz!2suz',
};

export interface NavLinkItem {
  key: string;
  href: string;
}

export const navLinks: NavLinkItem[] = [
  { key: 'home', href: '/' },
  { key: 'about', href: '/about' },
  { key: 'services', href: '/services' },
  { key: 'team', href: '/team' },
  { key: 'news', href: '/news' },
  { key: 'contact', href: '/contact' },
];
