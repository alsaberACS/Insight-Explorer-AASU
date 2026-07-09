import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartData } from "@/lib/data";

const OBJECTIVES = [
  "Think Computationally: Break big problems into rules and patterns.",
  "Clean Your Data: Garbage in, garbage out.",
  "Visualize to Decide: Let the data tell its story."
];

export default function ClosingSlide({ data }: { data: HeartData[] }) {
  const [quizState, setQuizState] = useState<"idle" | "correct" | "incorrect">("idle");

  return (
    <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        <div className="space-y-8">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold leading-tight"
          >
            Data Skills are <span className="text-primary">Superpowers.</span>
          </motion.h2>
          
          <div className="space-y-4">
            {OBJECTIVES.map((obj, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border shadow-sm"
              >
                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold shrink-0">
                  {i + 1}
                </div>
                <p className="text-lg font-medium">{obj}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-secondary/50 rounded-3xl p-10 border border-border relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
          
          <h3 className="text-3xl font-bold mb-8">Exit Ticket</h3>
          <p className="text-lg text-muted-foreground mb-8">
            What happens if you train an AI on a medical dataset with 70% duplicate rows favoring one outcome?
          </p>

          <div className="space-y-4">
            <button 
              onClick={() => setQuizState("incorrect")}
              className="w-full p-4 rounded-xl bg-card border border-border text-left font-medium hover:border-primary/50 transition-colors"
            >
              A. The AI becomes more accurate due to more data.
            </button>
            <button 
              onClick={() => setQuizState("correct")}
              className="w-full p-4 rounded-xl bg-card border border-border text-left font-medium hover:border-primary/50 transition-colors"
            >
              B. The AI becomes biased and unreliable.
            </button>
            <button 
              onClick={() => setQuizState("incorrect")}
              className="w-full p-4 rounded-xl bg-card border border-border text-left font-medium hover:border-primary/50 transition-colors"
            >
              C. Duplicates don't affect the AI.
            </button>
          </div>

          <div className="mt-8 h-16 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {quizState === "correct" && (
                <motion.div
                  key="correct"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-primary font-bold text-xl flex items-center gap-2"
                >
                  <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                  Exactly. You're ready.
                </motion.div>
              )}
              {quizState === "incorrect" && (
                <motion.div
                  key="incorrect"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-destructive font-bold text-lg"
                >
                  Think again. Garbage in...
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
