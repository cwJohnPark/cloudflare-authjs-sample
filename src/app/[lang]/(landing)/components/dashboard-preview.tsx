"use client";

import { TrendingUp, Brain, Zap, Users } from "lucide-react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import { useEffect, useState } from "react";
import { Dictionary } from "@/lib/i18n/types";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [{ month: "january", desktop: 1260, mobile: 570 }];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--primary))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--primary) / 0.6)",
  },
} satisfies ChartConfig;

type DashboardPreviewProps = {
  dictionary: Dictionary;
};

export function DashboardPreview({ dictionary }: DashboardPreviewProps) {
  const [showCards, setShowCards] = useState(false);
  const totalVisitors = chartData[0].desktop + chartData[0].mobile;

  useEffect(() => {
    // Cards appear shortly after the component becomes visible
    const timer = setTimeout(() => {
      setShowCards(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
        {/* AI Console Preview */}
        <Card
          className="overflow-hidden border-0 shadow-lg card-hover bg-gradient-to-br from-white to-gray-50"
          style={{
            opacity: showCards ? 1 : 0,
            transform: showCards
              ? "translateY(0) scale(1)"
              : "translateY(20px) scale(0.95)",
            transition: "all 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
            transitionDelay: showCards ? "0ms" : "0ms",
          }}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Brain className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold">
                    {dictionary.landing.dashboard.aiConsole.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {dictionary.landing.dashboard.aiConsole.subtitle}
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-muted-foreground">
                  {dictionary.landing.dashboard.aiConsole.live}
                </span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="text-center py-4 mb-11">
              <div className="text-3xl font-bold text-foreground mb-1">127</div>
              <div className="text-sm text-muted-foreground mb-2">
                {dictionary.landing.dashboard.aiConsole.activeModels}
              </div>
              <div className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                <TrendingUp className="w-3 h-3" />
                {dictionary.landing.dashboard.aiConsole.weeklyGrowth}
              </div>
            </div>

            <div className="bg-primary/5 rounded-xl p-2 border border-primary/10">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-xs font-medium text-foreground">
                    {dictionary.landing.dashboard.aiConsole.modelTraining}
                  </span>
                </div>
                <span className="text-xs text-black bg-primary/10 px-2 py-1 rounded-full">
                  {dictionary.landing.dashboard.aiConsole.inProgress}
                </span>
              </div>
              <div className="w-full bg-primary/10 rounded-full h-2">
                <div className="bg-primary h-2 rounded-full w-3/4 animate-pulse"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Radial Chart */}
        <Card
          className="overflow-hidden border-0 shadow-lg card-hover bg-gradient-to-br from-white to-gray-50"
          style={{
            opacity: showCards ? 1 : 0,
            transform: showCards
              ? "translateY(0) scale(1)"
              : "translateY(20px) scale(0.95)",
            transition: "all 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
            transitionDelay: showCards ? "150ms" : "0ms",
          }}
        >
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold">
                  {dictionary.landing.dashboard.userAnalytics.title}
                </CardTitle>
                <CardDescription className="text-sm">
                  {dictionary.landing.dashboard.userAnalytics.subtitle}
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pb-2">
            <ChartContainer
              config={chartConfig}
              className="aspect-square w-full max-w-[200px] h-[136px] mt-6 mx-auto"
            >
              <RadialBarChart
                data={chartData}
                endAngle={180}
                innerRadius={60}
                outerRadius={100}
              >
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) - 10}
                              className="fill-foreground text-2xl font-bold"
                            >
                              {totalVisitors.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 8}
                              className="fill-muted-foreground text-sm"
                            >
                              {
                                dictionary.landing.dashboard.userAnalytics
                                  .totalUsers
                              }
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </PolarRadiusAxis>
                <RadialBar
                  dataKey="desktop"
                  stackId="a"
                  cornerRadius={6}
                  fill="hsl(var(--primary))"
                  className="stroke-transparent stroke-2"
                />
                <RadialBar
                  dataKey="mobile"
                  fill="hsl(var(--primary) / 0.6)"
                  stackId="a"
                  cornerRadius={6}
                  className="stroke-transparent stroke-2"
                />
              </RadialBarChart>
            </ChartContainer>
          </CardContent>

          <CardFooter className="flex-col gap-2 text-sm pt-2">
            <div className="flex items-center gap-2 leading-none font-medium text-green-700">
              <TrendingUp className="h-4 w-4" />
              <span>
                {dictionary.landing.dashboard.userAnalytics.trendingUp}
              </span>
            </div>
            <div className="text-muted-foreground leading-none text-xs">
              {dictionary.landing.dashboard.userAnalytics.engagementMetrics}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
