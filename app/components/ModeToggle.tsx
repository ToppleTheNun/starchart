import { useFetcher } from "@remix-run/react";

import { Button } from "~/components/ui/button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu.tsx";
import { Icon } from "~/components/ui/icon.tsx";
import type { action } from "~/root.tsx";

export function ModeToggle() {
  const fetcher = useFetcher<typeof action>();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-9 px-0">
          <Icon
            name="sun"
            className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          />
          <Icon
            name="moon"
            className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => {
            fetcher.submit({ theme: "light" });
          }}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            fetcher.submit({ theme: "dark" });
          }}
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            fetcher.submit({ theme: "system" });
          }}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
