import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartData } from "@/lib/data";

const EXAMPLES = [
  {
    id: "retail",
    title: "Market Basket Analysis",
    subtitle: "Walmart, Tesco",
    scenario: "Which products are bought together?",
    methodology: "KDD",
    reason: "Pattern discovery is the whole point — KDD's mining-centered pipeline fits perfectly.",
    accent: "text-chart-1",
    bar: "bg-chart-1",
    chip: "bg-chart-1/15 text-chart-1",
    panel: "border-chart-1/30 bg-chart-1/5",
    steps: [
      { phase: "Data Cleaning", action: "Drop refunds and voided transactions from the receipts." },
      { phase: "Data Integration", action: "Merge till data from every store into one warehouse." },
      { phase: "Data Selection", action: "Keep just the fields needed: receipt ID and items." },
      { phase: "Data Transformation", action: "Turn each receipt into a basket: {milk, bread, ...}." },
      { phase: "Data Mining", action: "Association rules: milk → bread (confidence 78%)." },
      { phase: "Pattern Evaluation", action: "Keep rules that are frequent, strong, surprising." },
      { phase: "Knowledge Presentation", action: "Shelf-placement and bundle-pricing advice." }
    ]
  },
  {
    id: "bank",
    title: "Bank Loan Approval",
    subtitle: "Credit Scoring",
    scenario: "Who is likely to repay a loan?",
    methodology: "SEMMA",
    reason: "A model-building exercise from start to finish — SEMMA was designed for exactly this.",
    accent: "text-chart-3",
    bar: "bg-chart-3",
    chip: "bg-chart-3/15 text-chart-3",
    panel: "border-chart-3/30 bg-chart-3/5",
    steps: [
      { phase: "Sample", action: "Draw 50,000 past loans — enough to learn from, small enough to be fast." },
      { phase: "Explore", action: "Plot income vs. default; spot missing salaries and odd outliers." },
      { phase: "Modify", action: "Fill gaps, cap outliers, create ratios like debt-to-income." },
      { phase: "Model", action: "Train decision trees and random forests to predict default." },
      { phase: "Assess", action: "Compare models on held-out data; the winner scores new applicants." }
    ]
  },
  {
    id: "music",
    title: "Music Recommendations",
    subtitle: "Spotify, YouTube Music",
    scenario: "What should each listener hear next?",
    methodology: "CRISP-DM",
    reason: "Business framing and production deployment matter as much as the model — CRISP-DM covers the full loop.",
    accent: "text-chart-4",
    bar: "bg-chart-4",
    chip: "bg-chart-4/15 text-chart-4",
    panel: "border-chart-4/30 bg-chart-4/5",
    steps: [
      { phase: "Business Understanding", action: "Goal: fewer skips, longer listening sessions." },
      { phase: "Data Understanding", action: "Billions of plays, skips, likes — what signals taste?" },
      { phase: "Data Preparation", action: "Build listener profiles and song features from logs." },
      { phase: "Modeling", action: "Collaborative filtering: 'listeners like you also loved...'" },
      { phase: "Evaluation", action: "A/B test the recommender against the old system." },
      { phase: "Deployment", action: "Serve the winning model to millions daily." }
    ]
  },
  {
    id: "online",
    title: "Customer Behavior",
    subtitle: "E-commerce",
    scenario: "What story do our sales data tell?",
    methodology: "Standard Process",
    reason: "The goal is interpretable insight and a story for stakeholders — our course text's teaching workflow.",
    accent: "text-primary",
    bar: "bg-primary",
    chip: "bg-primary/15 text-primary",
    panel: "border-primary/30 bg-primary/5",
    steps: [
      { phase: "Collecting Data", action: "Export a year of orders, carts, and customer records." },
      { phase: "Preprocessing", action: "Fix currencies, remove test orders, merge duplicates." },
      { phase: "Analyzing & Insights", action: "Compute KPIs — average order value, lifetime value, trends." },
      { phase: "Interpretation", action: "December spike is gifts; a loyal 12% drives half of revenue." },
      { phase: "Storytelling", action: "One dashboard, three recommendations, a decision by Friday." }
    ]
  }
];

export default function MethodologiesExamplesSlide({ data: _data }: { data: HeartData[] }) {
  const [activeId, setActiveId] = useState<string>("retail");
  const active = EXAMPLES.find(e => e.id === activeId)!;

  return (
    <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center">
      <div className="mb-5">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold mb-2"
        >
          Methodologies in the Wild
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-muted-foreground"
        >
          Four real problems, four methodologies — select one and watch the method unfold step by step.
        </motion.p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-5">
        {EXAMPLES.map((ex, i) => (
          <motion.button
            key={ex.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
            onClick={() => setActiveId(ex.id)}
            aria-pressed={activeId === ex.id}
            className={`relative rounded-2xl border p-4 text-left transition-all bg-card shadow-sm hover:shadow-md overflow-hidden ${
              activeId === ex.id ? "ring-2 ring-primary/30 border-transparent" : "border-border"
            }`}
          >
            <span className={`absolute top-0 left-0 right-0 h-1 ${ex.bar}`} />
            <h3 className="font-bold leading-snug mb-0.5 mt-1">{ex.title}</h3>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">{ex.subtitle}</p>
            <p className="text-sm text-foreground/75 leading-snug mb-2">{ex.scenario}</p>
            <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full ${ex.chip}`}>
              {ex.methodology}
            </span>
          </motion.button>
        ))}
      </div>

      <div className="flex-none min-h-[240px] mb-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className={`rounded-2xl border p-5 ${active.panel}`}
          >
            <div className="flex items-baseline justify-between gap-4 mb-4">
              <p className="text-sm">
                <span className={`font-bold ${active.accent}`}>Why {active.methodology}?</span>{" "}
                <span className="text-foreground/80">{active.reason}</span>
              </p>
              <p className="flex-none text-[11px] text-muted-foreground italic">
                All {active.steps.length} phases, as defined on the previous slide
              </p>
            </div>
            <div
              className="grid gap-2.5"
              style={{ gridTemplateColumns: `repeat(${active.steps.length}, minmax(0, 1fr))` }}
            >
              {active.steps.map((s, i) => (
                <motion.div
                  key={s.phase}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.1 }}
                  className="relative rounded-xl border border-border bg-card p-2.5 flex flex-col"
                >
                  <div className="flex items-start gap-1.5 mb-1.5">
                    <span className={`flex-none mt-px w-5 h-5 rounded-full text-[10px] font-bold text-white flex items-center justify-center ${active.bar}`}>
                      {i + 1}
                    </span>
                    <p className={`text-[11px] font-bold uppercase tracking-wide leading-tight ${active.accent}`}>
                      {s.phase}
                    </p>
                  </div>
                  <p className="text-xs leading-snug text-foreground/85">{s.action}</p>
                  {i < active.steps.length - 1 && (
                    <span className={`absolute top-1/2 -right-2 w-2 h-px ${active.bar} opacity-60`} aria-hidden="true" />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-sm font-medium text-primary text-center bg-primary/10 border border-primary/20 py-3 px-6 rounded-xl"
      >
        Our heart disease dataset later in this session follows the same journey: collect, clean, analyze, visualize, narrate.
      </motion.div>
    </div>
  );
}
