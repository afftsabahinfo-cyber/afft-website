import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ZhFaqCard,
  ZhInfoCard,
  ZhPageFinalCta,
  ZhSectionHeading,
  ZhSiteFooter,
  ZhSiteTopNav,
} from "@/components/ZhPageSections";
import { makeWhatsappLink } from "@/lib/rent-it-data";
import {
  getZhTravelService,
  zhTravelServices,
  type ZhCard,
} from "@/lib/zh-site-data";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return zhTravelServices.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getZhTravelService(slug);

  if (!service) {
    return {
      title: "旅行服务 | AFFT Club",
    };
  }

  return {
    title: `${service.title} | AFFT 中文旅行服务`,
    description: service.intro,
    alternates: {
      canonical: service.href,
      languages: {
        en: `/travel-services/${service.slug}`,
        "zh-Hans": service.href,
      },
    },
    openGraph: {
      title: `${service.title} | AFFT 中文旅行服务`,
      description: service.intro,
      images: [
        {
          url: service.image,
          alt: service.imageAlt,
        },
      ],
    },
  };
}

export default async function ZhTravelServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getZhTravelService(slug);

  if (!service) {
    notFound();
  }

  const otherServices = zhTravelServices.filter(
    (item) => item.slug !== service.slug
  );

  return (
    <main lang="zh-Hans" className="min-h-screen bg-[#10140F] text-white">
      <section className="px-6 py-8 md:px-10">
        <div className="mx-auto max-w-7xl">
          <ZhSiteTopNav />

          <div className="mt-12 grid gap-10 xl:grid-cols-[0.85fr_1.15fr] xl:items-start">
            <div className="pt-2">
              <a
                href="/zh/private-tours"
                className="text-sm font-bold text-[#F3922B]"
              >
                返回私人行程
              </a>

              <p className="mt-8 text-sm font-bold uppercase tracking-[0.3em] text-[#F3922B]">
                {service.eyebrow}
              </p>

              <h1 className="mt-4 text-5xl font-bold leading-tight md:text-7xl">
                {service.title}
              </h1>

              <p className="mt-6 max-w-2xl text-xl leading-8 text-white/75">
                {service.intro}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={makeWhatsappLink(service.whatsappText)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-full bg-[#F3922B] px-7 py-4 font-bold text-black"
                >
                  WhatsApp 询问这个服务
                </a>
                <a
                  href="/zh/private-tours"
                  className="inline-flex rounded-full border border-white/15 px-7 py-4 font-bold text-white"
                >
                  查看私人行程
                </a>
              </div>
            </div>

            <div className="relative rounded-[2rem] border border-white/10 bg-white p-2 shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
              <img
                src={service.image}
                alt={service.imageAlt}
                className="w-full rounded-[1.5rem]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <div className="grid gap-8 xl:grid-cols-[1fr_0.95fr]">
          <article className="rounded-[2rem] bg-[#182015] p-8 md:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#F3922B]">
              服务说明
            </p>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              这个服务适合什么情况
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/72">
              {service.overview}
            </p>
          </article>

          <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
            {service.quickFacts.map((fact) => (
              <FactCard key={fact.title} fact={fact} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:px-10 xl:grid-cols-3">
        <ListBlock title="适合" items={service.goodFor} />
        <ListBlock title="AFFT 可以怎样帮忙" items={service.howAfftHelps} />
        <ListBlock title="先发这些资料" items={service.whatToSend} />
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <ZhSectionHeading small="FAQ" big="WhatsApp 前先看几个常见问题。" />
        <div className="grid gap-4 md:grid-cols-2">
          {service.faqs.map((faq) => (
            <ZhFaqCard
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <ZhSectionHeading small="其他服务" big="中文页面内继续浏览其他 AFFT 服务。" />
        <div className="grid gap-4 md:grid-cols-3">
          {otherServices.map((item) => (
            <a
              key={item.slug}
              href={item.href}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-[#F3922B]/40"
            >
              <img
                src={item.image}
                alt={item.imageAlt}
                className="h-40 w-full bg-white object-contain p-2"
              />
              <div className="p-5">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#F3922B]">
                  {item.eyebrow}
                </p>
                <h3 className="mt-3 text-xl font-bold">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/65">{item.text}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 pt-10 md:px-10">
        <ZhPageFinalCta
          title={`想安排 ${service.title}？`}
          text="发送日期、人数、路线想法和接送点给 AFFT，我们会通过 WhatsApp 回复实际下一步。"
          message={service.whatsappText}
          buttonLabel={`WhatsApp 询问 ${service.title}`}
        />
      </section>

      <ZhSiteFooter />
    </main>
  );
}

function FactCard({ fact }: { fact: ZhCard }) {
  return <ZhInfoCard title={fact.title} text={fact.text} />;
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="rounded-[2rem] border border-white/10 bg-white/5 p-7">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="mt-6 grid gap-3">
        {items.map((item) => (
          <div key={item} className="rounded-2xl bg-[#182015] p-4 text-white/72">
            {item}
          </div>
        ))}
      </div>
    </article>
  );
}
