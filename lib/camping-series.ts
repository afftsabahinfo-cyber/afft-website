/** Public source of truth for pages, posters and Alice. No inventory or private costs. */
export type CampLanguage = "en" | "zh";
export type CampText = Record<CampLanguage, string>;
export const bi = (en: string, zh: string): CampText => ({ en, zh });
export type CampItem = {
  slug: string;
  kind: "base" | "bundle" | "addon";
  category:
    | "couples"
    | "family"
    | "friends"
    | "drive"
    | "day"
    | "gear"
    | "extras";
  price: number;
  from?: boolean;
  guests: number;
  name: CampText;
  summary: CampText;
  audience: CampText;
  duration: CampText;
  service: "ready" | "gear" | "drive" | "addon";
  photo: string;
  highlights: CampText[];
  includes: CampText[];
  excludes: CampText[];
  notes: CampText[];
  baseSlug?: string;
  addonSlugs?: string[];
};
const photo = (name: string) => `/images/${name}`;
const realCamp = photo(
  "customer-stories/explorer-camp-rm599/explorer-camp-rm599-setup-01.webp",
);
const nightCamp = photo(
  "customer-stories/explorer-camp-rm599/explorer-camp-rm599-night-01.webp",
);
const overnight = bi("2 days / 1 night", "2天1夜");
const meals = bi("Food and drinks", "食物与饮料");
const transport = bi("Guest transport / pickup", "客人交通与接送");
const site = bi(
  "Standard campsite fee for the stated guests",
  "所列人数的标准营地费用",
);
const setup = bi(
  "Equipment delivery, setup and pack-down at the agreed standard campsite",
  "约定标准营地的装备配送、搭建与撤收",
);
const confirmed = bi(
  "AFFT confirms the campsite, facilities, arrival time and any location/date supplement before payment.",
  "付款前由 AFFT 确认营地、设施、到场时间及任何地点／日期差价。",
);
const sleep = (n: number) =>
  bi(
    `${n} sleeping places with mats, pillows and bedding`,
    `${n}人睡眠位置，含睡垫、枕头及寝具`,
  );
const seats = (n: number) =>
  bi(`${n} camp chairs and a shared table`, `${n}张露营椅及共用桌`);
