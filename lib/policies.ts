export type PolicyKey = "privacy" | "terms" | "cancellation" | "rental-policy" | "payment-confirmation";

export const policyContent = {
  en: {
    privacy: { title: "Privacy Notice", intro: "AFFT keeps the public website simple and does not ask visitors to create an account.", sections: [
      ["Information we use", "When you contact AFFT through WhatsApp, email or another platform, that platform delivers the information you choose to send. Website measurement, when enabled, records non-personal events such as page, language and campaign source. Do not include identity, phone numbers or free-form personal notes in analytics events."],
      ["Why we use it", "We use enquiry information to answer your request, prepare options, confirm a service and provide support. We do not sell personal information."],
      ["Retention and contact", "Operational records are kept only as long as reasonably needed for the enquiry, service, legal or accounting requirements. Contact afft.sabah.info@gmail.com to request access or deletion where applicable."],
    ]},
    terms: { title: "Website & Service Terms", intro: "Website information helps visitors start an enquiry. A service is not confirmed until AFFT issues written confirmation.", sections: [
      ["Quotes and availability", "Prices shown as 'from' or 'custom' are starting guidance. Final price, availability, campsite, route, equipment and inclusions are confirmed in writing before payment."],
      ["Guest responsibility", "Guests must provide accurate dates, group size and relevant safety information, follow campsite and equipment instructions, and comply with local rules."],
      ["Changes", "Outdoor plans may change because of weather, safety, road, operator or site conditions. AFFT will explain practical alternatives when this happens."],
    ]},
    cancellation: { title: "Cancellation, Weather & Changes", intro: "Sabah outdoor plans depend on weather, site access and safety conditions.", sections: [
      ["Customer changes", "Tell AFFT as early as possible. The applicable change, cancellation or no-show terms will be stated in the written quote or confirmation because suppliers and campsites may have different rules."],
      ["Weather and safety", "Rain alone does not automatically cancel an experience. AFFT may adjust timing, route, campsite or activity when conditions create a safety or access concern."],
      ["AFFT or supplier changes", "If a confirmed service cannot proceed, AFFT will offer a reasonable reschedule, alternative or the refund treatment stated in the confirmation, depending on costs already committed."],
    ]},
    "rental-policy": { title: "Rental Deposit & Damage", intro: "Rental availability, condition notes and deposit requirements are confirmed before collection or delivery.", sections: [
      ["Collection and return", "The renter must check the item at handover and return it on time, reasonably clean and with all supplied parts."],
      ["Deposit", "Any security deposit and accepted payment method will be stated in the quote. Deposit release follows the return inspection and may take normal payment-processing time."],
      ["Loss or damage", "The renter may be responsible for repair, specialist cleaning, missing parts or replacement caused by misuse, loss or damage beyond normal wear. AFFT will provide the assessment and supporting details."],
    ]},
    "payment-confirmation": { title: "Payment & Confirmation", intro: "A WhatsApp conversation or website message is an enquiry, not a confirmed booking.", sections: [
      ["Confirmation", "AFFT will provide a written summary covering date, service, price, inclusions, exclusions, payment schedule and applicable change terms."],
      ["Payment", "Use only the payment instructions supplied through AFFT's verified contact. Ask AFFT before paying if account details or instructions appear different."],
      ["Proof", "Keep the written confirmation and payment receipt. AFFT will acknowledge receipt and confirm the next practical step."],
    ]},
  },
  zh: {
    privacy: { title: "隐私说明", intro: "AFFT 公开网站不要求访客注册账号。", sections: [["我们使用的资料", "当您通过 WhatsApp、Email 或其他平台联系 AFFT，平台会转交您主动提供的资料。网站统计启用时，只记录页面、语言及活动来源等非个人事件。"], ["使用目的", "资料只用于回复询问、准备方案、确认服务及提供支持；AFFT 不出售个人资料。"], ["保存与联系", "资料只在询问、服务、法律或会计合理需要的期限内保存。如需查询或删除适用资料，请联系 afft.sabah.info@gmail.com。"]]},
    terms: { title: "网站与服务条款", intro: "网站内容用于开始询问；AFFT 发出书面确认前，服务尚未成立。", sections: [["报价与供应", "“起”或“定制”价格仅供初步参考。最终价格、日期、营地、路线、装备及包含项目以书面确认为准。"], ["顾客责任", "顾客须提供准确日期、人数及相关安全资料，并遵守营地、装备及当地规则。"], ["变更", "户外安排可能因天气、安全、道路、营地或供应商情况调整；AFFT 会说明可行替代方案。"]]},
    cancellation: { title: "取消、天气与改期", intro: "沙巴户外行程会受天气、场地与安全情况影响。", sections: [["顾客更改", "请尽早通知 AFFT。具体改期、取消或未出现条款会写在报价或确认内，因为不同营地和供应商规则不同。"], ["天气与安全", "下雨不代表自动取消；如有安全或通行风险，AFFT 可调整时间、路线、营地或活动。"], ["AFFT 或供应商变更", "若确认服务无法进行，AFFT 会按已发生费用及确认条款提供合理改期、替代或退款处理。"]]},
    "rental-policy": { title: "租借押金与损坏", intro: "取件或送达前会确认库存、物品状态与押金要求。", sections: [["领取与归还", "租借人应在交接时检查物品，并按时、合理清洁及完整归还所有配件。"], ["押金", "押金金额和付款方式会写在报价内；归还检查完成后处理退还，并受正常付款处理时间影响。"], ["遗失或损坏", "因不当使用、遗失或超出正常损耗的损坏，租借人可能需承担维修、清洁、缺件或更换费用；AFFT 会提供评估说明。"]]},
    "payment-confirmation": { title: "付款与确认", intro: "WhatsApp 对话或网站讯息只是询问，并不等于确认预订。", sections: [["确认", "AFFT 会提供包含日期、服务、价格、包含/不含项目、付款安排及变更条款的书面摘要。"], ["付款", "只使用 AFFT 已验证联系渠道提供的付款指示；如账户或指示有异，请先向 AFFT 核实。"], ["凭证", "请保存书面确认及付款收据；AFFT 会确认收款和下一步安排。"]]},
  },
} as const;

