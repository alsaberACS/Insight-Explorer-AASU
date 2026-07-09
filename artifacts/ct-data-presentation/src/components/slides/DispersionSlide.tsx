import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartData } from "@/lib/data";
import RStudioPane from "@/components/RStudioPane";

const MEASURES = [
  {
    id: "range",
    name: "Range",
    hint: "max − min",
    desc: "The full span, but two patients define it entirely.",
    value: "438",
    label: "126 to 564 mg/dl"
  },
  {
    id: "iqr",
    name: "IQR",
    hint: "Q3 − Q1",
    desc: "The middle 50% of patients — outliers can't touch it.",
    value: "64",
    label: "211 to 275 mg/dl"
  },
  {
    id: "var",
    name: "Variance",
    hint: "mean of squared deviations",
    desc: "The workhorse of statistics, but in squared units (mg/dl²).",
    value: "2,662",
    label: "s² of cholesterol"
  },
  {
    id: "sd",
    name: "Std. Deviation",
    hint: "√variance",
    desc: "Back in the original units — the typical distance from the mean.",
    value: "51.6",
    label: "mg/dl around the mean of 246"
  }
];

const R_DISPERSION_CODE = `# ------------------------------------------------------------
# Measures of dispersion: how spread out is cholesterol?
# ------------------------------------------------------------
heart <- read.csv("heart.csv")

range(heart$chol)    # 126 564  -- full span
diff(range(heart$chol))          # 438

IQR(heart$chol)      # 64  -- middle 50% of patients
quantile(heart$chol) # the five-number summary

var(heart$chol)      # 2661.79  (mg/dl squared!)
sd(heart$chol)       # 51.59    -- back in mg/dl

# Shape: skewness and excess kurtosis (base R, no packages)
z <- heart$chol - mean(heart$chol)
n <- length(z)
sum(z^3)/n / (sum(z^2)/n)^1.5       # skewness  = 1.07
sum(z^4)/n / (sum(z^2)/n)^2 - 3     # excess kurtosis = 3.97

hist(heart$chol, breaks = 30,
     main = "Serum cholesterol", xlab = "mg/dl",
     col = "#14b8a6", border = "white")`;

export default function DispersionSlide({ data: _data }: { data: HeartData[] }) {
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
        <h2 className="text-4xl font-bold mb-2">Measures of Dispersion</h2>
        <p className="text-lg text-muted-foreground">
          Two datasets can share a mean and be wildly different — spread is half the story. Our example: <span className="font-semibold text-foreground">cholesterol</span>.
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {!showR ? (
          <motion.div
            key="cards"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="grid grid-cols-4 gap-4 mb-5">
              {MEASURES.map((m, i) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="rounded-2xl border border-border bg-card shadow-sm p-5 flex flex-col"
                >
                  <span className="self-start text-[11px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full mb-2 bg-primary/15 text-primary">
                    {m.hint}
                  </span>
                  <h3 className="text-lg font-bold mb-1">{m.name}</h3>
                  <p className="text-sm text-muted-foreground leading-snug mb-3">{m.desc}</p>
                  <div className="mt-auto">
                    {revealed[m.id] ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="rounded-xl border border-primary/30 bg-primary/10 p-3 text-center"
                      >
                        <p className="text-2xl font-bold">{m.value}</p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">{m.label}</p>
                      </motion.div>
                    ) : (
                      <button
                        onClick={() => setRevealed(prev => ({ ...prev, [m.id]: true }))}
                        className="w-full py-3 rounded-xl border border-border bg-secondary/50 font-semibold text-sm hover:bg-secondary transition-colors"
                      >
                        Reveal
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 gap-4 mb-5"
            >
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="text-sm">
                  <span className="font-bold text-primary">Skewness = 1.07</span>
                  <span className="text-muted-foreground"> — a long right tail: most patients sit near 240, a few climb toward 564. When skewed, </span>
                  <span className="text-foreground/80 font-medium">report the median, not the mean.</span>
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="text-sm">
                  <span className="font-bold text-primary">Excess kurtosis = 3.97</span>
                  <span className="text-muted-foreground"> — heavier tails than a normal curve: extreme cholesterol values occur </span>
                  <span className="text-foreground/80 font-medium">more often than a bell curve would predict.</span>
                </p>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="rpane"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-5"
          >
            <RStudioPane initialCode={R_DISPERSION_CODE} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex items-center justify-center"
      >
        <button
          onClick={() => setShowR(v => !v)}
          className="px-5 py-2.5 rounded-xl font-semibold text-sm border border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
        >
          {showR ? "Back to the four measures" : "Compute them live in R (with a histogram)"}
        </button>
      </motion.div>
    </div>
  );
}
