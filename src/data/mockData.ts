import { WorkerItem, NewsItem, PartnerItem, FaqItem, LegalServiceItem, HeroSlideItem } from '@/types';

export const heroSlides: HeroSlideItem[] = [
  {
    id: 'slide-1',
    tagline: {
      uz: 'PROFESSIONAL ADVOKATURA VA KONSALTING',
      ru: 'ПРОФЕССИОНАЛЬНАЯ АДВОКАТУРА И КОНСАЛТИНГ',
      en: 'PREMIER ADVOCACY & LEGAL COUNSEL',
    },
    titleWhite: {
      uz: 'Biznesingiz Va Huquqlaringiz Uchun',
      ru: 'Для Вашего Бизнеса И Прав',
      en: 'Safeguarding Your Business & Rights',
    },
    titleRed: {
      uz: 'Murosasiz Himoya',
      ru: 'Бескомпромиссная Защита',
      en: 'Uncompromising Defense',
    },
    description: {
      uz: 'O‘zbekistonda va xalqaro miqyosda korporativ huquq, shartnomalar tahlili va biznes aktivlarini xavf-xatarlardan kafolatli yuridik himoya qilish.',
      ru: 'Ведущий правовой партнер в Узбекистане по защите бизнеса, корпоративным спорам и инвестициям в соответствии с международными стандартами.',
      en: 'Top-tier corporate litigation, strategic business defense, and contract structuring according to premier international legal standards.',
    },
    bgImage: '/hero-corporate.jpg',
    primaryCtaText: {
      uz: 'Konsultatsiya olish',
      ru: 'Консультация',
      en: 'Get Consultation',
    },
    primaryCtaLink: '/contact',
    secondaryCtaText: {
      uz: 'Xizmatlarimiz',
      ru: 'Наши услуги',
      en: 'Our Services',
    },
    secondaryCtaLink: '/services',
  },
  {
    id: 'slide-2',
    tagline: {
      uz: 'SUD VA XALQARO ARBITRAJ AMALIYOTI',
      ru: 'СУДЕБНАЯ И АРБИТРАЖНАЯ ПРАКТИКА',
      en: 'HIGH-STAKES LITIGATION & ARBITRATION',
    },
    titleWhite: {
      uz: 'Murakkab Iqtisodiy Nizolarda',
      ru: 'В Сложных Экономических Спорах',
      en: 'In High-Stakes Commercial Disputes',
    },
    titleRed: {
      uz: 'Kafolatli Yechim',
      ru: 'Гарантированный Результат',
      en: 'Proven Victory',
    },
    description: {
      uz: '15 yildan ortiq professional tajriba, 540 dan ziyod g‘alaba qozonilgan sud ishlari va 98% muvaffaqiyat ko‘rsatkichi bilan manfaatlaringizni himoya qilamiz.',
      ru: 'Более 15 лет юридического опыта, свыше 540 выигранных процессов и 98% показатель успешности в судах всех инстанций.',
      en: 'Over 15 years of exceptional courtroom mastery with 540+ victorious cases and a stellar 98% proven track record.',
    },
    bgImage: '/hero-court.jpg',
    primaryCtaText: {
      uz: 'Advokat yordami',
      ru: 'Помощь адвоката',
      en: 'Legal Assistance',
    },
    primaryCtaLink: '/contact',
    secondaryCtaText: {
      uz: 'Kompaniya haqida',
      ru: 'О компании',
      en: 'About Firm',
    },
    secondaryCtaLink: '/about',
  },
  {
    id: 'slide-3',
    tagline: {
      uz: '24/7 OPERATIV ADVOKATURASI',
      ru: '24/7 ОПЕРАТИВНАЯ АДВОКАТУРА',
      en: '24/7 EMERGENCY LEGAL SHIELD',
    },
    titleWhite: {
      uz: 'Kutilmagan Favqulodda Vaziyatlarda',
      ru: 'В Любых Экстренных Ситуациях',
      en: 'In Urgent Legal Crises',
    },
    titleRed: {
      uz: 'Ishonchli Qalqon',
      ru: 'Надежный Щит',
      en: 'Absolute Shield',
    },
    description: {
      uz: 'Tergov, kutilmagan tekshiruvlar yoki sud jarayonlarida professional advokatlarimiz zudlik bilan sizning huquqlaringiz himoyasiga yetib boradi.',
      ru: 'Экстренный выезд лицензированных адвокатов при проверках, следственных действиях и задержаниях в режиме 24/7.',
      en: 'Immediate response team on call 24/7 for urgent regulatory inquiries, criminal defense, and asset protection.',
    },
    bgImage: '/hero-defense.jpg',
    primaryCtaText: {
      uz: 'Shoshilinch aloqa',
      ru: 'Экстренная связь',
      en: 'Emergency Contact',
    },
    primaryCtaLink: '/contact',
    secondaryCtaText: {
      uz: 'Bizning jamoa',
      ru: 'Наша команда',
      en: 'Our Lawyers',
    },
    secondaryCtaLink: '/team',
  },
];

