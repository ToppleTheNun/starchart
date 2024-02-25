import { generateSitemap } from "@nasa-gcn/remix-seo";
import type { LoaderFunctionArgs } from "@remix-run/node";
// @ts-expect-error Virtual module from Vite
import { routes } from "virtual:remix/server-build";

import { getDomainUrl } from "~/lib/utils.ts";

export async function loader({ request }: LoaderFunctionArgs) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return generateSitemap(request, routes, {
    siteUrl: getDomainUrl(request),
    headers: {
      "Cache-Control": `public, max-age=${60 * 5}`,
    },
  });
}
