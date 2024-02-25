// This is a generated file, any changes here will be eventually overwritten!

import { z } from "zod";

import { isPresent } from "~/lib/type-guards.ts";

// region Planets
export const completablePlanets = [
  "mercury",
  "venus",
  "earth",
  "mars",
  "deimos",
  "phobos",
  "ceres",
  "jupiter",
  "europa",
  "saturn",
  "uranus",
  "neptune",
  "pluto",
  "sedna",
  "eris",
  "void",
  "lua",
  "kuvaFortress",
  "zarimanTenTwo",
] as const;
export const CompletablePlanetsSchema = z.enum(completablePlanets);
export type CompletablePlanet = z.infer<typeof CompletablePlanetsSchema>;
export function isCompletablePlanet(x: unknown): x is CompletablePlanet {
  return (
    isPresent(x) &&
    typeof x === "string" &&
    completablePlanets.includes(x.toString())
  );
}
// endregion Planets

// region Nodes
export const mercuryNodes = [
  "caloris",
  "pantheon",
  "lares",
  "odin",
  "apollodorus",
  "elion",
  "mPrime",
  "suisei",
  "tolstoj",
  "terminus",
  "boethius",
] as const;
export const MercuryNodeSchema = z.enum(mercuryNodes);
export type MercuryNode = z.infer<typeof MercuryNodeSchema>;
export const MercuryNodesSchema = z.array(MercuryNodeSchema);
export type MercuryNodes = z.infer<typeof MercuryNodesSchema>;
export function isMercuryNode(x: unknown): x is MercuryNode {
  return (
    isPresent(x) && typeof x === "string" && mercuryNodes.includes(x.toString())
  );
}

export const venusNodes = [
  "eGate",
  "montes",
  "cytherean",
  "kiliken",
  "tessera",
  "vPrime",
  "unda",
  "venera",
  "linea",
  "ishtar",
  "aphrodite",
  "fossa",
  "romula",
  "malva",
] as const;
export const VenusNodeSchema = z.enum(venusNodes);
export type VenusNode = z.infer<typeof VenusNodeSchema>;
export const VenusNodesSchema = z.array(VenusNodeSchema);
export type VenusNodes = z.infer<typeof VenusNodesSchema>;
export function isVenusNode(x: unknown): x is VenusNode {
  return (
    isPresent(x) && typeof x === "string" && venusNodes.includes(x.toString())
  );
}

export const earthNodes = [
  "ePrime",
  "mariana",
  "erpo",
  "gaia",
  "lith",
  "everest",
  "mantle",
  "cambria",
  "eurasia",
  "pacific",
  "cervantes",
  "coba",
  "tikal",
  "oro",
] as const;
export const EarthNodeSchema = z.enum(earthNodes);
export type EarthNode = z.infer<typeof EarthNodeSchema>;
export const EarthNodesSchema = z.array(EarthNodeSchema);
export type EarthNodes = z.infer<typeof EarthNodesSchema>;
export function isEarthNode(x: unknown): x is EarthNode {
  return (
    isPresent(x) && typeof x === "string" && earthNodes.includes(x.toString())
  );
}

export const marsNodes = [
  "hellas",
  "tharsis",
  "spear",
  "syrtis",
  "alator",
  "ares",
  "arval",
  "gradivus",
  "augustus",
  "martialis",
  "ara",
  "wahiba",
  "kadesh",
  "ultor",
  "vallis",
  "war",
  "olympus",
  "tyanaPass",
] as const;
export const MarsNodeSchema = z.enum(marsNodes);
export type MarsNode = z.infer<typeof MarsNodeSchema>;
export const MarsNodesSchema = z.array(MarsNodeSchema);
export type MarsNodes = z.infer<typeof MarsNodesSchema>;
export function isMarsNode(x: unknown): x is MarsNode {
  return (
    isPresent(x) && typeof x === "string" && marsNodes.includes(x.toString())
  );
}

