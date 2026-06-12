import type { Metadata } from "next";
import { AfftBrand } from "@/components/AfftBrand";
import type { MainSeries } from "@/lib/rent-it-data";
import {
  makeWhatsappLink,
  rentItMainSeries,
  whatsapp,
} from "@/lib/rent-it-data";

export const metadata: Metadata = {
  title: "AFFT Club | 沙巴户外体验与露营套餐",
  description:
    "AFFT 提供沙巴露营套餐、私人行程、Rent It 装备租借和包车支持，适合中文旅客直接 WhatsApp 询问。",
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
    title: "TikTok",
    icon: "/images/social/tiktok.svg",
    href: "https://www.tiktok.com/@afft.club?r=1&_t=ZS-97kWi9U9yr",
    text: "看 AFFT 的沙巴户外短视频、露营氛围和装备亮点。",
  },
  {
    title: "小红书 / Rednote",
    icon: "/images/social/rednote.svg",
    href: "https://xhslink.com/m/7CrxZ1jRF6",
    text: "看沙巴旅行笔记、露营风格和真实更新。",
  },
  {
    title: "Instagram",
    icon: "/images/social/instagram.svg",
    href: "https://www.instagram.com/rentalcar.kk.afftservice?igsh=NG5laGxzMHJ3eWEy",
    text: "看露营、私人行程和沙巴风景照片。",
  },
  {
    title: "Facebook",
    icon: "/images/social/facebook.svg",
    href: "https://www.facebook.com/share/1KkSZKDoSM/",
    text: "看 AFFT 的一般更新、联系方式和活动内容。",
  },
];

const campingPackages = [
  {
    image: "/images/solo-explorer-poster.webp",
    imageAlt: "AFFT Solo Explorer package poster",
    watermark: "/images/solo-explorer-watermark.svg",
    price: "RM399 起 / 单人轻露营",
    title: "Solo Explorer",
    hook: "适合一个人出发，想轻松体验沙巴户外生活的旅客。",
    bestFor: "适合：单人旅行 / 轻装 / 周末短出走",
    cta: "咨询 Solo Explorer",
    whatsappText: "你好，我想了解 AFFT 的 Solo Explorer 露营套餐。",
  },
  {
    image: "/images/afft-explorer-camp-rm599-sabah.webp",
    imageAlt: "AFFT Explorer Camp package poster",
    watermark: "/images/explorer-camp-watermark.svg",
    price: "RM599 起 / AFFT 招牌露营",
    title: "Explorer Camp",
    hook: "适合情侣或小团队，想舒服露营但不想自己准备整套装备。",
    bestFor: "适合：2-4 人 / 第一次露营 / 想住得更舒服",
    cta: "咨询 Explorer Camp",
    whatsappText: "你好，我想了解 AFFT 的 Explorer Camp 露营套餐。",
  },
  {
    image: "/images/afft-astro-hunter-rm799-milky-way-sabah.webp",
    imageAlt: "AFFT Couple Camp Milky Way package poster",
    watermark: "/images/astro-hunter-watermark.svg",
    price: "RM799 起 / 星空露营体验",
    title: "Couple Camp Milky Way",
    hook: "主打夜空、凉爽天气和拍照氛围的双人露营夜晚。",
    bestFor: "适合：观星 / 拍照 / 特别约会",
    cta: "咨询 Couple Camp",
    whatsappText: "你好，我想了解 AFFT 的 Couple Camp Milky Way 套餐。",
  },
  {
    image: "/images/afft-family-camp-series-sabah.webp",
    imageAlt: "AFFT Family Camp Series package poster",
    watermark: "/images/family-camp-watermark.svg",
    price: "按需求报价 / 家庭户外套餐",
    title: "Family Camp Series",
    hook: "适合亲子和家庭旅客，安排更轻松，空间也更宽松。",
    bestFor: "适合：家庭 / 小孩 / 轻松户外周末",
    cta: "咨询 Family Camp",
    whatsappText: "你好，我想了解 AFFT 的 Family Camp Series。",
  },
] as const;

const travelServices = [
  {
    title: "机场接送",
    text: "适合刚到沙巴，想直接衔接酒店、露营地或行程的旅客。",
    whatsappText: "你好，我想了解 AFFT 的机场接送服务。",
  },
  {
    title: "昆达山私人行程",
    text: "适合想看神山、凉爽高地和乡村风景的旅客。",
    whatsappText: "你好，我想了解 AFFT 的昆达山私人行程。",
  },
  {
    title: "仙本那海岛协助",
    text: "适合想把沙巴山景和海岛行程放进同一趟旅程的旅客。",
    whatsappText: "你好，我想了解 AFFT 的仙本那相关安排。",
  },
  {
    title: "包车 / VIP 出行",
    text: "适合家庭、小团队或想要更舒适交通安排的旅客。",
    whatsappText: "你好，我想了解 AFFT 的包车与 VIP 出行服务。",
  },
];

