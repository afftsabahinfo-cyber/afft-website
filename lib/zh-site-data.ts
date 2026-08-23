export type ZhCard = {
  title: string;
  text: string;
};

export type ZhFaq = {
  question: string;
  answer: string;
};

export type ZhCatalogItem = {
  title: string;
  day1: string;
  day2: string;
  day3: string;
  bestFor: string;
};

export type ZhPackage = {
  slug: string;
  href: string;
  image: string;
  imageAlt: string;
  price: string;
  title: string;
  shortText: string;
  bestFor: string;
  duration: string;
  overview: string;
  includes: string[];
  faqs: ZhFaq[];
  whatsappText: string;
};

export type ZhTravelService = {
  slug: string;
  href: string;
  eyebrow: string;
  title: string;
  image: string;
  imageAlt: string;
  text: string;
  intro: string;
  overview: string;
  quickFacts: ZhCard[];
  goodFor: string[];
  howAfftHelps: string[];
  whatToSend: string[];
  faqs: ZhFaq[];
  whatsappText: string;
};

export type ZhRentSeries = {
  slug: string;
  href: string;
  eyebrow: string;
  title: string;
  image: string;
  imageAlt: string;
  startingFrom: string;
  hook: string;
  bestFor: string;
  intro: string;
  featuredTitle: string;
  featuredPrice: string;
  featuredText: string;
  priceRange: string;
  items: ZhCatalogItem[];
  notes: string[];
  whatsappText: string;
};

export const zhNavLinks = [
  { label: "露营套餐", href: "/zh/camping" },
  { label: "营地指南", href: "/zh/camping-spots" },
  { label: "Rent It", href: "/zh/rent-it" },
  { label: "私人行程", href: "/zh/private-tours" },
  { label: "包车", href: "/zh/car-rental" },
  { label: "真实案例", href: "/zh/customer-stories" },
  { label: "FAQ", href: "/zh/faq" },
];