export const deimosNodes = [
  "horend",
  "phlegyas",
  "formido",
  "dirus",
  "hyf",
  "magnacidium",
  "terrorem",
  "exequias",
  "persto",
  "nex",
  "effervo",
  "cambire",
  "munio",
  "testudo",
] as const;
export const DeimosNodeSchema = z.enum(deimosNodes);
export type DeimosNode = z.infer<typeof DeimosNodeSchema>;
export const DeimosNodesSchema = z.array(DeimosNodeSchema);
export type DeimosNodes = z.infer<typeof DeimosNodesSchema>;
export function isDeimosNode(x: unknown): x is DeimosNode {
  return (
    isPresent(x) && typeof x === "string" && deimosNodes.includes(x.toString())
  );
}

export const phobosNodes = [
  "roche",
  "stickney",
  "gulliver",
  "shklovsky",
  "sharpless",
  "kepler",
  "skyresh",
  "iliad",
  "monolith",
  "zeugma",
  "memphis",
] as const;
export const PhobosNodeSchema = z.enum(phobosNodes);
export type PhobosNode = z.infer<typeof PhobosNodeSchema>;
export const PhobosNodesSchema = z.array(PhobosNodeSchema);
export type PhobosNodes = z.infer<typeof PhobosNodesSchema>;
export function isPhobosNode(x: unknown): x is PhobosNode {
  return (
    isPresent(x) && typeof x === "string" && phobosNodes.includes(x.toString())
  );
}

export const ceresNodes = [
  "bode",
  "pallas",
  "draco",
  "casta",
  "cinxia",
  "nuovo",
  "kiste",
  "lex",
  "ker",
  "exta",
  "thon",
  "ludi",
  "gabii",
  "seimeni",
] as const;
export const CeresNodeSchema = z.enum(ceresNodes);
export type CeresNode = z.infer<typeof CeresNodeSchema>;
export const CeresNodesSchema = z.array(CeresNodeSchema);
export type CeresNodes = z.infer<typeof CeresNodesSchema>;
export function isCeresNode(x: unknown): x is CeresNode {
  return (
    isPresent(x) && typeof x === "string" && ceresNodes.includes(x.toString())
  );
}

export const jupiterNodes = [
  "metis",
  "io",
  "galilea",
  "elara",
  "callisto",
  "carme",
  "ananke",
  "carpo",
  "amalthea",
  "adrastea",
  "themisto",
  "thebe",
  "cameria",
  "sinai",
  "ganymede",
  "theRopalolyst",
] as const;
export const JupiterNodeSchema = z.enum(jupiterNodes);
export type JupiterNode = z.infer<typeof JupiterNodeSchema>;
export const JupiterNodesSchema = z.array(JupiterNodeSchema);
export type JupiterNodes = z.infer<typeof JupiterNodesSchema>;
export function isJupiterNode(x: unknown): x is JupiterNode {
  return (
    isPresent(x) && typeof x === "string" && jupiterNodes.includes(x.toString())
  );
}

export const europaNodes = [
  "armaros",
  "morax",
  "valac",
  "paimon",
  "ose",
  "valefor",
  "sorath",
  "kokabiel",
  "orias",
  "naamah",
  "baal",
  "abaddon",
  "larzac",
  "cholistan",
  "icefieldsOfRiddah",
  "minesOfKarishh",
  "archaeoFreighter",
] as const;
export const EuropaNodeSchema = z.enum(europaNodes);
export type EuropaNode = z.infer<typeof EuropaNodeSchema>;
export const EuropaNodesSchema = z.array(EuropaNodeSchema);
export type EuropaNodes = z.infer<typeof EuropaNodesSchema>;
export function isEuropaNode(x: unknown): x is EuropaNode {
  return (
    isPresent(x) && typeof x === "string" && europaNodes.includes(x.toString())
  );
}

export const saturnNodes = [
  "pandora",
  "cassini",
  "dione",
  "titan",
  "helene",
  "rhea",
  "anthe",
  "telesto",
  "numa",
  "enceladus",
  "keeler",
  "tethys",
  "calypso",
  "caracol",
  "piscinas",
] as const;
export const SaturnNodeSchema = z.enum(saturnNodes);
export type SaturnNode = z.infer<typeof SaturnNodeSchema>;
export const SaturnNodesSchema = z.array(SaturnNodeSchema);
export type SaturnNodes = z.infer<typeof SaturnNodesSchema>;
export function isSaturnNode(x: unknown): x is SaturnNode {
  return (
    isPresent(x) && typeof x === "string" && saturnNodes.includes(x.toString())
  );
}