export const mockWorkers: WorkerItem[] = [
  {
    id: 'w-1',
    name: 'Agzamov Bobur Dilshodovich',
    position: {
      uz: 'Boshqaruvchi Hamkor, Katta Advokat',
      ru: 'Управляющий Партнер, Старший Адвокат',
      en: 'Managing Partner, Senior Attorney',
    },
    experience: {
      uz: '15+ yillik sud va arbitraj tajribasi',
      ru: '15+ лет судебной и арбитражной практики',
      en: '15+ years in high-stakes litigation & arbitration',
    },
    bio: {
      uz: 'Toshkent Davlat Yuridik Universiteti bitiruvchisi. Yirik korporativ nizolar, soliq nizolari va xalqaro arbitraj bo\'yicha 300 dan ortiq muvaffaqiyatli sud jarayonlarini o\'tkazgan.',
      ru: 'Выпускник Ташкентского Государственного Юридического Университета. Провел более 300 успешных судебных процессов по крупным корпоративным и налоговым спорам.',
      en: 'Graduate of Tashkent State University of Law. Led over 300 victorious court proceedings in complex corporate disputes, tax litigations, and international arbitration.',
    },
    specialization: {
      uz: 'Korporativ huquq, Iqtisodiy nizolar, Xalqaro arbitraj',
      ru: 'Корпоративное право, Экономические споры, Международный арбитраж',
      en: 'Corporate Law, Commercial Litigation, Cross-border Arbitration',
    },
    quote: {
      uz: "Qonun har doim haqiqat tomonida bo'lishi kerak. Ammo haqiqatni himoya qilish uchun kuch, aql va chekinmas jasorat talab qilinadi. Biz mijozlarimiz uchun faqat maslahatchi emas, ularning eng ishonchli qalqonimiz.",
      ru: "Закон всегда должен быть на стороне правды. Но чтобы отстоять правду, требуются сила, острый ум и непоколебимое мужество. Мы для наших клиентов не просто советники, а их надежный щит.",
      en: "The law must always stand for truth. But to defend that truth takes strength, sharp intellect, and relentless courage. We are not just legal counselors to our clients — we are their absolute shield.",
    },
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80',
    email: 'b.agzamov@agzamovlegal.uz',
    phone: '+998 90 111 22 33',
    isActive: true,
  },
  {
    id: 'w-2',
    name: 'Karimova Shahzoda Ulug\'bekovna',
    position: {
      uz: 'Hamkor, M&A va Biznes Huquqi Bo\'limi Rahbari',
      ru: 'Партнер, Руководитель практики M&A и Бизнес-права',
      en: 'Partner, Head of M&A & Business Practice',
    },
    experience: {
      uz: '12 yillik korporativ konsalting tajribasi',
      ru: '12 лет опыта корпоративного консалтинга',
      en: '12 years in corporate structuring and M&A deals',
    },
    bio: {
      uz: 'Xorijiy investitsiyalarni jalb qilish, kompaniyalarni qo\'shib olish va yutib yuborish (M&A) bo\'yicha respublikaning eng tajribali huquqshunoslaridan biri.',
      ru: 'Ведущий эксперт по привлечению прямых иностранных инвестиций, слияниям и поглощениям (M&A) и антимонопольному праву.',
      en: 'Leading legal counsel in foreign direct investment structuring, mergers & acquisitions, and cross-border regulatory compliance.',
    },
    specialization: {
      uz: 'M&A bitimlari, Xalqaro shartnomalar, Investitsiyalar',
      ru: 'Сделки M&A, Международные контракты, Инвестиции',
      en: 'M&A Transactions, Foreign Investment, Cross-border Contracts',
    },
    quote: {
      uz: "Muvaffaqiyatli yirik biznes bitimi — bu har bir bandi puxta o'ylangan va barcha yuridik xavf-xatarlari oldindan hisobga olingan mustahkam huquqiy poydevordir.",
      ru: "Успешная деловая сделка — это безупречный юридический фундамент, где каждый пункт выверен и все возможные риски нейтрализованы заранее.",
      en: "A successful major transaction is built on an impeccable legal foundation, where every single clause is scrutinized and all regulatory risks are neutralized in advance.",
    },
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    email: 'sh.karimova@agzamovlegal.uz',
    phone: '+998 90 222 33 44',
    isActive: true,
  },
  {
    id: 'w-3',
    name: 'Rahimov Jamshid Anvarovich',
    position: {
      uz: 'Jinoiy Himoya va Tergov Amaliyoti Rahbari',
      ru: 'Руководитель уголовно-правовой практики',
      en: 'Head of White-Collar Criminal Defense',
    },
    experience: {
      uz: '14 yillik jinoiy advokatura tajribasi',
      ru: '14 лет опыта в уголовной защите',
      en: '14 years defending complex criminal cases',
    },
    bio: {
      uz: 'Iqtisodiy jinoyatlar, mansab lavozimi suiiste\'molligi va soliqqa oid jinoyat ishlarida murosasiz va kuchli himoyachi.',
      ru: 'Признанный специалист по защите топ-менеджмента и предпринимателей в экономических и должностных преступлениях.',
      en: 'Renowned trial lawyer specializing in white-collar crimes, fraud investigations, and pre-trial executive protection.',
    },
    specialization: {
      uz: 'Iqtisodiy jinoyatlar, Tergovdagi himoya, Mansab jinoyatlari',
      ru: 'Экономические преступления, Следственная защита, Должностные споры',
      en: 'White-Collar Crime, Investigative Defense, Regulatory Enforcement',
    },
    quote: {
      uz: "Tergov va sudda soniyalar inson va biznes taqdirini hal qiladi. Murosasiz, qat'iy va chuqur qonuniy pozitsiya — bizning eng oliy himoya tamoyilimizdir.",
      ru: "В следствии и суде секунды решают судьбу человека и бизнеса. Бескомпромиссная, жесткая и безупречно законная позиция — наш главный принцип защиты.",
      en: "In courtrooms and investigative chambers, seconds decide reputations and lives. An uncompromising, assertive, and ironclad legal stance is our supreme principle.",
    },
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    email: 'j.rahimov@agzamovlegal.uz',
    phone: '+998 90 333 44 55',
    isActive: true,
  },
  {
    id: 'w-4',
    name: 'Sodiqova Malika Timur qizi',
    position: {
      uz: 'Intellektual Mulk va IT Huquqi Bo\'yicha Advokat',
      ru: 'Адвокат по интеллектуальной собственности и IT-праву',
      en: 'Senior Associate, IP & Technology Law',
    },
    experience: {
      uz: '8 yillik IT va intellektual mulk tajribasi',
      ru: '8 лет опыта в защите брендов и IT',
      en: '8 years in tech patents, copyrights, and fintech',
    },
    bio: {
      uz: 'Fintech, startaplar va dasturiy ta\'minot kompaniyalariga IP litsenziyalash, ma\'lumotlar maxfiyligi (GDPR) va brend himoyasi bo\'yicha konsalting beradi.',
      ru: 'Специализируется на правовой поддержке IT-компаний, защите авторских прав, патентов и регистрации товарных знаков.',
      en: 'Advises tech conglomerates, fintech startups, and venture funds on IP asset protection, licensing, and compliance.',
    },
    specialization: {
      uz: 'Tovar belgilari, Patentlar, SaaS shartnomalari, Fintech',
      ru: 'Товарные знаки, Патенты, SaaS соглашения, Финтех',
      en: 'Trademarks, IP Licensing, SaaS Contracts, Fintech Compliance',
    },
    quote: {
      uz: "Raqamli asrda g'oya, patent va brend — eng qimmatli aktivdir. Biz ularni noqonuniy nusxalash va nohalol raqobatdan 100% ishonchli himoya qilamiz.",
      ru: "В цифровую эпоху идеи, патенты и бренды — это главный капитал. Мы защищаем ваши интеллектуальные активы от любых посягательств и недобросовестной конкуренции.",
      en: "In the digital era, intellectual property and trademarks are paramount assets. We defend your innovations against unfair competition and infringement.",
    },
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
    email: 'm.sodiqova@agzamovlegal.uz',
    phone: '+998 90 444 55 66',
    isActive: true,
  },
];

