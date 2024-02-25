import { useLocation, useMatches } from "@remix-run/react";
import * as Sentry from "@sentry/remix";
import { browserTracingIntegration, replayIntegration } from "@sentry/remix";
import { useEffect } from "react";

export function init() {
  Sentry.init({
    dsn: ENV.SENTRY_DSN,
    integrations: [
      browserTracingIntegration({
        useEffect,
        useLocation,
        useMatches,
      }),
      replayIntegration(),
    ],

    tracesSampleRate: ENV.MODE === "production" ? 0.2 : 1.0,

    // Capture Replay for 10% of all sessions,
    // plus for 100% of sessions with an error
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
}
