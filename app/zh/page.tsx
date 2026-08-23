import type { Metadata } from "next";
import { AfftBrand, AfftLogoMark } from "@/components/AfftBrand";
import { makeWhatsappLink, whatsapp } from "@/lib/rent-it-data";
import {
  zhPackages,
  zhRentSeries,
  type ZhRentSeries,
} from "@/lib/zh-site-data";

export const metadata: Metadata = {
  title: "AFFT Club | 沙巴户外体验与露营套餐",
  description:
    "AFFT 提供沙巴 Jimny 露营套餐、私人行程、Rent It 装备租借和包车支持，适合中文旅客直接 WhatsApp 询问。",
  alternates: {
    canonical: "/zh",
    languages: {
      en: "/",
      "zh-Hans": "/zh",
    },
  },
};

const images = {
  hero: "/images/kinabalu-hero.webp",
  kiulu: "/images/kiulu-campsite.webp",
  milkyway: "/images/milky-way-sabah.webp",
};

const socialLinks = [
  {
    platform: "tiktok",
    icon: "/images/social/tiktok.svg",
    title: "TikTok",
    href: "https://www.tiktok.com/@afft.club?r=1&_t=ZS-97kWi9U9yr",
    text: "看 AFFT 的沙巴户外短视频、露营氛围和装备亮点。",
  },
  {
    platform: "rednote",
    icon: "/images/social/rednote.svg",
    title: "小红书 / Rednote",
    href: "https://xhslink.com/m/7CrxZ1jRF6",
    text: "看沙巴旅行笔记、露营风格和真实更新。",
  },
  {
    platform: "instagram",
    icon: "/images/social/instagram.svg",
    title: "Instagram",
    href: "https://www.instagram.com/afft.club.kk.car.service/",
    text: "看露营、私人行程、包车服务和沙巴风景照片。",
  },
  {
    platform: "facebook",
    icon: "/images/social/facebook.svg",
    title: "Facebook",
    href: "https://www.facebook.com/share/17tRoTFe1x/",
    text: "看 AFFT 的一般更新、联系方式和活动内容。",
  },
];

const packageWatermarks: Record<string, string> = {
  "solo-explorer": "/images/solo-explorer-watermark.svg",
  "explorer-camp": "/images/explorer-camp-watermark.svg",
  "couple-camp-milky-way": "/images/astro-hunter-watermark.svg",
  "family-camp": "/images/family-camp-watermark.svg",
};

const campingPackages = zhPackages.map((pkg) => ({
  href: pkg.href,
  image: pkg.image,
  imageAlt: pkg.imageAlt,
  watermark: packageWatermarks[pkg.slug] ?? "/images/explorer-camp-watermark.svg",
  price: pkg.price,
  title: pkg.title,
  hook: pkg.shortText,
  bestFor: pkg.bestFor,
  cta: "查看套餐",
}));

const sabahTripWhatsapp = makeWhatsappLink(
  "你好，我想规划沙巴行程，想了解露营套餐、私人行程、包车或 Rent It 装备租借。"
);

const travelServices = [
  {
    eyebrow: "机场",
    title: "机场接送",
    href: "/zh/travel-services/airport-transfer",
    image: "/images/airport-transfer-cover.webp",
    imageAlt: "AFFT 机场接送 cover，Tiggo 车辆与车厢重点",
    text: "适合抵达沙巴后，更顺地衔接酒店、露营地或下一段行程。",
    whatsappText: "你好，我想了解 AFFT 的机场接送服务。",
  },
  {
    eyebrow: "高地",
    title: "昆达山私人行程",
    href: "/zh/travel-services/kundasang-private-tour",
    image: "/images/kundasang-private-tour-cover.webp",
    imageAlt: "AFFT 昆达山私人行程 cover，神山、高地风景和羊驼体验",
    text: "适合想看神山、凉爽高地和乡村路线的旅客。",
    whatsappText: "你好，我想了解 AFFT 的昆达山私人行程。",
  },
  {
    eyebrow: "山打根",
    title: "山打根私人行程",
    href: "/zh/travel-services/sandakan-private-tour",
    image: "/images/sandakan-private-tour-cover.webp",
    imageAlt: "AFFT 山打根私人行程 cover，市区、海景、野生动物和文化建筑",
    text: "适合山打根市区、海景、文化建筑和野生动物路线。",
    whatsappText: "你好，我想了解 AFFT 的山打根私人行程。",
  },
  {
    eyebrow: "包车",
    title: "Tiggo 8 Pro / Alphard 包车",
    href: "/zh/travel-services/tiggo-alphard-charter",
    image: "/images/tiggo-alphard-charter-cover.webp",
    imageAlt: "AFFT Tiggo 与 Alphard 私人包车 cover",
    text: "适合家庭、小团队、机场接送和想要更舒适移动体验的访客。",
    whatsappText:
      "你好，我想了解 AFFT 的 Tiggo 8 Pro、Alphard 包车或 VIP 出行服务。",
  },
] as const;

