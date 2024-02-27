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

const planetNodeCompletionSchemasData = Object.keys(starChart)
  .map(toCamelCase)
  .map((planet) => {
    const transformFn = `(val) => val.filter(is${toPascalCase(planet)}Node)`;
    return dedent`
      export const ${toPascalCase(planet)}NodeCompletionSchema = z.object({ planet: z.literal("${planet}"), node: ${toPascalCase(planet)}NodeSchema });
      export type ${toPascalCase(planet)}NodeCompletion = z.infer<typeof ${toPascalCase(planet)}NodeCompletionSchema>;
      export const ${toPascalCase(planet)}NodesCompletionSchema = z.object({ planet: z.literal("${planet}"), nodes: z.array(z.string()).transform(${transformFn}).pipe(${toPascalCase(planet)}NodesSchema).catch([]) });
      export type ${toPascalCase(planet)}NodesCompletion = z.infer<typeof ${toPascalCase(planet)}NodesCompletionSchema>;
    `;
  })
  .join("\n");

const nodeCompletionSchemaData = Object.entries(starChart)
  .map(([key, value]) => [toCamelCase(key), Object.keys(value.nodes)] as const)
  .map(([planet]) => `${toPascalCase(planet)}NodeCompletionSchema`)
  .join(",\n");
const nodesCompletionSchemaData = Object.entries(starChart)
  .map(([key, value]) => [toCamelCase(key), Object.keys(value.nodes)] as const)
  .map(([planet]) => `${toPascalCase(planet)}NodesCompletionSchema`)
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
${planetNodeCompletionSchemasData}
// endregion Planet Schemas

// region Completion
export const StarChartPlanetNodeCompletionSchema = z.discriminatedUnion("planet", [
  ${nodeCompletionSchemaData}
]).and(z.object({ mode: z.enum(["normalMode", "steelPath"]), completed: z.string().toLowerCase().transform((x) => x === 'true').pipe(z.boolean()) }));
export type StarChartPlanetNodeCompletion = z.infer<typeof StarChartPlanetNodeCompletionSchema>;

export const StarChartPlanetNodesCompletionSchema = z.discriminatedUnion("planet", [
  ${nodesCompletionSchemaData}
]);
export type StarChartPlanetNodesCompletion = z.infer<typeof StarChartPlanetNodesCompletionSchema>;

export const StarChartModePlanetNodesCompletionSchema = z.array(StarChartPlanetNodesCompletionSchema);
export type StarChartModePlanetNodesCompletion = z.infer<typeof StarChartModePlanetNodesCompletionSchema>;

export const StarChartNodesCompletionSchema = z.object({
  normalMode: StarChartModePlanetNodesCompletionSchema,
  steelPath: StarChartModePlanetNodesCompletionSchema,
});
export type StarChartNodesCompletion = z.infer<typeof StarChartNodesCompletionSchema>;
// endregion Completion
`;

const cwd = process.cwd();
const outputFile = path.join(cwd, "app", "schemas", "star-chart-completion.ts");

await writeFile(outputFile, await format(template, { parser: "typescript" }), {
  encoding: "utf-8",
});
