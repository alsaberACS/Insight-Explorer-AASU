import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartData } from "@/lib/data";
import { Button } from "@/components/ui/button";
import RStudioPane from "@/components/RStudioPane";

const R_DECOMPOSITION = `# ------------------------------------------------------------
# DECOMPOSITION
# Big question: "Who is at risk of heart disease?"
# Too big to answer at once - so break it into small questions.
# ------------------------------------------------------------
heart <- read.csv("heart.csv")
heart <- heart[!duplicated(heart), ]   # 302 unique patients

# Q1: Does age differ between the two groups?
tapply(heart$age, heart$target, mean)

# Q2: Does maximum heart rate differ?
tapply(heart$thalach, heart$target, mean)

# Q3: Does chest-pain type matter?
round(prop.table(table(cp = heart$cp, disease = heart$target), 1), 2)`;

const R_PATTERN = `# ------------------------------------------------------------
# PATTERN RECOGNITION
# Which variables move together with the diagnosis?
# ------------------------------------------------------------
heart <- read.csv("heart.csv")
heart <- heart[!duplicated(heart), ]

# Correlations with the target (1 = disease)
round(cor(heart[, c("age", "thalach", "oldpeak", "target")]), 2)

# Pattern: disease rate across age bands
heart$ageband <- cut(heart$age, breaks = c(28, 45, 55, 65, 80))
round(prop.table(table(heart$ageband, heart$target), 1), 2)`;

const R_ABSTRACTION = `# ------------------------------------------------------------
# ABSTRACTION
# 14 variables -> keep only the signals that matter,
# then hide the detail inside a reusable function.
# ------------------------------------------------------------
heart <- read.csv("heart.csv")
heart <- heart[!duplicated(heart), ]

# Abstract away 10 columns; keep the 4 strongest signals + target
key <- heart[, c("age", "cp", "thalach", "oldpeak", "target")]
head(key)

# A function IS an abstraction: name the idea, hide the steps
risk_summary <- function(df) {
  aggregate(cbind(age, thalach, oldpeak) ~ target, data = df, FUN = mean)
}
risk_summary(key)`;

const R_ALGORITHM = `# ------------------------------------------------------------
# ALGORITHM DESIGN
# Turn the patterns into an exact, testable rule.
# ------------------------------------------------------------
heart <- read.csv("heart.csv")
heart <- heart[!duplicated(heart), ]

# Rule: predict disease when the patient has non-typical chest
# pain OR (high max heart rate AND low ST depression)
predicted <- ifelse(heart$cp > 0 |
                    (heart$thalach > 150 & heart$oldpeak < 1),
                    1, 0)

table(predicted = predicted, actual = heart$target)
mean(predicted == heart$target)   # accuracy of our rule`;

const TABS: { key: string; label: string; code: string; hint: string }[] = [
  {
    key: "decomposition",
    label: "1. Decomposition",
    code: R_DECOMPOSITION,
    hint: "One big question becomes three small, answerable ones.",
  },
  {
    key: "pattern",
    label: "2. Pattern Recognition",
    code: R_PATTERN,
    hint: "Correlations and cross-tables reveal what moves with the diagnosis.",
  },
  {
    key: "abstraction",
    label: "3. Abstraction",
    code: R_ABSTRACTION,
    hint: "Fourteen columns shrink to four signals wrapped in one function.",
  },
  {
    key: "algorithm",
    label: "4. Algorithm Design",
    code: R_ALGORITHM,
    hint: "The patterns become a precise rule we can score for accuracy.",
  },
];

export default function CTHandsOnSlide({ data: _data }: { data: HeartData[] }) {
  const [tab, setTab] = useState(0);
  const current = TABS[tab];

  return (
    <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center">
      <div className="text-center mb-4">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm uppercase tracking-[0.25em] text-primary font-semibold mb-1.5"
        >
          Hands-On
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold mb-1.5"
        >
          The Four Pillars, Live in R
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-base text-muted-foreground"
        >
          One pillar per tab, applied to our real heart disease dataset — every script runs.
        </motion.p>
      </div>

      <div className="flex items-center justify-center gap-2 mb-3 flex-wrap">
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
          <p className="text-sm text-center text-muted-foreground mb-2.5 italic">{current.hint}</p>
          <RStudioPane initialCode={current.code} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
