import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FolderPlus,
  FileCode2,
  Database,
  BookOpen,
  Link2,
  BarChart3,
  FileCheck2,
  Check,
  ChevronRight,
} from "lucide-react";
import { HeartData } from "@/lib/data";

const STEPS = [
  {
    icon: FolderPlus,
    title: "Create a workspace",
    question: "Where will this analysis live?",
    code: `# RStudio → File → New Project…
#   → Existing Directory
#   → ~/Desktop/heart_project`,
    explain:
      "One project folder holds the data, the codebook, your scripts, and every output. RStudio makes it the working directory automatically.",
    output: "heart_project/ becomes your working directory",
  },
  {
    icon: FileCode2,
    title: "Open a new R script",
    question: "Where does the story get written?",
    code: `# File → New File → R Script
# save as analysis.R

library(tidyverse)`,
    explain:
      "The script is your lab notebook: every decision written down, so the whole analysis can be re-run — and checked — by anyone.",
    output: "analysis.R ready in the Source pane",
  },
  {
    icon: Database,
    title: "Read the data",
    question: "Can we get the patients into R?",
    code: `df1 <- read_csv("df1.csv")
glimpse(df1)`,
    explain:
      "read_csv() pulls the file into a tidy data frame; glimpse() confirms every column arrived with the right type.",
    output: "Rows: 1,025 · Columns: 14",
  },
  {
    icon: BookOpen,
    title: "Read the codebook",
    question: "What does each column actually mean?",
    code: `codebook <- read_csv("code1.csv")
codebook`,
    explain:
      "cp? thal? oldpeak? The codebook is the dictionary that turns cryptic column names into clinical meaning — never analyze without it.",
    output: "14 variables, each with meaning + units",
  },
  {
    icon: Link2,
    title: "Integrate data + codebook",
    question: "Can the data carry its own meaning?",
    code: `labels <- codebook$meaning[
  match(names(df1), codebook$variable)]
for (i in seq_along(df1))
  attr(df1[[i]], "label") <- labels[i]

df1_lab <- df1 |>
  mutate(
    sex    = factor(sex, c(0, 1), c("F", "M")),
    target = factor(target, c(0, 1),
             c("No disease", "Disease")))`,
    explain:
      "Labels are attached to every column, and numeric codes become labeled factors — invalid codes (ca = 4, thal = 0) turn into NA instead of silently poisoning results.",
    output: "sex <fct> F/M · target <fct> No disease/Disease",
  },
  {
    icon: BarChart3,
    title: "Explore the demographics",
    question: "Who is actually in this sample?",
    code: `df1_lab |>
  summarise(n = sum(!is.na(age)),
    mean = mean(age), sd = sd(age),
    median = median(age),
    min = min(age), max = max(age))

df1_lab |>
  count(sex) |>
  mutate(proportion = n / sum(n))`,
    explain:
      "The first real analysis: a continuous summary for age and frequencies for sex. Always know your sample before testing anything.",
    output: "Mean age 54.4 (SD 9.1) · Male 713 (70%)",
  },
  {
    icon: FileCheck2,
    title: "Report in APA format",
    question: "Can R write the paper's Table 1?",
    code: `library(gtsummary)

df1_lab |>
  select(age, sex, target) |>
  tbl_summary(statistic = list(
    all_continuous()  ~ "{mean} ({sd})",
    all_categorical() ~ "{n} ({p}%)")) |>
  modify_caption("**Table 1.**
    *Participant Demographics*") |>
  as_flex_table() |>
  flextable::save_as_docx(
    path = "demographics_table.docx")`,
    explain:
      "One pipeline turns the labeled data into a publication-ready, APA-styled demographics table — exported straight to Word.",
    output: "demographics_table.docx · Table 1, APA style",
  },
];

export default function RFirstSessionSlide({ data: _data }: { data: HeartData[] }) {
  const [step, setStep] = useState(0);
  const s = STEPS[step];

  return (
    <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center">
      <div className="mb-3">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm uppercase tracking-[0.25em] text-primary font-semibold mb-1"
        >
          Goal 3 · Putting It Together
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-1"
        >
          Your First Full Analysis Session
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-base text-muted-foreground"
        >
          Seven questions that carry you from an empty folder to an APA-ready table.
        </motion.p>
      </div>

      <div className="flex gap-5 flex-1 min-h-0">
        <div className="w-[300px] flex-none flex flex-col gap-1.5 justify-center">
          {STEPS.map((st, i) => (
            <motion.button
              key={st.title}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.06 }}
              onClick={() => setStep(i)}
              aria-pressed={i === step}
              className={
                "text-left rounded-xl border px-3 py-2 transition-all flex items-center gap-2.5 " +
                (i === step
                  ? "border-primary bg-primary/10 shadow-sm"
                  : "border-border bg-card hover:border-primary/40 hover:-translate-y-0.5")
              }
            >
              <span
                className={
                  "flex-none w-7 h-7 rounded-lg flex items-center justify-center " +
                  (i < step
                    ? "bg-primary text-primary-foreground"
                    : i === step
                      ? "bg-primary/15 text-primary"
                      : "bg-muted text-muted-foreground")
                }
              >
                {i < step ? <Check className="w-4 h-4" /> : <st.icon className="w-4 h-4" />}
              </span>
              <span className="min-w-0">
                <span className="block text-[10px] uppercase tracking-[0.15em] text-primary font-semibold leading-none mb-0.5">
                  Step {i + 1}
                </span>
                <span
                  className={
                    "block text-[13px] font-semibold leading-tight " +
                    (i === step ? "text-foreground" : "text-foreground/75")
                  }
                >
                  {st.title}
                </span>
              </span>
              {i === step && <ChevronRight className="w-4 h-4 text-primary ml-auto flex-none" />}
            </motion.button>
          ))}
        </div>

        <div className="flex-1 min-w-0 flex flex-col min-h-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col h-full min-h-0"
            >
              <div className="mb-2 flex items-baseline gap-2.5">
                <h3 className="text-lg font-bold text-primary leading-tight">{s.question}</h3>
              </div>

              <div className="flex-1 min-h-0 rounded-2xl bg-[#1e293b] border border-border shadow-md overflow-hidden flex flex-col">
                <div className="flex items-center gap-1.5 px-4 py-2 border-b border-white/10 flex-none">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                  <span className="ml-2 text-[11px] text-slate-400 font-mono">analysis.R</span>
                </div>
                <pre className="flex-1 min-h-0 overflow-hidden px-4 py-3 text-[12.5px] leading-[1.45] font-mono text-slate-100 whitespace-pre">
                  {s.code}
                </pre>
                <div className="flex-none px-4 py-2 bg-emerald-500/10 border-t border-emerald-400/20 flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-wide font-bold text-emerald-300 flex-none">
                    Result
                  </span>
                  <span className="text-[12px] font-mono text-emerald-200 truncate">{s.output}</span>
                </div>
              </div>

              <p className="flex-none text-sm text-foreground/80 leading-snug mt-2.5">
                {s.explain}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
