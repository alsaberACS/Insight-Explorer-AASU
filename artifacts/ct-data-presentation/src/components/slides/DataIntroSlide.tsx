import { useState } from "react";
import { motion } from "framer-motion";
import { HeartData } from "@/lib/data";
import { Button } from "@/components/ui/button";

export default function DataIntroSlide({ data }: { data: HeartData[] }) {
  const [step, setStep] = useState(0);

  const totalRows = data.length;
  // Compute duplicates by serializing to JSON and using a Set.
  const uniqueRowsSet = new Set(data.map(d => JSON.stringify(d)));
  const uniqueRows = uniqueRowsSet.size;
  const duplicates = totalRows - uniqueRows;

  return (
    <div className="w-full max-w-5xl mx-auto h-full flex flex-col justify-center items-center text-center">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h2 className="text-5xl font-bold mb-4">The Reality of Data</h2>
        <p className="text-xl text-muted-foreground">Real-world datasets are messy. Let's look at ours.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-16">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 rounded-3xl bg-card border border-border shadow-sm flex flex-col items-center justify-center gap-4"
        >
          <div className="text-6xl font-bold text-foreground">{totalRows}</div>
          <div className="text-lg text-muted-foreground">Total Patient Records</div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="p-8 rounded-3xl bg-card border border-border shadow-sm flex flex-col items-center justify-center gap-4"
        >
          <div className="text-6xl font-bold text-foreground">14</div>
          <div className="text-lg text-muted-foreground">Columns/Features</div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="p-8 rounded-3xl bg-card border border-border shadow-sm flex flex-col items-center justify-center gap-4 relative overflow-hidden"
        >
          {step === 0 ? (
             <div className="text-6xl font-bold text-foreground opacity-20">???</div>
          ) : (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-6xl font-bold text-destructive"
            >
              {duplicates}
            </motion.div>
          )}
          <div className="text-lg text-muted-foreground">Duplicate Rows</div>
        </motion.div>
      </div>

      {step === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h3 className="text-2xl font-semibold mb-6">How many of these {totalRows} records do you think are duplicates?</h3>
          <Button size="lg" onClick={() => setStep(1)} className="rounded-full px-8 text-lg h-14">
            Reveal the Truth
          </Button>
        </motion.div>
      )}

      {step === 1 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="bg-destructive/10 text-destructive border border-destructive/20 p-6 rounded-2xl max-w-2xl mx-auto"
        >
          <h3 className="text-2xl font-bold mb-2">Only {uniqueRows} unique records!</h3>
          <p className="text-lg opacity-90">
            If we trained an AI on this without cleaning, it would learn from repeated data, leading to massive bias.
          </p>
        </motion.div>
      )}
    </div>
  );
}