export const mockServices: LegalServiceItem[] = [
  {
    id: 's-1',
    slug: 'criminal-defense',
    iconName: 'ShieldAlert',
    casesCount: 180,
    image: '/service-criminal.jpg',
    title: {
      uz: 'Iqtisodiy jinoyatlar bo‘yicha himoya',
      ru: 'Защита по уголовным делам экономической направленности',
      en: 'Economic & White-Collar Criminal Defense',
    },
    shortDesc: {
      uz: 'O‘zlashtirish, soliq va mansab jinoyatlari. Dastlabki tekshiruvdan boshlab — ayblov e’lon qilinguncha, ish taqdiri hal bo‘layotgan bosqichda himoya.',
      ru: 'Хищения, налоговые составы, должностные преступления. Работа с момента первой проверки — до предъявления обвинения, когда исход дела ещё определяется.',
      en: 'Embezzlement, tax fraud, official misconduct. Defense from initial inquiry through formal indictment, while the outcome is determined.',
    },
    fullDesc: {
      uz: 'Biznes rahbarlari va shaxslarga iqtisodiy tergov harakatlari boshlangan ilk daqiqalardan yuridik yordam ko‘rsatamiz. So‘roqlar, tintuvlar va kutilmagan tekshiruvlarda qat’iy qonuniy pozitsiya orqali himoya qilamiz.',
      ru: 'Защита топ-менеджмента и собственников бизнеса с первых минут следственных действий. Пресечение нарушений и формирование правовой позиции до передачи дела в суд.',
      en: 'Aggressive defense representation for business executives and individuals facing economic inquiries from the very first investigative step.',
    },
    features: {
      uz: [
        'Favqulodda tekshiruv va tergovga 24/7 advokat yetib borishi',
        'Tergov organlaridagi barcha so‘roqlarda bevosita ishtirok',
        'Noqonuniy tergov qarorlari ustidan zudlik bilan shikoyat kiritish',
        'Mustaqil moliyaviy va iqtisodiy ekspertizalarni jalb qilish',
      ],
      ru: [
        'Круглосуточный выезд адвоката при обысках и задержаниях',
        'Личное участие во всех допросах и следственных действиях',
        'Обжалование незаконных постановлений и доначислений',
        'Привлечение независимых судебных экспертов и аудиторов',
      ],
      en: [
        '24/7 emergency attorney deployment during audits and raids',
        'Direct representation during all interrogations and actions',
        'Appeals against unlawful warrants and investigative actions',
        'Independent forensic audit and financial expert engagement',
      ],
    },
  },
  {
    id: 's-2',
    slug: 'corporate-law',
    iconName: 'Building2',
    casesCount: 240,
    image: '/service-corporate.jpg',
    title: {
      uz: 'Murakkab mulkiy va korporativ nizolar',
      ru: 'Сложные имущественные и корпоративные конфликты',
      en: 'Complex Property & Corporate Disputes',
    },
    shortDesc: {
      uz: 'Aktivlar nazorati, sheriklar o‘rtasidagi nizolar, yirik bitimlarni bekor qilish. Ishning bahosi da’vo summasi bilan emas, biznes taqdiri bilan o‘lchanadi.',
      ru: 'Споры о контроле над активами, конфликты между партнёрами, оспаривание крупных сделок. Дела, где цена вопроса измеряется не суммой иска, а судьбой бизнеса.',
      en: 'Asset control disputes, partner conflicts, challenges to major transactions. Matters where the stakes are measured by business survival.',
    },
    fullDesc: {
      uz: 'Korporativ nazorat, ta’sischilar o‘rtasidagi ulushlar bo‘linishi, yirik shartnomalarni haqiqiy emas deb topish va biznes aktivlarini noqonuniy o‘zlashtirishdan sud orqali himoya qilamiz.',
      ru: 'Разрешение корпоративных войн, споров учредителей за доли, оспаривание незаконных сделок и возврат утраченного контроля над активами.',
      en: 'Resolving high-stakes ownership conflicts, shareholder covenant disputes, contract invalidations, and protecting enterprise assets.',
    },
    features: {
      uz: [
        'Kompaniya aktivlari ustidan nazoratni qaytarish va saqlash',
        'Ta’sischilar va aksiyadorlar o‘rtasidagi nizolarni hal qilish',
        'Yirik shubxali bitimlar va shartnomalarni sud orqali bekor qilish',
        'Biznesni reyderlik va noqonuniy bosib olishlardan himoyalash',
      ],
      ru: [
        'Защита и восстановление контроля над ключевыми активами',
        'Урегулирование конфликтов между учредителями и инвесторами',
        'Судебное оспаривание подозрительных и кабальных сделок',
        'Предотвращение недружественных поглощений и рейдерства',
      ],
      en: [
        'Safeguarding and restoring control over strategic corporate assets',
        'Resolution of shareholder, partner, and investor deadlock disputes',
        'Judicial challenge and invalidation of major fraudulent transactions',
        'Comprehensive defense against hostile takeovers and bad-faith claims',
      ],
    },
  },
  {
    id: 's-3',
    slug: 'commercial-litigation',
    iconName: 'Scale',
    casesCount: 195,
    image: '/service-audits.jpg',
    title: {
      uz: 'Davlat organlari tekshiruvlarida himoya',
      ru: 'Защита при проверках и взаимодействии с госорганами',
      en: 'Defense in Regulatory Audits & Inquiries',
    },
    shortDesc: {
      uz: 'Tekshiruvlarni real vaqt rejimida huquqiy kuzatish, qo‘shimcha to‘lovlar va ko‘rsatmalarni bekor qilish, suddan oldin kuchli pozitsiyani qurish.',
      ru: 'Сопровождение проверок в режиме реального времени, обжалование доначислений и предписаний, выстраивание позиции до того, как она понадобится в суде.',
      en: 'Real-time audit accompaniment, challenging excessive tax assessments and orders, establishing legal strategy before trial.',
    },
    fullDesc: {
      uz: 'Soliq, bojxona va boshqa nazorat organlari tekshiruvlarida tadbirkorlar manfaatlarini himoya qilamiz. Asossiz talablar va jarimalarni dastlabki bosqichdayoq bekor qildiramiz.',
      ru: 'Юридическое сопровождение проверок налоговой, таможни и контролирующих инстанций. Отмена штрафов и предписаний в досудебном и судебном порядке.',
      en: 'Defending businesses during aggressive audits by tax, customs, and regulatory agencies. Pre-empting penalties before litigation.',
    },
    features: {
      uz: [
        'Soliq va nazorat tekshiruvlarida advokatning bevosita ishtiroki',
        'Asossiz hisoblangan jarima va to‘lovlarni bekor qilish',
        'Davlat organlari xatti-harakatlari ustidan sudga shikoyat qilish',
        'Biznes faoliyati to‘xtatilishining oldini olish',
      ],
      ru: [
        'Непосредственное участие адвоката в ходе контрольных проверок',
        'Досудебная и судебная отмена необоснованных доначислений',
        'Обжалование неправомерных действий должностных лиц',
        'Предотвращение блокировки счетов и приостановки деятельности',
      ],
      en: [
        'On-site attorney counsel during regulatory audit procedures',
        'Overturning improper tax assessments and fines',
        'Administrative lawsuits against arbitrary governmental actions',
        'Preventing asset freezes and operational disruptions',
      ],
    },
  },
  {
    id: 's-4',
    slug: 'private-wealth',
    iconName: 'Landmark',
    casesCount: 140,
    image: '/service-wealth.jpg',
    title: {
      uz: 'Maxfiy shaxsiy va meros ishlari',
      ru: 'Частные дела с высоким уровнем конфиденциальности',
      en: 'High-Confidentiality Private Matters',
    },
    shortDesc: {
      uz: 'Yirik mulklarni taqsimlash, meros nizolari, reputatsiya masalalari. Axborot maydonida shov-shuv va iz qoldirmasdan 100% maxfiy ishlash.',
      ru: 'Разделы крупного имущества, наследственные конфликты, репутационные вопросы. Работа без публичности и следов в информационном поле.',
      en: 'Division of significant assets, inheritance disputes, reputational defense. Discreet representation without media publicity.',
    },
    fullDesc: {
      uz: 'Yirik kapital egalari va nufuzli shaxslar uchun nozik huquqiy masalalar: meros, mulkni taqsimlash, nikoh shartnomalari va shaxsiy obro‘-e’tiborni mutlaq maxfiy himoyalash.',
      ru: 'Деликатные правовые вопросы состоятельных доверителей: раздел активов, оформление наследства, брачные контракты и защита деловой репутации.',
      en: 'Discreet legal counsel for high-net-worth individuals: estate succession, asset division, prenuptial agreements, and private reputational defense.',
    },
    features: {
      uz: [
        '100% mutlaq advokatlik siri va maxfiylik kafolati',
        'Yirik biznes va ko‘chmas mulk aktivlarini taqsimlash',
        'Murakkab xalqaro meros nizolarini hal qilish',
        'Obro‘-e’tiborni ommaviy axborot vositalarida himoya qilish',
      ],
      ru: [
        '100% гарантия адвокатской тайны и полная анонимность',
        'Структурирование раздела крупного бизнеса и недвижимости',
        'Разрешение трансграничных наследственных споров',
        'Защита чести, достоинства и деловой репутации',
      ],
      en: [
        '100% ironclad attorney-client privilege and discretion',
        'Structuring partition of major business and real estate holdings',
        'Cross-border estate succession and inheritance resolution',
        'Discreet defense of privacy, honor, and commercial reputation',
      ],
    },
  },
  {
    id: 's-5',
    slug: 'foreign-investment',
    iconName: 'Coins',
    casesCount: 175,
    image: '/service-invest.jpg',
    title: {
      uz: 'Xorijiy investorlar va kapitalni himoya qilish',
      ru: 'Сопровождение иностранных инвесторов и капитала',
      en: 'Foreign Investment & Capital Counsel',
    },
    shortDesc: {
      uz: 'O‘zbekistonda biznes ishtirokini to‘g‘ri strukturalash, investitsiyalarni himoyalash, mahalliy hamkorlar bilan nizolarni hal qilish.',
      ru: 'Структурирование присутствия в Узбекистане, защита вложений, разрешение споров с локальными партнёрами.',
      en: 'Structuring presence in Uzbekistan, protecting capital investments, resolving cross-border conflicts with local partners.',
    },
    fullDesc: {
      uz: 'Xorijiy kompaniyalar va investorlar uchun O‘zbekistonda xavfsiz investitsiya kiritish, qo‘shma korxonalar tuzish, soliq imtiyozlaridan foydalanish va mahalliy risklarni bartaraf etish.',
      ru: 'Правовой вход зарубежного капитала в Узбекистан: выбор юрисдикции, защита прямых инвестиций, получение налоговых льгот и международный арбитраж.',
      en: 'Cross-border legal counsel for international investors entering Uzbekistan: investment structuring, joint ventures, tax incentive navigation, and dispute resolution.',
    },
    features: {
      uz: [
        'Investitsiya loyihalarini to‘liq huquqiy ekspertizadan o‘tkazish',
        'Xorijiy kapitalni milliylashtirish va tortib olish xavflaridan himoya',
        'Xalqaro tijorat shartnomalarini tuzish va ekspertizasi',
        'Xalqaro arbitraj sudlarida (ICC, LCIA, TIAC) vakillik',
      ],
      ru: [
        'Комплексный юридический аудит инвестиционных проектов',
        'Защита прав иностранных инвесторов от регуляторных рисков',
        'Разработка внешнеэкономических контрактов по стандартам FIDIC/ICC',
        'Представительство в международном коммерческом арбитраже',
      ],
      en: [
        'Comprehensive Legal Due Diligence on investment ventures',
        'Protection against regulatory expropriation and partner fraud',
        'Drafting cross-border contracts under ICC/FIDIC standards',
        'Representation in international arbitration tribunals',
      ],
    },
  },
];

