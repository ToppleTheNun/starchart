import "~/globals.css";

import { parseWithZod } from "@conform-to/zod";
import { invariantResponse } from "@epic-web/invariant";
import type {
  ActionFunctionArgs,
  HeadersArgs,
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useFetchers,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { captureRemixErrorBoundaryError, withSentry } from "@sentry/remix";
import type { ReactNode } from "react";
import { z } from "zod";

import { AppErrorBoundary } from "~/components/AppErrorBoundary.tsx";
import { TailwindIndicator } from "~/components/TailwindIndicator.tsx";
import { href as iconsHref } from "~/components/ui/icon.tsx";
import { siteConfig } from "~/config/site.ts";
import { serverTiming } from "~/constants.ts";
import { ClientHintCheck, getHints, useHints } from "~/lib/client-hints.tsx";
import { getEnv } from "~/lib/env.server.ts";
import { useNonce } from "~/lib/nonce-provider.tsx";
import { useRequestInfo } from "~/lib/request-info.ts";
import type { Theme } from "~/lib/theme.server.ts";
import { getTheme, setTheme } from "~/lib/theme.server.ts";
import { makeTimings } from "~/lib/timings.server.ts";
import { isPresent } from "~/lib/type-guards.ts";
import { cn, combineHeaders, getDomainUrl } from "~/lib/utils.ts";

export const links: LinksFunction = () => {
  return [
    // Preload svg sprite as a resource to avoid render blocking
    { rel: "preload", href: iconsHref, as: "image" },

    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/apple-touch-icon.png?v=1",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon-32x32.png?v=1",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicon-16x16.png?v=1",
    },
    {
      rel: "icon",
      type: "image/x-icon",
      href: "/favicon.ico?v=1",
    },
    { rel: "manifest", href: "/site.webmanifest?v=1" },
    {
      rel: "mask-icon",
      href: "/safari-pinned-tab.svg?v=1",
      color: "#5bbad5",
    },
  ].filter(isPresent);
};

export const meta: MetaFunction = () => {
  return [
    { title: siteConfig.title },
    { property: "og:url", content: siteConfig.url },
    { property: "twitter:url", content: siteConfig.url },
    { property: "image:alt", content: siteConfig.title },
    { property: "og:type", content: "website" },
    { property: "og:title", content: siteConfig.title },
    { property: "og:site_name", content: siteConfig.title },
    { property: "og:locale", content: "en_US" },
    { property: "og:image", content: siteConfig.ogImage },
    { property: "og:image:alt", content: siteConfig.title },
    { property: "og:description", content: siteConfig.description },
    { property: "twitter:description", content: siteConfig.description },
    { property: "twitter:creator", content: "@ToppleTheNun" },
    { property: "twitter:title", content: siteConfig.title },
    { property: "twitter:image", content: siteConfig.ogImage },
    { property: "twitter:image:alt", content: siteConfig.title },
    { property: "twitter:card", content: "summary" },
    { property: "description", content: siteConfig.description },
    { property: "name", content: siteConfig.title },
    { property: "author", content: "Richard Harrah" },
    { property: "revisit-after", content: "7days" },
    { property: "distribution", content: "global" },
    { property: "msapplication-TileColor", content: "#da532c" },
    { property: "theme-color", content: "#ffffff" },
  ];
};

export function headers({ loaderHeaders }: HeadersArgs) {
  return {
    [serverTiming]: loaderHeaders.get(serverTiming) ?? "",
  };
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function loader({ request }: LoaderFunctionArgs) {
  const timings = makeTimings("root loader");

  return json(
    {
      requestInfo: {
        hints: getHints(request),
        origin: getDomainUrl(request),
        path: new URL(request.url).pathname,
        userPrefs: {
          theme: getTheme(request),
        },
      },
      ENV: getEnv(),
    },
    {
      // eslint-disable-next-line @typescript-eslint/no-base-to-string
      headers: combineHeaders({ [serverTiming]: timings.toString() }),
    },
  );
}

const ThemeFormSchema = z.object({
  theme: z.enum(["system", "light", "dark"]),
});

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: ThemeFormSchema,
  });

  invariantResponse(submission.status === "success", "Invalid theme received");

  const { theme } = submission.value;

  const responseInit = {
    headers: { "set-cookie": setTheme(theme) },
  };
  return json({ result: submission.reply() }, responseInit);
}

function Document({
  children,
  nonce,
  theme = "light",
  env = {},
}: {
  children: ReactNode;
  nonce: string;
  theme?: Theme;
  env?: Record<string, string>;
}) {
  return (
    <html className={cn(theme)} lang="en" dir="auto">
      <head>
        <ClientHintCheck nonce={nonce} />
        <Meta />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Links />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
        <script
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(env)}`,
          }}
        />
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
        <TailwindIndicator />
      </body>
    </html>
  );
}

function App() {
  const data = useLoaderData<typeof loader>();
  const nonce = useNonce();
  const theme = useTheme();

  return (
    <Document nonce={nonce} env={data.ENV} theme={theme}>
      <Outlet />
    </Document>
  );
}

// This isn't doing anything atm but can later
function AppWithProviders() {
  return <App />;
}

export default withSentry(AppWithProviders);

/**
 * @returns the user's theme preference, or the client hint theme if the user
 * has not set a preference.
 */
export function useTheme() {
  const hints = useHints();
  const requestInfo = useRequestInfo();
  const optimisticMode = useOptimisticThemeMode();
  if (optimisticMode) {
    return optimisticMode === "system" ? hints.theme : optimisticMode;
  }
  return requestInfo.userPrefs.theme ?? hints.theme;
}

/**
 * If the user's changing their theme mode preference, this will return the
 * value it's being changed to.
 */
export function useOptimisticThemeMode() {
  const fetchers = useFetchers();
  const themeFetcher = fetchers.find((f) => f.formAction === "/");

  if (themeFetcher && themeFetcher.formData) {
    const submission = parseWithZod(themeFetcher.formData, {
      schema: ThemeFormSchema,
    });

    if (submission.status === "success") {
      return submission.value.theme;
    }
  }
}

export function ErrorBoundary() {
  const error = useRouteError();
  // the nonce doesn't rely on the loader, so we can access that
  const nonce = useNonce();

  captureRemixErrorBoundaryError(error);

  // NOTE: you cannot use useLoaderData in an ErrorBoundary because the loader
  // likely failed to run so we have to do the best we can.
  // We could probably do better than this (it's possible the loader did run).
  // This would require a change in Remix.

  // Just make sure your root route never errors out and you'll always be able
  // to give the user a better UX.

  return (
    <Document nonce={nonce}>
      <AppErrorBoundary error={error} />
    </Document>
  );
}
