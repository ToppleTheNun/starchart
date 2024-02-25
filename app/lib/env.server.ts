import process from "node:process";

import { z } from "zod";

import { generated } from "~/generated/env";
import { error } from "~/lib/log.server";

const EnvSchema = z.object({
  // Client
  BUILD_TIME: z.string(),
  BUILD_TIMESTAMP: z.string(),
  COMMIT_SHA: z.string(),
  SENTRY_DSN: z.string().optional(),

  // Server
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    // @ts-expect-error This is used to allow process.env to have our types
    type ProcessEnv = z.infer<typeof EnvSchema>;
  }
}

export function init() {
  const parsed = EnvSchema.safeParse({ ...process.env, ...generated });

  if (!parsed.success) {
    error("❌ Invalid environment variables:", parsed.error.flatten());

    throw new Error("Invalid environment variables");
  }
}

/**
 * This is used in both `entry.server.js` and `root.tsx` to ensure that
 * the environment variables are set and globally available before the app is
 * started.
 *
 * NOTE: Do *not* add any environment variables in here that you do not wish to
 * be included in the client.
 * @returns all public ENV variables
 */
export function getEnv() {
  return {
    MODE: process.env.NODE_ENV,
    BUILD_TIME: generated.BUILD_TIME,
    BUILD_TIMESTAMP: generated.BUILD_TIMESTAMP,
    COMMIT_SHA: generated.COMMIT_SHA,
    SENTRY_DSN: process.env.SENTRY_DSN,
  };
}

type ENV = ReturnType<typeof getEnv>;

declare global {
  // eslint-disable-next-line no-var
  var ENV: ENV;

  interface Window {
    ENV: ENV;
  }
}