export const uranusNodes = [
  "sycorax",
  "umbriel",
  "ophelia",
  "caelus",
  "stephano",
  "ariel",
  "caliban",
  "assur",
  "desdemona",
  "titania",
  "puck",
  "rosalind",
  "cressida",
  "ur",
] as const;
export const UranusNodeSchema = z.enum(uranusNodes);
export type UranusNode = z.infer<typeof UranusNodeSchema>;
export const UranusNodesSchema = z.array(UranusNodeSchema);
export type UranusNodes = z.infer<typeof UranusNodesSchema>;
export function isUranusNode(x: unknown): x is UranusNode {
  return (
    isPresent(x) && typeof x === "string" && uranusNodes.includes(x.toString())
  );
}

export const neptuneNodes = [
  "laomedeia",
  "galatea",
  "proteus",
  "salacia",
  "despina",
  "triton",
  "larissa",
  "neso",
  "sao",
  "theIndexEndurance",
  "nereid",
  "psamathe",
  "yursa",
  "kelashin",
] as const;
export const NeptuneNodeSchema = z.enum(neptuneNodes);
export type NeptuneNode = z.infer<typeof NeptuneNodeSchema>;
export const NeptuneNodesSchema = z.array(NeptuneNodeSchema);
export type NeptuneNodes = z.infer<typeof NeptuneNodesSchema>;
export function isNeptuneNode(x: unknown): x is NeptuneNode {
  return (
    isPresent(x) && typeof x === "string" && neptuneNodes.includes(x.toString())
  );
}

export const plutoNodes = [
  "minthe",
  "hydra",
  "outerTerminus",
  "palus",
  "cerberus",
  "narcissus",
  "oceanum",
  "regna",
  "cypress",
  "acheron",
  "sechura",
  "hades",
  "hieracon",
] as const;
export const PlutoNodeSchema = z.enum(plutoNodes);
export type PlutoNode = z.infer<typeof PlutoNodeSchema>;
export const PlutoNodesSchema = z.array(PlutoNodeSchema);
export type PlutoNodes = z.infer<typeof PlutoNodesSchema>;
export function isPlutoNode(x: unknown): x is PlutoNode {
  return (
    isPresent(x) && typeof x === "string" && plutoNodes.includes(x.toString())
  );
}

export const sednaNodes = [
  "naga",
  "berehynia",
  "hydron",
  "selkie",
  "adaro",
  "rusalka",
  "marid",
  "kappa",
  "charybdis",
  "kelpie",
  "merrow",
  "amarna",
  "sangeru",
  "nakki",
  "yam",
  "vodyanoi",
] as const;
export const SednaNodeSchema = z.enum(sednaNodes);
export type SednaNode = z.infer<typeof SednaNodeSchema>;
export const SednaNodesSchema = z.array(SednaNodeSchema);
export type SednaNodes = z.infer<typeof SednaNodesSchema>;
export function isSednaNode(x: unknown): x is SednaNode {
  return (
    isPresent(x) && typeof x === "string" && sednaNodes.includes(x.toString())
  );
}

export const erisNodes = [
  "naeglar",
  "xini",
  "nimus",
  "kalaAzar",
  "isos",
  "brugia",
  "saxis",
  "oestrus",
  "solium",
  "zabala",
  "akkad",
] as const;
export const ErisNodeSchema = z.enum(erisNodes);
export type ErisNode = z.infer<typeof ErisNodeSchema>;
export const ErisNodesSchema = z.array(ErisNodeSchema);
export type ErisNodes = z.infer<typeof ErisNodesSchema>;
export function isErisNode(x: unknown): x is ErisNode {
  return (
    isPresent(x) && typeof x === "string" && erisNodes.includes(x.toString())
  );
}