export const zhPackages: ZhPackage[] = [
  {
    slug: "jimny-sleep-camp",
    href: "/zh/packages/jimny-sleep-camp",
    image: "/images/jimny-sleep-camp-rm399.webp",
    imageAlt: "AFFT RM399 Jimny Sleep Camp 露营套餐海报",
    price: "RM399 / 2 人",
    title: "Jimny Sleep Camp",
    shortText: "最轻量的 Jimny 露营入门，两人、2 天 1 夜，已包含营地费用。",
    bestFor: "适合：2 人 / 轻露营 / Jimny 睡车体验",
    duration: "2 天 1 夜",
    overview:
      "Jimny Sleep Camp 是 AFFT Jimny Camp Series 里最简单的一档。适合两位客人想体验 Jimny、营地和基础睡眠设置，不想一开始就处理太多装备和料理细节。",
    includes: [
      "Jimny Sierra",
      "营地费用",
      "Mobi Garden 车睡垫",
      "2 张 Black Dog 露营椅",
      "1 张 Nature Hike 折叠桌",
      "2 个 Black Dog LED 露营灯",
      "1 个 JBL GO 5 Speaker",
      "2 个 Snowpeak Mug",
      "2 份 Refreshing Kit",
      "1 套 Black Dog Fly Sheet with Pole",
    ],
    faqs: [
      {
        question: "Jimny Sleep Camp 适合谁？",
        answer: "适合想要最简单 Jimny 露营体验的两位客人，重点是开车进营地、简单设置、睡车和享受户外气氛。",
      },
      {
        question: "RM399 包含营地费用吗？",
        answer: "包含。Jimny Camp Series 这三档都是 2 天 1 夜、2 人，并包含营地费用。",
      },
      {
        question: "食物和料理装备包含吗？",
        answer: "不包含。Cooler box、cookware、coffee set、风扇、高级灯光、食物和饮料都不在基础 RM399 内。",
      },
      {
        question: "可以加购料理或风扇吗？",
        answer: "可以。你可以通过 WhatsApp 说明日期和需求，AFFT 再确认适合的加项和报价。",
      },
    ],
    whatsappText: "你好 AFFT，我想了解 RM399 Jimny Sleep Camp 露营套餐。",
  },
  {
    slug: "jimny-explorer-camp",
    href: "/zh/packages/jimny-explorer-camp",
    image: "/images/jimny-explorer-camp-rm599.webp",
    imageAlt: "AFFT RM599 Jimny Explorer Camp 露营套餐海报",
    price: "RM599 / 2 人",
    title: "Jimny Explorer Camp",
    shortText: "最平衡的 Jimny 双人基础露营套餐，也是 Jimny Camp Series 的 Most Popular。",
    bestFor: "适合：2 人 / 第一次 Jimny 露营 / 最受欢迎平衡款",
    duration: "2 天 1 夜",
    overview:
      "Jimny Explorer Camp 是 Jimny Camp Series 里最容易推荐的一档。它比 RM399 更完整，加入帐篷、睡眠配置、桌椅、灯光、风扇和基础生活感装备，适合两位客人第一次舒服体验 Jimny 露营。",
    includes: [
      "Jimny Sierra",
      "营地费用",
      "2 人帐篷 Rooftop Tent 或 Base Camp Tent",
      "2 张 Mobi Garden 睡垫或 Double Bed",
      "2 张 Black Dog 露营椅",
      "1 张 Big Black Dog 折叠桌",
      "2 个 LED Lantern Light",
      "2 个 Snowpeak Mug",
      "Portable fan with powerbank",
      "1 套 Black Dog Fly Sheet with Pole",
      "2 份 Refreshing Kit",
      "JBL GO 5 Speaker",
    ],
    faqs: [
      {
        question: "为什么 RM599 是 Most Popular？",
        answer: "因为它的配置最平衡：Jimny、营地、帐篷、睡眠、桌椅、灯光、风扇和小型生活感装备都包含，适合大多数第一次体验的两人组合。",
      },
      {
        question: "RM599 和 RM399 最大差别是什么？",
        answer: "RM599 多了更完整的帐篷和舒适配置；RM399 更偏轻量车睡体验。",
      },
      {
        question: "Cooler box 和咖啡装备包含吗？",
        answer: "不包含。Cooler box、coffee brewing set、食物饮料、高级家具和装饰灯光都可以另外询问。",
      },
      {
        question: "适合第一次露营吗？",
        answer: "适合。AFFT 会把核心配置先准备好，让两位客人不用从零研究所有装备。",
      },
    ],
    whatsappText: "你好 AFFT，我想了解 RM599 Jimny Explorer Camp 露营套餐。",
  },
  {
    slug: "jimny-adventure-camp",
    href: "/zh/packages/jimny-adventure-camp",
    image: "/images/jimny-adventure-camp-rm799.webp",
    imageAlt: "AFFT RM799 Jimny Adventure Camp 露营套餐海报",
    price: "RM799 / 2 人",
    title: "Jimny Adventure Camp",
    shortText: "最完整的 Jimny 双人露营体验，舒适度、营地呈现和照片感更强。",
    bestFor: "适合：2 人 / 完整配置 / 更舒服和更好拍照",
    duration: "2 天 1 夜",
    overview:
      "Jimny Adventure Camp 是 AFFT Jimny Camp Series 里最完整的一档。它加入高级帐篷、Helinox 椅、270 awning、料理、咖啡、cooler box、高级灯光和更多舒适装备，适合想要更完整营地体验和更好照片呈现的客人。",
    includes: [
      "Jimny Sierra",
      "营地费用",
      "Premium 2 Pax tent rooftop tent 或 Base Camp",
      "2 张 tactical bed 或 premium air mattress",
      "2 张 Helinox 高级露营椅",
      "1 张大露营桌",
      "Side awning 270",
      "4 pcs premium LED lantern set",
      "Kovea Cooking stove",
      "Iwatani Cookware set",
      "Bialetti Coffee brewing set",
      "Cooler box 26 Liter",
      "Portable fan 2 pcs",
      "JBL GO 5 speaker 2 pcs",
      "2 个 Snowpeak Mug",
      "2 份 Refreshing Kit",
    ],
    faqs: [
      {
        question: "Jimny Adventure Camp 和 RM599 最大差别是什么？",
        answer: "RM799 是完整体验，加入高级睡眠、Helinox 椅、270 awning、料理、咖啡、cooler box 和更完整灯光。",
      },
      {
        question: "适合拍照或内容创作吗？",
        answer: "适合。这个套餐的营地呈现更完整，更适合想要漂亮照片、氛围和舒适度的客人。",
      },
      {
        question: "料理和咖啡装备包含吗？",
        answer: "包含。套餐内有 Kovea 炉具、Iwatani cookware set 和 Bialetti coffee brewing set。",
      },
      {
        question: "还需要自己准备什么？",
        answer: "请准备个人用品、衣物、盥洗用品、食物和饮料。餐食是否另行安排需要 WhatsApp 确认。",
      },
    ],
    whatsappText: "你好 AFFT，我想了解 RM799 Jimny Adventure Camp 露营套餐。",
  },
  {
    slug: "solo-explorer",
    href: "/zh/packages/solo-explorer",
    image: "/images/solo-explorer-poster.webp",
    imageAlt: "AFFT Solo Explorer 单人露营套餐海报",
    price: "RM399 起",
    title: "Solo Explorer",
    shortText: "适合一个人、创作者或第一次想轻松试露营的旅客。",
    bestFor: "适合：1 人 / 轻装 / 周末短出走",
    duration: "2 天 1 夜",
    overview:
      "Solo Explorer 是比较轻的 AFFT 露营入口。它适合想先体验沙巴户外气氛，但不想自己买齐装备、研究搭建和处理太多细节的人。",
    includes: [
      "PG-1 Mobility Camp Setup",
      "露营桌椅基础配置",
      "基础营地灯光",
      "营地安排支持",
      "AFFT 体验支持",
      "适合拍照的轻露营布置",
    ],
    faqs: [
      {
        question: "一个人可以订吗？",
        answer: "可以。这个套餐本来就是给单人旅客、轻装出走和创作者体验使用。",
      },
      {
        question: "适合第一次露营吗？",
        answer: "适合。AFFT 会先把体验变简单，避免你一开始就需要买整套装备。",
      },
      {
        question: "可以加交通或装备吗？",
        answer: "可以。你可以通过 WhatsApp 说明日期、人数和需要，AFFT 再帮你看适合的加项。",
      },
    ],
    whatsappText: "你好，我想了解 AFFT Solo Explorer 单人露营套餐。",
  },
  {
    slug: "explorer-camp",
    href: "/zh/packages/explorer-camp",
    image: "/images/afft-explorer-camp-rm599-sabah.webp",
    imageAlt: "AFFT Explorer Camp RM599 沙巴露营套餐",
    price: "RM599 起",
    title: "Explorer Camp",
    shortText: "AFFT 招牌 2 天 1 夜露营，适合情侣、朋友和第一次露营的人。",
    bestFor: "适合：2-4 人 / 第一次露营 / 想住得更舒服",
    duration: "2 天 1 夜",
    overview:
      "Explorer Camp 是 AFFT 最容易理解的招牌露营套餐。重点是现成营地、帐篷、桌椅和更舒服的户外节奏，让客人不用从零开始处理露营细节。",
    includes: [
      "高级营地布置",
      "帐篷与睡眠安排",
      "露营桌椅配置",
      "基础营地灯光",
      "咖啡与户外生活感布置",
      "AFFT 体验支持",
    ],
    faqs: [
      {
        question: "谁最适合 Explorer Camp？",
        answer: "适合情侣、朋友和第一次露营但想要舒服一点的旅客。",
      },
      {
        question: "需要自己搭帐篷吗？",
        answer: "不需要。这个套餐主打现成 AFFT 设置，让体验更轻松。",
      },
      {
        question: "可以加交通或 Rent It 装备吗？",
        answer: "可以。告诉 AFFT 日期、人数和需求，我们会帮你看加项是否适合。",
      },
    ],
    whatsappText: "你好，我想了解 RM599 Explorer Camp 露营套餐。",
  },
  {
    slug: "couple-camp-milky-way",
    href: "/zh/packages/couple-camp-milky-way",
    image: "/images/afft-astro-hunter-rm799-milky-way-sabah.webp",
    imageAlt: "AFFT Couple Camp Milky Way 星空露营套餐",
    price: "RM799 起",
    title: "Couple Camp Milky Way",
    shortText: "适合情侣、夜景、星空和想要特别露营氛围的旅客。",
    bestFor: "适合：观星 / 拍照 / 特别约会",
    duration: "2 天 1 夜",
    overview:
      "Couple Camp Milky Way 主打夜晚氛围、凉爽空气和更适合拍照的露营体验。星空会受天气和月相影响，AFFT 可以帮你先看更合适的日期方向。",
    includes: [
      "高级营地布置",
      "星空观赏安排方向",
      "舒适露营家具",
      "基础营地灯光",
      "户外咖啡体验",
      "AFFT 夜空体验支持",
    ],
    faqs: [
      {
        question: "一定看得到银河吗？",
        answer: "不能保证。夜空会受天气、云量和月相影响，但 AFFT 可以帮你选择更适合的日期和营地。",
      },
      {
        question: "适合拍照吗？",
        answer: "适合。这个套餐会更注重夜晚氛围、露营布置和照片感。",
      },
      {
        question: "可以加创作者设备吗？",
        answer: "可以。你可以询问 Pocket 4、Action 6、灯光或其他 Rent It 装备。",
      },
    ],
    whatsappText: "你好，我想了解 RM799 Couple Camp Milky Way 星空露营套餐。",
  },
  {
    slug: "family-camp",
    href: "/zh/packages/family-camp",
    image: "/images/afft-family-camp-series-sabah.webp",
    imageAlt: "AFFT Family Camp Series 家庭露营套餐",
    price: "按需求报价",
    title: "Family Camp Series",
    shortText: "适合亲子和家庭旅客，重点是更轻松、更有空间的户外时间。",
    bestFor: "适合：家庭 / 小孩 / 慢节奏户外周末",
    duration: "可按 2 天 1 夜或更长安排",
    overview:
      "Family Camp Series 会根据家庭人数、小孩年龄、营地条件和舒适度需求安排。它不是固定硬套，而是先看家庭实际情况再规划。",
    includes: [
      "家庭露营设置",
      "家庭尺寸帐篷安排",
      "露营桌椅",
      "户外生活感装备",
      "咖啡与休息区",
      "AFFT 家庭体验支持",
    ],
    faqs: [
      {
        question: "小孩适合吗？",
        answer: "适合，但需要先告诉 AFFT 小孩年龄和家庭人数，方便选择更合适的营地与配置。",
      },
      {
        question: "为什么是按需求报价？",
        answer: "因为家庭人数、晚数、交通、营地和舒适度升级都会影响最后安排。",
      },
      {
        question: "可以安排更容易进入的营地吗？",
        answer: "可以。AFFT 可以根据家庭需求建议比较轻松、节奏慢一点的营地方向。",
      },
    ],
    whatsappText: "你好，我想了解 AFFT Family Camp Series 家庭露营套餐。",
  },
];

