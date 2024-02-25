import { writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

import { format } from "prettier";
import { dedent } from "ts-dedent";

import { starChart } from "~/data/star-chart.ts";
import { toCamelCase, toPascalCase } from "~/lib/utils.ts";

const planets = Object.keys(starChart)
  .map(toCamelCase)
  .map((planet) => `"${planet}"`)
  .join(", ");
const planetsData = dedent`
  export const completablePlanets = [${planets}] as const;
  export const CompletablePlanetsSchema = z.enum(completablePlanets);
  export type CompletablePlanet = z.infer<typeof CompletablePlanetsSchema>;
  export function isCompletablePlanet(x: unknown): x is CompletablePlanet {
    return (
      isPresent(x) &&
      typeof x === "string" &&
      completablePlanets.includes(x.toString())
    );
  }
`;

const nodeData = Object.entries(starChart)
  .map(([key, value]) => [toCamelCase(key), Object.keys(value.nodes)] as const)
  .map(([planet, nodes]) => {
    const literals = nodes.map((node) => `"${node}"`).join(", ");
    return dedent`
      export const ${toCamelCase(planet)}Nodes = [${literals}] as const;
      export const ${toPascalCase(planet)}NodeSchema = z.enum(${toCamelCase(planet)}Nodes);
      export type ${toPascalCase(planet)}Node = z.infer<typeof ${toPascalCase(planet)}NodeSchema>;
      export const ${toPascalCase(planet)}NodesSchema = z.array(${toPascalCase(planet)}NodeSchema);
      export type ${toPascalCase(planet)}Nodes = z.infer<typeof ${toPascalCase(planet)}NodesSchema>;
      export function is${toPascalCase(planet)}Node(x: unknown): x is ${toPascalCase(planet)}Node {
        return (
          isPresent(x) &&
          typeof x === "string" &&
          ${toCamelCase(planet)}Nodes.includes(x.toString())
        );
      }
    `;
  })
  .join("\n\n");

const planetSchemasData = Object.keys(starChart)
  .map(toCamelCase)
  .map((planet) => {
    const transformFn = `(val) => val.filter(is${toPascalCase(planet)}Node)`;
    return `export const ${planet}Schema = z.object({ planet: z.literal("${planet}"), nodes: z.array(z.string()).transform(${transformFn}).pipe(${toPascalCase(planet)}NodesSchema).catch([]) });`;
  })
  .join("\n");

const completionSchemaData = Object.entries(starChart)
  .map(([key, value]) => [toCamelCase(key), Object.keys(value.nodes)] as const)
  .map(([planet]) => `${planet}Schema`)
  .join(",\n");

const template = dedent`
// This is a generated file, any changes here will be eventually overwritten!

import { z } from "zod";

import { isPresent } from "~/lib/type-guards.ts";

// region Planets
${planetsData}
// endregion Planets

// region Nodes
${nodeData}
// endregion Nodes

// region Planet Schemas
${planetSchemasData}
// endregion Planet Schemas

// region Completion
export const StarChartPlanetCompletionSchema = z.discriminatedUnion("planet", [
  ${completionSchemaData}
]);
export type StarChartPlanetCompletion = z.infer<typeof StarChartPlanetCompletionSchema>;

export const StarChartModeCompletionSchema = z.array(StarChartPlanetCompletionSchema);
export type StarChartModeCompletion = z.infer<typeof StarChartModeCompletionSchema>;

export const StarChartCompletionSchema = z.object({
  normalMode: StarChartModeCompletionSchema,
  steelPath: StarChartModeCompletionSchema,
});
export type StarChartCompletion = z.infer<typeof StarChartCompletionSchema>;
// endregion Completion
`;

const cwd = process.cwd();
const outputFile = path.join(cwd, "app", "schemas", "star-chart-completion.ts");

await writeFile(outputFile, await format(template, { parser: "typescript" }), {
  encoding: "utf-8",
});
