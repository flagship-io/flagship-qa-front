export const V1 = {
  env: "env",
  visitor: "visitor",
  updateContext: "update-context",
  flagValue: "flag-value",
  flagActivate: "flag-activate",
  flagInfo: "flag-info",
  hits: "hits",
  logs: "logs",
};

export const V2 = {
  bucketing: "bucketing",
  pollingInterval: "polling-interval",
  pollingIntervalUnit: "polling-interval-unit",
  experienceContinuity: "experience-continuity",
};

export const V3 = {
  consent: "visitor-consent",
};

export const All = {
  ...V1,
  ...V2,
  ...V3,
};
