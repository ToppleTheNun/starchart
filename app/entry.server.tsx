import { PassThrough } from "node:stream";

import type { AppLoadContext, EntryContext } from "@remix-run/node";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import * as Sentry from "@sentry/remix";
import { wrapRemixHandleError } from "@sentry/remix";
import * as isbotModule from "isbot";
import { renderToPipeableStream } from "react-dom/server";

import { getEnv, init } from "~/lib/env.server";
import { NonceProvider } from "~/lib/nonce-provider.tsx";

const ABORT_DELAY = 5_000;

init();
globalThis.ENV = getEnv();

Sentry.init({
  dsn: ENV.SENTRY_DSN,
  tracesSampleRate: ENV.MODE === "production" ? 0.2 : 1.0,
});

export const handleError = wrapRemixHandleError;

function isBotRequest(userAgent: string | null) {
  if (!userAgent) {
    return false;
  }

  return isbotModule.isbot(userAgent);
}

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  loadContext: AppLoadContext,
) {
  const nonce = String(loadContext.cspNonce);

  const callbackName = isBotRequest(request.headers.get("user-agent"))
    ? "onAllReady"
    : "onShellReady";

  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      <NonceProvider value={nonce}>
        <RemixServer
          context={remixContext}
          url={request.url}
          abortDelay={ABORT_DELAY}
        />
      </NonceProvider>,
      {
        [callbackName]: () => {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set("Content-Type", "text/html");

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            }),
          );

          pipe(body);
        },
        onShellError(error: unknown) {
          // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
          reject(error);
        },
        onError(error: unknown) {
          responseStatusCode = 500;
          // Log streaming rendering errors from inside the shell.  Don't log
          // errors encountered during initial shell rendering since they'll
          // reject and get logged in handleDocumentRequest.
          if (shellRendered) {
            console.error(error);
          }
        },
        nonce,
      },
    );

    setTimeout(abort, ABORT_DELAY);
  });
}
