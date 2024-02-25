import { NavLink } from "@remix-run/react";

import { ModeToggle } from "~/components/ModeToggle.tsx";
import { buttonVariants } from "~/components/ui/button.tsx";
import { Icon } from "~/components/ui/icon.tsx";
import { siteConfig } from "~/config/site.ts";
import { cn } from "~/lib/utils.ts";

export function SiteFooter() {
  return (
    <footer className="space-y-2 py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by{" "}
          <a
            href={siteConfig.links.twitter}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            ToppleTheNun
          </a>
          . The source code is available on{" "}
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Using and inspired by{" "}
          <a
            href="https://ui.shadcn.com"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            shadcn/ui
          </a>
          .
        </p>
        <div className="flex items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center">
            <NavLink
              to={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(buttonVariants({ variant: "ghost" }), "w-9 px-0")}
              >
                <Icon name="github-logo" size="sm">
                  <span className="sr-only">GitHub</span>
                </Icon>
              </div>
            </NavLink>
          </nav>
          <ModeToggle />
        </div>
      </div>
    </footer>
  );
}