const rentItSeries = zhRentSeries;

const explorerCampRm599Story = {
  image:
    "/images/customer-stories/explorer-camp-rm599/explorer-camp-rm599-group-01-blur.webp",
  imageAlt: "AFFT RM599 Explorer Camp 真实露营现场",
  eyebrow: "真实露营案例",
  title: "最近一次 Explorer Camp 预订，让 RM599 套餐不只是海报上的感觉。",
  description:
    "这次 Explorer Camp 真实案例，让客人看到 RM599 套餐落地后的样子：现成遮棚、帐篷、桌椅布置，以及更慢节奏的 2 天 1 夜沙巴户外体验。",
  detail:
    "客人可以先拥有一个完整的 AFFT 露营基础，再根据需要加上交通、额外装备或更完整的路线安排。这也是 Explorer Camp 很适合第一次想舒服体验户外的人。",
  href: "/zh/packages/explorer-camp",
  hrefLabel: "查看 Explorer Camp",
  whatsapp: makeWhatsappLink(
    "你好，我想了解 RM599 Explorer Camp 套餐。"
  ),
  whatsappLabel: "咨询 RM599 Explorer Camp",
};

const tiggo8ProCharterStory = {
  image:
    "/images/customer-stories/tiggo-8-pro-charter/tiggo-8-pro-charter-group-01-privacy-watermarked.webp",
  imageAlt: "AFFT Tiggo 8 Pro 包车服务真实案例",
  eyebrow: "私人包车案例",
  title: "有一组客人用 AFFT Tiggo 8 Pro Charter，让沙巴高地路线走得更顺。",
  description:
    "这次路线使用了 AFFT 的 Tiggo 8 Pro Charter 和私人包车支持，重点是更舒服地移动于机场、市区和凉爽高地之间，不是露营套餐案例。",
  detail:
    "这类安排很适合小团队、家庭，或想要更稳定、更舒适交通节奏的访客。尤其是山路、高地和多站点行程，会比自行安排更轻松。",
  href: "#travel",
  hrefLabel: "查看行程支持",
  whatsapp: makeWhatsappLink(
    "你好，我想了解 AFFT 的 Tiggo 8 Pro 包车和私人车服务。"
  ),
  whatsappLabel: "咨询 Tiggo 8 Pro 包车",
};

const customerStories = [explorerCampRm599Story, tiggo8ProCharterStory] as const;

const browsePaths = [
  {
    href: "/zh/camping",
    label: "露营套餐",
    title: "选择沙巴露营套餐",
    text: "从 Explorer Camp、Solo Explorer、家庭露营或星空露营开始看。",
  },
  {
    href: "/zh/rent-it",
    label: "Rent It",
    title: "租借户外装备和创作者设备",
    text: "比较创作者设备、露营生活工具、高级营地家具和帐篷系列。",
  },
  {
    href: "/zh/camping-spots",
    label: "Camp Spots",
    title: "浏览 West Coast Division 营地",
    text: "按 Kota Kinabalu、Tuaran、Kota Belud、Ranau 和 Papar district 找营地。",
  },
  {
    href: "/zh/private-tours",
    label: "私人行程",
    title: "规划沙巴私人路线",
    text: "适合 Kundasang、Sandakan、神山、高地、自然路线或露营加行程。",
  },
  {
    href: "/zh/car-rental",
    label: "包车",
    title: "安排沙巴私人交通",
    text: "查看机场接送、Tiggo 8 Pro、Alphard 或私人路线交通支持。",
  },
  {
    href: "/zh/customer-stories",
    label: "真实案例",
    title: "看 AFFT 真实服务案例",
    text: "用真实露营和包车案例，先理解 AFFT 实际会提供什么。",
  },
] as const;

