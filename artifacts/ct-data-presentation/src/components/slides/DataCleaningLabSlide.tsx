import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { HeartData } from "@/lib/data";
import { Button } from "@/components/ui/button";
import RStudioPane from "@/components/RStudioPane";

const R_DUPLICATES = `# ------------------------------------------------------------
# DUPLICATES: the same patient counted twice tilts every result
# ------------------------------------------------------------
heart <- read.csv("heart.csv")
nrow(heart)               # 1025 rows arrived...
sum(duplicated(heart))    # ...how many are exact copies?

heart <- heart[!duplicated(heart), ]
nrow(heart)               # 302 unique patients remain`;

const R_IMPOSSIBLE = `# ------------------------------------------------------------
# IMPOSSIBLE CODES: values the codebook says cannot exist
# ------------------------------------------------------------
heart <- read.csv("heart.csv")
heart <- heart[!duplicated(heart), ]

table(heart$ca)     # codebook: 0-3 valid, 4 is an error code
table(heart$thal)   # codebook: 1-3 valid, 0 is an error code

heart <- heart[heart$ca != 4 & heart$thal != 0, ]
nrow(heart)         # 296 patients we can trust`;

const R_MISSING = `# ------------------------------------------------------------
# MISSING VALUES: the holes real data always has
# ------------------------------------------------------------
heart <- read.csv("heart.csv")
colSums(is.na(heart))[1:5]   # heart.csv has none - a rare luxury

# Real data is rarely so kind. Simulate some holes:
set.seed(1)
heart$chol[sample(1:nrow(heart), 25)] <- NA
sum(is.na(heart$chol))            # 25 readings now missing

mean(heart$chol)                  # NA poisons the answer...
mean(heart$chol, na.rm = TRUE)    # ...unless handled explicitly`;

const TABS = [
  {
    key: "dup",
    label: "1. Duplicates",
    code: R_DUPLICATES,
    hint: "1,025 rows arrived, but most are copies — deduplication is always step one.",
  },
  {
    key: "codes",
    label: "2. Impossible Codes",
    code: R_IMPOSSIBLE,
    hint: "The codebook defines what can exist; ca = 4 and thal = 0 cannot.",
  },
  {
    key: "missing",
    label: "3. Missing Values",
    code: R_MISSING,
    hint: "One NA silently poisons a whole calculation until you decide how to treat it.",
  },
];

const PIPELINE = [
  { n: "1,025", label: "rows collected" },
  { n: "302", label: "unique patients" },
  { n: "296", label: "valid records" },
];

export default function DataCleaningLabSlide({ data: _data }: { data: HeartData[] }) {
  const [tab, setTab] = useState(0);
  const current = TABS[tab];

  return (
    <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center">
      <div className="mb-3 flex items-end justify-between gap-6 flex-wrap">
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm uppercase tracking-[0.25em] text-primary font-semibold mb-1"
          >
            Dealing with Data 4 of 6
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold mb-1"
          >
            Data Cleaning
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-base text-muted-foreground"
          >
            Our own dataset needed all three repairs — run each one live.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="flex items-center gap-2 rounded-xl border border-primary/25 bg-primary/5 px-4 py-2.5"
        >
          {PIPELINE.map((s, i) => (
            <span key={s.label} className="inline-flex items-center gap-2">
              <span className="text-center">
                <span className="block text-xl font-bold text-primary leading-none">{s.n}</span>
                <span className="block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mt-0.5">
                  {s.label}
                </span>
              </span>
              {i < PIPELINE.length - 1 && (
                <ArrowRight className="w-4 h-4 text-muted-foreground/50" aria-hidden="true" />
              )}
            </span>
          ))}
        </motion.div>
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
