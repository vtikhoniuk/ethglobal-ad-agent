export {};

declare global {
  interface Window {
    Telegram: {
      WebApp: any;
    };
  }
}