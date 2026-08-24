import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { StressorSlice } from "@/lib/school-pulse-data";

const axis = {
  stroke: "var(--muted-foreground)",
  fontSize: 12,
  tickLine: false,
  axisLine: false,
};

const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid var(--border)",
  background: "var(--popover)",
  color: "var(--popover-foreground)",
  fontSize: 12,
  boxShadow: "var(--shadow-soft)",
};

export function StressTrendChart({
  data,
}: {
  data: { label: string; short: string; stress: number }[];
}) {
  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
          <defs>
            <linearGradient id="stressFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.35} />
              <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="short" {...axis} />
          <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} {...axis} />
          <Tooltip
            contentStyle={tooltipStyle}
            cursor={{ stroke: "var(--border)" }}
            formatter={(v: number) => [`${v}%`, "Average stress"]}
            labelFormatter={(_, p) => p?.[0]?.payload?.label ?? ""}
          />
          <Area
            type="monotone"
            dataKey="stress"
            stroke="var(--chart-1)"
            strokeWidth={3}
            fill="url(#stressFill)"
            dot={{ r: 4, fill: "var(--card)", stroke: "var(--chart-1)", strokeWidth: 2 }}
            activeDot={{ r: 6 }}
            animationDuration={900}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function StressSourcesDonut({
  data,
  onSelect,
  selected,
}: {
  data: StressorSlice[];
  onSelect?: (s: StressorSlice) => void;
  selected?: string | null;
}) {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius="58%"
            outerRadius="86%"
            paddingAngle={3}
            cornerRadius={6}
            animationDuration={900}
            onClick={(_, i) => onSelect?.(data[i])}
            onMouseEnter={(_, i) => setHover(i)}
            onMouseLeave={() => setHover(null)}
          >
            {data.map((entry, i) => (
              <Cell
                key={entry.key}
                fill={entry.colorVar}
                stroke="var(--card)"
                strokeWidth={2}
                opacity={hover === null || hover === i || selected === entry.key ? 1 : 0.55}
                className="cursor-pointer outline-none"
              />
            ))}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} formatter={(v: number, n) => [`${v}%`, n as string]} />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            wrapperStyle={{ fontSize: 12, color: "var(--muted-foreground)" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ComparisonBars({
  data,
  color = "var(--chart-1)",
}: {
  data: { label: string; value: number }[];
  color?: string;
}) {
  return (
    <div className="h-[260px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
          <XAxis dataKey="label" {...axis} interval={0} tick={{ fontSize: 11 }} />
          <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} {...axis} />
          <Tooltip
            contentStyle={tooltipStyle}
            cursor={{ fill: "var(--muted)" }}
            formatter={(v: number) => [`${v}%`, "Share"]}
          />
          <Bar dataKey="value" radius={[8, 8, 0, 0]} fill={color} animationDuration={800} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
