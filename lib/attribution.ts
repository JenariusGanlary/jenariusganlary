export type Attribution = {
  sourcePage: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
};

export function readAttribution(): Attribution {
  if (typeof window === "undefined") {
    return { sourcePage: "" };
  }
  const params = new URLSearchParams(window.location.search);
  return {
    sourcePage: window.location.pathname,
    utmSource: params.get("utm_source") ?? undefined,
    utmMedium: params.get("utm_medium") ?? undefined,
    utmCampaign: params.get("utm_campaign") ?? undefined,
    utmContent: params.get("utm_content") ?? undefined,
  };
}