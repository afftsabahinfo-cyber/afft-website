import { offers } from "@/lib/offers";

export function CampComparison({ zh = false, selected = "" }: { zh?: boolean; selected?: string }) {
  const camps = offers.filter(offer => ["jimny-explorer-camp", "explorer-camp"].includes(offer.slug));
  return <section id="compare-explorer" className="scroll-mt-6">
    <p className="text-sm font-bold uppercase tracking-widest text-[#F3922B]">{zh ? "两种 Explorer Camp" : "Two Explorer Camp options"}</p>
    <h2 className="mt-3 text-3xl font-bold md:text-4xl">{zh ? "一个含 Jimny，一个是现成营地布置。" : "Choose a Jimny camp or a ready-built camp."}</h2>
    <p className="mt-4 max-w-3xl leading-7 text-white/75">{zh ? "两个套餐都是 2 天 1 夜双人体验。交通和营地费用的包含方式不同，请按你需要的方式选择。" : "Both are 2 days, 1 night for two guests. The vehicle and campsite inclusions are different."}</p>
    <div className="mt-6 grid gap-5 md:grid-cols-2">{camps.map(offer => {
      const jimny = offer.slug === "jimny-explorer-camp";
      const local = offer.locales[zh ? "zh" : "en"];
      const rows = zh ? [
        ["基础价格", `${jimny ? "" : "起价 "}RM599 / 2 人 / 2 天 1 夜`],
        ["车辆与交通", jimny ? "包含 Jimny Sierra；驾驶要求、取还安排须确认。" : "交通另行报价。"],
        ["营地费用", jimny ? "包含营地费用；具体营地按日期确认。" : "除非报价注明，否则另计。"],
        ["露营方式", jimny ? "帐篷与睡眠装备、桌椅、灯、风扇；搭建方式须确认。" : "AFFT 准备帐篷、遮棚与桌椅的现成布置。"],
        ["额外费用", jimny ? "食物饮料、冰箱、咖啡装备、高级家具与装饰灯光另计。" : "交通、未注明的营地费、餐食与额外装备另行报价。"],
      ] : [
        ["Base price", `${jimny ? "" : "From "}RM599 / 2 guests / 2D1N`],
        ["Vehicle & transport", jimny ? "Jimny Sierra included. Driving requirements and pickup/return arrangements to be confirmed." : "Transport quoted separately."],
        ["Campsite fee", jimny ? "Included. The campsite is confirmed for your dates." : "Extra unless stated in your quote."],
        ["Camp style", jimny ? "Tent, sleep gear, chairs, table, lights and fan. Setup arrangements to be confirmed." : "AFFT ready-built tent, shelter, table and chair setup."],
        ["Extras", jimny ? "Food, drinks, cooler box, coffee gear, premium furniture and decorative lighting are extra." : "Transport, unstated campsite fees, meals and extra gear quoted separately."],
      ];
      return <article key={offer.slug} className={`rounded-3xl border p-6 ${selected === offer.slug ? "border-[#F3922B]/60 bg-[#F3922B]/10" : "border-white/15 bg-white/5"}`}>
        <h3 className="text-2xl font-bold">{local.name}</h3>
        <dl className="mt-5 space-y-4">{rows.map(([label, value]) => <div key={label}><dt className="text-sm font-bold text-[#F3922B]">{label}</dt><dd className="mt-1 leading-6 text-white/80">{value}</dd></div>)}</dl>
        <a className="mt-6 inline-block font-bold text-[#F3922B] underline underline-offset-4" href={`${zh ? "/zh" : ""}/packages/${offer.slug}`}>{selected === offer.slug ? (zh ? "查看本套餐" : "This package") : (zh ? "查看这个套餐" : "View this package")}</a>
      </article>;
    })}</div>
  </section>;
}

export function CampBookingSteps({ zh = false }: { zh?: boolean }) {
  const steps = zh ? [
    ["1. 查询日期", "发送日期、人数与出发地点。AFFT 核实营地和装备供应。"],
    ["2. 看清总价", "书面报价列明营地、交通、搭建安排、包含／不含项目，以及付款和改期条件。"],
    ["3. 确认再出发", "接受报价后按 AFFT 提供的付款指示处理；收到书面确认后再按安排出发。"],
  ] : [
    ["1. Check your dates", "Send your dates, guest count and starting point. AFFT checks the campsite and equipment."],
    ["2. Review the total quote", "Your written quote lists the campsite, transport, setup, inclusions, extras and payment/change terms."],
    ["3. Confirm your camp", "After accepting the quote, follow AFFT's payment instructions. Wait for written confirmation before travelling."],
  ];
  return <section><h2 className="text-3xl font-bold">{zh ? "从询问到出发" : "From enquiry to your camp"}</h2><div className="mt-6 grid gap-5 md:grid-cols-3">{steps.map(([title, text]) => <article key={title} className="rounded-3xl border border-white/15 bg-white/5 p-6"><h3 className="text-xl font-bold">{title}</h3><p className="mt-3 leading-7 text-white/75">{text}</p></article>)}</div>
    <div className="mt-6 rounded-3xl bg-[#182015] p-6"><h3 className="text-xl font-bold">{zh ? "付款前会确认这些细节" : "Confirm these details before paying"}</h3><p className="mt-3 leading-7 text-white/75">{zh ? "具体营地、厕所与洗澡设施、交通或驾驶要求、取还／集合时间、谁负责搭建、订金及下雨改期安排。条件以这次书面报价为准；下雨不会自动取消行程。" : "Your campsite, toilet/shower facilities, transport or driving requirements, pickup/return or meeting times, who sets up, deposit and weather/change terms. Conditions are stated in your written quote. Rain alone does not automatically cancel the trip."}</p><div className="mt-4 flex flex-wrap gap-4 text-sm font-bold text-[#F3922B]"><a href={`${zh ? "/zh" : ""}/payment-confirmation`}>{zh ? "付款与确认" : "Payment & confirmation"}</a><a href={`${zh ? "/zh" : ""}/cancellation`}>{zh ? "天气与改期" : "Weather & changes"}</a><a href={`${zh ? "/zh" : ""}/rental-policy`}>{zh ? "押金与装备归还" : "Deposit & returns"}</a></div></div>
  </section>;
}
