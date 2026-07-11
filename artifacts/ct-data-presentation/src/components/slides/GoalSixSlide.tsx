import { motion } from "framer-motion";
import { Terminal, Search, Sigma, LineChart } from "lucide-react";
import { HeartData } from "@/lib/data";

const TOPICS = [
  {
    icon: Terminal,
    title: "Live R Session",
    text: "No slides about code — the code itself, running on the real dataset.",
  },
  {
    icon: Search,
    title: "Explore",
    text: "Load heart.csv, inspect its structure, and meet the 1,025 patients inside.",
  },
  {
    icon: Sigma,
    title: "Summarise",
    text: "Put the measures of location and dispersion to work on real variables.",
  },
  {
    icon: LineChart,
    title: "Visualize",
    text: "Turn the numbers into charts that answer a clinical question at a glance.",
  },
];

export default function GoalSixSlide({ data: _data }: { data: HeartData[] }) {
  return (
    <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center">
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-3 rounded-full border border-primary/30 bg-primary/10 px-6 py-2.5 mb-5"
        >
          <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center">
            6
          </span>
          <span className="text-sm uppercase tracking-[0.25em] text-primary font-semibold">
            Goal 6 of this workshop
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-4xl md:text-5xl font-bold leading-tight max-w-4xl mx-auto"
        >
          <span className="text-primary">Hands-on with RStudio</span> — the Heart Disease dataset
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-muted-foreground mt-3 max-w-3xl mx-auto"
        >
          Everything from the previous goals comes together in one live analysis, start to
          finish.
        </motion.p>
      </div>

      <div className="grid grid-cols-4 gap-4 max-w-5xl mx-auto w-full">
        {TOPICS.map((t, i) => (
          <motion.div
            key={t.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.09 }}
            className="rounded-2xl border border-border bg-card p-4 shadow-sm"
          >
            <span className="flex-none w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-2.5">
              <t.icon className="w-4.5 h-4.5" />
            </span>
            <h3 className="font-bold leading-tight mb-1.5">{t.title}</h3>
            <p className="text-[13px] text-foreground/75 leading-snug">{t.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
