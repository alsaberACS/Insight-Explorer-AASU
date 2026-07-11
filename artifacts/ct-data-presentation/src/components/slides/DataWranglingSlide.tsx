import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Columns3, Wand2, Sigma, ArrowDownWideNarrow } from "lucide-react";
import { HeartData } from "@/lib/data";
import RStudioPane from "@/components/RStudioPane";

const R_FILTER = `heart <- read.csv("heart.csv")
heart <- heart[!duplicated(heart), ]

# FILTER: keep only the rows the question needs
women <- heart[heart$sex == 0, ]
nrow(women)                        # female patients only

seniors <- subset(heart, age > 60 & target == 1)
nrow(seniors)                      # over-60s with disease`;

const R_SELECT = `heart <- read.csv("heart.csv")
heart <- heart[!duplicated(heart), ]

# SELECT: keep only the columns that matter
vitals <- heart[, c("age", "trestbps", "chol", "thalach")]
head(vitals, 4)

# 14 columns shrink to the 4 this question needs`;

const R_TRANSFORM = `heart <- read.csv("heart.csv")
heart <- heart[!duplicated(heart), ]

# TRANSFORM: create new variables from old ones
heart$chol_mmol <- round(heart$chol / 38.67, 1)  # US -> SI units
heart$agegroup  <- ifelse(heart$age >= 60, "60+", "under 60")

head(heart[, c("age", "agegroup", "chol", "chol_mmol")], 4)`;

const R_AGGREGATE = `heart <- read.csv("heart.csv")
heart <- heart[!duplicated(heart), ]

# AGGREGATE: collapse rows into group summaries
aggregate(cbind(age, chol, thalach) ~ target,
          data = heart, FUN = mean)

# two rows now summarise 302 patients`;

const R_SORT = `heart <- read.csv("heart.csv")
heart <- heart[!duplicated(heart), ]

# SORT: order rows to surface the extremes
top <- heart[order(-heart$chol),
             c("age", "sex", "chol", "target")]
head(top, 5)      # five highest cholesterol readings`;

const VERBS = [
  {
    key: "filter",
    icon: Filter,
    label: "Filter",
    desc: "keep the right rows",
    code: R_FILTER,
  },
  {
    key: "select",
    icon: Columns3,
    label: "Select",
    desc: "keep the right columns",
    code: R_SELECT,
  },
  {
    key: "transform",
    icon: Wand2,
    label: "Transform",
    desc: "derive new variables",
    code: R_TRANSFORM,
  },
  {
    key: "aggregate",
    icon: Sigma,
    label: "Aggregate",
    desc: "summarise by group",
    code: R_AGGREGATE,
  },
  {
    key: "sort",
    icon: ArrowDownWideNarrow,
    label: "Sort",
    desc: "order to see extremes",
    code: R_SORT,
  },
];

export default function DataWranglingSlide({ data: _data }: { data: HeartData[] }) {
  const [verb, setVerb] = useState(0);
  const current = VERBS[verb];

  return (
    <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center">
      <div className="mb-3">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm uppercase tracking-[0.25em] text-primary font-semibold mb-1"
        >
          Dealing with Data 5 of 6
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold mb-1"
        >
          Data Wrangling
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-base text-muted-foreground"
        >
          Five verbs cover most of the reshaping an analyst ever does — combine them and the data
          fits the question.
        </motion.p>
      </div>

      <div className="flex items-stretch gap-2 mb-3 flex-wrap">
        {VERBS.map((v, i) => (
          <motion.button
            key={v.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.07 }}
            onClick={() => setVerb(i)}
            aria-pressed={verb === i}
            className={`flex-1 min-w-[140px] rounded-xl border px-3 py-2 text-left transition-all ${
              verb === i
                ? "border-primary/60 bg-primary/10 shadow-sm"
                : "border-border bg-card hover:border-primary/40"
            }`}
          >
            <span className="flex items-center gap-2">
              <span
                className={`flex-none w-7 h-7 rounded-lg flex items-center justify-center ${
                  verb === i ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                }`}
              >
                <v.icon className="w-3.5 h-3.5" />
              </span>
              <span>
                <span className="block font-bold text-sm leading-tight">{v.label}</span>
                <span className="block text-[11px] text-muted-foreground leading-tight">
                  {v.desc}
                </span>
              </span>
            </span>
          </motion.button>
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