const rentItSeries: Array<
  MainSeries & { cta: string; whatsappText: string; hook: string; bestFor: string }
> = [
  {
    ...rentItMainSeries[0],
    hook: "DJI Pocket 4、Action 6、Mic 3、Avata 等创作者设备。",
    bestFor: "适合：Vlog / 旅行拍摄 / 公路内容 / 夜景内容",
    cta: "咨询 Creator Series",
    whatsappText: "你好，我想了解 AFFT 的 Creator Series 租借。",
  },
  {
    ...rentItMainSeries[1],
    hook: "咖啡、Snow Peak、KZM 等露营生活感装备。",
    bestFor: "适合：慢节奏露营 / 咖啡角 / 轻料理 / 氛围布置",
    cta: "咨询 Camp Lifestyle",
    whatsappText: "你好，我想了解 AFFT 的 Camp Lifestyle Series。",
  },
  {
    ...rentItMainSeries[2],
    hook: "Helinox、Snow Peak 家具和更舒服的露营配置。",
    bestFor: "适合：想坐得舒服 / 想睡得更好 / 质感露营",
    cta: "咨询 Premium Camp",
    whatsappText: "你好，我想了解 AFFT 的 Premium Camp Series。",
  },
  {
    ...rentItMainSeries[3],
    hook: "Black Dog、Mobi Garden 等更有存在感的帐篷体验。",
    bestFor: "适合：情侣轻奢露营 / 家庭露营 / 小团队",
    cta: "咨询 Tent Experience",
    whatsappText: "你好，我想了解 AFFT 的 Tent Experience Series。",
  },
];