export const mockPartners: PartnerItem[] = [
  {
    id: 'p-1',
    companyName: 'Barra Group Pro',
    logoUrl: '/part1.webp',
  },
  {
    id: 'p-2',
    companyName: 'Apex Partners',
    logoUrl: '/part2.webp',
  },
  {
    id: 'p-3',
    companyName: 'Global Trade Hub',
    logoUrl: '/part3.webp',
  },
  {
    id: 'p-4',
    companyName: 'Trans Asia Logistics',
    logoUrl: '/part4.webp',
  },
  {
    id: 'p-5',
    companyName: 'Eco Green Invest',
    logoUrl: '/part5.webp',
  },
];

export const mockNews: NewsItem[] = [
  {
    id: 'n-1',
    slug: 'uzbekiston-soliq-kodeksi-ozgarishlar-2026',
    title: {
      uz: '2026-yilda O\'zbekiston Soliq Qonunchiligidagi Muhim O\'zgarishlar va Biznesga Ta\'siri',
      ru: 'Ключевые изменения в налоговом законодательстве Узбекистана в 2026 году',
      en: 'Major Amendments in Uzbekistan Tax Code 2026 & Impact on Business',
    },
    excerpt: {
      uz: 'Yangi tartiblar korxonalarga qanday imtiyozlar va qo\'shimcha majburiyatlar yuklaydi? Yuristlarimizdan amaliy tahlil.',
      ru: 'Какие преференции и новые регуляторные требования налагаются на бизнес? Практический анализ наших экспертов.',
      en: 'What benefits and regulatory compliance obligations apply to businesses? A practical review by our senior attorneys.',
    },
    content: {
      uz: 'O\'zbekiston Respublikasi Soliq kodeksiga kiritilgan so\'nggi o\'zgarishlar tadbirkorlik subyektlari uchun bir qator qulayliklar bilan birga, tekshiruv mexanizmlarida qat\'iylashuvni ham joriy etmoqda.\n\nBirinchidan, elektron hisob-fakturalar va tovarlar aylanmasining avtomatlashtirilgan tahlili yanada chuqurlashtirildi. Agar sizning biznesingizda xavf darajasi yuqori deb topilsa, avtomatik ravishda kameral tekshiruv tayinlanishi mumkin.\n\nIkkinchidan, xorijiy kompaniyalar bilan amalga oshiriladigan transfer narxlari (Transfer Pricing) nazorati jiddiy e\'tibor markaziga tushdi.\n\nAGZAMOV LEGAL GROUP mutaxassislari sizga ushbu o\'zgarishlarga kompaniyangizni oldindan tayyorlashni va soliq xavflarini minimallashtirishni tavsiya qiladi.',
      ru: 'Последние изменения в Налоговом кодексе Республики Узбекистан вводят ряд стимулирующих мер, одновременно ужесточая автоматизированный фискальный контроль.\n\nВо-первых, глубина анализа электронных счетов-фактур возросла. При определении высокого критерия риска система автоматически инициирует камеральную проверку.\n\nВо-вторых, повышен контроль за трансфертным ценообразованием при сделках с иностранными контрагентами.\n\nЭксперты AGZAMOV LEGAL GROUP рекомендуют заблаговременно провести превентивный аудит документов.',
      en: 'Recent updates to the Tax Code of Uzbekistan introduce streamlined incentives alongside advanced automated auditing tools.\n\nFirst, algorithmic verification of electronic invoices has been intensified. Companies flagged as high risk are instantly scheduled for desk audits.\n\nSecond, increased scrutiny is being directed toward transfer pricing in cross-border commerce.\n\nOur legal team advises corporate leaders to perform pre-audit compliance reviews promptly.',
    },
    thumbnail: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
    author: 'Agzamov Bobur',
    category: {
      uz: 'Soliq Huquqi',
      ru: 'Налоговое право',
      en: 'Tax Law',
    },
    createdAt: '2026-08-25',
    readTime: 4,
  },
  {
    id: 'n-2',
    slug: 'shartnomalardagi-xatolar-sudda-yutqazish-sababi',
    title: {
      uz: 'Tijorat Shartnomalaridagi 5 Ta Xavfli Xato: Sudda Qanday Yutqazmaslik Kerak?',
      ru: '5 критических ошибок в коммерческих договорах, ведущих к проигрышу в суде',
      en: '5 Fatal Pitfalls in Commercial Contracts That Lead to Court Losses',
    },
    excerpt: {
      uz: 'Standart shablon shartnomalardan foydalanish biznes uchun juda qimmatga tushishi mumkin. Xavflarni qanday bartaraf etish kerak?',
      ru: 'Использование шаблонных договоров из интернета может стоить миллионы. Разбираем реальные судебные прецеденты.',
      en: 'Relying on generic internet templates can be catastrophic. Real court precedent breakdown and mitigation steps.',
    },
    content: {
      uz: 'Ko\'plab tadbirkorlar shartnomalarni internetdan ko\'chirib olib, unga imzo chekadilar. Biroq amaliyot shuni ko\'rsatadiki, forsm Major bandlarining noaniqligi, sudlov vakolatining noto\'g\'ri belgilanishi va jarimalarning chegaralanmagani millionlab so\'m yo\'qotishlarga sabab bo\'ladi.\n\nBizning amaliyotimizda uchragan eng xatarli holat — tovar qabul qilinganligi to\'g\'risidagi dalolatnoma imzolanmasdan turib yetkazib berish bo\'lgan. Sudda qarzdorlikni isbotlash ancha murakkablashadi.\n\nHar bir yirik bitim oldidan professional yuridik xulosaga ega bo\'lishingiz shart.',
      ru: 'Многие предприниматели скачивают стандартные договоры, не учитывая тонкостей применимого права. В результате неточные формулировки форс-мажора или подсудности приводят к невосполнимым убыткам.\n\nНаиболее частая фатальная ошибка — отсутствие актов приема-передачи надлежащей формы.\n\nКаждый коммерческий контракт должен проходить индивидуальную юридическую экспертизу.',
      en: 'Many enterprises download templated contracts without localized legal tailoring. Ambiguous force majeure clauses and jurisdiction clauses routinely result in massive losses.\n\nOne recurring pitfall is delivery without rigorous statutory acceptance certificates, leaving the seller defenseless in recovery actions.\n\nEvery substantial transaction requires bespoke legal drafting.',
    },
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    author: 'Karimova Shahzoda',
    category: {
      uz: 'Sud Amaliyoti',
      ru: 'Судебная практика',
      en: 'Litigation Practice',
    },
    createdAt: '2026-08-14',
    readTime: 5,
  },
  {
    id: 'n-3',
    slug: 'brend-va-tovar-belgisi-himoyasi',
    title: {
      uz: 'Brendingizni O\'g\'irlatib Qo\'ymang: Tovar Belgisini Ro\'yxatdan O\'tkazish Qoidalari',
      ru: 'Защитите свой бренд: Правила регистрации товарного знака и защита от патентных троллей',
      en: 'Guard Your Trademark: How to Register Brand Assets & Ward Off IP Trolls',
    },
    excerpt: {
      uz: 'Agar brendingizni o\'z vaqtida ro\'yxatdan o\'tkazmasangiz, raqobatchingiz uni o\'zlashtirib, sizni sudga berishi mumkin.',
      ru: 'Если вы вовремя не зарегистрируете бренд, недобросовестные конкуренты могут лишить вас бизнеса.',
      en: 'Failing to register early leaves your trademark exposed to predatory squatters and litigation.',
    },
    content: {
      uz: 'Brend — bu kompaniyangizning eng asosiy obro\'sidir. O\'zbekistonda tovar belgilari birinchi bo\'lib ariza topshirgan shaxsga beriladi («First to file» prinsipi).\n\nAgar siz 5 yil davomida mashhur qilgan nomingizni ro\'yxatdan o\'tkazmagan bo\'lsangiz, uchinchi shaxs uni o\'z nomiga rasmiylashtirib, sizdan mahsulotlarni yo\'q qilishni talab qilishi mumkin.\n\nAGZAMOV LEGAL GROUP tovar belgisi arizasini tezkorlik bilan topshirish va kontrafaktga qarshi kurashishda to\'liq yordam beradi.',
      ru: 'Бренд — ключевая ценность вашей компании. В Республике Узбекистан действует принцип «первого заявителя».\n\nЕсли бренд не зарегистрирован вовремя, патентные тролли могут оформить его на себя и потребовать изъятия вашей продукции из оборота.\n\nМы обеспечиваем ускоренную подачу заявок и защиту от недобросовестной конкуренции.',
      en: 'Your brand is your firm\'s core equity. Uzbekistan strictly follows the \'first-to-file\' system.\n\nFailure to register means third parties can seize your branding and demand injunctions against your operations.\n\nWe provide rapid priority filing and anti-counterfeiting enforcement.',
    },
    thumbnail: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
    author: 'Sodiqova Malika',
    category: {
      uz: 'Intellektual Mulk',
      ru: 'Интеллектуальная собственность',
      en: 'IP Protection',
    },
    createdAt: '2026-08-02',
    readTime: 3,
  },
];

