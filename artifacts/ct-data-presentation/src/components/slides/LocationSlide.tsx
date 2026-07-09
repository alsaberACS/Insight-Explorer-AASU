import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartData } from "@/lib/data";
import RStudioPane from "@/components/RStudioPane";

const MEASURES = [
  {
    id: "mean",
    name: "Mean",
    formulaHint: "sum of values ÷ n",
    desc: "The arithmetic average. Powerful, but sensitive to outliers — one extreme cholesterol of 564 pulls it upward.",
    value: "54.43",
    label: "mean age (years)",
    color: "border-primary/40 bg-primary/10",
    chip: "bg-primary/15 text-primary"
  },
  {
    id: "median",
    name: "Median",
    formulaHint: "the middle value (50th percentile)",
    desc: "Half the patients are younger, half are older. Robust to outliers — often the safer number to report.",
    value: "56",
    label: "median age (years)",
    color: "border-chart-2/40 bg-chart-2/10",
    chip: "bg-chart-2/15 text-chart-2"
  },
  {
    id: "mode",
    name: "Mode",
    formulaHint: "the most frequent value",
    desc: "The only sensible \"center\" for categorical data — the modal chest-pain type, the modal age.",
    value: "58",
    label: "modal age (years)",
    color: "border-chart-3/40 bg-chart-3/10",
    chip: "bg-chart-3/15 text-chart-3"
  }
];

const R_LOCATION_CODE = `# ------------------------------------------------------------
# Measures of location: where is the center of age?
# ------------------------------------------------------------
heart <- read.csv("heart.csv")

mean(heart$age)      # 54.43  -- the arithmetic average
median(heart$age)    # 56     -- the middle patient

# R has no built-in mode() for data -- a one-liner does it:
tbl <- table(heart$age)
as.numeric(names(tbl)[which.max(tbl)])   # 58, the most common age

summary(heart$age)   # min, quartiles, median, mean, max at once`;

export default function LocationSlide({ data: _data }: { data: HeartData[] }) {
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [showR, setShowR] = useState(false);

  return (
    <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <p className="text-sm uppercase tracking-[0.25em] text-primary font-semibold mb-2">
          Descriptive Statistics
        </p>
        <h2 className="text-4xl font-bold mb-2">Measures of Location</h2>
        <p className="text-lg text-muted-foreground">
          Three ways to answer one question: what is a <span className="font-semibold text-foreground">typical</span> value? Guess each one for age, then reveal.
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {!showR ? (
          <motion.div
            key="cards"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-3 gap-5 mb-6"
          >
            {MEASURES.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="rounded-2xl border border-border bg-card shadow-sm p-6 flex flex-col"
              >
                <span className={`self-start text-[11px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full mb-3 ${m.chip}`}>
                  {m.formulaHint}
                </span>
                <h3 className="text-2xl font-bold mb-2">{m.name}</h3>
                <p className="text-sm text-muted-foreground leading-snug mb-4">{m.desc}</p>
                <div className="mt-auto">
                  {revealed[m.id] ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`rounded-xl border p-4 text-center ${m.color}`}
                    >
                      <p className="text-3xl font-bold">{m.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{m.label}</p>
                    </motion.div>
                  ) : (
                    <button
                      onClick={() => setRevealed(prev => ({ ...prev, [m.id]: true }))}
                      className="w-full py-3.5 rounded-xl border border-border bg-secondary/50 font-semibold text-sm hover:bg-secondary transition-colors"
                    >
                      Reveal for age
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="rpane"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6"
          >
            <RStudioPane initialCode={R_LOCATION_CODE} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="flex items-center justify-center gap-4"
      >
        <button
          onClick={() => setShowR(v => !v)}
          className="px-5 py-2.5 rounded-xl font-semibold text-sm border border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
        >
          {showR ? "Back to the three measures" : "Compute them live in R"}
        </button>
        <p className="text-sm text-muted-foreground">
          Mean 54.4 &lt; median 56 — the age distribution leans slightly toward younger patients.
        </p>
      </motion.div>
    </div>
  );
}
