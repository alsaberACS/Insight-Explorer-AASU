import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartData } from "@/lib/data";

const THEMES = [
  {
    id: "foundations",
    name: "Foundations",
    count: 4,
    color: "border-chart-2/40 bg-chart-2/10",
    chip: "bg-chart-2/15 text-chart-2",
    clos: [
      "Explain the role of data and evidence in decision-making across society, organizations, and disciplines",
      "Describe the data analytics lifecycle — from problem identification to analysis and communication",
      "Identify and classify types, sources, and formats of data (structured, semi-structured, unstructured)",
      "Assess the quality, credibility, reliability, and validity of data from different sources"
    ]
  },
  {
    id: "handling",
    name: "Working with Data",
    count: 4,
    color: "border-chart-3/40 bg-chart-3/10",
    chip: "bg-chart-3/15 text-chart-3",
    clos: [
      "Formulate analytical questions and identify the variables required to answer real-world problems",
      "Collect, import, clean, transform, and prepare datasets using modern analytical tools",
      "Apply exploratory data analysis (EDA) techniques to summarize and understand datasets",
      "Create effective charts, dashboards, and visualizations that communicate insights clearly"
    ]
  },
  {
    id: "statistics",
    name: "Statistical Thinking",
    count: 6,
    color: "border-primary/40 bg-primary/10",
    chip: "bg-primary/15 text-primary",
    clos: [
      "Understand distributions, sampling, variability, probability, and uncertainty",
      "Explain descriptive and inferential statistics and their role in evidence-based decisions",
      "Understand hypothesis testing: null/alternative hypotheses, significance levels, p-values, confidence intervals, effect sizes, power",
      "Select appropriate statistical methods for different questions and data types",
      "Interpret results of common statistical analyses and communicate their practical implications",
      "Distinguish correlation, causation, prediction, and inference"
    ]
  },
  {
    id: "modeling",
    name: "Modeling & AI",
    count: 4,
    color: "border-chart-4/40 bg-chart-4/10",
    chip: "bg-chart-4/15 text-chart-4",
    clos: [
      "Explain predictive and explanatory modeling: regression, classification, clustering, intro machine learning",
      "Evaluate model performance and limitations with appropriate metrics",
      "Analyze data using AI tools and modern software to improve efficiency and productivity",
      "Critically evaluate AI-generated analyses — errors, biases, hallucinations, and limitations"
    ]
  },
  {
    id: "critical",
    name: "Critical & Ethical",
    count: 2,
    color: "border-destructive/40 bg-destructive/10",
    chip: "bg-destructive/15 text-destructive",
    clos: [
      "Recognize misleading graphs, misinformation, statistical fallacies, and sources of bias",
      "Apply ethical principles, privacy considerations, and responsible AI practices throughout"
    ]
  },
  {
    id: "practice",
    name: "Communication & Practice",
    count: 3,
    color: "border-chart-5/40 bg-chart-5/10",
    chip: "bg-chart-5/15 text-chart-5",
    clos: [
      "Communicate findings through reports, presentations, dashboards, and data storytelling for any audience",
      "Collaborate effectively in multidisciplinary teams to solve real-world problems with data",
      "Complete an end-to-end analytics project with evidence-based recommendations in the student's own field"
    ]
  }
];

export default function CLOsSlide({ data: _data }: { data: HeartData[] }) {
  const [active, setActive] = useState<string>("foundations");
  const activeTheme = THEMES.find(t => t.id === active)!;

  return (
    <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <p className="text-sm uppercase tracking-[0.25em] text-primary font-semibold mb-2">
          A Draft to Debate
        </p>
        <h2 className="text-4xl font-bold mb-2">Course Learning Outcomes</h2>
        <p className="text-lg text-muted-foreground">
          23 proposed outcomes in six themes — which belong in the course, and what is missing?
        </p>
      </motion.div>

      <div className="grid grid-cols-6 gap-3 mb-5">
        {THEMES.map((t, i) => (
          <motion.button
            key={t.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.06 }}
            onClick={() => setActive(t.id)}
            aria-pressed={active === t.id}
            className={`rounded-xl border p-3 text-center transition-all bg-card shadow-sm hover:shadow-md ${
              active === t.id ? `${t.color} ring-2 ring-primary/30` : "border-border"
            }`}
          >
            <span className={`inline-block text-lg font-bold w-8 h-8 leading-8 rounded-full mb-1.5 ${t.chip}`}>
              {t.count}
            </span>
            <p className="text-xs font-semibold leading-tight">{t.name}</p>
          </motion.button>
        ))}
      </div>

      <div className="flex-none min-h-[240px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTheme.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className={`rounded-2xl border p-6 ${activeTheme.color}`}
          >
            <ul className="grid grid-cols-2 gap-x-8 gap-y-3">
              {activeTheme.clos.map((clo, i) => (
                <motion.li
                  key={clo}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <span className={`flex-none mt-0.5 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${activeTheme.chip}`}>
                    {i + 1}
                  </span>
                  <p className="text-sm leading-snug text-foreground/90">{clo}</p>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center text-sm font-medium text-primary mt-5 bg-primary/10 border border-primary/20 py-3 px-6 rounded-xl"
      >
        Today's session walks through the first three themes in practice — so we can judge together what a student truly needs.
      </motion.p>
    </div>
  );
}
