import { getFormProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  isRouteErrorResponse,
  useActionData,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { captureRemixErrorBoundaryError } from "@sentry/remix";
import { z } from "zod";

import { SiteFooter } from "~/components/SiteFooter.tsx";
import { H1, H2, Lead, Paragraph } from "~/components/typography.tsx";
import { Button } from "~/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card.tsx";
import { Checkbox } from "~/components/ui/checkbox.tsx";
import { Icon } from "~/components/ui/icon.tsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/components/ui/tabs.tsx";
import { serverTiming } from "~/constants.ts";
import { info } from "~/lib/log.server.ts";
import type {
  EnhancedStarChartNodeCompletion,
  EnhancedStarChartPlanetCompletion,
} from "~/lib/star-chart-completion.server.ts";
import { getStarChartCompletion } from "~/lib/star-chart-completion.server.ts";
import { makeTimings, time } from "~/lib/timings.server.ts";
import { combineHeaders, getErrorMessage } from "~/lib/utils.ts";

export async function loader({ request }: LoaderFunctionArgs) {
  const timings = makeTimings("index loader");
  const starChartCompletion = await getStarChartCompletion(request, timings);

  return json(
    { starChartCompletion },
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    { headers: combineHeaders({ [serverTiming]: timings.toString() }) },
  );
}

export async function action({ request }: ActionFunctionArgs) {
  info("Handling request", request);
  const timings = makeTimings("index action");
  const formData = await time(() => request.formData(), {
    type: "request.formData",
    desc: "retrieve form data from request",
    timings,
  });
  // @ts-expect-error uhhhhh
  info("Form data:", new URLSearchParams(formData).toString());
  return redirect("/");
}

export function ErrorBoundary() {
  const error = useRouteError();
  captureRemixErrorBoundaryError(error);

  if (isRouteErrorResponse(error)) {
    return (
      <div className="relative flex min-h-screen flex-col">
        <div className="flex-1">
          <div className="border-b">
            <div className="container flex-1 items-start">
              <main className="relative py-6 lg:gap-10 lg:py-8">
                <div className="pb-8 space-y-2">
                  <H1>Star Chart</H1>
                  <Lead>Track your Warframe Star Chart progression.</Lead>
                </div>
                <section className="block">
                  <div className="overflow-hidden rounded-lg border bg-background px-4 shadow">
                    <div className="flex h-[50vh] flex-col items-center justify-center gap-2">
                      <H2>Route Error</H2>
                      <Lead>Status: {error.status}</Lead>
                      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
                      <Paragraph>{error.data.message}</Paragraph>
                    </div>
                  </div>
                </section>
              </main>
            </div>
          </div>
        </div>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="flex-1">
        <div className="border-b">
          <div className="container flex-1 items-start">
            <main className="relative py-6 lg:gap-10 lg:py-8">
              <div className="pb-8 space-y-2">
                <H1>Star Chart</H1>
                <Lead>Track your Warframe Star Chart progression.</Lead>
              </div>
              <section className="block">
                <div className="overflow-hidden rounded-lg border bg-background px-4 shadow">
                  <div className="flex h-[50vh] flex-col items-center justify-center gap-2">
                    <H2>500</H2>
                    <Lead>{getErrorMessage(error)}</Lead>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}

function NodeCompletion({
  planetName,
  starChartNodeCompletion,
}: {
  planetName: string;
  starChartNodeCompletion: EnhancedStarChartNodeCompletion;
}) {
  const lastResult = useActionData<typeof action>();
  const [form, fields] = useForm({
    id: planetName,
    lastResult,
    onValidate: ({ formData }) =>
      parseWithZod(formData, {
        schema: z.object({
          [starChartNodeCompletion.name]: z.boolean(),
        }),
      }),
    defaultValue: {
      [starChartNodeCompletion.name]: starChartNodeCompletion.completed,
    },
  });

  return (
    <Form className="flex space-x-2" method="POST" {...getFormProps(form)}>
      <Checkbox
        id={fields[starChartNodeCompletion.name].id}
        name={fields[starChartNodeCompletion.name].name}
        type="submit"
      />
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        htmlFor={fields[starChartNodeCompletion.name].id}
      >
        {starChartNodeCompletion.name}
      </label>
    </Form>
  );
}

function PlanetCompletion({
  starChartPlanetCompletion,
}: {
  starChartPlanetCompletion: EnhancedStarChartPlanetCompletion;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{starChartPlanetCompletion.starChartPlanet.name}</CardTitle>
        {starChartPlanetCompletion.starChartPlanet.requiresTheSecondDream ? (
          <CardDescription>
            Requires completion of{" "}
            <span className="font-mono">The Second Dream</span>
          </CardDescription>
        ) : null}
        {starChartPlanetCompletion.starChartPlanet.requiresTheWarWithin ? (
          <CardDescription>
            Requires completion of{" "}
            <span className="font-mono">The War Within</span>
          </CardDescription>
        ) : null}
        {starChartPlanetCompletion.starChartPlanet
          .requiresAngelsOfTheZariman ? (
          <CardDescription>
            Requires completion of{" "}
            <span className="font-mono">Angels of the Zariman</span>
          </CardDescription>
        ) : null}
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-0.5">
          {starChartPlanetCompletion.starChartNodes.map((node) => (
            <NodeCompletion
              key={node.name}
              planetName={starChartPlanetCompletion.starChartPlanet.name}
              starChartNodeCompletion={node}
            />
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Icon className="mr-2" name="check" size="sm" /> Mark all as completed
        </Button>
      </CardFooter>
    </Card>
  );
}

export function StarChartCompletion({
  starChartModeCompletion,
}: {
  starChartModeCompletion: EnhancedStarChartPlanetCompletion[];
}) {
  return (
    <section className="grid w-full gap-y-2 gap-x-1 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {starChartModeCompletion.map((completion) => (
        <PlanetCompletion
          key={completion.starChartPlanet.name}
          starChartPlanetCompletion={completion}
        />
      ))}
    </section>
  );
}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <Tabs defaultValue="normalMode">
      <div className="relative flex min-h-screen flex-col">
        <div className="flex-1">
          <div className="border-b">
            <div className="container flex-1 items-start">
              <main className="relative py-6 lg:gap-10 lg:py-8">
                <div className="mb-4">
                  <div className="flex items-top">
                    <div className="pb-8 space-y-2">
                      <H1>Star Chart</H1>
                      <Lead>Track your Warframe Star Chart progression.</Lead>
                    </div>
                    <TabsList className="ml-auto hidden md:inline-flex">
                      <TabsTrigger value="normalMode">Normal Mode</TabsTrigger>
                      <TabsTrigger value="steelPath">
                        The Steel Path
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  <TabsList className="ml-auto md:hidden">
                    <TabsTrigger value="normalMode">Normal Mode</TabsTrigger>
                    <TabsTrigger value="steelPath">The Steel Path</TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent className="flex flex-col gap-2" value="normalMode">
                  <StarChartCompletion
                    starChartModeCompletion={
                      data.starChartCompletion.normalMode
                    }
                  />
                </TabsContent>
                <TabsContent className="flex flex-col gap-2" value="steelPath">
                  <StarChartCompletion
                    starChartModeCompletion={data.starChartCompletion.steelPath}
                  />
                </TabsContent>
              </main>
            </div>
          </div>
        </div>
        <SiteFooter />
      </div>
    </Tabs>
  );
}
