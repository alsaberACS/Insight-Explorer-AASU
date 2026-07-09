import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartData } from "@/lib/data";
import { Button } from "@/components/ui/button";

const SCENARIOS = [
  {
    id: "bank",
    text: "A bank wants to build a predictive model to automate loan approvals with high accuracy.",
    answer: "SEMMA",
    details: "SEMMA is highly optimized for developing predictive and statistical models like credit scoring."
  },
  {
    id: "university",
    text: "A university wants to understand student enrollment trends and present findings to the board.",
    answer: "Standard Process",
    details: "The Standard Process emphasizes interpretation and storytelling for policymakers/leadership."
  },
  {
    id: "retail",
    text: "A retailer wants to analyze millions of transactions to find unexpected product groupings.",
    answer: "KDD",
    details: "Knowledge Discovery from Data excels at finding hidden patterns (like market basket analysis)."
  }
];

export default function MethodologiesQuizSlide({ data }: { data: HeartData[] }) {
  const [activeScenario, setActiveScenario] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const scenario = SCENARIOS[activeScenario];

  const handleNext = () => {
    if (activeScenario < SCENARIOS.length - 1) {
      setActiveScenario(prev => prev + 1);
      setRevealed(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto h-full flex flex-col justify-center items-center text-center">
      <motion.h2 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-4"
      >
        Which Methodology Fits?
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-xl text-muted-foreground mb-12"
      >
        Let's apply these frameworks to real scenarios.
      </motion.p>

      <div className="w-full max-w-3xl bg-card border border-border shadow-md rounded-3xl p-10 relative overflow-hidden min-h-[320px] flex flex-col">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-secondary">
          <div 
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${((activeScenario + 1) / SCENARIOS.length) * 100}%` }}
          />
        </div>

        <div className="text-sm uppercase tracking-wider text-muted-foreground font-semibold mb-6">
          Scenario {activeScenario + 1} of {SCENARIOS.length}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={scenario.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col items-center justify-center"
          >
            <h3 className="text-2xl font-medium leading-relaxed text-foreground mb-10">
              "{scenario.text}"
            </h3>

            {!revealed ? (
              <Button 
                onClick={() => setRevealed(true)}
                size="lg"
                className="rounded-full px-8 h-12 text-lg"
              >
                Reveal Answer
              </Button>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="bg-primary/10 border border-primary/20 rounded-2xl p-6 w-full"
              >
                <div className="text-2xl font-bold text-primary mb-2">
                  {scenario.answer}
                </div>
                <p className="text-foreground/80">
                  {scenario.details}
                </p>
                
                {activeScenario < SCENARIOS.length - 1 && (
                  <Button 
                    onClick={handleNext}
                    variant="outline"
                    className="mt-6 rounded-full"
                  >
                    Next Scenario &rarr;
                  </Button>
                )}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