export const zhRentSeries: ZhRentSeries[] = [
  {
    slug: "creator-series",
    href: "/zh/rent-it/creator-series",
    eyebrow: "Creator Series",
    title: "适合沙巴旅行内容的创作者设备。",
    image: "/images/rent-it-creator-series-cover.webp",
    imageAlt: "AFFT Creator Series 创作者设备租借",
    startingFrom: "RM49 / 天起",
    hook: "DJI Pocket 4 / Action 6 / Mic 3 / Avata",
    bestFor: "适合 Vlog、旅行拍摄、公路内容和星空户外记录。",
    intro:
      "Creator Series 适合想拍出更稳定、更干净内容的旅客。你不需要先买整套设备，可以先按行程天数租用适合的组合。",
    featuredTitle: "DJI Pocket 4 Creator Combo",
    featuredPrice: "RM99 / 天起",
    featuredText: "适合走路拍摄、旅行口播、短视频和轻便记录，是最容易开始的创作者设备。",
    priceRange: "RM49 至 RM499，视设备和租借天数而定。",
    items: [
      { title: "DJI Pocket 4 Creator Combo", day1: "RM99", day2: "RM179", day3: "RM239", bestFor: "旅行 Vlog、走路口播、稳定画面。" },
      { title: "DJI Action 6", day1: "RM79", day2: "RM139", day3: "RM189", bestFor: "POV、户外动作、水边或路上内容。" },
      { title: "DJI Mic 3", day1: "RM49", day2: "RM79", day3: "RM109", bestFor: "更清楚的人声、采访和口播升级。" },
      { title: "DJI Avata 360 Fly More Combo", day1: "RM199", day2: "RM359", day3: "RM499", bestFor: "FPV 电影感、山路、公路和旅行大片。" },
      { title: "DJI Goggles 3 + Motion 3", day1: "RM79", day2: "RM139", day3: "RM189", bestFor: "FPV 控制和沉浸式飞行支持。" },
      { title: "Pocket 4 + Mic 3", day1: "RM139", day2: "RM249", day3: "RM339", bestFor: "旅行口播、采访和更完整的创作者组合。" },
      { title: "Pocket 4 + Action 6", day1: "RM129", day2: "RM229", day3: "RM309", bestFor: "双角度拍摄，适合活跃路线。" },
      { title: "Creator Full Set", day1: "RM169", day2: "RM299", day3: "RM399", bestFor: "周末内容创作，需要更多灵活度。" },
    ],
    notes: [
      "先告诉 AFFT 你要拍 Vlog、口播、FPV、露营还是公路内容。",
      "设备数量和状态需要 WhatsApp 确认。",
      "如果不确定，Pocket 4 或 Pocket 4 + Mic 3 通常最容易开始。",
    ],
    whatsappText: "你好，我想了解 AFFT Creator Series 创作者设备租借。",
  },
  {
    slug: "camp-lifestyle-series",
    href: "/zh/rent-it/camp-lifestyle-series",
    eyebrow: "Camp Lifestyle Series",
    title: "咖啡、灯光、电源和营地生活感装备。",
    image: "/images/rent-it-camp-lifestyle-series-cover.webp",
    imageAlt: "AFFT Camp Lifestyle Series 露营生活装备",
    startingFrom: "RM19 / 天起",
    hook: "灯光 / 电源 / 咖啡 / 望远镜 / 对讲机",
    bestFor: "适合慢节奏露营、家庭营地、夜晚氛围和实用户外支持。",
    intro:
      "Camp Lifestyle Series 不是只解决功能，也让营地更有感觉。适合想要咖啡、电影夜、灯光、电源和更完整户外节奏的客人。",
    featuredTitle: "Anker Solix C300 DC Power Station",
    featuredPrice: "RM59 / 天起",
    featuredText: "适合给手机、相机、灯光和小型户外设备补电，让营地使用更安心。",
    priceRange: "RM19 至 RM249，视装备和租借天数而定。",
    items: [
      { title: "Mobi Garden Grandburn Heater", day1: "RM39", day2: "RM69", day3: "RM89", bestFor: "凉爽夜晚、热饮和更舒服的营地时间。" },
      { title: "Yaber T2 Plus Projector", day1: "RM99", day2: "RM179", day3: "RM249", bestFor: "电影夜、家庭放松和 Glamping 氛围。" },
      { title: "Anker Solix C300 DC Power Station", day1: "RM59", day2: "RM109", day3: "RM149", bestFor: "相机、手机、灯光和小设备供电。" },
      { title: "Outask TD-2 Adventure Light", day1: "RM69", day2: "RM129", day3: "RM169", bestFor: "高级营地灯光、夜间移动和氛围布置。" },
      { title: "Finel N7 Carbon Adventure Light", day1: "RM59", day2: "RM109", day3: "RM149", bestFor: "碳纤维营地灯、夜营气氛和照片布置。" },
      { title: "Snow Peak IGT Mobile Kitchen Set", day1: "RM119", day2: "RM209", day3: "RM249", bestFor: "IGT 架、炉具、煮食工具和帐篷加项营地厨房。" },
      { title: "Snow Peak Titanium Mug - 2 pcs", day1: "RM29", day2: "RM49", day3: "RM69", bestFor: "高级营地咖啡、热饮和搭配厨房装备。" },
      { title: "Xiao Mi Walkie Talkies", day1: "RM29", day2: "RM49", day3: "RM69", bestFor: "团队营地、车队和现场沟通。" },
      { title: "Celestron Outland X", day1: "RM25", day2: "RM45", day3: "RM65", bestFor: "看自然、鸟类、远景和轻户外观察。" },
      { title: "Bialetti Coffee Set", day1: "RM39", day2: "RM69", day3: "RM89", bestFor: "早晨咖啡和营地慢生活。" },
      { title: "KZM Kitchen Tool Set", day1: "RM29", day2: "RM49", day3: "RM69", bestFor: "简单营地料理和准备工作。" },
      { title: "Snow Peak Flat Burner", day1: "RM49", day2: "RM89", day3: "RM119", bestFor: "更干净的桌面料理和高级露营呈现。" },
      { title: "Snow Peak Setsuen Pot", day1: "RM39", day2: "RM69", day3: "RM99", bestFor: "热食、面食和共享晚餐。" },
      { title: "Black Dog Combination Light", day1: "RM19", day2: "RM29", day3: "RM39", bestFor: "柔和营地灯光和基础氛围。" },
    ],
    notes: [
      "如果是家庭或夜营，电源、灯光和投影机可以一起问。",
      "咖啡和料理装备适合慢节奏营地体验。",
      "实用装备可与露营套餐或私人路线一起搭配。",
    ],
    whatsappText: "你好，我想了解 AFFT Camp Lifestyle Series 露营生活装备租借。",
  },
  {
    slug: "premium-camp-series",
    href: "/zh/rent-it/premium-camp-series",
    eyebrow: "Premium Camp Series",
    title: "Helinox、Snow Peak 和更舒服的高级营地配置。",
    image: "/images/rent-it-premium-camp-series-cover.webp",
    imageAlt: "AFFT Premium Camp Series 高级露营装备",
    startingFrom: "RM19 / 天起",
    hook: "Helinox / Snow Peak 家具",
    bestFor: "适合想坐得舒服、睡得更好、营地看起来更干净的人。",
    intro:
      "Premium Camp Series 把露营从普通功能提升到更舒服、更有质感。适合 Glamping、Kundasang、Kiulu、单人慢旅行和创作者营地。",
    featuredTitle: "Helinox Solo Full Set",
    featuredPrice: "RM199 / 天起",
    featuredText: "完整的单人睡眠和休息组合，适合想要高级、轻量和舒服体验的人。",
    priceRange: "RM19 至 RM499，视家具组合和租借天数而定。",
    items: [
      { title: "Helinox Chair", day1: "RM29", day2: "RM49", day3: "RM69", bestFor: "轻量高级座椅，坐感更舒服。" },
      { title: "Helinox Cot Set", day1: "RM79", day2: "RM139", day3: "RM189", bestFor: "提升户外睡眠和离地休息感。" },
      { title: "Helinox Solo Full Set", day1: "RM199", day2: "RM359", day3: "RM499", bestFor: "高级单人 Glamping 和创作者营地。" },
      { title: "Snow Peak Director Chair", day1: "RM29", day2: "RM49", day3: "RM69", bestFor: "更有质感的户外休息座椅。" },
      { title: "Snow Peak Table", day1: "RM19", day2: "RM29", day3: "RM39", bestFor: "小型高级餐桌和营地布局。" },
      { title: "Snow Peak Chill Set (2 chairs + 1 table)", day1: "RM59", day2: "RM99", day3: "RM129", bestFor: "双人休息区和轻松户外 lounge。" },
      { title: "Outdoor Coffee Set", day1: "RM79", day2: "RM139", day3: "RM179", bestFor: "风景里的咖啡仪式感。" },
      { title: "Creator Chill Set", day1: "RM139", day2: "RM249", day3: "RM329", bestFor: "内容创作加舒适露营组合。" },
    ],
    notes: [
      "Helinox 是高级体验，不是普通椅子租借。",
      "适合 Kundasang、Kiulu、Glamping、单人慢旅行和创作者住宿。",
      "确认前请 WhatsApp 查询可用数量、状态和押金指引。",
    ],
    whatsappText: "你好，我想了解 AFFT Premium Camp Series 高级露营装备租借。",
  },
  {
    slug: "tent-experience-series",
    href: "/zh/rent-it/tent-experience-series",
    eyebrow: "Tent Experience Series",
    title: "Black Dog、Mobi Garden 和更完整的帐篷体验。",
    image: "/images/rent-it-tent-experience-series-cover.webp",
    imageAlt: "AFFT Tent Experience Series 帐篷租借",
    startingFrom: "RM159 / 天起",
    hook: "Black Dog / Mobi Garden 帐篷系统",
    bestFor: "适合情侣轻奢露营、家庭露营和小团队户外聚会。",
    intro:
      "Tent Experience Series 不只是遮风挡雨，而是用帐篷塑造住宿感、照片感和营地气氛。不同帐篷适合不同人数、车位和营地条件。",
    featuredTitle: "Black Dog 星宿 5.9",
    featuredPrice: "RM159 / 天起",
    featuredText: "适合情侣轻奢露营和更有氛围的夜晚住宿。",
    priceRange: "RM159 至 RM1199，视帐篷系统和天数而定。",
    items: [
      { title: "Black Dog Modular Tent System", day1: "RM499", day2: "RM899", day3: "RM1199", bestFor: "6-10 人、家庭聚会、团体营地或活动型布置。" },
      { title: "Black Dog XingSu 5.9", day1: "RM159", day2: "RM279", day3: "RM379", bestFor: "1-2 成人或 2 成人 + 小孩，情侣轻奢露营。" },
      { title: "Mobi Garden Commander 245", day1: "RM399", day2: "RM729", day3: "RM999", bestFor: "2-4 人，家庭或较容易进入的舒适帐篷体验。" },
    ],
    notes: [
      "帐篷需要先确认人数、营地大小、车位和搭建条件。",
      "Black Dog XingSu 5.9 更适合情侣和视觉感。",
      "大型帐篷系统更适合家庭、小团队或活动型营地。",
    ],
    whatsappText: "你好，我想了解 AFFT Tent Experience Series 帐篷租借。",
  },
];

