import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartData } from "@/lib/data";
import RStudioPane from "@/components/RStudioPane";

const PILLARS = [
  {
    id: "understand",
    step: "01",
    name: "Understand the data",
    desc: "Shape, types, ranges — what am I holding?",
    r: "str(heart)  |  dim(heart)  |  head(heart)"
  },
  {
    id: "summarize",
    step: "02",
    name: "Summarize",
    desc: "Numbers that condense 1,025 rows into a story.",
    r: "summary(heart)  |  mean()  |  sd()"
  },
  {
    id: "visualize",
    step: "03",
    name: "Visualize",
    desc: "Patterns, outliers, and shapes leap out of plots.",
    r: "hist()  |  boxplot()  |  plot()"
  },
  {
    id: "question",
    step: "04",
    name: "Question",
    desc: "Every summary raises the next hypothesis.",
    r: "Why is cholesterol skewed? Who is the 564?"
  }
];

const R_EDA_CODE = `# ------------------------------------------------------------
# EDA: the first conversation with the data
# ------------------------------------------------------------
heart <- read.csv("heart.csv")

dim(heart)          # 1025 rows, 14 columns
summary(heart$age)  # six numbers that describe 1,025 ages`;

export default function EDAIntroSlide({ data: _data }: { data: HeartData[] }) {
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
        <h2 className="text-4xl font-bold mb-2">Exploratory Data Analysis</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Before any model or test, the analyst simply <span className="text-foreground font-semibold">looks</span> — EDA is the disciplined art of getting to know a dataset.
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {!showR ? (
          <motion.div
            key="pillars"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-4 gap-4 mb-6"
          >
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="rounded-2xl border border-border bg-card shadow-sm p-5 flex flex-col"
              >
                <span className="text-3xl font-bold text-primary/25 mb-2">{p.step}</span>
                <h3 className="font-bold mb-1">{p.name}</h3>
                <p className="text-sm text-muted-foreground leading-snug mb-3">{p.desc}</p>
                <code className="mt-auto text-[11px] font-mono text-primary bg-primary/10 rounded-md px-2 py-1.5 leading-snug">
                  {p.r}
                </code>
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
            <RStudioPane initialCode={R_EDA_CODE} />
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
          {showR ? "Back to the four habits" : "Try it live in R"}
        </button>
        <p className="text-sm text-muted-foreground">
          Two families of summaries come next: <span className="font-semibold text-foreground">location</span> (where is the center?) and <span className="font-semibold text-foreground">dispersion</span> (how spread out?).
        </p>
      </motion.div>
    </div>
  );
}
