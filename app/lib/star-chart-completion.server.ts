import { cookie } from "~/constants.ts";
import { starChartCompletion as starChartCompletionCookie } from "~/cookies.server.ts";
import { starChart } from "~/data/star-chart.ts";
import { starChartCompletionDefault } from "~/data/star-chart-completion.ts";
import { warn } from "~/lib/log.server.ts";
import type { Timings } from "~/lib/timings.server.ts";
import { time } from "~/lib/timings.server.ts";
import type { StarChartNode, StarChartPlanet } from "~/schemas/star-chart.ts";
import type {
  StarChartCompletion,
  StarChartModeCompletion,
  StarChartPlanetCompletion,
} from "~/schemas/star-chart-completion.ts";
import {
  completablePlanets,
  StarChartCompletionSchema,
} from "~/schemas/star-chart-completion.ts";

function ensureHasEachPlanet(
  starChartModeCompletion: StarChartModeCompletion,
): StarChartModeCompletion {
  const ensured: StarChartModeCompletion = [...starChartModeCompletion];
  completablePlanets.forEach((completablePlanet) => {
    const idx = ensured.findIndex(
      (planet) => planet.planet === completablePlanet,
    );
    if (idx < 0) {
      ensured.push({ planet: completablePlanet, nodes: [] });
    }
  });
  return ensured;
}

function sortByPlanetNames(
  starChartModeCompletion: StarChartModeCompletion,
): StarChartModeCompletion {
  return [...starChartModeCompletion].sort((a, b) => {
    return (
      completablePlanets.indexOf(a.planet) -
      completablePlanets.indexOf(b.planet)
    );
  });
}

export type EnhancedStarChartNodeCompletion = StarChartNode & {
  name: string;
  completed: boolean;
};

export type EnhancedStarChartPlanet = Omit<StarChartPlanet, "nodes"> & {
  name: string;
};
export interface EnhancedStarChartPlanetCompletion {
  starChartPlanet: EnhancedStarChartPlanet;
  starChartNodes: EnhancedStarChartNodeCompletion[];
}

function enhanceStarChartPlanetCompletion(
  starChartPlanetCompletion: StarChartPlanetCompletion,
): EnhancedStarChartPlanetCompletion {
  const { nodes, ...planet } = starChart[starChartPlanetCompletion.planet];
  const starChartNodes = Object.entries(
    nodes,
  ).map<EnhancedStarChartNodeCompletion>(([name, node]) => ({
    ...node,
    name,
    completed: starChartPlanetCompletion.nodes.includes(name),
  }));
  const starChartPlanet: EnhancedStarChartPlanet = {
    ...planet,
    name: starChartPlanetCompletion.planet,
  };
  return { starChartPlanet, starChartNodes };
}

function enhanceStarChartModeCompletion(
  starChartCompletion: StarChartModeCompletion,
): EnhancedStarChartPlanetCompletion[] {
  const ensured = ensureHasEachPlanet(starChartCompletion);
  const sorted = sortByPlanetNames(ensured);
  return sorted.map(enhanceStarChartPlanetCompletion);
}

export interface EnhancedStarChartCompletion {
  normalMode: EnhancedStarChartPlanetCompletion[];
  steelPath: EnhancedStarChartPlanetCompletion[];
}

async function determineStarChartCompletionFromCookie(
  request: Request,
  timings: Timings,
): Promise<StarChartCompletion> {
  const cookieHeader = request.headers.get(cookie);
  try {
    const starChartCompletionCookieContents: unknown = await time(
      () => starChartCompletionCookie.parse(cookieHeader),
      {
        type: "starChartCompletionCookie.parse",
        desc: "parse cookie contents from cookie",
        timings,
      },
    );
    if (!starChartCompletionCookieContents) {
      return starChartCompletionDefault;
    }
    return await time(
      () =>
        StarChartCompletionSchema.parseAsync(starChartCompletionCookieContents),
      {
        type: "StarChartCompletionSchema.parseAsync",
        desc: "parse star chart completion from cookie contents",
        timings,
      },
    );
  } catch (e) {
    warn("Unable to retrieve Star Chart Completion, returning defaults", e);
    return starChartCompletionDefault;
  }
}

export async function getStarChartCompletion(
  request: Request,
  timings: Timings,
): Promise<EnhancedStarChartCompletion> {
  const starChartCompletionFromCookie =
    await determineStarChartCompletionFromCookie(request, timings);
  return {
    normalMode: enhanceStarChartModeCompletion(
      starChartCompletionFromCookie.normalMode,
    ),
    steelPath: enhanceStarChartModeCompletion(
      starChartCompletionFromCookie.steelPath,
    ),
  };
}
