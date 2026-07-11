import { motion } from "framer-motion";
import { HeartData } from "@/lib/data";

const PILLARS = [
  {
    step: "Step 1",
    title: "Decomposition",
    question: "Can I break it into smaller parts?",
    desc: "Split \"predict heart disease\" into answerable pieces: age effects, cholesterol effects, heart-rate effects.",
  },
  {
    step: "Step 2",
    title: "Pattern Recognition",
    question: "What repeats across the parts?",
    desc: "Spot regularities: patients with exercise-induced angina show disease far more often.",
  },
  {
    step: "Step 3",
    title: "Abstraction",
    question: "What can I safely ignore?",
    desc: "Drop irrelevant detail (names, record IDs) and keep only the signals that carry information.",
  },
  {
    step: "Step 4",
    title: "Algorithm Design",
    question: "What are the exact steps?",
    desc: "Write an unambiguous, step-by-step procedure a computer (or a colleague) can follow.",
  },
];

export default function CTIntroSlide({ data: _data }: { data: HeartData[] }) {
  return (
    <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center">
      <div className="mb-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm uppercase tracking-[0.25em] text-primary font-semibold mb-2"
        >
          Computational Thinking
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold mb-3"
        >
          Thinking Like a Computer Scientist
        </motion.h2>
        <motion.blockquote
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="border-l-4 border-primary pl-4 max-w-4xl"
        >
          <p className="text-lg text-foreground/85 italic leading-snug">
            "Computational thinking is formulating problems so their solutions can be
            expressed as computational steps — it is a fundamental skill for everyone,
            not just computer scientists."
          </p>
          <footer className="text-sm text-muted-foreground mt-1.5">
            — Jeannette Wing, Carnegie Mellon University (2006)
          </footer>
        </motion.blockquote>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-5">
        {PILLARS.map((pillar, i) => (
          <motion.div
            key={pillar.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.15 }}
            className="relative rounded-2xl bg-card border border-border p-4 flex flex-col shadow-sm overflow-hidden"
          >
            <div className="text-6xl font-bold text-foreground/5 absolute -top-3 -right-1 pointer-events-none">
              {i + 1}
            </div>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
              {pillar.step}
            </p>
            <h3 className="text-lg font-bold text-primary mb-1.5 leading-tight">{pillar.title}</h3>
            <p className="text-[13px] font-semibold text-foreground/90 mb-1.5 leading-snug">
              {pillar.question}
            </p>
            <p className="text-[13px] text-foreground/70 leading-snug relative z-10">{pillar.desc}</p>
            {i < PILLARS.length - 1 && (
              <span
                className="absolute top-1/2 -right-2.5 w-2.5 h-px bg-primary/50"
                aria-hidden="true"
              />
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="text-sm font-medium text-primary text-center bg-primary/10 border border-primary/20 py-3 px-6 rounded-xl"
      >
        These four steps are not about computers — they are a disciplined way to approach any
        complex problem, including every stage of a data analysis.
      </motion.div>
    </div>
  );
}
