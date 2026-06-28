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
import { getZhPackage, zhPackages } from "@/lib/zh-site-data";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return zhPackages.map((pkg) => ({
    slug: pkg.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pkg = getZhPackage(slug);

  if (!pkg) {
    return {
      title: "露营套餐 | AFFT Club",
    };
  }

  return {
    title: `${pkg.title} | AFFT 中文露营套餐`,
    description: pkg.overview,
    alternates: {
      canonical: pkg.href,
      languages: {
        en: `/packages/${pkg.slug}`,
        "zh-Hans": pkg.href,
      },
    },
    openGraph: {
      title: `${pkg.title} | AFFT 中文露营套餐`,
      description: pkg.shortText,
      images: [
        {
          url: pkg.image,
          alt: pkg.imageAlt,
        },
      ],
    },
  };
}

export default async function ZhPackageDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const pkg = getZhPackage(slug);

  if (!pkg) {
    notFound();
  }

  const otherPackages = zhPackages.filter((item) => item.slug !== pkg.slug);

  return (
    <main lang="zh-Hans" className="min-h-screen bg-[#10140F] text-white">
      <section className="px-6 py-8 md:px-10">
        <div className="mx-auto max-w-7xl">
          <ZhSiteTopNav />

          <div className="mt-12 grid gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
            <div>
              <a href="/zh/camping" className="text-sm font-bold text-[#F3922B]">
                返回露营套餐
              </a>
              <p className="mt-8 text-sm font-bold uppercase tracking-[0.3em] text-[#F3922B]">
                露营套餐
              </p>
              <h1 className="mt-4 text-5xl font-bold leading-tight md:text-7xl">
                {pkg.title}
              </h1>
              <p className="mt-6 text-2xl text-white/80">{pkg.price}</p>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">
                {pkg.overview}
              </p>
              <a
                href={makeWhatsappLink(pkg.whatsappText)}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-block rounded-full bg-[#F3922B] px-8 py-4 font-bold text-black"
              >
                WhatsApp 询问 {pkg.title}
              </a>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white p-3">
              <img
                src={pkg.image}
                alt={pkg.imageAlt}
                className="w-full rounded-[1.5rem]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <div className="grid gap-6 md:grid-cols-3">
          <ZhInfoCard title="价格方向" text={pkg.price} />
          <ZhInfoCard title="建议时长" text={pkg.duration} />
          <ZhInfoCard title="适合客人" text={pkg.bestFor} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <div className="rounded-[2rem] bg-[#182015] p-8 md:p-10">
          <ZhSectionHeading small="包含内容" big="这个套餐大概会包含什么。" />
          <div className="grid gap-4 md:grid-cols-2">
            {pkg.includes.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white/72"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <ZhSectionHeading
          small="FAQ"
          big="WhatsApp 询问前可以先看的重点。"
        />
        <div className="grid gap-4 md:grid-cols-2">
          {pkg.faqs.map((faq) => (
            <ZhFaqCard
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <ZhSectionHeading small="其他露营套餐" big="也可以比较其他 AFFT 露营方向。" />
        <div className="grid gap-4 md:grid-cols-3">
          {otherPackages.map((item) => (
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
                <p className="text-sm font-bold text-[#F3922B]">{item.price}</p>
                <h3 className="mt-3 text-xl font-bold">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/65">
                  {item.shortText}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 pt-10 md:px-10">
        <ZhPageFinalCta
          title={`想了解 ${pkg.title} 是否适合你？`}
          text="发送日期、人数、接送点和想要的露营感觉给 AFFT，我们会通过 WhatsApp 回复实际下一步。"
          message={pkg.whatsappText}
          buttonLabel={`WhatsApp 询问 ${pkg.title}`}
        />
      </section>

      <ZhSiteFooter />
    </main>
  );
}
