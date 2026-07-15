import { makeWhatsappLink } from "@/lib/rent-it-data";

export function sanitizeAliceWhatsappTopic(value: string) {
  const topic = value
    .replace(/[\u0000-\u001f\u007f]/gu, " ")
    .replace(/[<>{}\[\]]/gu, " ")
    .replace(/https?:\/\/\S+/giu, " ")
    .replace(/\s+/gu, " ")
    .trim()
    .slice(0, 250);

  return topic || "AFFT outdoor enquiry";
}

export function makeAliceWhatsappLink(topic: string) {
  const safeTopic = sanitizeAliceWhatsappTopic(topic);
  return makeWhatsappLink(
    `Hi AFFT, I was chatting with Alice Li about: ${safeTopic}. Please help me confirm the details.`,
  );
}
