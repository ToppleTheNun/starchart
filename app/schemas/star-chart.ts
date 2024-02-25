import { z } from "zod";

export const StarChartNodeSchema = z.object({
  requiresHeartOfDeimos: z.boolean().optional(),
  requiresWhispersInTheWalls: z.boolean().optional(),
  requiresGrendelChassisLocator: z.boolean().optional(),
  requiresGrendelSystemsLocator: z.boolean().optional(),
  requiresGrendelNeuropticsLocator: z.boolean().optional(),
});
export type StarChartNode = z.infer<typeof StarChartNodeSchema>;

export const StarChartPlanetSchema = z.object({
  nodes: z.record(StarChartNodeSchema),
  requiresTheSecondDream: z.boolean().optional(),
  requiresTheWarWithin: z.boolean().optional(),
  requiresAngelsOfTheZariman: z.boolean().optional(),
});

export type StarChartPlanet = z.infer<typeof StarChartPlanetSchema>;

export const StarChartSchema = z.object({
  mercury: StarChartPlanetSchema,
  venus: StarChartPlanetSchema,
  earth: StarChartPlanetSchema,
  lua: StarChartPlanetSchema,
  mars: StarChartPlanetSchema,
  deimos: StarChartPlanetSchema,
  phobos: StarChartPlanetSchema,
  ceres: StarChartPlanetSchema,
  jupiter: StarChartPlanetSchema,
  europa: StarChartPlanetSchema,
  saturn: StarChartPlanetSchema,
  uranus: StarChartPlanetSchema,
  neptune: StarChartPlanetSchema,
  pluto: StarChartPlanetSchema,
  eris: StarChartPlanetSchema,
  sedna: StarChartPlanetSchema,
  kuvaFortress: StarChartPlanetSchema,
  void: StarChartPlanetSchema,
  zarimanTenTwo: StarChartPlanetSchema,
});

export type StarChart = z.infer<typeof StarChartSchema>;