const base = (
  v: Omit<CampItem, "kind" | "duration" | "notes"> & {
    duration?: CampText;
    notes?: CampText[];
  },
): CampItem => ({
  kind: "base",
  duration: overnight,
  notes: [confirmed],
  ...v,
});
export const campAddons: CampItem[] = [
  {
    slug: "outdoor-kitchen",
    kind: "addon",
    category: "extras",
    price: 129,
    guests: 0,
    name: bi("Outdoor Kitchen", "户外料理"),
    summary: bi(
      "Cook dinner and breakfast at your own pace.",
      "自己动手，慢慢享受营地晚餐与早餐。",
    ),
    audience: bi("Per group", "每组"),
    duration: overnight,
    service: "addon",
    photo: photo("snow-peak-igt-mobile-kitchen-set.webp"),
    highlights: [
      bi("Snow Peak IGT", "Snow Peak IGT 料理桌"),
      bi("Stove + cookware", "炉具与锅具"),
      bi("Cook your own meals", "自己动手料理"),
    ],
    includes: [
      bi(
        "Snow Peak IGT kitchen, stove, suitable cookware and utensils for your booked group",
        "Snow Peak IGT 料理桌、炉具及适合预订人数的锅具餐具",
      ),
    ],
    excludes: [
      meals,
      bi("Fuel unless included in the written quote", "书面报价未列明的燃料"),
    ],
    notes: [
      bi(
        "AFFT confirms the fuel allowance and cookware before payment. This is an equipment add-on, not a catered meal.",
        "付款前确认燃料额度与锅具；此为料理装备加配，不含代煮餐食。",
      ),
      bi(
        "Outdoor cooking only; follow campsite cooking rules.",
        "仅在允许的户外区域料理，遵守营地规定。",
      ),
    ],
  },
  {
    slug: "camp-cinema",
    kind: "addon",
    category: "extras",
    price: 149,
    guests: 0,
    name: bi("Camp Cinema", "营地电影"),
    summary: bi(
      "A simple movie night together after sunset.",
      "日落后，一起享受轻松的营地电影时光。",
    ),
    audience: bi("Per group", "每组"),
    duration: overnight,
    service: "addon",
    photo: photo("yaber-t2-plus-projector.webp"),
    highlights: [
      bi("Yaber projector", "Yaber 投影机"),
      bi("Screen + power plan", "投影面与供电安排"),
      bi("Setup included", "包含安装调试"),
    ],
    includes: [
      bi(
        "Yaber projector, suitable screen / projection surface, compatible power arrangement and setup",
        "Yaber 投影机、适用投影面、兼容供电安排及安装调试",
      ),
    ],
    excludes: [
      bi("Streaming subscriptions and paid films", "串流订阅及付费影片"),
    ],
    notes: [
      bi(
        "AFFT confirms power, playback compatibility and the campsite quiet hours. Bring your own legally accessible film.",
        "由 AFFT 确认供电、播放兼容性及营地安静时段；请准备可合法播放的影片。",
      ),
    ],
  },
  {
    slug: "travel-story",
    kind: "addon",
    category: "extras",
    price: 99,
    guests: 0,
    name: bi("Travel Story", "旅行记录"),
    summary: bi(
      "Bring home the little moments from your camp.",
      "把露营路上的小片段带回家。",
    ),
    audience: bi("Per camera", "每台相机"),
    duration: overnight,
    service: "addon",
    photo: photo("dji-pocket4-creator-combo.webp"),
    highlights: [
      bi("One selected camera", "一台指定相机"),
      bi("Battery + charging", "电池与充电配件"),
      bi("Quick-start guidance", "简明使用教学"),
    ],
    includes: [
      bi(
        "One selected camera, battery / charging accessories and a short handover lesson",
        "一台指定相机、电池／充电配件及简短使用教学",
      ),
    ],
    excludes: [
      bi(
        "Photographer, editing, drone flights and paid storage",
        "摄影师、剪辑、无人机飞行及付费储存",
      ),
    ],
    notes: [
      bi(
        "Ask for the DJI Pocket setup or a suitable alternative. AFFT confirms the exact model and accessories; this price does not cover every camera in Rent It.",
        "可询问 DJI Pocket 配置或合适替代款；具体型号与配件由 AFFT 确认，此加配价不适用于 Rent It 所有相机。",
      ),
    ],
  },
  {
    slug: "night-lounge",
    kind: "addon",
    category: "extras",
    price: 99,
    guests: 2,
    name: bi("Night Lounge", "夜间休息区"),
    summary: bi(
      "More comfortable seating for slow evening conversations.",
      "换上更舒服的座椅，慢慢聊天看夜景。",
    ),
    audience: bi("2-person upgrade", "2人升级组"),
    duration: overnight,
    service: "addon",
    photo: photo("helinox-chair.webp"),
    highlights: [
      bi("Upgraded seats for two", "双人座椅升级"),
      bi("Gentle mood lighting", "柔和氛围灯"),
      bi("Shared table space", "共用桌面"),
    ],
    includes: [
      bi(
        "Two upgraded seats, mood lighting and shared table space",
        "两张升级座椅、氛围灯及共用桌面",
      ),
    ],
    excludes: [
      bi(
        "Private guide, photography and a guaranteed star view",
        "私人导览、摄影服务及星空能见度保证",
      ),
    ],
    notes: [
      bi(
        "If your package already includes upgraded seating or lights, AFFT quotes only the extra items. Do not add this full price twice.",
        "若套餐已包含升级座椅或灯光，仅就净增加的项目报价，不重复收取整组费用。",
      ),
    ],
  },
  {
    slug: "nature-explorer",
    kind: "addon",
    category: "extras",
    price: 39,
    guests: 0,
    name: bi("Nature Explorer", "自然观察"),
    summary: bi(
      "Notice birds, trees and small outdoor discoveries together.",
      "一起观察鸟类、树木和户外的小发现。",
    ),
    audience: bi("Per group", "每组"),
    duration: overnight,
    service: "addon",
    photo: photo("celestron-outland-x.webp"),
    highlights: [
      bi("Shared binoculars", "共用望远镜"),
      bi("Nature activity card", "自然观察任务卡"),
      bi("Self-guided discovery", "自行探索"),
    ],
    includes: [
      bi(
        "One shared pair of binoculars and a nature observation activity card",
        "一副共用望远镜及自然观察任务卡",
      ),
    ],
    excludes: [
      bi(
        "Guide, transport and wildlife-sighting guarantees",
        "导览员、交通及野生动物目击保证",
      ),
    ],
    notes: [
      bi(
        "Children explore with their own accompanying adults. This does not include childcare.",
        "儿童由同行成人陪同探索，不含托管服务。",
      ),
    ],
  },
];
export const campBases: CampItem[] = [
  base({
    slug: "day-escape",
    category: "day",
    price: 249,
    guests: 2,
    name: bi("Day Escape", "日间轻露营"),
    summary: bi(
      "An outdoor break without staying overnight.",
      "不用过夜，也能好好享受户外。",
    ),
    audience: bi("2 guests", "2人"),
    duration: bi("4–6 hours / daytime", "日间4–6小时"),
    service: "ready",
    photo: realCamp,
    highlights: [
      bi("Shade + seats for two", "遮阳与双人桌椅"),
      bi("Standard site included", "含标准场地"),
      bi("Setup + pack-down", "包含搭建撤收"),
    ],
    includes: [
      bi(
        "Shade setup, two chairs, table and cups",
        "遮阳配置、两张椅子、桌及杯具",
      ),
      site,
      setup,
    ],
    excludes: [
      meals,
      transport,
      bi("Overnight stay and sleeping gear", "过夜与睡眠装备"),
    ],
  }),
  base({
    slug: "solo-camp-kit",
    category: "gear",
    price: 199,
    guests: 1,
    name: bi("Solo Camp Kit", "独处装备组"),
    summary: bi(
      "A complete starting kit for your own quiet camp.",
      "带上一组装备，自己安排安静的露营时光。",
    ),
    audience: bi("1 guest", "1人"),
    service: "gear",
    photo: photo("helinox-solo-full-set.jpg"),
    highlights: [
      bi("Tent + sleep setup", "帐篷与睡眠组"),
      bi("One seat + small table", "单椅与小桌"),
      bi("Collect and set up yourself", "自取自搭"),
    ],
    includes: [
      bi(
        "One suitable tent and a sleeping mat, pillow and bedding",
        "一顶适用帐篷、睡垫、枕头及寝具",
      ),
      seats(1),
      bi("Basic camp light and equipment handover", "基础营灯及装备交接说明"),
    ],
    excludes: [
      meals,
      transport,
      bi("Campsite, delivery, setup and pack-down", "营地、配送、搭建与撤收"),
    ],
    notes: [
      bi(
        "Collect and return at the agreed time. Premium Helinox gear shown is an upgrade option, not included in the basic kit.",
        "按约定时间自取归还；图片所示 Helinox 高端装备为升级选项，不属于基础组标配。",
      ),
    ],
  }),
  base({
    slug: "duo-camp-kit",
    category: "gear",
    price: 299,
    guests: 2,
    name: bi("Duo Camp Kit", "双人装备组"),
    summary: bi(
      "For two friends or a couple who enjoy doing it themselves.",
      "适合愿意自己搭营的两个朋友或情侣。",
    ),
    audience: bi("2 guests", "2人"),
    service: "gear",
    photo: realCamp,
    highlights: [
      bi("Tent + sleep gear for two", "帐篷与双人睡眠组"),
      bi("Table, chairs, light + fan", "桌椅、灯与风扇"),
      bi("Collect and set up yourself", "自取自搭"),
    ],
    includes: [
      bi("One suitable tent", "一顶适用帐篷"),
      sleep(2),
      seats(2),
      bi(
        "Basic lighting, fan and equipment handover",
        "基础灯光、风扇及装备交接说明",
      ),
    ],
    excludes: [
      meals,
      transport,
      bi("Campsite, delivery, setup and pack-down", "营地、配送、搭建与撤收"),
    ],
    notes: [
      bi(
        "Own transport and self-setup required. Collection and return times are agreed before payment.",
        "需自备交通并自行搭撤；付款前确认取还时间。",
      ),
    ],
  }),
  base({
    slug: "ready-camp-for-two",
    category: "couples",
    price: 599,
    guests: 2,
    name: bi("Ready Camp for Two", "双人免搭营"),
    summary: bi(
      "Arrive together. Your camp is ready.",
      "两个人轻松到场，营地由我们准备。",
    ),
    audience: bi("2 guests", "2人"),
    service: "ready",
    photo: realCamp,
    highlights: [
      bi("Complete sleep setup", "完整双人睡眠组"),
      bi("Campsite included", "含标准营地"),
      bi("We set up and pack down", "我们负责搭建撤收"),
    ],
    includes: [
      bi("Tent and sheltered sitting area", "帐篷与遮蔽休息区"),
      sleep(2),
      seats(2),
      bi("Basic lighting and fan", "基础灯光与风扇"),
      site,
      setup,
    ],
    excludes: [
      meals,
      transport,
      bi("Optional experience add-ons", "自选体验加配"),
    ],
  }),
  base({
    slug: "comfort-camp-for-two",
    category: "couples",
    price: 799,
    guests: 2,
    name: bi("Comfort Camp for Two", "双人舒适营"),
    summary: bi(
      "More room to rest, sit back and enjoy your time together.",
      "睡得更舒服，坐得更自在，多一点相处空间。",
    ),
    audience: bi("2 guests", "2人"),
    service: "ready",
    photo: photo("blackdog-xingsu59.webp"),
    highlights: [
      bi("Roomier tent + better sleep", "宽敞帐篷与睡眠升级"),
      bi("Helinox seating", "Helinox 座椅"),
      bi("Campsite + setup included", "包含营地与搭撤"),
    ],
    includes: [
      bi(
        "Roomier tent with an upgraded two-person sleeping setup",
        "更宽敞的帐篷及升级双人睡眠配置",
      ),
      bi("Two Helinox seats and a shared table", "两张 Helinox 座椅及共用桌"),
      bi("Sheltered lounge, lighting and fan", "遮蔽休息区、灯光与风扇"),
      site,
      setup,
    ],
    excludes: [
      meals,
      transport,
      bi("Cooking equipment and camera hire", "料理装备及相机租用"),
    ],
  }),
  base({
    slug: "family-first-camp",
    category: "family",
    price: 899,
    guests: 4,
    name: bi("Family First Camp", "亲子初体验"),
    summary: bi(
      "A first family camp with space for everyone to sleep and sit.",
      "让第一次亲子露营，每个人都有睡觉和休息的位置。",
    ),
    audience: bi("2 adults + 2 children (3–11)", "2大2小（儿童3–11岁）"),
    service: "ready",
    photo: photo("mobi-garden-commander-245.webp"),
    highlights: [
      bi("Four sleeping places", "4人独立睡眠位置"),
      bi("Sheltered family space", "遮蔽亲子活动区"),
      bi("Campsite + setup included", "包含营地与搭撤"),
    ],
    includes: [
      bi(
        "Family tent matched to the sleeping layout",
        "按睡眠布局配好的家庭帐篷",
      ),
      sleep(4),
      seats(4),
      bi(
        "Sheltered activity area, basic lighting and fan",
        "遮蔽活动区、基础灯光与风扇",
      ),
      site,
      setup,
    ],
    excludes: [
      meals,
      transport,
      bi("Childcare and guided activities", "儿童托管及导览活动"),
    ],
    notes: [
      confirmed,
      bi(
        "Price covers two adults and two children aged 3–11, each with a sleeping place. Ask for infants, older children or a different family size.",
        "价格包含两位成人及两位3–11岁儿童，每人有睡眠位置；婴幼儿、较大儿童或不同家庭人数另行确认。",
      ),
    ],
  }),
  base({
    slug: "friends-camp-four",
    category: "friends",
    price: 999,
    guests: 4,
    name: bi("Friends Camp · Four", "四人朋友营"),
    summary: bi(
      "Two tents for privacy. One shared space for good company.",
      "两顶帐篷保留私人空间，一起共享户外时光。",
    ),
    audience: bi("4 guests", "4人"),
    service: "ready",
    photo: realCamp,
    highlights: [
      bi("Two two-person tents", "2顶双人帐"),
      bi("Shared shade + table", "共用遮蔽区与餐桌"),
      bi("Campsite + setup included", "包含营地与搭撤"),
    ],
    includes: [
      bi("Two two-person tents", "两顶双人帐篷"),
      sleep(4),
      seats(4),
      bi(
        "Shared sheltered area, basic lighting and fans",
        "共用遮蔽区、基础照明与风扇",
      ),
      site,
      setup,
    ],
    excludes: [
      meals,
      transport,
      bi("Cooking and cinema add-ons", "料理及电影加配"),
    ],
  }),
  base({
    slug: "friends-camp-six",
    category: "friends",
    price: 1399,
    guests: 6,
    name: bi("Friends Camp · Six", "六人朋友营"),
    summary: bi(
      "A small-group camp with a bigger place to gather.",
      "小团体一起出发，拥有更大的共用休息空间。",
    ),
    audience: bi("6 guests", "6人"),
    service: "ready",
    photo: realCamp,
    highlights: [
      bi("Three two-person tents", "3顶双人帐"),
      bi("Six seats + shared shade", "6座位与加大遮蔽区"),
      bi("Campsite + setup included", "包含营地与搭撤"),
    ],
    includes: [
      bi("Three two-person tents", "三顶双人帐篷"),
      sleep(6),
      seats(6),
      bi(
        "Larger shared sheltered area, basic lighting and fans",
        "加大共用遮蔽区、基础照明与风扇",
      ),
      site,
      setup,
    ],
    excludes: [
      meals,
      transport,
      bi("Cooking and cinema add-ons", "料理及电影加配"),
    ],
  }),
  base({
    slug: "jimny-drive-camp",
    category: "drive",
    price: 599,
    from: true,
    guests: 2,
    name: bi("Jimny Drive & Camp", "Jimny 双人自驾营"),
    summary: bi(
      "Your own Sabah drive, with the camp essentials packed.",
      "开着 Jimny 探索沙巴，带上完整基础露营装备。",
    ),
    audience: bi("2 guests", "2人"),
    service: "drive",
    photo: photo("playdo-starry-sky-2nd-gen-rooftop-tent-set.webp"),
    highlights: [
      bi("Jimny self-drive", "Jimny 自驾"),
      bi("Two-person camp kit", "完整双人基础装备"),
      bi("Standard campsite included", "含标准营地"),
    ],
    includes: [
      bi(
        "Jimny vehicle for the agreed rental period",
        "约定租期内的 Jimny 车辆",
      ),
      bi(
        "Suitable tent, two sleeping places, table, two chairs, lights and fan",
        "适用帐篷、双人睡眠组、桌、两张椅子、灯与风扇",
      ),
      site,
      bi("Equipment handover and self-setup guidance", "装备交接及自搭说明"),
    ],
    excludes: [
      meals,
      bi(
        "Driver, guest transfers, fuel and road charges",
        "司机、客人接送、燃油与道路费用",
      ),
      bi("On-site setup and pack-down service", "现场代搭与撤收服务"),
    ],
    notes: [
      confirmed,
      bi(
        "Self-drive and self-setup. AFFT confirms driving eligibility, exact pickup/return times, deposit and vehicle terms. A 2D1N camp does not automatically mean 48-hour vehicle hire.",
        "自驾自搭；AFFT 确认驾驶资格、准确取还车时间、押金及车辆条款。2天1夜露营不自动等于48小时租车。",
      ),
      bi(
        "Tent type and vehicle mounting compatibility are confirmed before payment; the photo is a gear reference.",
        "帐篷类型及车辆安装兼容性于付款前确认；图片为装备参考。",
      ),
    ],
  }),
];
const bundles: Array<[string, string, string, string, string, string[]]> = [
  [
    "duo-cooking-camp",
    "Duo Cooking Camp",
    "双人料理露营",
    "ready-camp-for-two",
    "outdoor-kitchen",
    [],
  ],
  [
    "comfort-date-camp",
    "Comfort Date Camp",
    "舒适约会露营",
    "comfort-camp-for-two",
    "outdoor-kitchen",
    [],
  ],
  [
    "family-cinema-camp",
    "Family Cinema Camp",
    "亲子电影露营",
    "family-first-camp",
    "camp-cinema",
    [],
  ],
  [
    "family-nature-camp",
    "Family Nature Camp",
    "亲子自然观察营",
    "family-first-camp",
    "nature-explorer",
    [],
  ],
  [
    "friends-dinner-cinema",
    "Friends Cook & Cinema",
    "四人料理电影营",
    "friends-camp-four",
    "outdoor-kitchen",
    ["camp-cinema"],
  ],
  [
    "jimny-travel-story",
    "Jimny Travel Story",
    "Jimny 旅行记录营",
    "jimny-drive-camp",
    "travel-story",
    [],
  ],
];
export const campBundles: CampItem[] = bundles.map(
  ([slug, en, zh, baseSlug, first, rest]) => {
    const b = campBases.find((p) => p.slug === baseSlug)!;
    const addonSlugs = [first, ...rest];
    const extras = addonSlugs.map((s) => campAddons.find((p) => p.slug === s)!);
    return {
      ...b,
      slug,
      kind: "bundle",
      name: bi(en, zh),
      baseSlug,
      addonSlugs,
      price: b.price + extras.reduce((n, a) => n + a.price, 0),
      photo: first === "camp-cinema" ? nightCamp : b.photo,
      summary: bi(
        `${b.name.en} with ${extras.map((a) => a.name.en).join(" + ")}.`,
        `${b.name.zh}，配上${extras.map((a) => a.name.zh).join("与")}。`,
      ),
      highlights: [
        b.highlights[0],
        ...extras.map((a) => a.highlights[0]),
        bi(
          b.service === "drive"
            ? "Vehicle + campsite included"
            : "Campsite + setup included",
          b.service === "drive" ? "包含车辆与标准营地" : "包含营地与搭撤",
        ),
      ].slice(0, 3),
      includes: [...b.includes, ...extras.flatMap((a) => a.includes)],
      excludes: [
        meals,
        ...(b.service === "drive"
          ? [
              bi(
                "Driver, fuel, road charges and on-site setup",
                "司机、燃油、道路费用与现场代搭",
              ),
            ]
          : [transport]),
        ...extras.flatMap((a) => a.excludes).filter((t) => t !== meals),
      ],
      notes: [...b.notes, ...extras.flatMap((a) => a.notes)],
    };
  },
);
export const campItems: CampItem[] = [
  ...campBases,
  ...campBundles,
  ...campAddons,
];
export const campAliases: Record<string, string> = {
  "explorer-camp": "ready-camp-for-two",
  "solo-explorer": "solo-camp-kit",
  "family-camp": "family-first-camp",
  "couple-camp-milky-way": "comfort-camp-for-two",
  "astro-hunter": "comfort-camp-for-two",
  "jimny-explorer-camp": "jimny-drive-camp",
  "jimny-sleep-camp": "jimny-drive-camp",
  "jimny-adventure-camp": "jimny-drive-camp",
};
export const campServices = {
  ready: bi("Arrive to a ready camp", "到场入住"),
  gear: bi("Collect & set up yourself", "自取自搭"),
  drive: bi("Self-drive & self-setup", "自驾自搭"),
  addon: bi("Optional camp add-on", "露营自选加配"),
};
export const campCategories = [
  {
    id: "couples",
    name: bi("For two", "双人露营"),
    slug: "ready-camp-for-two",
  },
  {
    id: "family",
    name: bi("With children", "亲子露营"),
    slug: "family-first-camp",
  },
  {
    id: "friends",
    name: bi("With friends", "朋友露营"),
    slug: "friends-camp-four",
  },
  {
    id: "drive",
    name: bi("Jimny road trip", "Jimny 自驾"),
    slug: "jimny-drive-camp",
  },
  { id: "day", name: bi("Just for the day", "日间露营"), slug: "day-escape" },
  { id: "gear", name: bi("My own camp", "装备自搭"), slug: "duo-camp-kit" },
];
export const campPrice = (p: CampItem, l: CampLanguage = "en") =>
  `${p.kind === "addon" ? "+ " : p.from ? (l === "zh" ? "起价 " : "From ") : ""}RM${p.price.toLocaleString("en-MY")}`;
