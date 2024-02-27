import { cookie } from "~/constants.ts";
import { starChartCompletion as starChartCompletionCookie } from "~/cookies.server.ts";
import { starChart } from "~/data/star-chart.ts";
import { starChartCompletionDefault } from "~/data/star-chart-completion.ts";
import { warn } from "~/lib/log.server.ts";
import type { Timings } from "~/lib/timings.server.ts";
import { time } from "~/lib/timings.server.ts";
import type { StarChartNode, StarChartPlanet } from "~/schemas/star-chart.ts";
import type {
  CompletablePlanet,
  StarChartModePlanetNodesCompletion,
  StarChartNodesCompletion,
  StarChartPlanetNodesCompletion
} from "~/schemas/star-chart-completion.ts";
import {
  completablePlanets,
  StarChartNodesCompletionSchema,
} from "~/schemas/star-chart-completion.ts";

function ensureHasEachPlanet(
  StarChartModePlanetNodesCompletion: StarChartModePlanetNodesCompletion,
): StarChartModePlanetNodesCompletion {
  const ensured: StarChartModePlanetNodesCompletion = [
    ...StarChartModePlanetNodesCompletion,
  ];
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
  StarChartModePlanetNodesCompletion: StarChartModePlanetNodesCompletion,
): StarChartModePlanetNodesCompletion {
  return [...StarChartModePlanetNodesCompletion].sort((a, b) => {
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
  name: CompletablePlanet;
};
export interface EnhancedStarChartPlanetNodesCompletion {
  starChartPlanet: EnhancedStarChartPlanet;
  starChartNodes: EnhancedStarChartNodeCompletion[];
}

function enhanceStarChartPlanetNodesCompletion(
  StarChartPlanetNodesCompletion: StarChartPlanetNodesCompletion,
): EnhancedStarChartPlanetNodesCompletion {
  const { nodes, ...planet } = starChart[StarChartPlanetNodesCompletion.planet];
  const starChartNodes = Object.entries(
    nodes,
  ).map<EnhancedStarChartNodeCompletion>(([name, node]) => ({
    ...node,
    name,
    completed: StarChartPlanetNodesCompletion.nodes.includes(name),
  }));
  const starChartPlanet: EnhancedStarChartPlanet = {
    ...planet,
    name: StarChartPlanetNodesCompletion.planet,
  };
  return { starChartPlanet, starChartNodes };
}

function enhanceStarChartModePlanetNodesCompletion(
  starChartCompletion: StarChartModePlanetNodesCompletion,
): EnhancedStarChartPlanetNodesCompletion[] {
  const ensured = ensureHasEachPlanet(starChartCompletion);
  const sorted = sortByPlanetNames(ensured);
  return sorted.map(enhanceStarChartPlanetNodesCompletion);
}

export interface EnhancedStarChartCompletion {
  normalMode: EnhancedStarChartPlanetNodesCompletion[];
  steelPath: EnhancedStarChartPlanetNodesCompletion[];
}

async function determineStarChartCompletionFromCookie(
  request: Request,
  timings: Timings,
): Promise<StarChartNodesCompletion> {
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
        StarChartNodesCompletionSchema.parseAsync(
          starChartCompletionCookieContents,
        ),
      {
        type: "StarChartNodesCompletionSchema.parseAsync",
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
    normalMode: enhanceStarChartModePlanetNodesCompletion(
      starChartCompletionFromCookie.normalMode,
    ),
    steelPath: enhanceStarChartModePlanetNodesCompletion(
      starChartCompletionFromCookie.steelPath,
    ),
  };
}
