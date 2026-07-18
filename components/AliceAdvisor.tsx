"use client";

import {
  ExternalLink,
  LoaderCircle,
  MessageCircle,
  Minus,
  Send,
  ShieldCheck,
  Trash2,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";
import {
  canStartAliceRequest,
  createAliceRequestGuard,
  updateAliceQuestion,
  validateAliceQuestion,
} from "@/lib/alice-advisor-state";
import {
  FormEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { makeAliceWhatsappLink } from "@/lib/alice-public";
import {
  buildAliceHistory,
  type AliceHistoryDisplayMessage,
} from "@/lib/alice-history";
import { whatsapp } from "@/lib/rent-it-data";

type AliceConfig = {
  enabled: boolean;
  siteKey: string;
  name: string;
  role: string;
};

type AliceAnswer = {
  answer: string;
  needsHumanConfirmation: boolean;
  sources: Array<{ title: string; publicHref: string }>;
  suggestedQuestions: string[];
  handoff: { recommended: boolean; topic: string };
};

type DisplayMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  status: AliceHistoryDisplayMessage["status"];
  response?: AliceAnswer;
};

const englishQuestions = [
  "Which camping package suits a couple?",
  "Do all campsites have toilets?",
  "What can I rent for a projector night?",
  "Can AFFT arrange transport to Kundasang?",
  "Which area suits a family camp?",
  "How do I request a quotation?",
];

const chineseQuestions = [
  "\u54ea\u4e2a\u9732\u8425\u914d\u5957\u9002\u5408\u60c5\u4fa3\uff1f",
  "\u6240\u6709\u8425\u5730\u90fd\u6709\u5395\u6240\u5417\uff1f",
  "\u6295\u5f71\u4e4b\u591c\u53ef\u4ee5\u79df\u4ec0\u4e48\uff1f",
  "AFFT \u53ef\u4ee5\u5b89\u6392\u53bb\u6606\u8fbe\u5c71\u7684\u4ea4\u901a\u5417\uff1f",
  "\u54ea\u4e2a\u5730\u533a\u9002\u5408\u5bb6\u5ead\u9732\u8425\uff1f",
  "\u5982\u4f55\u7533\u8bf7\u62a5\u4ef7\uff1f",
];

let turnstileLoader: Promise<NonNullable<Window["turnstile"]>> | null = null;

function loadTurnstile() {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (turnstileLoader) return turnstileLoader;

  turnstileLoader = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-afft-turnstile="true"]',
    );
    const script = existing ?? document.createElement("script");

    const handleLoad = () => {
      if (window.turnstile) resolve(window.turnstile);
      else reject(new Error("Turnstile did not initialize."));
    };
    const handleError = () => reject(new Error("Turnstile failed to load."));

    script.addEventListener("load", handleLoad, { once: true });
    script.addEventListener("error", handleError, { once: true });

    if (!existing) {
      script.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.dataset.afftTurnstile = "true";
      document.head.appendChild(script);
    }
  });

  return turnstileLoader;
}

function isAliceAnswer(value: unknown): value is AliceAnswer {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const answer = value as Partial<AliceAnswer>;
  return (
    typeof answer.answer === "string" &&
    typeof answer.needsHumanConfirmation === "boolean" &&
    Array.isArray(answer.sources) &&
    Array.isArray(answer.suggestedQuestions) &&
    !!answer.handoff &&
    typeof answer.handoff.topic === "string"
  );
}

