import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartData } from "@/lib/data";

const FLAWS = [
  { id: "ca", label: "Invalid CA Code (=4)" },
  { id: "thal", label: "Invalid Thal Code (=0)" },
  { id: "chol", label: "Cholesterol Outlier (>500)" }
];

export default function DataCleaningSlide({ data }: { data: HeartData[] }) {
  const [revealed, setRevealed] = useState<string | null>(null);

  const stats = useMemo(() => {
    let invalidCa = 0;
    let invalidThal = 0;
    let highChol = 0;
    
    data.forEach(row => {
      if (row.ca === 4) invalidCa++;
      if (row.thal === 0) invalidThal++;
      if (row.chol > 500) highChol++;
    });

    return { ca: invalidCa, thal: invalidThal, chol: highChol };
  }, [data]);

  return (
    <div className="w-full max-w-5xl mx-auto h-full flex flex-col justify-center text-center">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Finding the Flaws</h2>
        <p className="text-xl text-muted-foreground">What else is hiding in these 1,025 rows?</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {FLAWS.map((flaw, i) => {
          const isRevealed = revealed === flaw.id || revealed === "all";
          
          return (
            <motion.div
              key={flaw.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className={`p-8 rounded-3xl border-2 flex flex-col items-center justify-center gap-6 cursor-pointer transition-colors ${isRevealed ? 'bg-destructive/10 border-destructive/30' : 'bg-card border-border hover:border-primary/50'}`}
              onClick={() => setRevealed(flaw.id)}
            >
              <h3 className="text-xl font-bold text-foreground">{flaw.label}</h3>
              
              <div className="h-24 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {!isRevealed ? (
                    <motion.div
                      key="hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="text-4xl font-bold text-muted-foreground/30"
                    >
                      ?
                    </motion.div>
                  ) : (
                    <motion.div
                      key="revealed"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-6xl font-bold text-destructive flex flex-col items-center"
                    >
                      {stats[flaw.id as keyof typeof stats]}
                      <span className="text-sm font-medium uppercase tracking-wider mt-2 opacity-80">Rows</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {revealed && revealed !== "all" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center"
          >
            <button
              onClick={() => setRevealed("all")}
              className="px-8 py-3 bg-foreground text-background rounded-full text-lg font-bold hover:scale-105 transition-transform"
            >
              Reveal All
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {revealed === "all" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-medium text-foreground mt-4"
          >
            A model trained on dirty data will make dangerous medical predictions. <br/>
            <span className="text-primary font-bold">Always clean your data first.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
