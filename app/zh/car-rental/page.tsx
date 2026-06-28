import type { Metadata } from "next";
import { ZhWhatsAppEnquiryBuilder } from "@/components/ZhWhatsAppEnquiryBuilder";
import {
  ZhInfoCard,
  ZhPageFinalCta,
  ZhSectionHeading,
  ZhSiteFooter,
  ZhSiteTopNav,
} from "@/components/ZhPageSections";
import { makeWhatsappLink } from "@/lib/rent-it-data";
import { zhTravelServices } from "@/lib/zh-site-data";

export const metadata: Metadata = {
  title: "沙巴包车与机场接送 | AFFT Club",
  description:
    "AFFT 中文包车页面，包含 Tiggo 8 Pro、Alphard、机场接送、高地路线和小团队私人移动。通过 WhatsApp 询问。",
  alternates: {
    canonical: "/zh/car-rental",
    languages: {
      en: "/car-rental",
      "zh-Hans": "/zh/car-rental",
    },
  },
};

const carServices = zhTravelServices.filter((item) =>
  ["airport-transfer", "tiggo-alphard-charter"].includes(item.slug)
);

const useCases = [
  {
    title: "机场接送",
    text: "适合带行李、家庭、小团队或想要下飞机后直接顺利移动的客人。",
  },
  {
    title: "昆达山与高地路线",
    text: "山路、停靠点和时间安排需要更实际，私人车会比临时安排更安心。",
  },
  {
    title: "家庭与小团队",
    text: "人数、行李、儿童和舒适度都会影响车辆选择，先 WhatsApp 说明比较准确。",
  },
];

export default function ZhCarRentalPage() {
  return (
    <main lang="zh-Hans" className="min-h-screen bg-[#10140F] text-white">
      <section
        className="relative bg-cover bg-center px-6 py-8 md:px-10"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(16,20,15,.96), rgba(16,20,15,.72), rgba(16,20,15,.28)), url(/images/tiggo-alphard-charter-cover.webp)",
        }}
      >
        <div className="mx-auto max-w-7xl">
          <ZhSiteTopNav />

          <div className="max-w-4xl py-24 md:py-32">
            <p className="mb-6 inline-block rounded-full border border-white/30 bg-black/30 px-5 py-2 text-sm">
              沙巴包车与机场接送
            </p>
            <h1 className="text-5xl font-bold leading-tight md:text-7xl">
              让机场、高地和多站点移动更顺。
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78 md:text-xl">
              AFFT 可协助 Tiggo 8 Pro、Alphard、机场接送和私人包车路线。
              先发送日期、人数、行李和路线，方便判断车辆安排。
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={makeWhatsappLink("你好 AFFT，我想了解沙巴包车或机场接送。")}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-[#F3922B] px-8 py-4 font-bold text-black"
              >
                WhatsApp 询问包车
              </a>
              <a
                href="#car-services"
                className="rounded-full border border-white/35 bg-black/25 px-8 py-4 font-bold text-white"
              >
                查看服务
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="car-services" className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <ZhSectionHeading
          small="车辆服务"
          big="先确认移动场景，再看适合的车辆和路线。"
          text="AFFT 不做复杂系统。你只需要先把路线、人数和行李发来，我们通过 WhatsApp 看实际安排。"
        />

        <div className="grid gap-6 md:grid-cols-2">
          {carServices.map((service) => (
            <a
              key={service.slug}
              href={service.href}
              className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-[#F3922B]/40"
            >
              <img
                src={service.image}
                alt={service.imageAlt}
                className="h-72 w-full object-cover"
              />
              <div className="p-7">
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#F3922B]">
                  {service.eyebrow}
                </p>
                <h2 className="mt-3 text-3xl font-bold">{service.title}</h2>
                <p className="mt-4 text-white/70">{service.text}</p>
                <span className="mt-6 inline-block font-bold text-[#F3922B]">
                  查看详情 -&gt;
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="bg-[#182015] px-6 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <ZhSectionHeading
            small="适合场景"
            big="包车的重点不是华丽，是让整趟移动少一点麻烦。"
          />

          <div className="grid gap-6 md:grid-cols-3">
            {useCases.map((item) => (
              <ZhInfoCard key={item.title} title={item.title} text={item.text} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <ZhWhatsAppEnquiryBuilder
          title="把包车需求整理好发给 AFFT"
          text="请写清楚日期、人数、行李、接送点、路线和偏好车辆。"
          defaultService="包车 / 机场接送"
          defaultInterest="Tiggo 8 Pro、Alphard、机场接送或昆达山路线"
          services={[
            { label: "包车", value: "私人包车" },
            { label: "机场接送", value: "机场接送" },
            { label: "昆达山路线", value: "昆达山包车" },
            { label: "Alphard", value: "Alphard 包车" },
            { label: "Tiggo 8 Pro", value: "Tiggo 8 Pro 包车" },
          ]}
        />
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-10">
        <ZhPageFinalCta
          title="需要安排沙巴私人移动吗？"
          text="发送日期、路线、人数和行李数量给 AFFT，我们会通过 WhatsApp 回复实际下一步。"
          message="你好 AFFT，我想了解沙巴包车或机场接送。"
          buttonLabel="WhatsApp 询问包车"
        />
      </section>

      <ZhSiteFooter />
    </main>
  );
}