export const zhTravelServices: ZhTravelService[] = [
  {
    slug: "airport-transfer",
    href: "/zh/travel-services/airport-transfer",
    eyebrow: "机场",
    title: "机场接送",
    image: "/images/airport-transfer-cover.webp",
    imageAlt: "AFFT 沙巴机场接送服务",
    text: "适合机场、酒店、露营地和下一段路线之间的私人移动。",
    intro: "让抵达和离开沙巴的第一段路更顺，不需要到现场才从零安排交通。",
    overview:
      "AFFT 可以把机场时间、酒店入住、露营地移动或下一段路线连接起来。适合带行李、家庭、小团队或不想自己临时处理交通的旅客。",
    quickFacts: [
      { title: "服务类型", text: "私人接送" },
      { title: "适合", text: "机场、酒店、营地移动" },
      { title: "联系", text: "先 WhatsApp 确认" },
    ],
    goodFor: ["机场接机或送机", "酒店到露营地", "带行李的小团队", "想直接 WhatsApp 协调的旅客"],
    howAfftHelps: ["确认接送点、日期和时间", "根据人数和行李看车辆安排", "让路线更实际", "出发前用 WhatsApp 沟通清楚"],
    whatToSend: ["航班号和抵达或离开时间", "接送地点", "人数和行李数量", "酒店、营地或下一站时间"],
    faqs: [
      { question: "可以接机和送机吗？", answer: "可以。请先发送日期、航班时间、接送地点和人数。" },
      { question: "只能机场到酒店吗？", answer: "不一定。也可以配合酒店、露营地或下一段路线移动。" },
    ],
    whatsappText: "你好，我想了解 AFFT 沙巴机场接送服务。",
  },
  {
    slug: "kundasang-private-tour",
    href: "/zh/travel-services/kundasang-private-tour",
    eyebrow: "高地",
    title: "昆达山私人行程",
    image: "/images/kundasang-private-tour-cover.webp",
    imageAlt: "AFFT 昆达山私人行程",
    text: "适合神山景色、凉爽高地、拍照和慢节奏私人路线。",
    intro: "给想看神山、高地和更舒服节奏的旅客，一个私人移动方向。",
    overview:
      "昆达山适合情侣、家庭和小团队。AFFT 可以根据接送点、天气、风景停靠点、餐食和团队节奏安排更实际的路线方向。",
    quickFacts: [
      { title: "服务类型", text: "私人一日或过夜路线" },
      { title: "适合", text: "山景与凉爽高地" },
      { title: "路线", text: "可按团队节奏调整" },
    ],
    goodFor: ["神山景观", "情侣和小团队", "家庭私人移动", "不想赶团体行程的旅客"],
    howAfftHelps: ["根据接送点规划实际路线", "配合天气和停靠点调整节奏", "建议合适车辆", "可连接露营或 Rent It 装备"],
    whatToSend: ["日期", "接送地点和人数", "一日或过夜偏好", "主要兴趣：风景、拍照、美食、露营或慢旅行"],
    faqs: [
      { question: "昆达山路线可以私人安排吗？", answer: "可以。AFFT 重点是私人移动和更实际的团队节奏。" },
      { question: "可以接露营吗？", answer: "可以。你可以告诉 AFFT 是否要加露营、营地支持或 Rent It 装备。" },
    ],
    whatsappText: "你好，我想了解 AFFT 昆达山私人行程。",
  },
  {
    slug: "sandakan-private-tour",
    href: "/zh/travel-services/sandakan-private-tour",
    eyebrow: "山打根",
    title: "山打根私人行程",
    image: "/images/sandakan-private-tour-cover.webp",
    imageAlt: "AFFT 山打根私人行程",
    text: "适合自然、野生动物、海景、城市和文化建筑路线。",
    intro: "适合想看沙巴东海岸另一面的旅客，不只停留在高地路线。",
    overview:
      "山打根适合自然、野生动物、文化和海景兴趣。AFFT 可以根据你的抵达点、停留时间和兴趣规划私人路线方向。",
    quickFacts: [
      { title: "服务类型", text: "私人自然与城市路线" },
      { title: "适合", text: "自然、野生动物、文化" },
      { title: "区域", text: "山打根与沙巴东海岸" },
    ],
    goodFor: ["自然路线", "野生动物兴趣", "海景和城市停靠点", "想避开赶团的人"],
    howAfftHelps: ["按抵达和停留时间规划", "平衡自然、城市和文化点", "协调小团队私人移动", "先用 WhatsApp 简化询问"],
    whatToSend: ["山打根日期和抵达点", "人数", "主要兴趣", "一日或多日偏好"],
    faqs: [
      { question: "这是仙本那跳岛吗？", answer: "不是。这个服务重点在山打根自然、野生动物、文化和东海岸路线。" },
      { question: "可以做自然主题路线吗？", answer: "可以。请先说明你比较想看野生动物、自然、城市还是海景。" },
    ],
    whatsappText: "你好，我想了解 AFFT 山打根私人行程。",
  },
  {
    slug: "tiggo-alphard-charter",
    href: "/zh/travel-services/tiggo-alphard-charter",
    eyebrow: "包车",
    title: "Tiggo 8 Pro / Alphard 包车",
    image: "/images/tiggo-alphard-charter-cover.webp",
    imageAlt: "AFFT Tiggo 8 Pro 和 Alphard 包车服务",
    text: "适合机场接送、高地路线、家庭、小团队和更舒适移动。",
    intro: "给想要更舒服、更灵活沙巴移动的旅客，一个私人车支持方向。",
    overview:
      "适合家庭、小团队、机场接送、高地路线、市区移动或多站点安排。AFFT 会根据人数、行李和路线看更适合的车辆与安排。",
    quickFacts: [
      { title: "服务类型", text: "私人包车" },
      { title: "车辆重点", text: "Tiggo 8 Pro / Alphard" },
      { title: "适合", text: "家庭、小团队、VIP 移动" },
    ],
    goodFor: ["更舒服的机场接送", "昆达山和高地路线", "小团队沙巴移动", "不想跟固定公共交通的人"],
    howAfftHelps: ["先确认人数、路线和行李", "按机场、市区、高地或多站点安排", "保持 WhatsApp 沟通", "把车辆配合整体行程"],
    whatToSend: ["日期和路线想法", "人数和行李", "偏好车辆", "接送点和想停靠的地方"],
    faqs: [
      { question: "可以包整天路线吗？", answer: "可以。请发送路线、时间和停靠点，AFFT 会先看是否实际。" },
      { question: "应该选什么车？", answer: "AFFT 会按人数、行李和路线类型建议更合适的车辆。" },
    ],
    whatsappText: "你好，我想了解 AFFT Tiggo 8 Pro、Alphard 包车或 VIP 出行服务。",
  },
];

