import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartData } from "@/lib/data";
import { Button } from "@/components/ui/button";
import RStudioPane from "@/components/RStudioPane";

const R_EXPLORE = `# ------------------------------------------------------------
# STEP 1 - EXPLORE: meet the dataset before analysing it
# ------------------------------------------------------------
heart <- read.csv("heart.csv")

dim(heart)            # rows and columns
str(heart[, 1:6])     # structure of the first six variables
head(heart[, 1:6])    # the first few patients`;

const R_SUMMARISE = `# ------------------------------------------------------------
# STEP 2 - SUMMARISE: location and dispersion on real variables
# ------------------------------------------------------------
heart <- read.csv("heart.csv")
heart <- heart[!duplicated(heart), ]   # clean first, always

mean(heart$age)                 # average patient age
median(heart$chol)              # typical cholesterol
sd(heart$trestbps)              # spread of resting blood pressure

# Summarise by group: cholesterol for healthy vs disease
tapply(heart$chol, heart$target, mean)`;

const R_VISUALIZE = `# ------------------------------------------------------------
# STEP 3 - VISUALIZE: one chart, one clinical question
# ------------------------------------------------------------
heart <- read.csv("heart.csv")
heart <- heart[!duplicated(heart), ]

# Does maximum heart rate differ with disease status?
boxplot(thalach ~ target, data = heart,
        names = c("No disease", "Disease"),
        col = c("#9fd8cb", "#0f766e"),
        main = "Max Heart Rate by Disease Status",
        ylab = "Max heart rate (bpm)")`;

const TABS = [
  {
    key: "explore",
    label: "1. Explore",
    code: R_EXPLORE,
    hint: "Structure first — you cannot analyse what you have not inspected.",
  },
  {
    key: "summarise",
    label: "2. Summarise",
    code: R_SUMMARISE,
    hint: "Location, dispersion, and a group comparison in five lines of base R.",
  },
  {
    key: "visualize",
    label: "3. Visualize",
    code: R_VISUALIZE,
    hint: "A boxplot answers the clinical question faster than any table.",
  },
];

export default function RStudioHandsOnSlide({ data: _data }: { data: HeartData[] }) {
  const [tab, setTab] = useState(0);
  const current = TABS[tab];

  return (
    <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center">
      <div className="mb-3">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm uppercase tracking-[0.25em] text-primary font-semibold mb-1"
        >
          Goal 6 · Hands-On
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold mb-1"
        >
          RStudio Lab: The Heart Disease Dataset
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-base text-muted-foreground"
        >
          Explore, summarise, visualize — the full workflow on 1,025 real patient records.
        </motion.p>
      </div>

      <div className="flex items-center gap-2 mb-2.5 flex-wrap">
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
        <p className="text-sm text-muted-foreground italic ml-2">{current.hint}</p>
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
