import { campItems, campFaqs, campPath, campPrice, campPoster, campMessage } from "./camping-series";
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

export const zhPackages: ZhPackage[] = campItems.filter(p=>p.kind!=="addon").map(p=>({slug:p.slug,href:campPath(p,"zh"),image:campPoster(p,"zh"),imageAlt:p.name.zh,price:campPrice(p,"zh"),title:p.name.zh,shortText:p.summary.zh,bestFor:p.audience.zh,duration:p.duration.zh,overview:p.summary.zh,includes:p.includes.map(t=>t.zh),faqs:campFaqs.map(f=>({question:f.q.zh,answer:f.a.zh})),whatsappText:campMessage(p,"zh")}));

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
