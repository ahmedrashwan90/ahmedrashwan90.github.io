// Project page content: the goal, what Ahmed worked on, and what was delivered.
// Sources: Master Brief, each project's PROJECT.md, captions files and strategy PDFs.
// No performance numbers by design (see Brief §9–10).
type L = { ar: string; en: string };
type LL = { ar: string[]; en: string[] };
export type ProjectDetail = {
  context: L;          // the business situation / the goal
  work: { title: L; body: L }[]; // what I worked on
  deliverables: LL;    // outputs
  period?: L;
  hideExtras?: boolean; // hide uncaptioned designs grid
};

export const details: Record<string, ProjectDetail> = {
  'city-pumps': {
    period: { ar: 'شغل حالي · السماح جروب', en: 'Current role · EL-SAMAH Group' },
    context: {
      ar: 'City Pumps بتستورد وتوزّع مضخات مياه إيطالية في سوق متخصص. العميل غالبًا مش عارف أنهي موتور يناسبه: ساكن في دور عالي؟ عنده بير عميق؟ المية ضعيفة؟ وكمان السوق فيه منتجات مقلدة كتير. فكان لازم التسويق يشرح المنتج ببساطة، ويخلي العميل يثق في البراند الأصلي ويعرف يشتريه منين.',
      en: 'City Pumps imports and distributes Italian water pumps in a specialist market. Customers often don’t know which pump they need. Do they live on a high floor? Have a deep well? Weak pressure? The market is also full of counterfeits. So marketing had to explain the product simply and help people trust the original brand and know where to buy it.',
    },
    work: [
      { title: { ar: 'بحث السوق والمنافسين', en: 'Market & competitor research' }, body: { ar: 'فهم احتياجات العملاء وطريقة كلام المنافسين عشان نحدد رسائل البراند اللي تفرق.', en: 'Understanding customer needs and competitor messaging to define what sets the brand apart.' } },
      { title: { ar: 'استراتيجية السوشيال ميديا', en: 'Social media strategy' }, body: { ar: 'محاور محتوى مبنية على مشاكل الاستخدام الحقيقية: الأدوار العالية، الآبار العميقة، وضغط المياه.', en: 'Content pillars built on real use cases: high floors, deep wells and water pressure.' } },
      { title: { ar: 'محتوى الثقة والأصالة', en: 'Trust & authenticity content' }, body: { ar: 'رسائل التحذير من التقليد، شبكة التوزيع، و"ليه سيتي" عشان العميل يشتري وهو مطمن.', en: 'Anti-counterfeit messaging, the distribution network and “Why City” so customers buy with confidence.' } },
      { title: { ar: 'التوجيه الإبداعي', en: 'Creative direction' }, body: { ar: 'تحديد فكرة كل تصميم ورسالته، ومراجعة التصميمات والكابشنات قبل النشر.', en: 'Defining each design’s idea and message, and reviewing designs and captions before publishing.' } },
      { title: { ar: 'حملات Meta', en: 'Meta campaigns' }, body: { ar: 'تخطيط وإدارة الحملات الإعلانية على فيسبوك وإنستجرام حسب المنتج والجمهور.', en: 'Planning and running Facebook and Instagram campaigns by product and audience.' } },
      { title: { ar: 'متابعة الأداء والحضور الرقمي', en: 'Performance & digital presence' }, body: { ar: 'تحليل نتائج الحملات لتطوير اللي جاي، والتنسيق التسويقي للموقع.', en: 'Reviewing campaign results to improve the next round, and coordinating marketing for the website.' } },
    ],
    deliverables: {
      ar: ['استراتيجية سوشيال ميديا', 'خطط محتوى شهرية', 'توجيه التصميمات والكابشنات', 'حملات Meta', 'متابعة وتحليل الأداء'],
      en: ['Social media strategy', 'Monthly content plans', 'Design & caption direction', 'Meta campaigns', 'Performance review'],
    },
  },
  'el-samah-retail': {
    period: { ar: 'شغل حالي · السماح جروب', en: 'Current role · EL-SAMAH Group' },
    context: {
      ar: 'محلات السماح بتبيع مضخات وفلاتر مياه من خلال عدة فروع في القاهرة والجيزة. الهدف إن الناس اللي بتشوف الإعلانات تسأل وتيجي الفرع، وتكون عارفة هي محتاجة إيه قبل ما تيجي.',
      en: 'El-Samah sells water pumps and filters through several branches in Cairo and Giza. The goal is for people who see the ads to get in touch and come to the branch already knowing what they need.',
    },
    work: [
      { title: { ar: 'استراتيجية تسويق التجزئة', en: 'Retail marketing strategy' }, body: { ar: 'خطة تربط المنتجات بالمواسم واحتياجات كل فرع.', en: 'A plan connecting products to seasons and branch needs.' } },
      { title: { ar: 'محتوى إرشادي للمنتجات', en: 'Product guidance content' }, body: { ar: 'إزاي تختار الموتور حسب الدور، ضغط المياه في الصيف، والأداء والكفاءة.', en: 'Choosing a pump by floor, summer water pressure, performance and efficiency.' } },
      { title: { ar: 'حملات ترويجية وموسمية', en: 'Promotional & seasonal campaigns' }, body: { ar: 'عروض وحملات مرتبطة بمواسم الطلب.', en: 'Offers and campaigns tied to demand seasons.' } },
      { title: { ar: 'الإعلانات المدفوعة', en: 'Media buying' }, body: { ar: 'إدارة حملات Meta بتستهدف المناطق القريبة من الفروع.', en: 'Running Meta campaigns targeting areas around the branches.' } },
      { title: { ar: 'الإشراف على الردود', en: 'Moderator supervision' }, body: { ar: 'متابعة فريق الردود على الرسائل والتعليقات عشان الاستفسار ما يضيعش.', en: 'Supervising the team answering messages and comments so no enquiry is lost.' } },
      { title: { ar: 'متابعة الأداء والمبيعات', en: 'Performance & sales follow-up' }, body: { ar: 'متابعة نتائج التسويق وربطها بأداء المبيعات.', en: 'Tracking marketing results alongside sales performance.' } },
    ],
    deliverables: {
      ar: ['خطة تسويق التجزئة', 'محتوى منتجات إرشادي', 'حملات موسمية', 'حملات Meta', 'إشراف على الردود', 'متابعة أداء'],
      en: ['Retail marketing plan', 'Product guidance content', 'Seasonal campaigns', 'Meta campaigns', 'Moderator supervision', 'Performance tracking'],
    },
  },
  'beauty-life-clinics': {
    period: { ar: 'عميل فريلانس', en: 'Freelance client' },
    context: {
      ar: 'Beauty Life سلسلة عيادات تجميل ليها فروع في القاهرة والإسكندرية والمنصورة، بتقدم ليزر وفيلر وبوتكس وعناية بالبشرة. اللي كانوا محتاجينه خطة تجيب حجوزات بانتظام، مش بوستات وعروض متفرقة كل شوية.',
      en: 'Beauty Life is a chain of aesthetic clinics across Cairo, Alexandria and Mansoura offering laser, filler, Botox and skin care. What they needed was a plan that brings in bookings steadily, not scattered posts and one-off offers.',
    },
    work: [
      { title: { ar: 'التموضع وصوت البراند', en: 'Positioning & tone of voice' }, body: { ar: 'تحديد مكان العيادة في السوق والطبقة المستهدفة وطريقة الكلام مع العميلة.', en: 'Defining the clinic’s market position, target segment and how it speaks to clients.' } },
      { title: { ar: '٤ شخصيات عملاء', en: 'Four buyer personas' }, body: { ar: 'لكل شخصية احتياجها ومخاوفها والحاجة اللي تخليها تحجز، ومنهم العرايس وباقتهم.', en: 'Each with its own needs, worries and reasons to book, including brides and a bridal package.' } },
      { title: { ar: 'استراتيجية الفانل', en: 'Funnel strategy' }, body: { ar: 'وعي ← تفكير ← حجز ← احتفاظ، ولكل مرحلة نوع محتوى وإعلان مختلف.', en: 'Awareness → consideration → booking → retention, each with its own content and ads.' } },
      { title: { ar: 'خطة تنفيذ ٩٠ يوم', en: '90-day action plan' }, body: { ar: 'شهر للإطلاق والتجهيز، شهر للتوسع على الشخصيات، وشهر للولاء والترشيحات.', en: 'Month one setup and launch, month two scaling by persona, month three loyalty and referrals.' } },
      { title: { ar: 'أعمدة المحتوى', en: 'Content pillars' }, body: { ar: 'تعليم، إثبات بالنتائج والآراء، تجربة داخل العيادة، ومحتوى تحويل للحجز.', en: 'Education, proof through results and reviews, the in-clinic experience, and conversion content.' } },
      { title: { ar: 'الحملات ومتابعة العملاء', en: 'Campaigns & lead follow-up' }, body: { ar: 'Lead Ads وواتساب وإعادة استهداف، مع تصنيف العملاء على واتساب ومتابعة منظمة بعد أول تواصل.', en: 'Lead Ads, WhatsApp and retargeting, with WhatsApp labels and a structured follow-up after first contact.' } },
    ],
    deliverables: {
      ar: ['خطة تسويق ٩٠ يوم', '٤ شخصيات عملاء', 'استراتيجية فانل', 'أعمدة محتوى', 'نظام متابعة واتساب وCRM', 'حملات مدفوعة وعروض موسمية'],
      en: ['90-day marketing plan', 'Four buyer personas', 'Funnel strategy', 'Content pillars', 'WhatsApp & CRM follow-up', 'Paid & seasonal campaigns'],
    },
  },
  'heba-sager-beauty': {
    period: { ar: 'عميل فريلانس · ليبيا', en: 'Freelance client · Libya' },
    context: {
      ar: 'هبة صقر خبيرة مكياج في ليبيا، عندها صالون، وطلعت منتج فاونديشن خاص بيها. تلات أنشطة مرتبطين ببعض، بس كل واحد ليه جمهوره ورسالته. والتحدي كان إننا نسوّق كل واحد لوحده من غير ما يتلخبطوا في بعض.',
      en: 'Heba Sager is a makeup artist in Libya with a salon and her own foundation product. Three related activities, each with its own audience and message. The challenge was marketing each one on its own without blurring them together.',
    },
    work: [
      { title: { ar: 'تحليل الوضع والمنافسين', en: 'Situation & competitor analysis' }, body: { ar: 'مراجعة الحسابات الحالية ومقارنتها بالمنافسين في السوق لتحديد الفرص.', en: 'Reviewing the current accounts against competitors in the market to find opportunities.' } },
      { title: { ar: 'شخصيات العملاء وصوت البراند', en: 'Personas & tone of voice' }, body: { ar: 'شخصيات العميلات، وشخصية واضحة للبراند وطريقة كلامه، مع اللي نقوله واللي نتجنبه.', en: 'Client personas and a clear brand character and voice, with do’s and don’ts.' } },
      { title: { ar: 'أعمدة المحتوى', en: 'Content pillars' }, body: { ar: 'قبل وبعد، نصايح سريعة، كواليس الشغل، لايفات أسئلة، وآراء العميلات. وكل بوست بيبدأ بجملة تشد، وبعدها معلومة مفيدة، وفي الآخر دعوة واضحة.', en: 'Before/after looks, quick tips, behind the scenes, Q&A lives and client reviews. Every post opens with a hook, gives something useful, and ends with a clear call to action.' } },
      { title: { ar: 'إطلاق الفاونديشن', en: 'Foundation launch content' }, body: { ar: 'عرض الدرجات الأربعة (تامورت، سرايا، قورينا، جرمة)، السعر، أسئلة الطلب المسبق، وآراء العميلات.', en: 'Presenting the four shades (Tamurt, Saraya, Cyrene, Germa), pricing, pre-order FAQ and reviews.' } },
      { title: { ar: 'متجر EasyOrder', en: 'EasyOrder storefront' }, body: { ar: 'بناء متجر أونلاين للمنتج عشان الطلب يبقى سهل ومباشر.', en: 'Building an online store so ordering is simple and direct.' } },
      { title: { ar: 'إعلانات Meta حسب الحاجة', en: 'Meta ads on demand' }, body: { ar: 'بعمل الحملات وبديرها وقت ما يكون فيه إطلاق أو احتياج.', en: 'Creating and running campaigns when a launch or need came up.' } },
    ],
    deliverables: {
      ar: ['استراتيجية سوشيال ميديا', 'شخصيات العملاء وصوت البراند', 'أعمدة محتوى', 'محتوى إطلاق المنتج', 'متجر EasyOrder', 'حملات Meta'],
      en: ['Social media strategy', 'Personas & tone of voice', 'Content pillars', 'Product launch content', 'EasyOrder store', 'Meta campaigns'],
    },
  },
  'uptown-mass-gym': {
    period: { ar: 'عميل · ٢٠٢٢', en: 'Client · 2022' },
    hideExtras: true,
    context: {
      ar: 'جيم في المهندسين، في منطقة مليانة جيمات. الهدف كان إن الناس تعرف الجيم وتتفاعل معاه، ويبقى له جمهور ثابت على فيسبوك وإنستجرام.',
      en: 'A gym in Mohandessin, in an area packed with gyms. The goal was for people to know the gym, engage with it, and build a steady following on Facebook and Instagram.',
    },
    work: [
      { title: { ar: 'تحليل المنافسين', en: 'Competitor analysis' }, body: { ar: 'دراسة صفحات الجيمات المنافسة في المنطقة وطريقة كلامهم مع جمهورهم.', en: 'Studying competing gyms’ pages in the area and how they speak to their audience.' } },
      { title: { ar: 'الجمهور وشخصيات العملاء', en: 'Audience & personas' }, body: { ar: 'تحديد الجمهور وشخصيات بأهداف مختلفة: شكل الجسم، خسارة الوزن، وبناء العضل.', en: 'Defining the audience and personas around body shape, weight loss and muscle building.' } },
      { title: { ar: 'استراتيجية المحتوى', en: 'Content strategy' }, body: { ar: 'تقسيم واضح بين محتوى الوعي، النصايح والمعلومات، والمحتوى البيعي، بخطة نشر شهرية.', en: 'A clear split between awareness, tips and promotional content, on a monthly schedule.' } },
      { title: { ar: 'أفكار منشورات وبريف للتصميم', en: 'Post concepts & visual briefs' }, body: { ar: 'أفكار لكل شخصية، مع بريف بصري لكل منشور بيعي.', en: 'Ideas for each persona, with a visual brief for each sales post.' } },
      { title: { ar: 'التفاعل وخدمة العملاء', en: 'Engagement & response' }, body: { ar: 'منشورات أسئلة وتفاعل، ومعيار سرعة رد على الرسائل.', en: 'Question and engagement posts, plus a response-time standard for messages.' } },
      { title: { ar: 'العروض الموسمية', en: 'Seasonal offers' }, body: { ar: 'حملات مرتبطة بالمواسم زي رمضان.', en: 'Campaigns tied to seasons such as Ramadan.' } },
    ],
    deliverables: {
      ar: ['مقترح استراتيجية', 'تحليل منافسين', 'شخصيات عملاء', 'أفكار محتوى وبريف بصري', 'منشورات منشورة'],
      en: ['Strategy proposal', 'Competitor analysis', 'Buyer personas', 'Content concepts & visual briefs', 'Published posts'],
    },
  },
  'el-samah-advertising': {
    hideExtras: true,
    period: { ar: 'شغل حالي · السماح جروب', en: 'Current role · EL-SAMAH Group' },
    context: {
      ar: 'El Samah Advertising بتأجّر مواقع إعلانات خارجية (بيلبوردات) في القاهرة والجيزة لشركات وبراندات. ده تسويق B2B، يعني بتكلم صاحب قرار في شركة، ومحتاج يقتنع إن المكان ده هيخدم حملته.',
      en: 'El Samah Advertising rents outdoor advertising locations (billboards) in Cairo and Giza to companies and brands. It’s B2B, so you’re talking to a decision-maker at a company who needs to be convinced the location will serve their campaign.',
    },
    work: [
      { title: { ar: 'Strategic Blueprint', en: 'Strategic blueprint' }, body: { ar: 'وثيقة استراتيجية فيها التموضع، أعمدة المحتوى، استراتيجية المنصات، الإعلانات المدفوعة، والقياس.', en: 'A strategy document covering positioning, content pillars, platform strategy, paid media and measurement.' } },
      { title: { ar: 'تموضع البراند ورسائله', en: 'Brand positioning & messaging' }, body: { ar: 'رسائل بتشرح قيمة اختيار المكان الصح للحملة.', en: 'Messaging that explains the value of the right location for a campaign.' } },
      { title: { ar: 'تخطيط المحتوى والتوجيه الإبداعي', en: 'Content planning & creative direction' }, body: { ar: 'محتوى للسوشيال ميديا موجّه لأصحاب القرار في الشركات.', en: 'Social content aimed at company decision-makers.' } },
      { title: { ar: 'حملات Meta', en: 'Meta campaigns' }, body: { ar: 'إعلانات مدفوعة موجهة لجمهور الأعمال.', en: 'Paid campaigns aimed at a business audience.' } },
      { title: { ar: 'دعم فريق المبيعات', en: 'Sales enablement' }, body: { ar: 'مواد تسويقية يستخدمها فريق المبيعات مع العملاء.', en: 'Marketing materials the sales team uses with prospects.' } },
      { title: { ar: 'التنسيق مع العمليات', en: 'Operations coordination' }, body: { ar: 'التنسيق على متطلبات الحملات والمواقع.', en: 'Coordinating on campaign and location requirements.' } },
    ],
    deliverables: {
      ar: ['Strategic Blueprint', 'تموضع ورسائل البراند', 'خطة محتوى', 'حملات Meta', 'مواد دعم المبيعات'],
      en: ['Strategic blueprint', 'Positioning & messaging', 'Content plan', 'Meta campaigns', 'Sales enablement materials'],
    },
  },
};
