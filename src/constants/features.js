export const V1 = {
  env: 'env',
  visitor: 'visitor',
  updateContext: 'update-context',
  flagValue: 'flag-value',
  flagActivate: 'flag-activate',
  flagInfo: 'flag-info',
  hits: 'hits',
  logs: 'logs'
}

export const V2 = {
  ...V1,
  bucketing: 'bucketing',
  pollingInterval: 'polling-interval',
  pollingIntervalUnit: 'polling-interval-unit',
  experienceContinuity: 'experience-continuity'
}

export const V3 = {
  ...V2,
  consent: 'visitor-consent',
  flagActivate: null,
  flagInfo: null,
  flagActivate3: 'flag-activate',
  flagInfo3: 'flag-info'
}

export const All = {
  ...V1,
  ...V2,
  consent: 'visitor-consent'
}
