import { useState } from "react";
import { motion } from "framer-motion";
import { Puzzle, ScanSearch, Layers, Workflow, ChevronRight } from "lucide-react";
import { HeartData } from "@/lib/data";

type MethodId = "kdd" | "semma" | "crisp" | "std";

const METHOD_STYLES: Record<
  MethodId,
  { chip: string; ring: string; name: string; dot: string }
> = {
  kdd: {
    name: "KDD",
    chip: "bg-chart-1/15 text-chart-1",
    ring: "ring-2 ring-chart-1/60",
    dot: "bg-chart-1",
  },
  semma: {
    name: "SEMMA",
    chip: "bg-chart-3/15 text-chart-3",
    ring: "ring-2 ring-chart-3/60",
    dot: "bg-chart-3",
  },
  crisp: {
    name: "CRISP-DM",
    chip: "bg-chart-4/15 text-chart-4",
    ring: "ring-2 ring-chart-4/60",
    dot: "bg-chart-4",
  },
  std: {
    name: "Standard Process",
    chip: "bg-primary/15 text-primary",
    ring: "ring-2 ring-primary/60",
    dot: "bg-primary",
  },
};

const ROWS: {
  pillar: string;
  icon: typeof Puzzle;
  how: string;
  phases: { label: string; m: MethodId }[];
}[] = [
  {
    pillar: "Decomposition",
    icon: Puzzle,
    how: "Framing the problem and carving it into manageable pieces",
    phases: [
      { label: "Business Understanding", m: "crisp" },
      { label: "Data Selection", m: "kdd" },
      { label: "Sample", m: "semma" },
      { label: "Collecting Data", m: "std" },
    ],
  },
  {
    pillar: "Pattern Recognition",
    icon: ScanSearch,
    how: "Searching the data for regularities, trends, and associations",
    phases: [
      { label: "Data Mining", m: "kdd" },
      { label: "Explore", m: "semma" },
      { label: "Data Understanding", m: "crisp" },
      { label: "Analyzing & Insights", m: "std" },
    ],
  },
  {
    pillar: "Abstraction",
    icon: Layers,
    how: "Keeping the signal, discarding the noise, generalising the essentials",
    phases: [
      { label: "Data Transformation", m: "kdd" },
      { label: "Modify", m: "semma" },
      { label: "Data Preparation", m: "crisp" },
      { label: "Preprocessing", m: "std" },
    ],
  },
  {
    pillar: "Algorithm Design",
    icon: Workflow,
    how: "Turning insight into precise, repeatable, testable procedures",
    phases: [
      { label: "Modeling", m: "crisp" },
      { label: "Model", m: "semma" },
      { label: "Assess", m: "semma" },
      { label: "Pattern Evaluation", m: "kdd" },
      { label: "Interpretation", m: "std" },
    ],
  },
];

const LEGEND: MethodId[] = ["kdd", "semma", "crisp", "std"];

export default function CTMethodologySlide({ data: _data }: { data: HeartData[] }) {
  const [focus, setFocus] = useState<MethodId | null>(null);

  return (
    <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center">
      <div className="mb-4 flex items-end justify-between gap-6 flex-wrap">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold mb-2"
          >
            Thinking Meets <span className="text-primary">Process</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-3xl"
          >
            Computational thinking is{" "}
            <span className="font-semibold text-foreground">how you think</span>; a methodology
            is <span className="font-semibold text-foreground">how you work</span>.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="flex items-center gap-2 flex-wrap"
        >
          {LEGEND.map((id) => {
            const s = METHOD_STYLES[id];
            const active = focus === id;
            return (
              <button
                key={id}
                onClick={() => setFocus(active ? null : id)}
                className={`inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${s.chip} ${
                  active
                    ? `${s.ring} border-transparent scale-105`
                    : focus
                      ? "opacity-40 border-transparent hover:opacity-70"
                      : "border-transparent hover:scale-105"
                }`}
                aria-pressed={active}
                aria-label={`Highlight ${s.name} phases`}
              >
                <span className={`w-2 h-2 rounded-full ${s.dot}`} />
                {s.name}
              </button>
            );
          })}
        </motion.div>
      </div>

      <div className="flex flex-col gap-3 mb-4">
        {ROWS.map((row, i) => (
          <motion.div
            key={row.pillar}
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.12, type: "spring", stiffness: 120, damping: 18 }}
            className="relative grid grid-cols-[260px_auto_1fr] gap-4 items-center rounded-2xl border border-border bg-card p-4 shadow-sm overflow-hidden"
          >
            <div
              className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-primary/70 to-primary/20"
              aria-hidden="true"
            />
            <div className="flex items-center gap-3 pl-2">
              <span className="flex-none w-11 h-11 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 text-primary flex items-center justify-center">
                <row.icon className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-bold text-primary leading-tight">{row.pillar}</h3>
                <p className="text-xs text-muted-foreground leading-snug mt-0.5">{row.how}</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground/50" aria-hidden="true" />
            <div className="flex flex-wrap gap-2">
              {row.phases.map((p, j) => {
                const s = METHOD_STYLES[p.m];
                const dimmed = focus !== null && focus !== p.m;
                const lit = focus === p.m;
                return (
                  <motion.span
                    key={p.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: dimmed ? 0.25 : 1, scale: lit ? 1.08 : 1 }}
                    transition={{
                      opacity: {
                        duration: 0.2,
                        delay: focus === null ? 0.45 + i * 0.12 + j * 0.05 : 0,
                      },
                      scale: { type: "spring", stiffness: 300, damping: 20 },
                    }}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-shadow ${s.chip} ${
                      lit ? `${s.ring} shadow-md` : ""
                    }`}
                  >
                    {p.label}
                  </motion.span>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.95 }}
        className="relative overflow-hidden text-sm font-medium text-center py-3.5 px-6 rounded-xl border border-primary/25 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10"
      >
        <span className="text-foreground/90">
          A methodology tells you <span className="text-primary font-bold">which phase</span> you
          are in — computational thinking tells you{" "}
          <span className="text-primary font-bold">what to do</span> inside that phase.
        </span>
      </motion.div>
    </div>
  );
}