export const zhStories = [
  {
    image: "/images/customer-stories/explorer-camp-rm599/explorer-camp-rm599-group-01-blur.webp",
    title: "RM599 Explorer Camp 真实露营现场",
    eyebrow: "露营案例",
    text: "真实预订让客人看到套餐落地后的样子：现成遮棚、帐篷、桌椅和更慢节奏的 2 天 1 夜沙巴户外体验。",
    detail: "这类故事能让第一次露营的客人更清楚自己订到的是什么。",
    href: "/zh/packages/explorer-camp",
    cta: "查看 Explorer Camp",
    whatsappText: "你好，我看到 Explorer Camp 真实案例，想了解 RM599 套餐。",
  },
  {
    image: "/images/customer-stories/tiggo-8-pro-charter/tiggo-8-pro-charter-group-01-privacy-watermarked.webp",
    title: "Tiggo 8 Pro 私人包车高地路线",
    eyebrow: "包车案例",
    text: "小团队使用 AFFT Tiggo 8 Pro Charter，让机场、市区和高地移动更舒服、更稳定。",
    detail: "适合家庭、小团队和想把沙巴路线走得更顺的旅客。",
    href: "/zh/car-rental",
    cta: "查看包车服务",
    whatsappText: "你好，我看到 Tiggo 8 Pro 包车案例，想了解 AFFT 包车服务。",
  },
];

