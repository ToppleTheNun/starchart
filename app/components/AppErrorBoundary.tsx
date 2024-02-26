import { isRouteErrorResponse } from "@remix-run/react";
import type { ReactNode } from "react";

import { H1, H2, Lead } from "~/components/typography.tsx";

function ErrorLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="flex-1">
        <div className="border-b">
          <div className="container flex-1 items-start">
            <main className="relative py-6 lg:gap-10 lg:py-8">
              <div className="pb-8 space-y-2">
                <H1>Star Chart</H1>
                <Lead>
                  Unable to track your Warframe Star Chart progression.
                </Lead>
              </div>
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AppErrorBoundary({ error }: { error: unknown }) {
  if (isRouteErrorResponse(error)) {
    return (
      <ErrorLayout>
        <section className="hidden md:block">
          <div className="overflow-hidden rounded-lg border bg-background px-4 shadow">
            <div className="flex h-[50vh] flex-col items-center justify-center gap-2">
              <H2>
                {error.status} {error.statusText}
              </H2>
              <Lead>{error.data}</Lead>
            </div>
          </div>
        </section>
      </ErrorLayout>
    );
  }

  if (error instanceof Error) {
    return (
      <ErrorLayout>
        <section className="hidden md:block">
          <div className="overflow-hidden rounded-lg border bg-background px-4 shadow">
            <div className="flex h-[50vh] flex-col items-center justify-center gap-2">
              <H2>Error</H2>
              <Lead>{error.message}</Lead>
              <Lead>Stack Trace</Lead>
              <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                {error.stack}
              </code>
            </div>
          </div>
        </section>
      </ErrorLayout>
    );
  }

  return (
    <ErrorLayout>
      <section className="hidden md:block">
        <div className="overflow-hidden rounded-lg border bg-background px-4 shadow">
          <div className="flex h-[50vh] flex-col items-center justify-center gap-2">
            <H2>Unknown Error</H2>
            <Lead>
              If you&apos;re seeing this, bug Richard relentlessly until he
              fixes this.
            </Lead>
          </div>
        </div>
      </section>
    </ErrorLayout>
  );
}
