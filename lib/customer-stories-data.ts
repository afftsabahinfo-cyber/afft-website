export type LocalizedCustomerStory = {
  imageAlt: string;
  eyebrow: string;
  title: string;
  text: string;
  detail: string;
  href: string;
  cta: string;
  whatsappText: string;
  whatsappLabel: string;
};

export type CustomerStory = {
  slug: string;
  image: string;
  en: LocalizedCustomerStory;
  zh: LocalizedCustomerStory;
};

export const customerStories: CustomerStory[] = [
  {
    slug: "private-charter-hidden-coast",
    image:
      "/images/customer-stories/private-charter-hidden-coast/private-charter-hidden-coast-story.jpg",
    en: {
      imageAlt:
        "AFFT private charter hidden Kota Kinabalu coast and sunset view",
      eyebrow: "Private Charter Story",
      title: "Private charter to a hidden Kota Kinabalu coast view",
      text: "A private charter can turn a simple Kota Kinabalu route into a slower search for coastal viewpoints near UMS, quiet back roads and sunset stops that fixed tours often miss.",
      detail:
        "This story is useful for guests who want AFFT to shape the car time around views, photos and flexible stops instead of only moving from point A to B.",
      href: "/car-rental",
      cta: "View Car Rental",
      whatsappText:
        "Hi AFFT, I saw the hidden coast private charter story and want to plan a flexible Kota Kinabalu route.",
      whatsappLabel: "Ask About Flexible Charter",
    },
    zh: {
      imageAlt: "AFFT 包车隐藏海边视角与 Kota Kinabalu 日落",
      eyebrow: "包车案例",
      title: "包车去更多隐藏海边视角",
      text: "包车旅游不只是交通。像大学府（UMS）后山海边、安静海岸路和临时夕阳点，很多固定团不会停的角度，反而可以慢慢发现。",
      detail:
        "适合想拍照、看海、看日落，或希望 AFFT 按天气和时间调整路线的旅客。",
      href: "/zh/car-rental",
      cta: "查看包车服务",
      whatsappText:
        "你好 AFFT，我看到包车隐藏海边视角案例，想了解 Kota Kinabalu 灵活包车路线。",
      whatsappLabel: "询问灵活包车",
    },
  },
  {
    slug: "explorer-camp-rm599",
    image:
      "/images/customer-stories/explorer-camp-rm599/explorer-camp-rm599-group-01-blur.webp",
    en: {
      imageAlt: "AFFT Explorer Camp RM599 real customer setup",
      eyebrow: "Camping Story",
      title: "Explorer Camp RM599 in real use",
      text: "A recent Explorer Camp booking showed how the setup feels beyond the poster: shelter, tent, table area and a slower 2D1N Sabah rhythm.",
      detail:
        "This story helps first-time campers understand what AFFT means by a ready-made camp experience.",
      href: "/packages/explorer-camp",
      cta: "View Explorer Camp",
      whatsappText:
        "Hi AFFT, I want details for the RM599 Explorer Camp package.",
      whatsappLabel: "Ask About RM599 Explorer Camp",
    },
    zh: {
      imageAlt: "AFFT RM599 Explorer Camp 真实露营现场",
      eyebrow: "露营案例",
      title: "RM599 Explorer Camp 真实露营现场",
      text: "真实预订让客人看到套餐落地后的样子：现成遮棚、帐篷、桌椅和更慢节奏的 2 天 1 夜沙巴户外体验。",
      detail:
        "这类故事能让第一次露营的客人更清楚自己订到的是什么。",
      href: "/zh/packages/explorer-camp",
      cta: "查看 Explorer Camp",
      whatsappText:
        "你好，我看到 Explorer Camp 真实案例，想了解 RM599 套餐。",
      whatsappLabel: "询问 RM599 Explorer Camp",
    },
  },
  {
    slug: "tiggo-8-pro-charter",
    image:
      "/images/customer-stories/tiggo-8-pro-charter/tiggo-8-pro-charter-group-01-blur.webp",
    en: {
      imageAlt: "AFFT Tiggo 8 Pro private Sabah mountain charter story",
      eyebrow: "Private Car Story",
      title: "Tiggo 8 Pro private Sabah mountain movement",
      text: "A private group used AFFT Tiggo 8 Pro Charter for a smoother Sabah mountain trip with more comfortable private movement.",
      detail:
        "This story is useful for guests who need transport support, not only a camping package.",
      href: "/car-rental",
      cta: "View Car Rental",
      whatsappText:
        "Hi AFFT, I want details for the Tiggo 8 Pro charter and private car service in Sabah.",
      whatsappLabel: "Ask About Tiggo 8 Pro Charter",
    },
    zh: {
      imageAlt: "AFFT Tiggo 8 Pro 包车服务真实案例",
      eyebrow: "包车案例",
      title: "Tiggo 8 Pro 私人包车高地路线",
      text: "小团队使用 AFFT Tiggo 8 Pro Charter，让机场、市区和高地移动更舒服、更稳定。",
      detail:
        "适合家庭、小团队和想把沙巴路线走得更顺的旅客。",
      href: "/zh/car-rental",
      cta: "查看包车服务",
      whatsappText:
        "你好，我看到 Tiggo 8 Pro 包车案例，想了解 AFFT 包车服务。",
      whatsappLabel: "询问 Tiggo 8 Pro 包车",
    },
  },
];

export const featuredCustomerStories = customerStories.slice(0, 2);

export const explorerCampPhotos = [
  {
    image:
      "/images/customer-stories/explorer-camp-rm599/explorer-camp-rm599-setup-01.webp",
    caption: "Real campsite setup before guests settled in.",
  },
  {
    image:
      "/images/customer-stories/explorer-camp-rm599/explorer-camp-rm599-detail-01.webp",
    caption: "Covered area and camp details for slower outdoor time.",
  },
  {
    image:
      "/images/customer-stories/explorer-camp-rm599/explorer-camp-rm599-night-01.webp",
    caption: "Night mood that makes the stay feel complete.",
  },
];
