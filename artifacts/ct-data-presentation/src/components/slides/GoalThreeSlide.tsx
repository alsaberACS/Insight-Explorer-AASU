import { motion } from "framer-motion";
import { Monitor, Code2, Puzzle, ArrowRight } from "lucide-react";
import { HeartData } from "@/lib/data";

const NEXT_UP = [
  {
    icon: Monitor,
    kicker: "First",
    title: "The RStudio Environment",
    text: "A guided tour of the workbench: console, environment, files, plots, and the new AI assistant — where all our analysis happens.",
  },
  {
    icon: Code2,
    kicker: "Then",
    title: "Algorithmic Thinking in R",
    text: "From building blocks to a working diagnostic rule: writing step-by-step instructions the computer can execute on real patient data.",
  },
  {
    icon: Puzzle,
    kicker: "Finally",
    title: "The Four Pillars, Live",
    text: "Decomposition, pattern recognition, abstraction, and algorithms — each pillar applied hands-on to the heart disease dataset.",
  },
];

export default function GoalThreeSlide({ data: _data }: { data: HeartData[] }) {
  return (
    <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center">
      <div className="text-center mb-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-3 rounded-full border border-primary/30 bg-primary/10 px-6 py-2.5 mb-6"
        >
          <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center">
            3
          </span>
          <span className="text-sm uppercase tracking-[0.25em] text-primary font-semibold">
            Goal 3 of this workshop
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-4xl md:text-5xl font-bold leading-tight max-w-4xl mx-auto"
        >
          Use <span className="text-primary">RStudio</span> for computational data analysis
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto"
        >
          From ideas to practice: we move into the analyst's workbench and apply computational
          thinking to real data, live in R.
        </motion.p>
      </div>

      <div className="grid grid-cols-3 gap-6 max-w-5xl mx-auto w-full">
        {NEXT_UP.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 + i * 0.15 }}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <item.icon className="w-5 h-5" />
              </span>
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold inline-flex items-center gap-1.5">
                {item.kicker}
                <ArrowRight className="w-3 h-3" aria-hidden="true" />
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-sm text-foreground/75 leading-relaxed">{item.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