export const voidNodes = [
  "taranis",
  "hepit",
  "teshub",
  "tiwaz",
  "ani",
  "stribog",
  "oxomoco",
  "belenus",
  "ukko",
  "aten",
  "mithra",
  "mot",
  "marduk",
] as const;
export const VoidNodeSchema = z.enum(voidNodes);
export type VoidNode = z.infer<typeof VoidNodeSchema>;
export const VoidNodesSchema = z.array(VoidNodeSchema);
export type VoidNodes = z.infer<typeof VoidNodesSchema>;
export function isVoidNode(x: unknown): x is VoidNode {
  return (
    isPresent(x) && typeof x === "string" && voidNodes.includes(x.toString())
  );
}

export const luaNodes = [
  "tycho",
  "stofler",
  "plato",
  "pavlov",
  "copernicus",
  "zeipel",
  "grimaldi",
  "yuvarium",
  "apollo",
  "circulus",
] as const;
export const LuaNodeSchema = z.enum(luaNodes);
export type LuaNode = z.infer<typeof LuaNodeSchema>;
export const LuaNodesSchema = z.array(LuaNodeSchema);
export type LuaNodes = z.infer<typeof LuaNodesSchema>;
export function isLuaNode(x: unknown): x is LuaNode {
  return (
    isPresent(x) && typeof x === "string" && luaNodes.includes(x.toString())
  );
}

export const kuvaFortressNodes = [
  "dataka",
  "koro",
  "nabuk",
  "rotuma",
  "garus",
  "pago",
  "taveuni",
  "tamu",
] as const;
export const KuvaFortressNodeSchema = z.enum(kuvaFortressNodes);
export type KuvaFortressNode = z.infer<typeof KuvaFortressNodeSchema>;
export const KuvaFortressNodesSchema = z.array(KuvaFortressNodeSchema);
export type KuvaFortressNodes = z.infer<typeof KuvaFortressNodesSchema>;
export function isKuvaFortressNode(x: unknown): x is KuvaFortressNode {
  return (
    isPresent(x) &&
    typeof x === "string" &&
    kuvaFortressNodes.includes(x.toString())
  );
}

export const zarimanTenTwoNodes = [
  "oroWorks",
  "everviewArc",
  "theGreenway",
  "tuvulCommons",
  "halakoPerimeter",
] as const;
export const ZarimanTenTwoNodeSchema = z.enum(zarimanTenTwoNodes);
export type ZarimanTenTwoNode = z.infer<typeof ZarimanTenTwoNodeSchema>;
export const ZarimanTenTwoNodesSchema = z.array(ZarimanTenTwoNodeSchema);
export type ZarimanTenTwoNodes = z.infer<typeof ZarimanTenTwoNodesSchema>;
export function isZarimanTenTwoNode(x: unknown): x is ZarimanTenTwoNode {
  return (
    isPresent(x) &&
    typeof x === "string" &&
    zarimanTenTwoNodes.includes(x.toString())
  );
}
// endregion Nodes

