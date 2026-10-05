"use client";
import { useEffect, useRef, useState } from "react";
import {
  createInquiryRef,
  formatInquiryRef,
  trackEvent,
} from "@/lib/analytics";
import { makeWhatsappLink } from "@/lib/rent-it-data";
import { getCamp, campPrice } from "@/lib/camping-series";

export function CampEnquiryForm({
  slug,
  zh = false,
}: {
  slug: string;
  zh?: boolean;
}) {
  const item = getCamp(slug);
  const name = item
    ? `${item.name[zh ? "zh" : "en"]} ${campPrice(item, zh ? "zh" : "en")}`
    : zh
      ? "露营套餐"
      : "Camping package";
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(
    item?.audience[zh ? "zh" : "en"] ?? (zh ? "请建议" : "Please advise"),
  );
  const [pickup, setPickup] = useState("");
  const [ref, setRef] = useState("");
  const [copied, setCopied] = useState(false);
  const started = useRef(false);
  useEffect(() => {
    setRef(formatInquiryRef(createInquiryRef(zh ? "zh" : "en", slug)));
  }, [slug, zh]);
  const content = zh
    ? `你好 AFFT，我想查询 ${name}。\n日期：${date || "还没确定"}\n人数：${guests || "请建议"}\n出发或接送地点：${pickup || "请建议"}\n请确认营地、总价、交通方式、取还时间、搭建安排及付款／改期条件。`
    : `Hi AFFT, please check ${name}.\nDate: ${date || "Not decided yet"}\nGuests: ${guests || "Please advise"}\nStarting point / pickup: ${pickup || "Please advise"}\nPlease confirm campsite, total price, transport, pickup/return times, setup arrangements and payment/change terms.`;
  const message = `${content}\n\n${ref}`;
  const control =
    "w-full rounded-xl border border-white/20 bg-[#10140F] px-4 py-3 text-white outline-none focus:border-[#F3922B] placeholder:text-white/45";
  return (
    <section
      id="check-dates"
      className="scroll-mt-6 rounded-[2rem] border border-[#F3922B]/35 bg-[#182015] p-6 md:p-10"
      onFocusCapture={() => {
        if (!started.current) {
          started.current = true;
          trackEvent("start_enquiry", { offer_slug: slug });
        }
      }}
    >
      <p className="text-sm font-bold uppercase tracking-widest text-[#F3922B]">
        {zh ? "查询日期" : "Check your dates"}
      </p>
      <h2 className="mt-3 text-3xl font-bold">
        {zh
          ? "告诉我们日期与人数，我们帮你确认总价。"
          : "Send your dates. Get a clear total quote."}
      </h2>
      <p className="mt-4 leading-7 text-white/75">
        {zh
          ? "日期还没确定也可以问。这里只准备 WhatsApp 讯息，按下后由你决定是否发送。"
          : "You can ask before choosing a date. This prepares a WhatsApp message for you to send."}
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <label>
          <span className="mb-2 block font-semibold">
            {zh ? "日期（可选）" : "Date (optional)"}
          </span>
          <input
            className={control}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder={zh ? "例如：10 月 24–25 日" : "Example: 24–25 Oct"}
            maxLength={80}
          />
        </label>
        <label>
          <span className="mb-2 block font-semibold">
            {zh ? "人数" : "Guests"}
          </span>
          <input
            className={control}
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            placeholder={zh ? "2 位成人" : "2 adults"}
            maxLength={80}
          />
        </label>
        <label>
          <span className="mb-2 block font-semibold">
            {zh
              ? "出发／接送地点（可选）"
              : "Starting point / pickup (optional)"}
          </span>
          <input
            className={control}
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            placeholder={zh ? "例如：亚庇酒店" : "Example: KK hotel"}
            maxLength={160}
          />
        </label>
      </div>
      <details className="mt-5 rounded-xl border border-white/10 p-4">
        <summary className="cursor-pointer font-semibold text-white/80">
          {zh ? "预览 WhatsApp 讯息" : "Preview WhatsApp message"}
        </summary>
        <pre className="mt-3 whitespace-pre-wrap break-words font-sans text-sm leading-6 text-white/70">
          {content}
        </pre>
      </details>
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          data-offer-slug={slug}
          href={makeWhatsappLink(message)}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-[#F3922B] px-6 py-4 text-center font-bold text-black"
        >
          {zh
            ? "通过 WhatsApp 查询日期与总价"
            : "Check dates & total on WhatsApp"}
        </a>
        <button
          className="rounded-full border border-white/25 px-6 py-4 font-semibold"
          type="button"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(message);
              trackEvent("copy_message", { offer_slug: slug });
              setCopied(true);
            } catch {
              setCopied(false);
            }
          }}
        >
          {copied
            ? zh
              ? "已复制"
              : "Copied"
            : zh
              ? "复制讯息"
              : "Copy message"}
        </button>
      </div>
    </section>
  );
}
