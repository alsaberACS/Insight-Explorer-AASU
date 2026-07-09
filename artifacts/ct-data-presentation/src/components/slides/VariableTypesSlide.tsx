import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartData } from "@/lib/data";

const TYPES = [
  {
    id: "nominal",
    name: "Nominal",
    family: "Qualitative",
    tagline: "Names or labels with no order",
    examples: "Gender, zip code, marital status, brand name",
    heart: "sex (0 = female, 1 = male), cp (chest pain type)",
    stats: "Mode only — a mean of chest pain types makes no sense",
    color: "border-chart-4/40 bg-chart-4/10",
    chip: "bg-chart-4/15 text-chart-4"
  },
  {
    id: "ordinal",
    name: "Ordinal",
    family: "Qualitative",
    tagline: "Labels with a meaningful order, unknown magnitude",
    examples: "Satisfaction ratings (1–5), drink size (S / M / L), movie stars",
    heart: "slope of the ST segment (upsloping, flat, downsloping)",
    stats: "Mode and median — the mean still can't be computed",
    color: "border-chart-2/40 bg-chart-2/10",
    chip: "bg-chart-2/15 text-chart-2"
  },
  {
    id: "interval",
    name: "Interval",
    family: "Quantitative",
    tagline: "Equal-sized units, but no true zero",
    examples: "Temperature in °C, birth year",
    heart: "Add and subtract, but 0 °C doesn't mean \"no temperature\"",
    stats: "Mean, median, mode — but no ratios (÷ and × undefined)",
    color: "border-chart-3/40 bg-chart-3/10",
    chip: "bg-chart-3/15 text-chart-3"
  },
  {
    id: "ratio",
    name: "Ratio",
    family: "Quantitative",
    tagline: "Equal-sized units with an inherent true zero",
    examples: "Height, weight, years of experience, Kelvin temperature",
    heart: "age, trestbps (resting BP), chol (cholesterol), thalach (max heart rate)",
    stats: "All operations: mean, median, mode, ratios, differences",
    color: "border-primary/40 bg-primary/10",
    chip: "bg-primary/15 text-primary"
  }
];

export default function VariableTypesSlide({ data: _data }: { data: HeartData[] }) {
  const [active, setActive] = useState<string | null>(null);
  const activeType = TYPES.find(t => t.id === active);

  return (
    <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center">
      <div className="mb-6">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold mb-2"
        >
          Variables & Their Types
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-muted-foreground"
        >
          One concept, four names: statisticians say <span className="font-semibold text-foreground">variable</span>, ML engineers say <span className="font-semibold text-foreground">feature</span>, warehousing says <span className="font-semibold text-foreground">dimension</span>, databases say <span className="font-semibold text-foreground">attribute</span>. Its type decides which analysis is valid.
        </motion.p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-5">
        {TYPES.map((t, i) => (
          <motion.button
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + i * 0.08 }}
            onClick={() => setActive(active === t.id ? null : t.id)}
            aria-pressed={active === t.id}
            className={`rounded-2xl border p-4 text-left transition-all bg-card shadow-sm hover:shadow-md ${
              active === t.id ? `${t.color} ring-2 ring-primary/30` : "border-border"
            }`}
          >
            <span className={`inline-block text-[11px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full mb-2 ${t.chip}`}>
              {t.family}
            </span>
            <h3 className="text-lg font-bold">{t.name}</h3>
            <p className="text-sm text-muted-foreground mt-1 leading-snug">{t.tagline}</p>
          </motion.button>
        ))}
      </div>

      <div className="min-h-[128px] mb-5">
        <AnimatePresence mode="wait">
          {activeType ? (
            <motion.div
              key={activeType.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className={`rounded-2xl border p-5 grid grid-cols-3 gap-6 ${activeType.color}`}
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Examples</p>
                <p className="text-sm text-foreground/90">{activeType.examples}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">In our heart dataset</p>
                <p className="text-sm text-foreground/90">{activeType.heart}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Valid statistics</p>
                <p className="text-sm text-foreground/90">{activeType.stats}</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-2xl border border-dashed border-border h-full min-h-[128px] flex items-center justify-center text-sm text-muted-foreground"
            >
              Select a type to see examples, heart-dataset columns, and which statistics are valid
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="grid grid-cols-2 gap-4"
      >
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm">
            <span className="font-bold text-primary">Discrete</span>
            <span className="text-muted-foreground"> — countable values; fractions make no sense. </span>
            <span className="text-foreground/80">Students in a class, cars sold, number of major vessels (ca).</span>
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm">
            <span className="font-bold text-primary">Continuous</span>
            <span className="text-muted-foreground"> — measured values; any real number possible. </span>
            <span className="text-foreground/80">Height, weight, cholesterol level, ST depression (oldpeak).</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
