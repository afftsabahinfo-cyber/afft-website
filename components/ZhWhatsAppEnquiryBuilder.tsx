"use client";

import { useMemo, useState } from "react";
import { makeWhatsappLink } from "@/lib/rent-it-data";

type ServiceOption = {
  label: string;
  value: string;
};

const defaultServices: ServiceOption[] = [
  { label: "露营套餐", value: "露营套餐" },
  { label: "Rent It 装备", value: "Rent It 装备" },
  { label: "私人行程", value: "私人行程" },
  { label: "包车 / 租车", value: "包车 / 租车" },
  { label: "机场接送", value: "机场接送" },
];

export function ZhWhatsAppEnquiryBuilder({
  title = "先把重点资料发给 AFFT",
  text = "用这个简单表单生成 WhatsApp 文字，AFFT 会更快知道你需要什么。",
  defaultService = "露营套餐",
  defaultInterest = "",
  services = defaultServices,
}: {
  title?: string;
  text?: string;
  defaultService?: string;
  defaultInterest?: string;
  services?: ServiceOption[];
}) {
  const [service, setService] = useState(defaultService);
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("");
  const [pickup, setPickup] = useState("");
  const [interest, setInterest] = useState(defaultInterest);
  const [notes, setNotes] = useState("");
  const [copied, setCopied] = useState(false);

  const message = useMemo(() => {
    const lines = [
      "你好 AFFT，我想规划沙巴行程。",
      "",
      `服务：${service || "还不确定"}`,
      `日期：${date || "还没确定"}`,
      `人数：${guests || "还没确定"}`,
      `接送点 / 地点：${pickup || "还没确定"}`,
      `想了解：${interest || "请你们建议适合的选择"}`,
      notes ? `备注：${notes}` : "",
      "",
      "请回复我可行的选择和下一步。",
    ];

    return lines.filter(Boolean).join("\n");
  }, [date, guests, interest, notes, pickup, service]);

  const copyMessage = async () => {
    if (!navigator.clipboard) {
      return;
    }

    await navigator.clipboard.writeText(message);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section className="rounded-[2rem] border border-[#F3922B]/20 bg-[#182015] p-6 md:p-8">
      <div className="grid gap-8 xl:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#F3922B]">
            WhatsApp 询盘助手
          </p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">{title}</h2>
          <p className="mt-4 leading-8 text-white/70">{text}</p>
        </div>

        <div className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="服务">
              <select
                value={service}
                onChange={(event) => setService(event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-white outline-none focus:border-[#F3922B]"
              >
                {services.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="日期">
              <input
                value={date}
                onChange={(event) => setDate(event.target.value)}
                placeholder="例：2026 年 8 月 12 日"
                className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-[#F3922B]"
              />
            </Field>

            <Field label="人数">
              <input
                value={guests}
                onChange={(event) => setGuests(event.target.value)}
                placeholder="例：2 大 1 小"
                className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-[#F3922B]"
              />
            </Field>

            <Field label="接送点 / 地点">
              <input
                value={pickup}
                onChange={(event) => setPickup(event.target.value)}
                placeholder="例：KK 市区酒店"
                className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-[#F3922B]"
              />
            </Field>
          </div>

          <Field label="想了解">
            <input
              value={interest}
              onChange={(event) => setInterest(event.target.value)}
              placeholder="例：Explorer Camp 加包车"
              className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-[#F3922B]"
            />
          </Field>

          <Field label="备注">
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="预算、路线、行李、装备、小孩年龄或特别需求"
              rows={3}
              className="w-full resize-none rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-[#F3922B]"
            />
          </Field>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/45">
              讯息预览
            </p>
            <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-6 text-white/75">
              {message}
            </pre>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={makeWhatsappLink(message)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#F3922B] px-6 py-3 font-bold text-black"
            >
              打开 WhatsApp
            </a>
            <button
              type="button"
              onClick={copyMessage}
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 font-bold text-white"
            >
              {copied ? "已复制" : "复制文字"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-white/70">{label}</span>
      {children}
    </label>
  );
}
