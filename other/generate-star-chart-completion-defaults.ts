import { writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

import { format } from "prettier";
import { dedent } from "ts-dedent";

import { starChart } from "~/data/star-chart.ts";

const data = Object.keys(starChart)
  .map((planet) => `{ planet: "${planet}", nodes: [] }`)
  .join(",\n");

const template = dedent`
// This is a generated file, any changes here will be eventually overwritten!

import type { StarChartNodesCompletion, StarChartModePlanetNodesCompletion } from "~/schemas/star-chart-completion.ts";

export const starChartModeCompletionDefault: StarChartModePlanetNodesCompletion = [
  ${data}
];

export const starChartCompletionDefault: StarChartNodesCompletion = {
  normalMode: starChartModeCompletionDefault,
  steelPath: starChartModeCompletionDefault,
};
`;

const cwd = process.cwd();
const outputFile = path.join(cwd, "app", "data", "star-chart-completion.ts");

await writeFile(outputFile, await format(template, { parser: "typescript" }), { encoding: "utf-8" });
