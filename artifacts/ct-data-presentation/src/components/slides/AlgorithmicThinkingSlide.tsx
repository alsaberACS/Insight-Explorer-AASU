import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download } from "lucide-react";
import { HeartData } from "@/lib/data";
import { Button } from "@/components/ui/button";
import RStudioPane from "@/components/RStudioPane";

const R_BLOCKS_CODE = `# ------------------------------------------------------------
# Every algorithm is built from three blocks:
#   SEQUENCE - do steps in order
#   SELECTION - choose a path (if / else)
#   ITERATION - repeat (for / while)
# ------------------------------------------------------------
heart <- read.csv("heart.csv")
heart <- heart[!duplicated(heart), ]   # 302 unique patients

# SEQUENCE + ITERATION: compute the mean age "by hand"
total <- 0
for (a in heart$age) {
  total <- total + a
}
total / nrow(heart)

mean(heart$age)   # R's built-in agrees

# SELECTION: classify one patient
age <- heart$age[1]
if (age > 55) "older group" else "younger group"`;

const R_DIAGNOSTIC_CODE = `# ------------------------------------------------------------
# A hand-made diagnostic algorithm
#   1. Take three signals discovered during exploration
#   2. Turn them into an exact, testable rule
#   3. Check the rule against the real diagnoses
# ------------------------------------------------------------
heart <- read.csv("heart.csv")
heart <- heart[!duplicated(heart), ]

# The rule: predict "disease" when the patient has
# non-typical chest pain OR (high max heart rate AND low ST depression)
predicted <- ifelse(heart$cp > 0 |
                    (heart$thalach > 150 & heart$oldpeak < 1),
                    1, 0)

# How well does our 3-line algorithm do?
table(predicted = predicted, actual = heart$target)

mean(predicted == heart$target)   # accuracy`;

const CONCEPTS = [
  { name: "Sequence", desc: "Steps run in a fixed order" },
  { name: "Selection", desc: "Branch on a condition (if / else)" },
  { name: "Iteration", desc: "Repeat until done (for / while)" },
];

const TABS: { key: string; label: string; code: string }[] = [
  { key: "blocks", label: "1. The Three Building Blocks", code: R_BLOCKS_CODE },
  { key: "diagnostic", label: "2. A Hand-Made Diagnostic Algorithm", code: R_DIAGNOSTIC_CODE },
];

export default function AlgorithmicThinkingSlide({ data: _data }: { data: HeartData[] }) {
  const [tab, setTab] = useState(0);
  const current = TABS[tab];

  return (
    <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center">
      <div className="mb-4">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm uppercase tracking-[0.25em] text-primary font-semibold mb-1.5"
        >
          Pillar 4, Up Close
        </motion.p>
        <div className="flex items-start justify-between gap-4">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold mb-2"
          >
            Algorithmic Thinking
          </motion.h2>
          <motion.a
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            href={`${import.meta.env.BASE_URL}heart.csv`}
            download="heart.csv"
            className="flex-none inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 text-primary px-4 py-2 text-sm font-semibold hover:bg-primary/20 transition-colors mt-1"
            aria-label="Download the heart.csv dataset"
          >
            <Download className="w-4 h-4" />
            heart.csv
          </motion.a>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-base text-muted-foreground max-w-4xl"
        >
          An algorithm is a precise, finite, repeatable recipe. Every one — from a cake recipe
          to a neural network — is assembled from just three building blocks.
        </motion.p>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        {CONCEPTS.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="rounded-xl border border-border bg-card px-4 py-2.5 flex items-baseline gap-2.5 shadow-sm"
          >
            <span className="font-bold text-primary text-sm">{c.name}</span>
            <span className="text-xs text-muted-foreground leading-snug">{c.desc}</span>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center gap-2 mb-3 flex-wrap">
        {TABS.map((t, i) => (
          <Button
            key={t.key}
            variant={i === tab ? "default" : "outline"}
            size="sm"
            onClick={() => setTab(i)}
            className="rounded-full px-4"
          >
            {t.label}
          </Button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.key}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="flex-none"
        >
          <RStudioPane initialCode={current.code} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