export function AliceAdvisor() {
  const pathname = usePathname();
  const chinese = pathname.startsWith("/zh");
  const [config, setConfig] = useState<AliceConfig | null>(null);
  const [open, setOpen] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);
  const [sessionLoading, setSessionLoading] = useState(false);
  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const [question, setQuestion] = useState("");
  const [questionCount, setQuestionCount] = useState(0);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetRef = useRef<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const requestGuardRef = useRef(createAliceRequestGuard());
  const abortControllerRef = useRef<AbortController | null>(null);
  const sendingRef = useRef(false);

  const quickQuestions = chinese ? chineseQuestions : englishQuestions;
  const welcome = chinese
    ? "\u4f60\u597d\uff0c\u6211\u662f Alice Li\uff0cAFFT AI \u6237\u5916\u987e\u95ee\u3002\u6211\u4f7f\u7528 AFFT \u5df2\u6279\u51c6\u7684\u8d44\u6599\uff0c\u534f\u52a9\u4f60\u6bd4\u8f83\u9732\u8425\u3001\u79df\u8d41\u3001\u65c5\u6e38\u548c\u4ea4\u901a\u9009\u9879\u3002\u6700\u7ec8\u4ef7\u683c\u3001\u53ef\u7528\u6027\u548c\u9884\u8ba2\u5fc5\u987b\u7531 AFFT \u56e2\u961f\u786e\u8ba4\u3002"
    : "Hi, I'm Alice Li, AFFT's AI Outdoor Advisor. I use AFFT's approved information to help you compare camping, rental, tour and transport options. Final prices, availability and bookings must be confirmed by the AFFT team.";

  useEffect(() => {
    let active = true;
    fetch("/api/alice/config", {
      cache: "no-store",
      credentials: "same-origin",
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("Config unavailable.");
        return (await response.json()) as AliceConfig;
      })
      .then((value) => {
        if (active && value.enabled && value.siteKey) setConfig(value);
      })
      .catch(() => {
        if (active) setConfig(null);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    closeButtonRef.current?.focus();
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });
  }, [messages, sending]);

  useEffect(() => {
    const requestGuard = requestGuardRef.current;
    return () => {
      requestGuard.invalidate();
      abortControllerRef.current?.abort();
    };
  }, []);

  useEffect(() => {
    if (
      !open ||
      sessionReady ||
      !config?.siteKey ||
      !turnstileContainerRef.current
    ) {
      return;
    }

    let active = true;
    setSessionLoading(true);
    setError("");

    loadTurnstile()
      .then((turnstile) => {
        if (!active || !turnstileContainerRef.current) return;
        turnstileWidgetRef.current = turnstile.render(
          turnstileContainerRef.current,
          {
            sitekey: config.siteKey,
            action: "alice_chat",
            theme: "auto",
            size: "flexible",
            callback: async (token) => {
              if (!active) return;
              setSessionLoading(true);
              setError("");
              try {
                const response = await fetch("/api/alice/session", {
                  method: "POST",
                  credentials: "same-origin",
                  cache: "no-store",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ turnstileToken: token }),
                });
                if (!response.ok) {
                  throw new Error("Verification failed.");
                }
                setSessionReady(true);
              } catch {
                setError(
                  chinese
                    ? "\u9a8c\u8bc1\u5931\u8d25\uff0c\u8bf7\u518d\u8bd5\u4e00\u6b21\u3002"
                    : "Verification failed. Please try again.",
                );
                turnstile.reset(turnstileWidgetRef.current ?? undefined);
              } finally {
                setSessionLoading(false);
              }
            },
            "error-callback": () => {
              setSessionLoading(false);
              setError(
                chinese
                  ? "\u5b89\u5168\u9a8c\u8bc1\u6682\u65f6\u65e0\u6cd5\u4f7f\u7528\u3002"
                  : "Security verification is temporarily unavailable.",
              );
            },
            "expired-callback": () => {
              setSessionReady(false);
              setSessionLoading(false);
            },
          },
        );
        setSessionLoading(false);
      })
      .catch(() => {
        if (!active) return;
        setSessionLoading(false);
        setError(
          chinese
            ? "\u5b89\u5168\u9a8c\u8bc1\u6682\u65f6\u65e0\u6cd5\u4f7f\u7528\u3002"
            : "Security verification is temporarily unavailable.",
        );
      });

    return () => {
      active = false;
      if (turnstileWidgetRef.current && window.turnstile) {
        window.turnstile.remove(turnstileWidgetRef.current);
      }
      turnstileWidgetRef.current = null;
    };
  }, [chinese, config?.siteKey, open, sessionReady]);

  if (!config) return null;

  function closePanel() {
    requestGuardRef.current.invalidate();
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    sendingRef.current = false;
    setSending(false);
    setOpen(false);
    setError("");
  }

  function handlePanelKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      closePanel();
      return;
    }
    if (event.key !== "Tab" || !panelRef.current) return;

    const focusable = Array.from(
      panelRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    );
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function resetSession() {
    setSessionReady(false);
    setError(
      chinese
        ? "\u9a8c\u8bc1\u5df2\u8fc7\u671f\uff0c\u8bf7\u91cd\u65b0\u9a8c\u8bc1\u3002"
        : "Your verification expired. Please verify again.",
    );
  }

  function clearConversation() {
    requestGuardRef.current.invalidate();
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    sendingRef.current = false;
    setMessages([]);
    setQuestion("");
    setQuestionCount(0);
    setSending(false);
    setError("");
  }

  async function sendQuestion(rawQuestion: string) {
    const cleanQuestion = rawQuestion.trim();
    if (!canStartAliceRequest(sendingRef.current, sessionReady)) {
      return;
    }
    const validationError = validateAliceQuestion(cleanQuestion, chinese);
    if (validationError) {
      setError(validationError);
      return;
    }
    if (questionCount >= 30) {
      setError(
        chinese
          ? "\u6b64\u9875\u9762\u5df2\u8fbe\u5230 30 \u4e2a\u95ee\u9898\u7684\u4e0a\u9650\u3002\u8bf7\u5237\u65b0\u9875\u9762\u6216\u8054\u7cfb AFFT\u3002"
          : "This page has reached the 30-question limit. Please refresh or contact AFFT.",
      );
      return;
    }

    const requestSequence = requestGuardRef.current.start();
    const controller = new AbortController();
    abortControllerRef.current = controller;
    sendingRef.current = true;

    const history = buildAliceHistory(messages);
    const userMessageId = crypto.randomUUID();
    const userMessage: DisplayMessage = {
      id: userMessageId,
      role: "user",
      content: cleanQuestion,
      status: "pending",
    };

    setMessages((current) => [...current, userMessage]);
    setQuestion("");
    setError("");
    setSending(true);
    setQuestionCount((count) => count + 1);

    try {
      const response = await fetch("/api/alice/answer", {
        method: "POST",
        credentials: "same-origin",
        cache: "no-store",
        signal: controller.signal,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: cleanQuestion, history }),
      });
      const payload = (await response.json().catch(() => null)) as unknown;

      if (!requestGuardRef.current.isCurrent(requestSequence)) return;

      if (response.status === 401) {
        setMessages((current) =>
          current.map((message) =>
            message.id === userMessageId
              ? { ...message, status: "failed" }
              : message,
          ),
        );
        resetSession();
        return;
      }
      if (!response.ok || !isAliceAnswer(payload)) {
        const message =
          payload &&
          typeof payload === "object" &&
          "error" in payload &&
          typeof payload.error === "string"
            ? payload.error
            : chinese
              ? "Alice \u6682\u65f6\u65e0\u6cd5\u56de\u7b54\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\u3002"
              : "Alice is temporarily unavailable. Please try again.";
        setMessages((current) =>
          current.map((message) =>
            message.id === userMessageId
              ? { ...message, status: "failed" }
              : message,
          ),
        );
        setError(message);
        return;
      }

      setError("");
      setMessages((current) => [
        ...current.map((message) =>
          message.id === userMessageId
            ? { ...message, status: "complete" as const }
            : message,
        ),
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: payload.answer,
          status: "complete",
          response: payload,
        },
      ]);
    } catch (requestError) {
      if (
        !requestGuardRef.current.isCurrent(requestSequence) ||
        (requestError instanceof Error && requestError.name === "AbortError")
      ) {
        return;
      }
      setMessages((current) =>
        current.map((message) =>
          message.id === userMessageId
            ? { ...message, status: "failed" }
            : message,
        ),
      );
      setError(
        chinese
          ? "Alice \u6682\u65f6\u79bb\u7ebf\u3002\u4f60\u53ef\u4ee5\u901a\u8fc7 WhatsApp \u8054\u7cfb AFFT\u3002"
          : "Alice is temporarily offline. You can contact AFFT on WhatsApp.",
      );
    } finally {
      if (requestGuardRef.current.isCurrent(requestSequence)) {
        sendingRef.current = false;
        setSending(false);
        if (abortControllerRef.current === controller) {
          abortControllerRef.current = null;
        }
      }
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendQuestion(question);
  }

  return (
    <>
      <button
        aria-label={chinese ? "\u6253\u5f00 Alice Li AI \u987e\u95ee" : "Open Alice Li AI advisor"}
        className="fixed bottom-28 right-5 z-[70] flex items-center gap-3 rounded-full border border-white/20 bg-[#1f3627] px-4 py-3 text-sm font-black text-white shadow-[0_16px_45px_rgba(16,30,21,0.32)] transition hover:-translate-y-1 hover:bg-[#294a34] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f28c28] motion-reduce:transition-none sm:right-6"
        onClick={() => setOpen(true)}
        type="button"
      >
        <span
          aria-hidden="true"
          className="grid h-9 w-9 place-items-center rounded-full bg-[#f28c28] text-xs font-black text-[#1f1b16]"
        >
          AL
        </span>
        <span className="text-left leading-tight">
          <span className="block">Ask Alice</span>
          <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-[#f8d7ad]">
            {config.role}
          </span>
        </span>
        <MessageCircle aria-hidden="true" className="h-5 w-5" />
      </button>

      {open ? (
        <div className="fixed inset-0 z-[80] bg-black/45 sm:pointer-events-none sm:bg-transparent">
          <button
            aria-label={chinese ? "\u5173\u95ed Alice Li" : "Close Alice Li"}
            className="absolute inset-0 sm:hidden"
            onClick={closePanel}
            type="button"
          />
          <div
            aria-label="Alice Li, AFFT AI Outdoor Advisor"
            aria-modal="true"
            className="pointer-events-auto absolute inset-x-0 bottom-0 flex max-h-[92dvh] flex-col overflow-hidden rounded-t-[28px] border border-[#dbc9ad] bg-[#fffaf1] shadow-[0_-18px_60px_rgba(20,29,22,0.28)] sm:bottom-28 sm:left-auto sm:right-6 sm:w-[400px] sm:max-w-[calc(100vw-3rem)] sm:rounded-[28px] sm:shadow-[0_24px_80px_rgba(20,29,22,0.3)]"
            onKeyDown={handlePanelKeyDown}
            ref={panelRef}
            role="dialog"
          >
            <header className="flex items-center gap-3 bg-[#1f3627] px-4 py-4 text-white">
              <span
                aria-hidden="true"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#f28c28] text-sm font-black text-[#1f1b16]"
              >
                AL
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="font-serif text-xl font-bold">{config.name}</h2>
                <p className="truncate text-xs font-bold text-[#f8d7ad]">
                  {config.role}
                </p>
              </div>
              <button
                aria-label={chinese ? "\u6700\u5c0f\u5316" : "Minimize"}
                className="rounded-full p-2 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f28c28]"
                onClick={closePanel}
                type="button"
              >
                <Minus aria-hidden="true" className="h-5 w-5" />
              </button>
              <button
                aria-label={chinese ? "\u5173\u95ed" : "Close"}
                className="rounded-full p-2 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f28c28]"
                onClick={closePanel}
                ref={closeButtonRef}
                type="button"
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
            </header>

            <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
              <section className="rounded-2xl border border-[#eadcc8] bg-white p-4 text-sm leading-6 text-[#3e3328]">
                <div className="mb-2 flex items-center gap-2 font-black text-[#1f3627]">
                  <ShieldCheck aria-hidden="true" className="h-5 w-5 text-[#d66f1f]" />
                  {chinese ? "AI \u987e\u95ee\u8bf4\u660e" : "AI advisor disclosure"}
                </div>
                <p>{welcome}</p>
                <p className="mt-3 text-xs text-[#6d5b48]">
                  {chinese
                    ? "\u8bf7\u52ff\u8f93\u5165\u5bc6\u7801\u3001\u94f6\u884c\u8d44\u6599\u3001\u62a4\u7167\u53f7\u7801\u3001\u8eab\u4efd\u8bc1\u53f7\u7801\u3001\u533b\u7597\u8d44\u6599\u6216\u5176\u4ed6\u654f\u611f\u4e2a\u4eba\u8d44\u6599\u3002\u804a\u5929\u4e0d\u4f1a\u4fdd\u5b58\u3002\u672a\u89e3\u51b3\u7684\u4e1a\u52a1\u4e3b\u9898\u53ef\u80fd\u4f1a\u533f\u540d\u8ba1\u6570\uff0c\u4ee5\u6539\u5584 AFFT \u7684\u77e5\u8bc6\u5e93\u3002"
                    : "Please do not enter passwords, bank details, passport numbers, identity-card numbers, medical information or other sensitive personal data. Chats are not saved. Unresolved business topics may be counted anonymously to improve AFFT's knowledge."}
                </p>
              </section>

              {!sessionReady ? (
                <section className="rounded-2xl border border-[#e7c89e] bg-[#fff3df] p-4">
                  <p className="text-sm font-black text-[#342419]">
                    {chinese
                      ? "\u5b8c\u6210\u5b89\u5168\u9a8c\u8bc1\u540e\u5373\u53ef\u5411 Alice \u63d0\u95ee\u3002"
                      : "Complete the security check to ask Alice."}
                  </p>
                  <div className="mt-3 min-h-16" ref={turnstileContainerRef} />
                  {sessionLoading ? (
                    <p className="mt-2 flex items-center gap-2 text-xs text-[#6d5b48]">
                      <LoaderCircle className="h-4 w-4 animate-spin motion-reduce:animate-none" />
                      {chinese ? "\u9a8c\u8bc1\u4e2d..." : "Checking..."}
                    </p>
                  ) : null}
                </section>
              ) : (
                <>
                  <section aria-label={chinese ? "\u5feb\u901f\u63d0\u95ee" : "Quick questions"}>
                    <p className="mb-2 text-xs font-black uppercase tracking-[0.16em] text-[#8a592a]">
                      {chinese ? "\u5feb\u901f\u63d0\u95ee" : "Quick questions"}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {quickQuestions.map((item) => (
                        <button
                          className="rounded-full border border-[#d8c5a9] bg-white px-3 py-2 text-left text-xs font-bold text-[#463425] transition hover:border-[#f28c28] hover:bg-[#fff3df] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f28c28] motion-reduce:transition-none"
                          disabled={sending || !sessionReady}
                          key={item}
                          onClick={() => void sendQuestion(item)}
                          type="button"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </section>

                  <section
                    aria-live="polite"
                    className="space-y-3"
                    role="log"
                  >
                    {messages.map((message) => (
                      <article
                        className={
                          message.role === "user"
                            ? "ml-8 rounded-2xl rounded-br-md bg-[#1f3627] px-4 py-3 text-sm text-white"
                            : "mr-5 rounded-2xl rounded-bl-md border border-[#eadcc8] bg-white px-4 py-3 text-sm text-[#33271d]"
                        }
                        key={message.id}
                      >
                        <p className="whitespace-pre-wrap leading-6">
                          {message.content}
                        </p>
                        {message.response?.sources.length ? (
                          <div className="mt-3 border-t border-[#eadcc8] pt-3">
                            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#8a592a]">
                              Official AFFT sources
                            </p>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {message.response.sources.map((source) => (
                                <a
                                  className="inline-flex items-center gap-1 rounded-full bg-[#eef4ec] px-3 py-1.5 text-xs font-bold text-[#275335] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f28c28]"
                                  href={source.publicHref}
                                  key={`${source.publicHref}:${source.title}`}
                                >
                                  {source.title}
                                  <ExternalLink aria-hidden="true" className="h-3 w-3" />
                                </a>
                              ))}
                            </div>
                          </div>
                        ) : null}
                        {message.response &&
                        (message.response.needsHumanConfirmation ||
                          message.response.handoff.recommended) ? (
                          <a
                            className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#f28c28] px-4 py-2 text-xs font-black text-[#1f1b16] hover:bg-[#e77d19] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f3627]"
                            href={makeAliceWhatsappLink(
                              message.response.handoff.topic,
                            )}
                            rel="noreferrer"
                            target="_blank"
                          >
                            Confirm with AFFT on WhatsApp
                            <ExternalLink aria-hidden="true" className="h-3 w-3" />
                          </a>
                        ) : null}
                      </article>
                    ))}
                    {sending ? (
                      <div className="mr-16 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm text-[#6d5b48]">
                        <LoaderCircle className="h-4 w-4 animate-spin motion-reduce:animate-none" />
                        {chinese ? "Alice \u6b63\u5728\u67e5\u9605 AFFT \u5df2\u6279\u51c6\u7684\u8d44\u6599..." : "Alice is checking AFFT's approved information..."}
                      </div>
                    ) : null}
                    <div ref={messagesEndRef} />
                  </section>
                </>
              )}

              {error ? (
                <div
                  className="rounded-xl border border-[#d98f78] bg-[#fff0ea] px-3 py-2 text-sm font-bold text-[#7c2e1c]"
                  role="alert"
                >
                  {error}
                  <a
                    className="ml-1 underline"
                    href={whatsapp}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {chinese ? "\u8054\u7cfb AFFT" : "Contact AFFT"}
                  </a>
                </div>
              ) : null}
            </div>

            <footer className="border-t border-[#e5d6c1] bg-white px-4 py-3">
              {sessionReady ? (
                <form className="flex items-end gap-2" onSubmit={handleSubmit}>
                  <label className="sr-only" htmlFor="alice-question">
                    {chinese ? "\u8be2\u95ee Alice Li" : "Ask Alice Li"}
                  </label>
                  <textarea
                    className="min-h-11 max-h-28 flex-1 resize-y rounded-2xl border border-[#cdbb9f] bg-[#fffaf1] px-3 py-2 text-sm text-[#2e241b] outline-none focus:border-[#f28c28] focus:ring-2 focus:ring-[#f28c28]/25"
                    disabled={sending}
                    id="alice-question"
                    maxLength={800}
                    onChange={(event) => {
                      const next = updateAliceQuestion(error, event.target.value);
                      setQuestion(next.value);
                      setError(next.error);
                    }}
                    placeholder={chinese ? "\u8be2\u95ee AFFT \u9732\u8425\u3001\u79df\u8d41\u3001\u65c5\u6e38\u6216\u4ea4\u901a..." : "Ask about AFFT camping, rentals, tours or transport..."}
                    rows={1}
                    value={question}
                  />
                  <button
                    aria-label={chinese ? "\u53d1\u9001\u95ee\u9898" : "Send question"}
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#1f3627] text-white hover:bg-[#294a34] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f28c28] disabled:cursor-not-allowed disabled:opacity-45"
                    disabled={
                      sending ||
                      question.trim().length < 2 ||
                      questionCount >= 30
                    }
                    type="submit"
                  >
                    <Send aria-hidden="true" className="h-4 w-4" />
                  </button>
                </form>
              ) : null}
              <div className="mt-2 flex items-center justify-between gap-3 text-[11px] font-bold text-[#7b6854]">
                <button
                  className="inline-flex items-center gap-1 hover:text-[#1f3627] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f28c28]"
                  onClick={() => {
                    clearConversation();
                  }}
                  type="button"
                >
                  <Trash2 aria-hidden="true" className="h-3 w-3" />
                  {chinese ? "\u6e05\u9664\u5bf9\u8bdd" : "Clear conversation"}
                </button>
                <a
                  className="hover:text-[#1f3627] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f28c28]"
                  href={whatsapp}
                  rel="noreferrer"
                  target="_blank"
                >
                  {chinese ? "\u8054\u7cfb AFFT \u56e2\u961f" : "Talk to the AFFT team"}
                </a>
              </div>
            </footer>
          </div>
        </div>
      ) : null}
    </>
  );
}