export const campPath = (p: CampItem, l: CampLanguage = "en") =>
  `${l === "zh" ? "/zh" : ""}/packages/${p.slug}`;
export const campPoster = (p: CampItem, l: CampLanguage = "en") =>
  `/images/camping-ai-2026/${p.slug}-${l}.webp`;
export const getCamp = (slug: string) =>
  campItems.find((p) => p.slug === (campAliases[slug] || slug));
export const campMessage = (p: CampItem, l: CampLanguage = "en") =>
  l === "zh"
    ? `你好 AFFT，我想查询${p.name.zh}（${campPrice(p, l)}／${p.audience.zh}，${p.duration.zh}）。请确认日期、人数、营地、包含项目及完整总价。`
    : `Hi AFFT, please check ${p.name.en} (${campPrice(p, l)} / ${p.audience.en}, ${p.duration.en}). Please confirm dates, guests, campsite, inclusions and the total quote.`;
export const campFaqs = [
  {
    q: bi("Is the price per person?", "价格是每个人吗？"),
    a: bi(
      "Package prices are totals for the stated group and duration. Add-ons are per group, per camera or per two-person upgrade as labelled. Any refundable deposit is listed separately.",
      "套餐价格是所列人数与时长的整组总价。加配按标示的每组、每台相机或双人升级组计费；可退押金另列。",
    ),
  },
  {
    q: bi("What is included in a ready camp?", "免搭套餐包含什么？"),
    a: bi(
      "The listed equipment, standard campsite fee, equipment delivery, setup and pack-down. Travel to the campsite and meals are not included. The agreed campsite and any location/date supplement are confirmed before payment.",
      "包含列明装备、标准营地费用、装备配送、搭建与撤收；不含客人到营地的交通与餐食。付款前确认营地及任何地点／日期差价。",
    ),
  },
  {
    q: bi(
      "Can we stay an extra night or bring more guests?",
      "可以续住或增加人数吗？",
    ),
    a: bi(
      "Yes, ask for a total quote. An unchanged same-site setup does not incur a second full setup fee. Campsite, equipment, vehicle time and extra sleeping places are quoted separately; extra tents may require a different package.",
      "可以询问完整报价。同址不撤营的原配置不重复收取完整搭建费；营地、装备续用、车辆时长及新增睡眠位置分别核算，需要加帐时可能改用另一套餐。",
    ),
  },
  {
    q: bi("Can we add meals or transfers?", "可以加餐食或接送吗？"),
    a: bi(
      "Ask AFFT with your guest count and pickup point. Outdoor Kitchen provides cooking equipment, not food or a cook. A driver transfer is different from the Jimny self-drive package.",
      "提供人数与接送地点向 AFFT 询问。户外料理是装备加配，不含食材或厨师；司机接送与 Jimny 自驾套餐不同。",
    ),
  },
  {
    q: bi("Can we camp under the stars?", "可以安排星空露营吗？"),
    a: bi(
      "Ask about suitable dates and locations with Comfort Camp for Two. Stars and the Milky Way depend on weather and moonlight. Guide and photography services are not included unless quoted. Weather, access and change terms are confirmed before payment.",
      "可为双人舒适营询问适合的日期与地点；星空及银河受天气和月光影响。不含未报价的导览或摄影服务；付款前确认天气、通行及改期条款。",
    ),
  },
];
export const campingCatalog = {
  version: "2026-10-05.1",
  currency: "MYR",
  lastUpdated: "2026-10-05",
  items: campItems,
  aliases: campAliases,
  services: campServices,
  faqs: campFaqs,
};