export const zhFaqGroups = [
  {
    title: "露营套餐",
    items: [
      { question: "需要露营经验吗？", answer: "不需要。AFFT 套餐就是为了让第一次或轻经验旅客更容易开始。" },
      { question: "AFFT 可以建议套餐吗？", answer: "可以。发送日期、人数和想要的风格，我们会建议更合适的方向。" },
      { question: "可以加交通吗？", answer: "可以。露营、包车、机场接送和 Rent It 装备可以一起讨论。" },
    ],
  },
  {
    title: "Rent It 装备租借",
    items: [
      { question: "可以只租装备不订套餐吗？", answer: "可以。请 WhatsApp 查询可用数量、状态、天数和适合的组合。" },
      { question: "AFFT 主要租什么？", answer: "创作者设备、营地生活感装备、高级家具和帐篷体验系统。" },
      { question: "不知道怎么选可以问吗？", answer: "可以。告诉 AFFT 行程、人数和用途，我们会建议更适合的装备。" },
    ],
  },
  {
    title: "私人行程与包车",
    items: [
      { question: "AFFT 是私人行程吗？", answer: "AFFT 更偏私人移动和灵活路线，适合小团队、家庭和想要自己节奏的人。" },
      { question: "可以机场接送吗？", answer: "可以。请发送航班、接送点、人数和行李数量。" },
      { question: "私人行程可以接露营吗？", answer: "可以。可以把路线、露营、Rent It 和包车一起规划。" },
    ],
  },
  {
    title: "WhatsApp 询问",
    items: [
      { question: "为什么先用 WhatsApp？", answer: "因为 AFFT 的安排比较灵活，先通过 WhatsApp 确认日期、人数、路线和需求最实际。" },
      { question: "第一条信息要写什么？", answer: "日期、人数、接送点、想要的服务和特别需求，例如小孩、行李、装备或预算。" },
      { question: "网站可以直接付款吗？", answer: "不可以。网站重点是询盘，最后安排请直接和 AFFT 确认。" },
    ],
  },
];

export const getZhPackage = (slug: string) =>
  zhPackages.find((item) => item.slug === slug);

export const getZhRentSeries = (slug: string) =>
  zhRentSeries.find((item) => item.slug === slug);

export const getZhTravelService = (slug: string) =>
  zhTravelServices.find((item) => item.slug === slug);
