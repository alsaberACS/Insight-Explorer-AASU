import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartData } from "@/lib/data";

const EXAMPLES = [
  {
    id: "retail",
    title: "Retail Market Basket Analysis",
    subtitle: "Walmart, Tesco",
    scenario: "Association rule mining discovers products bought together (e.g., milk & bread).",
    methodology: "KDD",
    reason: "Focuses on pattern discovery.",
    color: "text-chart-1 border-chart-1"
  },
  {
    id: "bank",
    title: "Bank Loan Approval",
    subtitle: "Credit Scoring",
    scenario: "Build a predictive model with decision trees or random forests via SAS Enterprise Miner workflow.",
    methodology: "SEMMA",
    reason: "Focuses on model development.",
    color: "text-chart-3 border-chart-3"
  },
  {
    id: "music",
    title: "Music Recommendations",
    subtitle: "Spotify, YouTube Music",
    scenario: "From business understanding of engagement through deployment of the recommender in production.",
    methodology: "CRISP-DM",
    reason: "Focuses on business understanding + deployment.",
    color: "text-chart-4 border-chart-4"
  },
  {
    id: "online",
    title: "Online Retail Customer Behavior",
    subtitle: "E-commerce",
    scenario: "Compute KPIs (average order value, LTV), find seasonal trends, segment customers, tell the story to stakeholders.",
    methodology: "Standard Process",
    reason: "Our course text's teaching workflow: insights + storytelling.",
    color: "text-primary border-primary"
  }
];

export default function MethodologiesExamplesSlide({ data }: { data: HeartData[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center">
      <div className="mb-6">
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
          Real-world examples. Click a card to reveal the underlying methodology.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 min-h-[300px]">
        {EXAMPLES.map((ex, i) => {
          const isExpanded = expandedId === ex.id;
          return (
            <motion.div
              key={ex.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              onClick={() => setExpandedId(isExpanded ? null : ex.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setExpandedId(isExpanded ? null : ex.id);
                }
              }}
              role="button"
              tabIndex={0}
              className={`rounded-2xl border p-5 cursor-pointer flex flex-col transition-all relative overflow-hidden ${
                isExpanded ? "bg-card shadow-lg ring-1 ring-border" : "bg-secondary/30 hover:bg-secondary/60"
              }`}
            >
              <div className="flex-1">
                <h3 className="font-bold text-lg leading-snug mb-1">{ex.title}</h3>
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">{ex.subtitle}</p>
                <p className="text-sm text-foreground/80 mb-4">{ex.scenario}</p>
              </div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-border pt-3 mt-auto"
                  >
                    <div className={`font-bold text-lg mb-1 ${ex.color.split(" ")[0]}`}>&rarr; {ex.methodology}</div>
                    <p className="text-xs font-medium text-muted-foreground">{ex.reason}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-4 text-sm font-medium text-primary text-center bg-primary/10 border border-primary/20 py-3 px-6 rounded-xl"
      >
        Our heart disease dataset later in this session follows the same journey: collect, clean, analyze, visualize, narrate.
      </motion.div>
    </div>
  );
}