export const mockFaqs: FaqItem[] = [
  {
    id: 'f-1',
    order: 1,
    question: {
      uz: 'Birinchi konsultatsiyada nimalar hal qilinadi va u qanday o\'tadi?',
      ru: 'Что происходит на первой консультации и как она проходит?',
      en: 'What takes place during the initial legal consultation?',
    },
    answer: {
      uz: 'Dastlabki maslahatlashuvda advokatimiz sizning mavjud hujjatlaringizni o\'rganib chiqadi, ishning istiqbolini va risklarini xolis baholaydi. Shundan so\'ng, eng optimal harakatlar rejasi va xizmat narxi aniq belgilanadi.',
      ru: 'На первой встрече адвокат детально изучает ваши документы, проводит объективную оценку рисков и перспектив дела. После этого формируется пошаговый план действий и фиксируется стоимость услуг.',
      en: 'During the introductory meeting, our attorney examines your case documents, objectively assesses risk factors and winning probability, and establishes a tailored roadmap along with transparent fee parameters.',
    },
  },
  {
    id: 'f-2',
    order: 2,
    question: {
      uz: 'Advokat bilan tuziladigan shartnoma qanday kafolatlarni beradi?',
      ru: 'Какие гарантии дает официальный договор с адвокатским бюро?',
      en: 'What legal guarantees does a formal engagement agreement provide?',
    },
    answer: {
      uz: 'Biz qonun talablariga to\'liq muvofiq bo\'lgan rasmiy shartnoma tuzamiz. Unda advokatlik siri (100% maxfiylik), bajariladigan ishlar hajmi, muddatlar va tomonlarning javobgarligi aniq aks ettiriladi.',
      ru: 'Мы заключаем официальное соглашение в соответствии с законодательством об адвокатуре. В нем строго закреплены нормы адвокатской тайны (100% конфиденциальность), объем работ, сроки и финансовые обязательства.',
      en: 'We execute a statutory attorney-client contract strictly adhering to professional bar standards. It enshrines absolute attorney-client privilege, scope of deliverables, timelines, and accountability.',
    },
  },
  {
    id: 'f-3',
    order: 3,
    question: {
      uz: 'Xizmatlar narxi qanday shakllanadi va yashirin to\'lovlar bormi?',
      ru: 'Как формируется стоимость услуг и есть ли скрытые платежи?',
      en: 'How are fee arrangements structured and are there any hidden charges?',
    },
    answer: {
      uz: 'Bizda har bir ish bo\'yicha qat\'iy shaffoflik ta\'minlanadi. Ishning murakkabligiga qarab: fiksirlangan summa (fixed fee), soatbay to\'lov (hourly rate) yoki natijaga bog\'liq muvaffaqiyat mukofoti (success fee) qo\'llaniladi. Hech qanday yashirin xarajatlar yo\'q.',
      ru: 'Мы гарантируем абсолютную финансовую прозрачность. В зависимости от специфики задачи применяется фиксированная оплата (fixed fee), почасовая ставка или гонорар успеха (success fee). Никаких непредвиденных надбавок.',
      en: 'We uphold utter fiscal integrity. Depending on project dynamics, we offer fixed pricing, transparent hourly billing, or performance-based success fees. Zero hidden surcharges.',
    },
  },
  {
    id: 'f-4',
    order: 4,
    question: {
      uz: 'Favqulodda holatlarda (tintuv, tekshiruv, hibsga olish) qancha vaqtda yetib kelasiz?',
      ru: 'В течение какого времени выезжает адвокат при экстренных проверках или задержании?',
      en: 'How quickly can emergency counsel deploy during unexpected raids or detentions?',
    },
    answer: {
      uz: 'Toshkent shahri bo\'ylab navbatchi advokatimiz qo\'ng\'iroqdan so\'ng 30-45 daqiqa ichida yetib keladi. Hududlarda esa hamkorlik tarmog\'imiz orqali zudlik bilan himoyaga kirishiladi.',
      ru: 'По Ташкенту дежурный адвокат оперативно прибывает на место в течение 30-45 минут после звонка. В регионах защита активируется через нашу партнерскую сеть.',
      en: 'Within Tashkent, our emergency trial attorney arrives on site within 30 to 45 minutes of notice. In other provinces, defense intervention is mobilized through our nationwide partner network.',
    },
  },
  {
    id: 'f-5',
    order: 5,
    question: {
      uz: 'Masofadan turib yoki xorijdan turib xizmat ko\'rsata olasizmi?',
      ru: 'Оказываете ли вы услуги дистанционно или для иностранных клиентов?',
      en: 'Can you provide counsel remotely or represent international non-resident clients?',
    },
    answer: {
      uz: 'Ha, albatta. Biz xorijiy kompaniyalar va jismoniy shaxslarga ishonchnoma (Power of Attorney) asosida ularning shaxsan ishtirokisiz O\'zbekiston hududida to\'liq yuridik vakillikni amalga oshiramiz.',
      ru: 'Да, безусловно. Мы представляем интересы зарубежных инвесторов и нерезидентов на основании апостилированной доверенности без необходимости их личного присутствия в стране.',
      en: 'Absolutely. We regularly represent foreign investors, multinationals, and non-residents via Apostilled Power of Attorney, conducting full legal proceedings without requiring client travel.',
    },
  },
];