export default function ChineseHomePage() {
  return (
    <main lang="zh-Hans" className="min-h-screen bg-[#10140F] text-white">
      <section
        className="relative min-h-screen bg-cover bg-center px-6 py-8 md:px-16"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(16,20,15,.95), rgba(16,20,15,.65), rgba(16,20,15,.25)), url(${images.hero})`,
        }}
      >
        <nav className="flex items-center justify-between gap-4">
          <AfftBrand
            href="/zh"
            className="shrink-0"
            markClassName="h-10 w-10 md:h-12 md:w-12"
            labelClassName="hidden text-sm tracking-[0.22em] sm:block md:text-base"
          />
          <div className="hidden gap-8 text-sm md:flex">
            <a href="#experiences">体验</a>
            <a href="/zh/camping">露营套餐</a>
            <a href="/zh/rent-it">Rent It 系列</a>
            <a href="/zh/private-tours">私人行程</a>
            <a href="/zh/car-rental">包车</a>
            <a href="/zh/about">关于 AFFT</a>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="rounded-full border border-white/25 px-4 py-2 text-sm font-bold text-white"
            >
              EN
            </a>
            <a
              href={whatsapp}
              className="rounded-full bg-[#F3922B] px-6 py-3 font-bold text-black"
            >
              WhatsApp
            </a>
          </div>
        </nav>

        <div className="max-w-4xl pt-28 md:pt-40">
          <p className="mb-6 inline-block rounded-full border border-white/30 bg-black/30 px-5 py-2 text-sm">
            神山 / 沙巴户外基地
          </p>
          <h1 className="text-6xl font-bold leading-tight md:text-8xl">
            探索沙巴
            <br />
            不只是走游客路线
          </h1>
          <p className="mt-8 max-w-2xl text-xl text-white/80">
            私人户外体验、露营套餐、Rent It 装备租借和沙巴包车支持，
            让你更轻松开始一趟真实的沙巴旅程。
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#experiences"
              className="rounded-full bg-[#F3922B] px-8 py-4 font-bold text-black"
            >
              查看体验内容
            </a>
            <a
              href={whatsapp}
              className="rounded-full border border-white/40 bg-black/30 px-8 py-4 font-bold"
            >
              直接联系 AFFT
            </a>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:px-16">
        <Title
          small="从这里开始"
          big="先选择你真正想询问 AFFT 的服务方向。"
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {browsePaths.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-[#F3922B]/45"
            >
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#F3922B]">
                {item.label}
              </p>
              <h2 className="mt-4 text-2xl font-bold">{item.title}</h2>
              <p className="mt-3 leading-7 text-white/70">{item.text}</p>
              <span className="mt-5 inline-block font-bold text-[#F3922B]">
                打开页面 &rarr;
              </span>
            </a>
          ))}
        </div>
      </section>

      <section id="experiences" className="px-6 py-20 md:px-16">
        <Title
          small="沙巴户外体验"
          big="山景、河流、森林和星空，让旅程更像真的走进沙巴。"
        />
        <div className="grid gap-6 md:grid-cols-3">
          <ImageCard
            img={images.milkyway}
            title="星空体验"
            text="适合喜欢观星、夜景和更安静户外节奏的旅客。"
          />
          <ImageCard
            img={images.hero}
            title="神山与高地风景"
            text="适合想看昆达山、凉爽高地和山景路线的旅客。"
          />
          <ImageCard
            img={images.kiulu}
            title="Kiulu 自然体验"
            text="适合想看河流、乡村和更轻松自然风景的人。"
          />
        </div>
      </section>

      <section id="camping" className="bg-[#182015] px-6 py-20 md:px-16">
        <Title
          small="Camping Packages"
          big="适合 Jimny 周末、第一次露营和家庭户外出行的现成套餐。"
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {campingPackages.map((pkg) => (
            <CampingPackageCard key={pkg.href} {...pkg} />
          ))}
        </div>
      </section>

      <section id="rent-it" className="px-6 py-20 md:px-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-4xl">
            <Title
              small="AFFT Rent It Series"
              big="不用先买整套装备，也可以先体验 AFFT 的户外生活方式。"
            />
          </div>
          <div className="max-w-xl text-white/70">
            <p className="text-lg font-semibold text-[#F3922B]">
              先体验，再决定。
            </p>
            <p className="mt-3">
              先选适合你旅程的系列，再把真正想问的装备通过 WhatsApp 发给 AFFT。
              最容易理解的重点产品会先放在前面，浏览更轻松。
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {rentItSeries.map((series) => (
            <RentItSeriesCard key={series.slug} series={series} />
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h3 className="text-3xl font-bold md:text-4xl">
              精选 Rent It 推荐
            </h3>
            <p className="mt-3 max-w-3xl text-white/70">
              先看最容易理解 AFFT 在租什么：创作者设备、Helinox 舒适配置和重点帐篷体验。
            </p>
          </div>
          <a
            href="/zh/rent-it"
            className="inline-flex rounded-full border border-white/15 px-6 py-3 font-bold text-white"
          >
            查看完整 Rent It 系列
          </a>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {rentItSeries.map((series) => (
            <RentItFeaturedCard key={series.slug} series={series} />
          ))}
        </div>

        <div className="mt-12 rounded-[2rem] border border-white/10 bg-[#182015] p-8 md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <h3 className="text-2xl font-bold md:text-3xl">
              不知道怎么选装备？
            </h3>
            <p className="mt-3 max-w-2xl text-white/70">
              AFFT 可以根据你的行程类型、人数、拍摄需求或露营氛围，推荐更合适的组合。
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 md:mt-0">
            <a
              href={whatsapp}
              className="inline-flex rounded-full bg-[#F3922B] px-6 py-3 font-bold text-black"
            >
              WhatsApp 联系 AFFT
            </a>
            <a
              href="/zh/rent-it"
              className="inline-flex rounded-full border border-white/15 px-6 py-3 font-bold text-white"
            >
              打开完整目录
            </a>
          </div>
        </div>
      </section>

      <section id="travel" className="bg-[#182015] px-6 py-20 md:px-16">
        <Title
          small="Travel Services"
          big="从机场到露营地，AFFT 可以先把你的沙巴移动安排得更顺。"
        />
        <div className="grid gap-6 md:grid-cols-4">
          {travelServices.map((service) => (
            <TravelServiceCard key={service.title} service={service} />
          ))}
        </div>
      </section>

      <section id="about" className="px-6 py-20 md:px-16">
        <Title
          small="About AFFT"
          big="沙巴户外旅行应该更有人情味、更实际，也更容易开始。"
        />

        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <article className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
            <img
              src={images.kiulu}
              alt="AFFT campsite in Sabah"
              className="h-72 w-full object-cover"
            />
            <div className="p-8">
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#F3922B]">
                AFFT 的方式
              </p>
              <h3 className="mt-4 text-3xl font-bold md:text-4xl">
                AFFT 适合想真正感受沙巴，而不只是打卡看一眼的人。
              </h3>
              <p className="mt-5 max-w-2xl text-white/72">
                AFFT 不是传统旅行社。我们更专注露营体验、私人行程、包车和
                Rent It 支持，让旅客不用先拥有整套装备，也能更轻松地走进山景、
                乡村公路和真实的户外时间。
              </p>
            </div>
          </article>

          <div className="grid gap-6">
            <AboutCard
              title="为什么找 AFFT"
              text="一个 WhatsApp 联系窗口，处理露营、行程支持和装备规划。简单、灵活、实用，适合情侣、家庭、小团队和创作者。"
            />
            <AboutCard
              title="为什么是沙巴"
              text="沙巴同一趟旅程里就能看到凉爽高地、河流、乡村公路和星空，整体感觉更开阔、更放松，也更像真的在旅行。"
            />
            <AboutCard
              title="为什么是露营"
              text="露营让人放慢脚步、带着风景醒来，也更容易感受到真实户外时间。AFFT 可以用现成套餐和租借支持，把这件事变简单。"
            />
          </div>
        </div>

        <div className="mt-12">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h3 className="text-3xl font-bold md:text-4xl">Follow AFFT</h3>
              <p className="mt-3 max-w-3xl text-white/70">
                先看看 AFFT 的真实更新、户外氛围和沙巴行程灵感，再决定你想怎么玩。
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {socialLinks.map((link) => (
              <SocialCard key={link.title} {...link} />
            ))}
          </div>
        </div>

        <section className="mt-12">
          <Title
            small="Customer Stories"
            big="更多真实案例，会让客人更相信自己订到的到底是什么。"
          />

          <div className="grid gap-8 xl:grid-cols-2">
            {customerStories.map((story) => (
              <CustomerStoryCard key={story.title} story={story} />
            ))}
          </div>
        </section>

        <div className="mt-12 rounded-[2rem] border border-white/10 bg-[#182015] p-8 md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <h3 className="text-2xl font-bold md:text-3xl">
              想开始规划你的沙巴旅程？
            </h3>
            <p className="mt-3 max-w-2xl text-white/70">
              告诉 AFFT 你的旅行日期、人数，以及你比较想要露营、私人行程、包车还是 Rent It 支持。
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <a
              href={sabahTripWhatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-full bg-[#F3922B] px-6 py-3 font-bold text-black"
            >
              WhatsApp 联系 AFFT
            </a>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-16">
        <div className="rounded-[2rem] bg-[#F3922B] p-10 text-black md:p-16">
          <h2 className="text-4xl font-bold md:text-6xl">
            准备好开始你的沙巴体验了吗？
          </h2>
          <p className="mt-4 max-w-2xl text-lg">
            联系 AFFT，一起把你的户外体验、露营套餐或 Rent It 计划排清楚。
          </p>
          <a
            href={whatsapp}
            className="mt-8 inline-block rounded-full bg-black px-8 py-4 font-bold text-white"
          >
            WhatsApp +60 11-1159 8920
          </a>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black/30 py-12">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-3">
          <div>
            <AfftBrand
              href="/zh"
              className="gap-4"
              markClassName="h-14 w-14"
              labelClassName="text-lg tracking-[0.26em] md:text-xl"
            />
            <p className="mt-3 text-white/70">
              沙巴户外体验、露营套餐、Rent It 系列和私人旅行支持。
            </p>
          </div>

          <div>
            <h4 className="mb-3 font-semibold text-white">联系方式</h4>
            <p className="text-white/70">WhatsApp</p>
            <a href={whatsapp} className="text-[#F3922B]">
              +60 11-1159 8920
            </a>
            <p className="mt-3 text-white/70">afft.sabah.info@gmail.com</p>
          </div>

          <div>
            <h4 className="mb-3 font-semibold text-white">Company Information</h4>
            <p className="text-white/70">ADVENTURE FRONTIER FREEDOM TRAVEL</p>
            <p className="text-white/70">2024 注册成立</p>
            <p className="text-white/70">(202401014720 (1560570-W))</p>
            <p className="text-white/70">KPL/LN: 12014</p>
          </div>
        </div>

        <div className="mt-10 text-center text-sm text-white/40">
          2024 注册成立 · Copyright 2024-2026 AFFT.CLUB. All Rights Reserved.
        </div>
      </footer>

      <a
        href={whatsapp}
        className="fixed bottom-6 right-6 rounded-full bg-[#F3922B] px-6 py-4 font-bold text-black shadow-xl"
      >
        WhatsApp
      </a>
    </main>
  );
}

function Title({ small, big }: { small: string; big: string }) {
  return (
    <div className="mb-10">
      <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-[#F3922B]">
        {small}
      </p>
      <h2 className="max-w-4xl text-4xl font-bold md:text-6xl">{big}</h2>
    </div>
  );
}

function TravelServiceCard({
  service,
}: {
  service: (typeof travelServices)[number];
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-[#F3922B]/40">
      <a
        href={service.href}
        aria-label={`查看 ${service.title}`}
        className="relative block h-48 overflow-hidden bg-[#10140F]"
      >
        <img
          src={service.image}
          alt={service.imageAlt}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#10140F]/95 via-[#10140F]/30 to-black/10" />
        <div className="absolute left-4 top-4 rounded-full border border-[#F3922B]/35 bg-[#10140F]/80 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#F3922B]">
          {service.eyebrow}
        </div>
        <AfftLogoMark
          decorative
          className="pointer-events-none absolute right-4 top-4 h-12 w-12 opacity-85 drop-shadow-[0_8px_18px_rgba(0,0,0,0.35)]"
        />
      </a>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-2xl font-bold">
          <a href={service.href}>{service.title}</a>
        </h3>
        <p className="mt-4 flex-1 text-white/70">{service.text}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={service.href} className="font-bold text-[#F3922B]">
            查看服务 &rarr;
          </a>
          <a
            href={makeWhatsappLink(service.whatsappText)}
            target="_blank"
            rel="noreferrer"
            className="font-bold text-white/80 hover:text-[#F3922B]"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}

function CampingPackageCard({
  href,
  image,
  imageAlt,
  watermark,
  price,
  title,
  hook,
  bestFor,
  cta,
}: {
  href: string;
  image: string;
  imageAlt: string;
  watermark: string;
  price: string;
  title: string;
  hook: string;
  bestFor: string;
  cta: string;
}) {
  return (
    <a
      href={href}
      className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-[#F3922B]/40"
    >
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={imageAlt}
          className="h-56 w-full bg-white object-contain p-2 transition duration-500"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#10140F]/85 via-[#10140F]/15 to-transparent" />
        <img
          src={watermark}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute right-5 top-5 h-16 w-16 opacity-20 md:h-20 md:w-20"
        />
      </div>
      <div className="p-6">
        <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#F3922B]">
          {price}
        </p>
        <h3 className="mt-4 text-2xl font-bold">{title}</h3>
        <p className="mt-4 text-white/72">{hook}</p>
        <p className="mt-4 text-sm leading-6 text-white/55">{bestFor}</p>
        <span className="mt-6 inline-block font-bold text-[#F3922B]">
          {cta} -&gt;
        </span>
      </div>
    </a>
  );
}

function ImageCard({
  img,
  title,
  text,
}: {
  img: string;
  title: string;
  text: string;
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
      <img src={img} alt={title} className="h-64 w-full object-cover" />
      <div className="p-6">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="mt-4 text-white/70">{text}</p>
      </div>
    </div>
  );
}

function AboutCard({ title, text }: { title: string; text: string }) {
  return (
    <article className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-7">
      <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#F3922B]">
        {title}
      </p>
      <p className="mt-4 text-lg leading-8 text-white/72">{text}</p>
    </article>
  );
}

function CustomerStoryCard({
  story,
}: {
  story: {
    image: string;
    imageAlt: string;
    eyebrow: string;
    title: string;
    description: string;
    detail: string;
    href: string;
    hrefLabel: string;
    whatsapp: string;
    whatsappLabel: string;
  };
}) {
  return (
    <article className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
      <img
        src={story.image}
        alt={story.imageAlt}
        className="h-[22rem] w-full object-cover"
      />

      <div className="p-8 md:p-10">
        <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#F3922B]">
          {story.eyebrow}
        </p>
        <h3 className="mt-4 text-3xl font-bold md:text-4xl">{story.title}</h3>
        <p className="mt-5 text-white/72">{story.description}</p>
        <p className="mt-4 text-white/60">{story.detail}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={story.href}
            className="inline-flex rounded-full bg-[#F3922B] px-6 py-3 font-bold text-black"
          >
            {story.hrefLabel}
          </a>
          <a
            href={story.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-full border border-white/15 px-6 py-3 font-bold text-white"
          >
            {story.whatsappLabel}
          </a>
        </div>
      </div>
    </article>
  );
}

function SocialCard({
  icon,
  title,
  href,
  text,
}: {
  icon: string;
  title: string;
  href: string;
  text: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-[#F3922B]/40"
    >
      <div className="pointer-events-none absolute right-4 top-3 opacity-[0.08] transition group-hover:opacity-[0.16]">
        <img
          src={icon}
          alt=""
          aria-hidden="true"
          className="h-16 w-16 object-contain"
        />
      </div>

      <div className="relative z-10">
        <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#F3922B]">
          Social
        </p>
        <h4 className="mt-4 pr-20 text-2xl font-bold">{title}</h4>
        <p className="mt-4 text-white/70">{text}</p>
        <span className="mt-6 inline-block font-bold text-[#F3922B]">
          打开 {title} &rarr;
        </span>
      </div>
    </a>
  );
}

function RentItSeriesCard({
  series,
}: {
  series: ZhRentSeries;
}) {
  return (
    <a
      href={series.href}
      className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-[#F3922B]/40"
    >
      <img
        src={series.image}
        alt={series.imageAlt}
        className="h-52 w-full bg-white object-contain p-2"
      />
      <div className="p-6">
        <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#F3922B]">
          {series.startingFrom}
        </p>
        <h3 className="mt-4 text-2xl font-bold">{series.eyebrow}</h3>
        <p className="mt-4 text-white/70">{series.hook}</p>
        <p className="mt-4 text-sm leading-6 text-white/55">{series.bestFor}</p>
        <span className="mt-6 inline-block font-bold text-[#F3922B]">
          查看系列 -&gt;
        </span>
      </div>
    </a>
  );
}

function RentItFeaturedCard({ series }: { series: ZhRentSeries }) {
  return (
    <a
      href={series.href}
      className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-[#F3922B]/40"
    >
      <img
        src={series.image}
        alt={series.imageAlt}
        className="h-56 w-full bg-white object-contain p-2"
      />
      <div className="p-5">
        <h4 className="font-bold">{series.featuredTitle}</h4>
        <p className="mt-2 text-sm font-bold text-[#F3922B]">
          {series.featuredPrice}
        </p>
        <p className="mt-3 text-sm leading-6 text-white/65">
          {series.featuredText}
        </p>
        <span className="mt-4 inline-block text-sm font-bold text-[#F3922B]">
          查看详情 &rarr;
        </span>
      </div>
    </a>
  );
}