const generalWhatsapp = makeWhatsappLink(
  "你好，我想了解 AFFT 的沙巴露营套餐、私人行程、包车或 Rent It 装备租借。"
);

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
            <a href="#services">服务</a>
            <a href="#camping">露营套餐</a>
            <a href="#rent-it">Rent It 租借</a>
            <a href="#travel">行程支持</a>
            <a href="#about">关于 AFFT</a>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="rounded-full border border-white/25 px-4 py-2 text-sm font-bold text-white"
            >
              EN
            </a>
            <a
              href={generalWhatsapp}
              className="rounded-full bg-[#F3922B] px-6 py-3 font-bold text-black"
            >
              WhatsApp
            </a>
          </div>
        </nav>

        <div className="max-w-4xl pt-28 md:pt-40">
          <p className="mb-6 inline-block rounded-full border border-white/30 bg-black/30 px-5 py-2 text-sm">
            神山 / 昆达山 / 沙巴户外基地
          </p>
          <h1 className="text-5xl font-bold leading-tight md:text-8xl">
            探索沙巴
            <br />
            不只是走游客路线
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-white/80 md:text-xl">
            AFFT 提供私人户外体验、露营套餐、Rent It 装备租借和沙巴包车支持。
            如果你想轻松体验沙巴，不想自己准备整套装备，可以直接 WhatsApp 联系我们。
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#camping"
              className="rounded-full bg-[#F3922B] px-8 py-4 font-bold text-black"
            >
              看露营套餐
            </a>
            <a
              href={generalWhatsapp}
              className="rounded-full border border-white/40 bg-black/30 px-8 py-4 font-bold"
            >
              直接 WhatsApp 询问
            </a>
          </div>
        </div>
      </section>

      <section id="services" className="px-6 py-20 md:px-16">
        <Title
          small="AFFT 可以安排什么"
          big="给想要更简单、更舒服体验沙巴的中文旅客。"
        />
        <div className="grid gap-6 md:grid-cols-3">
          <ImageCard
            img={images.milkyway}
            title="私人户外体验"
            text="适合想看山景、星空、乡村风景和更慢节奏沙巴生活的旅客。"
          />
          <ImageCard
            img={images.hero}
            title="露营套餐"
            text="适合第一次露营、不想自己准备装备，或想更舒服露营的人。"
          />
          <ImageCard
            img={images.kiulu}
            title="Rent It 装备租借"
            text="适合想体验高质感露营装备或创作者器材，但不想马上购买的人。"
          />
        </div>
      </section>

      <section id="camping" className="bg-[#182015] px-6 py-20 md:px-16">
        <Title
          small="Camping Packages"
          big="先从最容易理解、最容易直接询问的露营套餐开始。"
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {campingPackages.map((pkg) => (
            <CampingPackageCard key={pkg.title} {...pkg} />
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
              对中文访客来说，最简单的方法不是先看很长的英文目录，
              而是直接告诉 AFFT 你的旅行类型、人数和想要的风格，我们再推荐合适的装备系列。
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {rentItSeries.map((series) => (
            <RentItSeriesCard key={series.slug} series={series} />
          ))}
        </div>
      </section>

      <section id="travel" className="bg-[#182015] px-6 py-20 md:px-16">
        <Title
          small="Travel Support"
          big="从机场、山路到露营地，AFFT 都可以先帮你安排顺一点。"
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {travelServices.map((service) => (
            <TravelCard key={service.title} {...service} />
          ))}
        </div>
      </section>

      <section id="about" className="px-6 py-20 md:px-16">
        <Title
          small="About AFFT"
          big="AFFT 不是传统旅行社，而是更贴近沙巴户外生活方式的安排者。"
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
                Why AFFT
              </p>
              <h3 className="mt-4 text-3xl font-bold md:text-4xl">
                一个人、情侣、家庭或小团队，都可以先从一条 WhatsApp 开始。
              </h3>
              <p className="mt-5 max-w-2xl text-white/72">
                AFFT 重点不是复杂系统，而是帮旅客更快进入沙巴真实的山景、
                露营、乡村公路和户外节奏。你可以先告诉我们日期、人数和想要的感觉，
                AFFT 再帮你组合合适的露营套餐、私人行程、包车或 Rent It 支持。
              </p>
            </div>
          </article>

          <div className="grid gap-6">
            <AboutCard
              title="为什么适合中文旅客"
              text="如果你来自中文市场，AFFT 可以先让你用中文 WhatsApp 询问，减少一开始看不懂英文页面的压力。"
            />
            <AboutCard
              title="为什么适合沙巴"
              text="沙巴同时有凉爽高地、河流、乡村和星空。一次旅程里，可以同时体验山景、露营和更慢节奏的自然环境。"
            />
            <AboutCard
              title="为什么先问 WhatsApp"
              text="很多露营、包车和装备选择都跟日期、人数和天气有关。直接 WhatsApp 会比让你自己猜更快。"
            />
          </div>
        </div>

        <div className="mt-12">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h3 className="text-3xl font-bold md:text-4xl">Follow AFFT</h3>
              <p className="mt-3 max-w-3xl text-white/70">
                想先看看 AFFT 的真实风格、露营氛围和沙巴内容，可以先看这些平台。
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {socialLinks.map((link) => (
              <SocialCard key={link.title} {...link} />
            ))}
          </div>
        </div>

        <div className="mt-12 rounded-[2rem] border border-white/10 bg-[#182015] p-8 md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <h3 className="text-2xl font-bold md:text-3xl">
              想开始规划你的沙巴旅程？
            </h3>
            <p className="mt-3 max-w-2xl text-white/70">
              直接告诉 AFFT 你的旅行日期、人数，以及你比较想要露营、私人行程、包车还是 Rent It 装备租借。
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <a
              href={generalWhatsapp}
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
            先联系 AFFT，再决定最适合你的露营套餐、包车或装备租借方式。
          </p>
          <a
            href={generalWhatsapp}
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
              沙巴户外体验、露营套餐、Rent It 租借系列和私人旅行支持。
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
            <p className="text-white/70">(202401014720 (1560570-W))</p>
            <p className="text-white/70">KPL/LN: 12014</p>
            <a href="/" className="mt-4 inline-block font-bold text-[#F3922B]">
              View English Page
            </a>
          </div>
        </div>

        <div className="mt-10 text-center text-sm text-white/40">
          Copyright 2026 AFFT.CLUB. All Rights Reserved.
        </div>
      </footer>

      <a
        href={generalWhatsapp}
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

function CampingPackageCard({
  image,
  imageAlt,
  watermark,
  price,
  title,
  hook,
  bestFor,
  cta,
  whatsappText,
}: {
  image: string;
  imageAlt: string;
  watermark: string;
  price: string;
  title: string;
  hook: string;
  bestFor: string;
  cta: string;
  whatsappText: string;
}) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={imageAlt}
          className="h-56 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
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
        <a
          href={makeWhatsappLink(whatsappText)}
          className="mt-6 inline-block font-bold text-[#F3922B]"
        >
          {cta} -&gt;
        </a>
      </div>
    </div>
  );
}

function RentItSeriesCard({
  series,
}: {
  series: MainSeries & { cta: string; whatsappText: string };
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
      <img
        src={series.image}
        alt={series.imageAlt}
        className="h-52 w-full object-cover"
      />
      <div className="p-6">
        <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#F3922B]">
          {series.startingFrom}
        </p>
        <h3 className="mt-4 text-2xl font-bold">{series.title}</h3>
        <p className="mt-4 text-white/70">{series.hook}</p>
        <p className="mt-4 text-sm leading-6 text-white/55">{series.bestFor}</p>
        <a
          href={makeWhatsappLink(series.whatsappText)}
          className="mt-6 inline-block font-bold text-[#F3922B]"
        >
          {series.cta} -&gt;
        </a>
      </div>
    </div>
  );
}

function TravelCard({
  title,
  text,
  whatsappText,
}: {
  title: string;
  text: string;
  whatsappText: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-[#F3922B]/40">
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="mt-4 text-white/70">{text}</p>
      <a
        href={makeWhatsappLink(whatsappText)}
        className="mt-6 inline-block font-bold text-[#F3922B]"
      >
        WhatsApp 询问 -&gt;
      </a>
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
