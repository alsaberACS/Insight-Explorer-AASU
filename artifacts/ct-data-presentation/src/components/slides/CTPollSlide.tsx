import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartData } from "@/lib/data";

const OPTIONS = [
  { id: "A", label: "Patient's favorite color", correct: false },
  { id: "B", label: "Fasting blood sugar > 120 mg/dl", correct: true },
  { id: "C", label: "Hospital room number", correct: false },
  { id: "D", label: "Day of the week admitted", correct: false },
];

export default function CTPollSlide({ data }: { data: HeartData[] }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto h-full flex flex-col justify-center text-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="inline-block mx-auto mb-8 px-6 py-2 bg-muted text-muted-foreground rounded-full text-sm font-bold tracking-widest uppercase"
      >
        Live Interaction
      </motion.div>

      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold mb-16 leading-tight"
      >
        Which of these details is an example of <span className="text-primary">Abstraction</span>?
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {OPTIONS.map((opt, i) => {
          const isSelected = selected === opt.id;
          const showResult = revealed;
          const isCorrect = opt.correct;
          
          let bgClass = "bg-card hover:bg-secondary border-border";
          if (showResult) {
            if (isCorrect) bgClass = "bg-primary text-primary-foreground border-primary";
            else if (isSelected) bgClass = "bg-destructive/10 text-destructive border-destructive/30";
            else bgClass = "bg-card opacity-50 border-border";
          } else if (isSelected) {
            bgClass = "bg-primary/10 border-primary text-primary";
          }

          return (
            <motion.button
              key={opt.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              onClick={() => !revealed && setSelected(opt.id)}
              disabled={revealed}
              className={`p-6 rounded-2xl border-2 text-left text-lg md:text-xl font-medium transition-all ${bgClass}`}
            >
              <div className="flex items-center gap-4">
                <span className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold ${showResult && isCorrect ? 'bg-primary-foreground/20' : 'bg-foreground/5'}`}>
                  {opt.id}
                </span>
                {opt.label}
              </div>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {selected && !revealed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex justify-center"
          >
            <button
              onClick={() => setRevealed(true)}
              className="px-8 py-4 bg-foreground text-background rounded-full text-lg font-bold hover:scale-105 transition-transform"
            >
              Reveal Answer
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-2xl font-bold text-primary"
          >
            Abstraction means keeping what matters (blood sugar) and ignoring what doesn't!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
