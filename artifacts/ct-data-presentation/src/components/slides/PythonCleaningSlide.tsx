import { useState } from "react";
import { motion } from "framer-motion";
import { HeartData } from "@/lib/data";

const STEPS = [
  {
    id: "detect",
    title: "Detect",
    code: "df.isnull().sum()",
    desc: "Counts missing values per column.",
    color: "bg-chart-4/10 text-chart-4 border-chart-4/30"
  },
  {
    id: "drop",
    title: "Drop",
    code: "df.dropna(inplace=True)",
    desc: "Naive approach; the book's example shrinks 202 rows to 118.",
    color: "bg-destructive/10 text-destructive border-destructive/30"
  },
  {
    id: "fill",
    title: "Fill",
    code: "df.fillna(0, inplace=True)",
    desc: "Or fill with mean, median, or constant instead.",
    color: "bg-primary/10 text-primary border-primary/30"
  }
];

export default function PythonCleaningSlide({ data }: { data: HeartData[] }) {
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const handleReveal = (id: string) => {
    setRevealed(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center">
      <div className="mb-8">
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold mb-2"
        >
          Cleaning Data in pandas
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-muted-foreground"
        >
          Real-world datasets are messy and noisy. pandas provides built-in tools to handle missing values gracefully.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 min-h-[250px] mb-8">
        {STEPS.map((step, index) => {
          const isRevealed = revealed[step.id];

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className={`rounded-2xl border p-6 flex flex-col transition-all relative overflow-hidden bg-card shadow-sm`}
            >
              <h3 className="text-xl font-bold mb-4">{index + 1}. {step.title}</h3>
              
              {!isRevealed ? (
                <div className="flex-1 flex items-center justify-center">
                  <button 
                    onClick={() => handleReveal(step.id)}
                    className="px-6 py-3 rounded-xl border border-border bg-secondary/50 font-semibold hover:bg-secondary transition-colors"
                  >
                    Reveal Code
                  </button>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex-1 flex flex-col"
                >
                  <div className={`font-mono text-sm p-4 rounded-xl mb-4 font-semibold border ${step.color}`}>
                    {step.code}
                  </div>
                  <p className="text-foreground/80 text-sm mt-auto">
                    {step.desc}
                  </p>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-auto text-sm font-medium text-primary text-center bg-primary/10 border border-primary/20 py-4 px-6 rounded-xl"
      >
        This mirrors exactly what we did with the heart disease dataset: 1,025 rows &rarr; 302 unique &rarr; 296 after removing invalid codes.
      </motion.div>
    </div>
  );
}