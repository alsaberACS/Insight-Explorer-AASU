import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartData } from "@/lib/data";

const METHODOLOGIES = [
  {
    id: "kdd",
    name: "KDD",
    fullName: "Knowledge Discovery from Data",
    description: "Iterative process emphasizing pattern discovery. Example: Retailers use it for market basket analysis (milk & bread).",
    stages: [
      "Data Cleaning", "Data Integration", "Data Selection", 
      "Data Transformation", "Data Mining", "Pattern Evaluation", "Knowledge Presentation"
    ],
    type: "pipeline"
  },
  {
    id: "semma",
    name: "SEMMA",
    fullName: "Sample, Explore, Modify, Model, Assess",
    description: "Developed by SAS Institute. Used heavily for building prediction models like loan approval using decision trees or random forests.",
    stages: ["Sample", "Explore", "Modify", "Model", "Assess"],
    type: "pipeline"
  },
  {
    id: "crisp",
    name: "CRISP-DM",
    fullName: "CRoss-Industry Standard Process for Data Mining",
    description: "Emphasizes business requirements and deployment. Used for recommendation engines at Spotify or YouTube.",
    stages: ["Business Understanding", "Data Understanding", "Data Preparation", "Modeling", "Evaluation", "Deployment"],
    type: "cycle"
  },
  {
    id: "standard",
    name: "Standard Process",
    fullName: "Standard Process for Data Analysis",
    description: "A simplified teaching workflow (from our course text) focused on interpretable insights and storytelling for policymakers. Example: analyzing customer behavior.",
    stages: ["Collecting Data", "Preprocessing", "Analyzing & Insights", "Interpretation", "Storytelling"],
    type: "pipeline"
  }
];

export default function MethodologiesSlide({ data }: { data: HeartData[] }) {
  const [activeMethod, setActiveMethod] = useState(METHODOLOGIES[0].id);
  const method = METHODOLOGIES.find(m => m.id === activeMethod)!;

  return (
    <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center">
      <div className="mb-5">
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold mb-2"
        >
          Process Methodologies
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-muted-foreground"
        >
          How professionals turn raw data into knowledge.
        </motion.p>
      </div>

      <div className="flex gap-3 mb-5 flex-wrap">
        {METHODOLOGIES.map((m) => (
          <button
            key={m.id}
            onClick={() => setActiveMethod(m.id)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
              activeMethod === m.id 
                ? "bg-primary text-primary-foreground shadow-md" 
                : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            {m.name}
          </button>
        ))}
      </div>

      <div className="bg-card border border-border rounded-3xl p-6 shadow-sm flex-1 flex flex-col relative overflow-hidden min-h-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={method.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col h-full"
          >
            <div className="mb-4">
              <h3 className="text-xl md:text-2xl font-bold text-primary mb-1.5">{method.fullName}</h3>
              <p className="text-foreground/80 max-w-3xl text-sm md:text-base">{method.description}</p>
            </div>

            <div className="flex-1 flex items-center justify-center py-4 min-h-0">
              {method.type === 'pipeline' ? (
                <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 w-full">
                  {method.stages.map((stage, i) => (
                    <div key={stage} className="flex items-center">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-secondary/50 border border-border px-4 py-3 rounded-xl text-center font-medium shadow-sm w-32 text-sm"
                      >
                        {stage}
                      </motion.div>
                      {i < method.stages.length - 1 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.1 + 0.1 }}
                          className="text-muted-foreground mx-1 md:mx-2"
                        >
                          &rarr;
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="relative w-[400px] h-[260px] mx-auto scale-90 md:scale-100">
                  {method.stages.map((stage, i) => {
                    const angle = (i / method.stages.length) * 2 * Math.PI - Math.PI / 2;
                    const radius = 120;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    return (
                      <motion.div
                        key={stage}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1, x, y }}
                        transition={{ delay: i * 0.1 }}
                        className="absolute top-1/2 left-1/2 -ml-16 -mt-6 w-32 bg-secondary/50 border border-border px-3 py-2 rounded-xl text-center text-xs font-medium shadow-sm flex items-center justify-center h-12"
                      >
                        {stage}
                      </motion.div>
                    );
                  })}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="w-16 h-16 rounded-full border-4 border-dashed border-primary/30 animate-[spin_10s_linear_infinite]" />
                  </motion.div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-4 text-xs md:text-sm text-muted-foreground text-center bg-secondary/30 py-2.5 px-6 rounded-lg">
        <strong>Synthesis:</strong> KDD emphasizes pattern discovery, SEMMA emphasizes model development, CRISP-DM emphasizes business understanding + deployment.
      </div>
    </div>
  );
}
