export type ConsentStatus = "accepted" | "rejected";

const CONSENT_KEY = "cookie-consent";
export const CONSENT_CHANGE_EVENT = "cookie-consent-changed";
export const CONSENT_REQUEST_EVENT = "cookie-consent-request-open";

export function getStoredConsent(): ConsentStatus | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(CONSENT_KEY);
  if (value === "accepted" || value === "rejected") {
    return value;
  }
  return null;
}

export function setStoredConsent(status: ConsentStatus): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CONSENT_KEY, status);
  window.dispatchEvent(
    new CustomEvent<ConsentStatus>(CONSENT_CHANGE_EVENT, { detail: status })
  );
}

export function requestOpenConsentBanner(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(CONSENT_REQUEST_EVENT));
}