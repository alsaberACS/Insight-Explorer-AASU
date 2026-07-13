import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Scale, Link2, TrendingUp, Award, Download } from "lucide-react";
import { HeartData } from "@/lib/data";

const QUESTIONS = [
  {
    icon: Search,
    short: "Explore",
    title: "What does the data look like?",
    intro:
      "Before any test, an analyst walks the terrain: shapes, centers, spreads, and oddities.",
    parts: [
      {
        badge: "Descriptive statistics",
        text: "What is the typical patient? Mean age, cholesterol range, how many men vs women, how many with disease?",
      },
      {
        badge: "Distributions & outliers",
        text: "Is cholesterol skewed? Is a 564 mg/dl reading real or an error? Histograms and boxplots answer before models do.",
      },
    ],
  },
  {
    icon: Scale,
    short: "Compare",
    title: "Do groups differ?",
    intro: "Comparison is the heart of inference — is the gap real, or just noise?",
    parts: [
      {
        badge: "Two groups · t-test",
        text: "Do patients with heart disease have a lower maximum heart rate (thalach) than patients without?",
      },
      {
        badge: "More than two · ANOVA",
        text: "Does maximum heart rate differ across the four chest-pain types (typical, atypical, non-anginal, asymptomatic)?",
      },
    ],
  },
  {
    icon: Link2,
    short: "Associate",
    title: "What moves together?",
    intro: "Association reveals structure — pick the tool that matches the variable types.",
    parts: [
      {
        badge: "Categorical · Chi-square",
        text: "Is sex associated with heart disease? Is chest-pain type independent of the diagnosis, or do they travel together?",
      },
      {
        badge: "Numeric · Pearson correlation",
        text: "As age rises, does maximum heart rate fall? How strong is the r between oldpeak and disease severity markers?",
      },
    ],
  },
  {
    icon: TrendingUp,
    short: "Measure effect",
    title: "How big is the effect?",
    intro: "Beyond \u201cis there a difference\u201d — quantify it, adjusting for everything else.",
    parts: [
      {
        badge: "Linear & multiple regression",
        text: "How many beats of maximum heart rate does each added year of age cost — holding sex, chest pain, and blood pressure constant?",
      },
      {
        badge: "Logistic regression",
        text: "By how much does each unit of ST depression (oldpeak) multiply the odds of heart disease? Which factors raise risk, which protect?",
      },
    ],
  },
  {
    icon: Award,
    short: "Predict & validate",
    title: "What matters most — and can we trust the model?",
    intro: "The analyst's final duty: rank the drivers, then prove the model earns its keep.",
    parts: [
      {
        badge: "Feature importance",
        text: "Which of the 13 clinical variables carry the signal — chest pain type, thalach, ca, oldpeak? Which are passengers?",
      },
      {
        badge: "Diagnostic performance",
        text: "Sensitivity, specificity, ROC curve, AUC: out of 100 real patients, how many would the model classify correctly?",
      },
    ],
  },
];

export default function AnalystQuestionsSlide({ data: _data }: { data: HeartData[] }) {
  const [active, setActive] = useState(0);
  const ActiveIcon = QUESTIONS[active].icon;

  return (
    <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center">
      <div className="mb-4 flex items-end justify-between gap-6">
        <div>
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
            Think Like a Data Analyst
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-base text-muted-foreground"
          >
            Five questions turn 1,025 rows into clinical insight — each one summons its own
            statistical tool.
          </motion.p>
        </div>
        <motion.a
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          href={`${import.meta.env.BASE_URL}code1.R`}
          download="analysis.R"
          className="flex-none inline-flex items-center gap-2 rounded-xl border border-primary/40 bg-primary/10 text-primary font-semibold text-sm px-4 py-2.5 hover:bg-primary hover:text-primary-foreground transition-colors shadow-sm"
        >
          <Download className="w-4 h-4" />
          Download the R script
        </motion.a>
      </div>

      <div className="flex gap-6 flex-1 min-h-0 max-h-[470px]">
        <div className="w-[300px] flex-none flex flex-col gap-2.5 justify-center">
          {QUESTIONS.map((q, i) => (
            <motion.button
              key={q.short}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.08 }}
              onClick={() => setActive(i)}
              className={
                "text-left rounded-xl border px-4 py-3 transition-all flex items-center gap-3 " +
                (i === active
                  ? "border-primary bg-primary/10 shadow-md"
                  : "border-border bg-card hover:border-primary/40")
              }
            >
              <span
                className={
                  "flex-none w-9 h-9 rounded-lg flex items-center justify-center font-bold " +
                  (i === active
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground")
                }
              >
                {i + 1}
              </span>
              <div className="min-w-0">
                <p
                  className={
                    "text-[11px] uppercase tracking-[0.18em] font-semibold " +
                    (i === active ? "text-primary" : "text-muted-foreground")
                  }
                >
                  {q.short}
                </p>
                <p className="font-semibold text-sm leading-tight truncate">{q.title}</p>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="flex-1 min-w-0 rounded-2xl border border-border bg-card shadow-sm p-6 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.25 }}
              className="flex-1 flex flex-col"
            >
              <div className="flex items-center gap-4 mb-3">
                <span className="flex-none w-12 h-12 rounded-2xl bg-primary/15 text-primary flex items-center justify-center">
                  <ActiveIcon className="w-6 h-6" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">
                    Question {active + 1}
                  </p>
                  <h3 className="text-2xl font-bold leading-tight">{QUESTIONS[active].title}</h3>
                </div>
              </div>
              <p className="text-[15px] text-muted-foreground italic mb-4">
                {QUESTIONS[active].intro}
              </p>
              <div className="flex-1 grid grid-rows-2 gap-4 min-h-0">
                {QUESTIONS[active].parts.map((p) => (
                  <div
                    key={p.badge}
                    className="rounded-xl border border-primary/25 bg-primary/5 p-4 flex flex-col justify-center"
                  >
                    <span className="inline-flex self-start items-center rounded-full bg-primary text-primary-foreground text-xs font-bold px-3 py-1 mb-2">
                      {p.badge}
                    </span>
                    <p className="text-[15px] text-foreground/85 leading-relaxed">{p.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
