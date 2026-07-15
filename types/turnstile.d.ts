type AliceTurnstileOptions = {
  sitekey: string;
  action: string;
  theme: "auto";
  size: "flexible";
  callback: (token: string) => void;
  "error-callback": () => void;
  "expired-callback": () => void;
};

type AliceTurnstileApi = {
  render(
    container: HTMLElement,
    options: AliceTurnstileOptions,
  ): string;
  reset(widgetId?: string): void;
  remove(widgetId: string): void;
};

declare global {
  interface Window {
    turnstile?: AliceTurnstileApi;
  }
}

export {};