// region Planet Schemas
export const mercurySchema = z.object({
  planet: z.literal("mercury"),
  nodes: z
    .array(z.string())
    .transform((val) => val.filter(isMercuryNode))
    .pipe(MercuryNodesSchema)
    .catch([]),
});
export const venusSchema = z.object({
  planet: z.literal("venus"),
  nodes: z
    .array(z.string())
    .transform((val) => val.filter(isVenusNode))
    .pipe(VenusNodesSchema)
    .catch([]),
});
export const earthSchema = z.object({
  planet: z.literal("earth"),
  nodes: z
    .array(z.string())
    .transform((val) => val.filter(isEarthNode))
    .pipe(EarthNodesSchema)
    .catch([]),
});
export const marsSchema = z.object({
  planet: z.literal("mars"),
  nodes: z
    .array(z.string())
    .transform((val) => val.filter(isMarsNode))
    .pipe(MarsNodesSchema)
    .catch([]),
});
export const deimosSchema = z.object({
  planet: z.literal("deimos"),
  nodes: z
    .array(z.string())
    .transform((val) => val.filter(isDeimosNode))
    .pipe(DeimosNodesSchema)
    .catch([]),
});
export const phobosSchema = z.object({
  planet: z.literal("phobos"),
  nodes: z
    .array(z.string())
    .transform((val) => val.filter(isPhobosNode))
    .pipe(PhobosNodesSchema)
    .catch([]),
});
export const ceresSchema = z.object({
  planet: z.literal("ceres"),
  nodes: z
    .array(z.string())
    .transform((val) => val.filter(isCeresNode))
    .pipe(CeresNodesSchema)
    .catch([]),
});
export const jupiterSchema = z.object({
  planet: z.literal("jupiter"),
  nodes: z
    .array(z.string())
    .transform((val) => val.filter(isJupiterNode))
    .pipe(JupiterNodesSchema)
    .catch([]),
});
export const europaSchema = z.object({
  planet: z.literal("europa"),
  nodes: z
    .array(z.string())
    .transform((val) => val.filter(isEuropaNode))
    .pipe(EuropaNodesSchema)
    .catch([]),
});
export const saturnSchema = z.object({
  planet: z.literal("saturn"),
  nodes: z
    .array(z.string())
    .transform((val) => val.filter(isSaturnNode))
    .pipe(SaturnNodesSchema)
    .catch([]),
});
export const uranusSchema = z.object({
  planet: z.literal("uranus"),
  nodes: z
    .array(z.string())
    .transform((val) => val.filter(isUranusNode))
    .pipe(UranusNodesSchema)
    .catch([]),
});
export const neptuneSchema = z.object({
  planet: z.literal("neptune"),
  nodes: z
    .array(z.string())
    .transform((val) => val.filter(isNeptuneNode))
    .pipe(NeptuneNodesSchema)
    .catch([]),
});
export const plutoSchema = z.object({
  planet: z.literal("pluto"),
  nodes: z
    .array(z.string())
    .transform((val) => val.filter(isPlutoNode))
    .pipe(PlutoNodesSchema)
    .catch([]),
});
export const sednaSchema = z.object({
  planet: z.literal("sedna"),
  nodes: z
    .array(z.string())
    .transform((val) => val.filter(isSednaNode))
    .pipe(SednaNodesSchema)
    .catch([]),
});
export const erisSchema = z.object({
  planet: z.literal("eris"),
  nodes: z
    .array(z.string())
    .transform((val) => val.filter(isErisNode))
    .pipe(ErisNodesSchema)
    .catch([]),
});
export const voidSchema = z.object({
  planet: z.literal("void"),
  nodes: z
    .array(z.string())
    .transform((val) => val.filter(isVoidNode))
    .pipe(VoidNodesSchema)
    .catch([]),
});
export const luaSchema = z.object({
  planet: z.literal("lua"),
  nodes: z
    .array(z.string())
    .transform((val) => val.filter(isLuaNode))
    .pipe(LuaNodesSchema)
    .catch([]),
});
export const kuvaFortressSchema = z.object({
  planet: z.literal("kuvaFortress"),
  nodes: z
    .array(z.string())
    .transform((val) => val.filter(isKuvaFortressNode))
    .pipe(KuvaFortressNodesSchema)
    .catch([]),
});
export const zarimanTenTwoSchema = z.object({
  planet: z.literal("zarimanTenTwo"),
  nodes: z
    .array(z.string())
    .transform((val) => val.filter(isZarimanTenTwoNode))
    .pipe(ZarimanTenTwoNodesSchema)
    .catch([]),
});
// endregion Planet Schemas

// region Completion
export const StarChartPlanetCompletionSchema = z.discriminatedUnion("planet", [
  mercurySchema,
  venusSchema,
  earthSchema,
  marsSchema,
  deimosSchema,
  phobosSchema,
  ceresSchema,
  jupiterSchema,
  europaSchema,
  saturnSchema,
  uranusSchema,
  neptuneSchema,
  plutoSchema,
  sednaSchema,
  erisSchema,
  voidSchema,
  luaSchema,
  kuvaFortressSchema,
  zarimanTenTwoSchema,
]);
export type StarChartPlanetCompletion = z.infer<
  typeof StarChartPlanetCompletionSchema
>;

export const StarChartModeCompletionSchema = z.array(
  StarChartPlanetCompletionSchema,
);
export type StarChartModeCompletion = z.infer<
  typeof StarChartModeCompletionSchema
>;

export const StarChartCompletionSchema = z.object({
  normalMode: StarChartModeCompletionSchema,
  steelPath: StarChartModeCompletionSchema,
});
export type StarChartCompletion = z.infer<typeof StarChartCompletionSchema>;
// endregion Completion
